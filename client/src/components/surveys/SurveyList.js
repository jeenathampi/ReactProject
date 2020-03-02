import React , { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSurveys } from '../../actions';

class SurveyList extends Component{
    componentDidMount(){
        this.props.fetchSurveys();
    }

    renderSurveys(){
       return this.props.surveys.reverse().map(survey => {
           return(
               <div className="container" style={{margin:'40px auto'}}>
                <div key={survey._id} className="row">
                    <div className="col s12">
                        <div className="card blue-grey darken-1">
                            <div className="card-content white-text">
                                <span className="card-title">{survey.title}</span>
                                <p>{survey.body}</p>
                                <p className="right">Sent On: {new Date(survey.dateSent).toLocaleDateString()}</p>
                            </div>
                            <div className="card-action">
                                <a href="#"><i style={{margin:'auto 10px', fontSize:'15px'}}className="material-icons">thumb_up</i>{survey.yes}</a>
                                <a href="#"><i style={{margin:'auto 10px', fontSize:'15px'}}className="material-icons">thumb_down</i>{survey.no}</a>
                            </div>
                            </div>
                    </div>
                </div>
               </div>
           )
       })
    }

    render(){
        return(
            <div>
                
                {this.renderSurveys()}
            </div>
        );
    }
}

function mapStateToProps({surveys}) {
    return {surveys};
}
export default connect(mapStateToProps, { fetchSurveys })(SurveyList);