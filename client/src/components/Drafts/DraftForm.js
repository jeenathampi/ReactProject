import React, {Component} from 'react';
import {reduxForm, Field, reset} from 'redux-form';
import SurveyField from '../surveys/SurveyField';
import { Link } from 'react-router-dom';
import validateEmails from '../../utils/validateEmails';
import formFields from '../surveys/formFields';
import { connect } from 'react-redux';
import { submitDraft } from '../../actions';
import { withRouter } from 'react-router-dom';


class DraftForm extends Component{
   
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
                {/* {console.log(this.props)} */}
                <div className="row">
                    <form className="col s12" onSubmit={this.props.handleSubmit(this.props.onDraftSubmit)}>
                        <div className="input-field col s12">
                            {this.renderFields()}
                        </div>
                        <button className="btn-small right" type="submit" style={{margin:'10px'}}>Next</button>
                        <Link to='/surveys' className="btn-small" type="submit" style={{margin:'10px'}}>cancel</Link>
                        
                    </form>
                    <button onClick={() => {this.props.submitDraft(this.props.DraftForm.values, this.props.history)}} className="btn-small right" style={{margin:'10px'}}>Save as Draft</button>
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

DraftForm = reduxForm({
    validate,
    destroyOnUnmount: false,
    form:'DraftForm',
    enableReinitialize: true,
    forceUnregisterOnUnmount:true,
})(DraftForm)

export default connect(
    ({form:{DraftForm}, load}) =>{
        console.log(load);
        return {
            DraftForm,
            initialValues: load.data
        };
    },{submitDraft}
)(withRouter(DraftForm))
