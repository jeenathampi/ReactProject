import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import SurveyList from './surveys/SurveyList';




class Dashboard extends Component{
    state={ sortAscending: true }
    
    render(){
        return(
            <div>
                <SurveyList onSortClick={() => this.setState({ sortAscending: false})} sortAscending={this.state.sortAscending}/>
                <div className="fixed-action-btn">
                    <Link to='/surveys/new' className="btn-floating btn-large red">
                        <i className="large material-icons">add</i>
                    </Link>
                </div>
            </div>
        )
    }

}


export default Dashboard