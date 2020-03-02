import React, {Component} from 'react';
import {reduxForm, Field} from 'redux-form';
import SurveyField from './SurveyField';
import { Link } from 'react-router-dom';
import validateEmails from '../../utils/validateEmails';
import formFields from './formFields';

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
                </div>
            </div>
        );
    }
}

function validate(values) {
    const errors = {};
    errors.recipients = validateEmails(values.recipients || '');
    formFields.forEach(({ name }) => {
        if(!values[name]){
            errors[name] = 'Required';
        }
    });
    
    return errors;
}

export default reduxForm({
    validate,
    destroyOnUnmount: false,
    form:'SurveyForm',
    forceUnregisterOnUnmount:true
})(SurveyForm);