const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export default emails => {
    const inavlidEmails = emails
    .split(',')
    .map(email => email.trim())
    .filter(email => regex.test(email) === false);

    if(inavlidEmails.length){
        return `These are the invalid emails: ${inavlidEmails}`;
    }
    return;
};