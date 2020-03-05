import React, {Component} from 'react';
import DraftForm from './DraftForm';
import DraftFormReview from './DraftFormReview';
import { reduxForm } from 'redux-form';


class DraftNew extends Component{
    state = { showDraftReview: false };
    renderContent(){
        if(this.state.showDraftReview){
            return <DraftFormReview onDraftCancel={()=>this.setState({showDraftReview:false})}/>
        }

        return(
            <DraftForm  onDraftSubmit={()=> this.setState({showDraftReview:true})}/>
            
        );
    }
    render(){
        return(
            <div>
                
                {this.renderContent()}
                
            </div>
        )
    }
}

export default reduxForm({
    form:'DraftForm'
})(DraftNew);