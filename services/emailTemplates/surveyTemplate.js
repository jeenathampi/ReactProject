const keys = require('../../config/keys');
module.exports = (survey) =>{
    return `
      <html>
       <body>
        <div style="text-align:center">
          <h2>Hi There!!</h2>
          <h3>We would like your input</h3>
          <p>Please answer the following question</p>
          <p>${survey.body}</p>
          <a href="${keys.redirectDomain}/api/surveys/${survey.id}/yes">Yes</a>
          <a href="${keys.redirectDomain}/api/surveys/${survey.id}/no">No</a>
        </div>
       </body>
      </html>
   `;
}
