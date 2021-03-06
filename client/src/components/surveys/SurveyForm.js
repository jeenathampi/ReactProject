import React, {Component} from 'react';
import {reduxForm, Field, reset} from 'redux-form';
import SurveyField from './SurveyField';
import { Link } from 'react-router-dom';
import validateEmails from '../../utils/validateEmails';
import formFields from './formFields';
import { connect } from 'react-redux';
import { submitDraft } from '../../actions';
import { withRouter } from 'react-router-dom';


class SurveyForm extends Component{
   
    renderFields(){
       return formFields.map(({ label, name}) =>{
          return(
              <Field key={name} type="text" component={SurveyField} label={label} name={name}/>
          )
       });
    }
    render(){
        return(
           
            <div className="container">
                <div className="row">
                    <form className="col s12" onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
                        <div className="input-field col s12">
                            {this.renderFields()}
                        </div>
                        <button className="btn-small right" type="submit" style={{margin:'10px'}}>Next</button>
                        <Link to='/surveys' className="btn-small" type="submit" style={{margin:'10px'}}>cancel</Link>
                        
                    </form>
                    <button onClick={() => {this.props.submitDraft(this.props.values, this.props.history)}} className="btn-small right" style={{margin:'10px'}}>Save as Draft</button>
                </div>
            </div>
        );
    }
}

function validate(values) {  
    console.log(values);    
    const errors = {};
        errors.recipients = validateEmails(values.recipients || '');
        errors.from = validateEmails(values.from || '');
        formFields.forEach(({ name }) => {
            if(!values[name]){
                errors[name] = 'Required';
            }
        });
    

    
    return errors;
}

function  mapStateToProps({form:{SurveyForm:{values}}}) {
    return {values};
}

export default reduxForm({
    validate,
    destroyOnUnmount: false,
    form:'SurveyForm',
    forceUnregisterOnUnmount:true,
})(connect(mapStateToProps,{submitDraft})(withRouter(SurveyForm)))
