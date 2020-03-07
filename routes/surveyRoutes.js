const _ = require('lodash');
const {Path} = require('path-parser');
const {URL} = require('url');
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');

module.exports= app => {
    app.get('/api/surveys', requireLogin, async (req,res) => {
        const surveys = await Survey.find({_user: req.user.id})
                                 .select({recipients:false});

        res.send(surveys);
    });

    app.delete('/api/surveys/:id', requireLogin, async (req,res) => {
        await Survey.findByIdAndRemove(req.params.id);
        const surveys = await Survey.find({_user: req.user.id})
                                    .select({recipients:false});

        res.send(surveys);
    });

    app.get('/api/surveys/:id',async (req,res) => {
        const survey = await Survey.findById(req.params.id);
            const {_id, title, subject, body, from, recipients} = survey
            let email = "";
            recipients.forEach(recipient => {
                email = email.concat(recipient.email).concat(',');
            });

            const data={
                id:_id,
                title,
                recipients:email.slice(0,-1),
                subject,
                body,
                from
            }
        res.send(data);
    })

    app.get('/api/surveys/:id/:choice', (req,res) => {
        res.send('Thank you for your feedback!');
    })

    app.post('/api/surveys/webhooks',(req,res)=>{
        const p = new Path('/api/surveys/:surveyId/:choice');
         _.chain(req.body)
                .map((event) => {
                const match = p.test(new URL(event.url).pathname);
                if(match){
                    return {email:event.email, surveyId:match.surveyId, choice:match.choice}
                    }
                })

                .compact()
                .uniqBy( 'email', 'surveyId')
                .each(({surveyId, email, choice}) => {
                    Survey.updateOne({
                        _id: surveyId,
                        recipients:{
                            $elemMatch:{email:email, responded:false}
                        }
                    },{
                        $inc:{[choice]:1},
                        $set:{'recipients.$.responded':true},
                        lastResponded: new Date()
                    }).exec();
                })
                .value();

        res.send({});
    });

    app.post('/api/surveys', requireLogin, requireCredits, async (req,res)=>{
        const {title, body, subject, recipients, from} = req.body;

        const survey = new Survey({
            title,
            body,
            subject,
            recipients: recipients.split(',').map(email => ({email: email.trim()})),
            from,
            _user: req.user.id,
            dateSent: Date.now()
        });

        const mailer = new Mailer(survey, surveyTemplate(survey));

        try {
            await mailer.send();
            await survey.save();
            req.user.credits -= 1;
            const user = await req.user.save();
            res.send(user);   
        } catch (error) {
            res.status(422).send(error);
        }
    });

    app.post('/api/surveys/drafts', async (req,res) =>{
        const {title, body, subject, recipients, from} = req.body;
            const survey = new Survey({
                title,
                body,
                subject,
                recipients: (recipients?recipients.split(',').map(email => ({email: email.trim()})):[] ),
                from,
                draftmode: true,
                _user: req.user.id,
                dateSent: Date.now()
            });
                await survey.save();
                res.send(req.user);

    })

    app.put('/api/surveys/drafts/:id', async (req,res) => {
        const {title, body, subject, recipients, from} = req.body;
          await Survey.findByIdAndUpdate(req.params.id, {
              title,
              body,
              subject,
              recipients: (recipients?recipients.split(',').map(email => ({email: email.trim()})):[] ),
              from,
              draftmode: true,
              _user: req.user.id,
              dateSent: Date.now()
          })

          res.send(req.user);
    })

    app.post('/api/surveys/drafts/:id', requireLogin, requireCredits, async (req,res) => {
        const {title, body, subject, recipients, from} = req.body;
        await Survey.findByIdAndRemove(req.params.id);
        const survey = new Survey({
            title,
            body,
            subject,
            recipients: recipients.split(',').map(email => ({email: email.trim()})),
            from,
            _user: req.user.id,
            dateSent: Date.now()
        });

        const mailer = new Mailer(survey, surveyTemplate(survey));

        try {
            await mailer.send();
            await survey.save();
            req.user.credits -= 1;
            const user = await req.user.save();
            res.send(user);   
        } catch (error) {
            res.status(422).send(error);
        }
    })
}