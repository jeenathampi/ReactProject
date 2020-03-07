import axios from 'axios';
import {FETCH_USER, FETCH_SURVEYS, LOAD } from './types';

export const fetchUser = () => async (dispatch) => {
   const res = await axios.get('/api/current_user');
          
         dispatch({type:FETCH_USER,payload:res.data});
  
}

export const handleToken=(token)=> async (dispatch)=>{
      const res = await axios.post('/api/stripe',token);

      dispatch({type:FETCH_USER,payload:res.data});
}

export const submitSurvey =(values, history) => async dispatch =>{
   const res = await axios.post('/api/surveys',values);
   
   history.push('/surveys');
   dispatch({type:FETCH_USER, payload:res.data});
}

export const fetchSurveys = () => async dispatch => {
      const res = await axios.get('/api/surveys');

      dispatch({type: FETCH_SURVEYS, payload:res.data});
}

export const deleteSurvey = (id) => async dispatch => {
      const res = await axios.delete(`/api/surveys/${id}`,id);
       
      dispatch({type: FETCH_SURVEYS, payload:res.data});
}

export const submitDraft=(values, history) => async dispatch => {
      const res = await axios.post('/api/surveys/drafts',values);

      history.push('/surveys');
      dispatch({type:FETCH_USER, payload:res.data});
}

export const getSurvey=(id, history)=> async (dispatch) => {
      const data = await axios.get(`/api/surveys/${id}`,id);

      history.push('/surveys/draft');
        
      dispatch({type:LOAD, payload:data.data});
}

export const updateDraft=(id, values, history) => async dispatch => {
      const res = await axios.put(`/api/surveys/drafts/${id}`, values);

      history.push('/surveys');
      dispatch({type:FETCH_USER, payload:res.data});
}

export const submitDraftSurvey =(id, values, history) => async dispatch =>{
      const res = await axios.post(`/api/surveys/drafts/${id}`,values);
      
      history.push('/surveys');
      dispatch({type:FETCH_USER, payload:res.data});
   }
