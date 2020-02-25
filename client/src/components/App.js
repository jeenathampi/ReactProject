import React, {Component} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from '../actions';
import Header from './Header';
import Landing from './Landing';


const dashboard=()=><h2>Dashboard</h2>

class App extends Component {
    componentDidMount(){
      this.props.fetchUser();
    }
    render(){
        return(
                <BrowserRouter>
                    <Header />
                    <Route exact path="/" component={Landing} />
                    <Route path="/surveys" component={dashboard} />
                </BrowserRouter>
        );
    }
};

export default connect(null,actions)(App);