import React from 'react';

export default ({ input, label, meta:{touched, error}}) => {
   return(
       <div>
           <label>{label}</label>
           
           <input {...input} style={{ marginBottom:'5px'}}/>
           <p style={{color:'#700', margin:'0px 10px 10px 0px'}}>{touched && error ? error:false}</p>
       </div>
   )
}