import React, { Component, Fragment } from 'react';
import Sidebar from './sidebar/Sidebar.js';
import Password from './inputPassword/Password.js';
import './app.css';

class App extends Component {
   render() {
      return (
      		<Fragment>
	            {/*<Sidebar/>*/}
	            <Password/>
            </Fragment>
      );
   }
}

export default App;
