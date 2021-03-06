import React , { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSurveys, deleteSurvey, getSurvey } from '../../actions';
import { withRouter } from 'react-router-dom';
const _ = require('lodash');

class SurveyList extends Component{
    componentDidMount(){
        this.props.fetchSurveys();
    }


    renderSurveys(){
        if(!this.props.sortAscending){
          const sorted = this.props.surveys.sort((a,b) => {
              return new Date(b.dateSent) - new Date(a.dateSent)
          });
          return sorted.map(survey => {
                return(
                    <div key={survey._id} style={{margin:'0px 0px 40px 0px'}}>
                     <div  className="row">
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
                                     {survey.draftmode?<a href="#" onClick={() => {this.props.getSurvey(survey._id, this.props.history)}}>edit</a>:''}
                                     <a href="#" className="right" onClick={() => this.props.deleteSurvey(survey._id)}><i style={{margin:'auto 10px', fontSize:'15px'}}className="material-icons">delete</i></a>
                                 </div>
                                 </div>
                         </div>
                     </div>
                    </div>
                )
            })

        } else{
            const sorted = this.props.surveys.sort((a,b) => {
                return new Date(a.dateSent) - new Date(b.dateSent)
            });
            return sorted.map(survey => {
                return(
                    <div key={survey._id} style={{margin:'0px 0px 40px 0px'}}>
                     <div  className="row">
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
                                     {survey.draftmode?<a href="#" onClick={() => {this.props.getSurvey(survey._id, this.props.history)}}>edit</a>:''}
                                     <a href="#" className="right" onClick={() => this.props.deleteSurvey(survey._id)}><i style={{margin:'auto 10px', fontSize:'15px'}}className="material-icons">delete</i></a>
                                 </div>
                                 </div>
                         </div>
                     </div>
                    </div>
                )
            })
        }
    }
 

    render(){
        return(
            <div className="container">
                <div className="row">
                    <div className="col s12">
                        <div>
                        <button style={{margin:'10px 0px 0px 0px'}} className="btn-small right" onClick={this.props.onSortClick}>
                            Date
                            <i style={{fontSize:'15px'}}className="material-icons">arrow_drop_up</i>
                            <i style={{fontSize:'15px'}}className="material-icons">arrow_drop_down</i>
                        </button>
                        </div>
                    </div>
                </div>
                
                {this.renderSurveys()}
            </div>
        );
    }
}

function mapStateToProps({surveys}) {
    return {surveys};
}
export default connect(mapStateToProps, { fetchSurveys, deleteSurvey, getSurvey})(withRouter(SurveyList));