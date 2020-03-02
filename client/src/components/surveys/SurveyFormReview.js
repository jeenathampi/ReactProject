import React from 'react';
import { connect } from 'react-redux';
import formFields from './formFields';
import * as actions from '../../actions';
import { withRouter } from 'react-router-dom';


const SurveyFormReview = (props) => {
    const reviewFields = formFields.map(({name, label}) => {
        return(
            <div key={name}>
                
                <label>{label}</label>
                <div style={{margin:'10px 0px 20px 0px'}}>
                    {props.values[name]}
                </div>
            </div>
        )
    })
    return(
        <div className="container" style={{marginTop:'15px'}}>
            <div className="row">
                <div className="col s12">
                     {reviewFields}
                    <button className="btn-small" onClick={props.onSurveyCancel}>Back</button>
                    <button className="btn-small right" onClick={()=>{props.submitSurvey(props.values, props.history)}}>
                        <i className="material-icons right">email</i>
                        Send Survey</button>
                </div>
            </div>
        </div>
    )
}

function mapStateToProps({form:{SurveyForm:{values}}}){
    return {values};
}

export default connect(mapStateToProps,actions)(withRouter(SurveyFormReview));