import React, {Component} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from '../actions';
import Header from './Header';
import Landing from './Landing';
import Dashboard from './Dashboard';
import surveyNew from './surveys/SurveyNew';
import DraftNew from './Drafts/DraftNew';


class App extends Component {
    componentDidMount(){
      this.props.fetchUser();
    }
    render(){
        return(
                <BrowserRouter>
                    <Header />
                    <Route exact path="/" component={Landing} />
                    <Route exact path="/surveys" component={Dashboard} />
                    <Route exact path="/surveys/new" component={surveyNew} />
                    <Route exact path="/surveys/draft" component={DraftNew} />
                </BrowserRouter>
        );
    }
};

export default connect(null,actions)(App);