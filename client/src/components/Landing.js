import React from 'react';

const bodyStyle ={
    display: 'flex',
minHeight: '100vh',
flexDirection: 'column'
}

const mainStyle ={
    flex: '1 0 auto'
}
const Landing =()=>{
        return(
            <body style={bodyStyle}>
                <header>

                </header>
                <main style={mainStyle}>
                    <div className="center-align">
                        <h1>Emaily!!</h1>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque pellentesque non libero quis molestie.</p>
                    </div>
                    <div className="video-container">
                         <iframe title="emailyvideo" width="853" height="480" src="//www.youtube.com/embed/Q8TXgCzxEnw?rel=0" frameBorder="0" allowFullScreen></iframe>
                    </div>
                </main>
                <footer className="page-footer">
                    <div className="container">
                        <div className="row">
                        <div className="col l6 s12">
                            <h5 className="white-text">Footer Content</h5>
                            <p className="grey-text text-lighten-4">You can use rows and columns here to organize your footer content.</p>
                        </div>
                        <div className="col l4 offset-l2 s12">
                            <h5 className="white-text">Links</h5>
                            <ul>
                            <li><a className="grey-text text-lighten-3" href="#!">Link 1</a></li>
                            <li><a className="grey-text text-lighten-3" href="#!">Link 2</a></li>
                            <li><a className="grey-text text-lighten-3" href="#!">Link 3</a></li>
                            <li><a className="grey-text text-lighten-3" href="#!">Link 4</a></li>
                            </ul>
                        </div>
                        </div>
                    </div>
                    <div className="footer-copyright">
                        <div className="container">
                        © 2014 Copyright Text
                        <a className="grey-text text-lighten-4 right" href="#!">More Links</a>
                        </div>
                    </div>
                </footer>
            </body>
        )
}

export default Landing;