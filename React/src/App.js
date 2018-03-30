import React from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

import './App.css';

const js = [
  {id: '01_'},
  {id: '02_'},
  {id: '03_'},
  {id: '04_'},
  {id: '05_'}
];

const react = [
  {id: '1.1 ButtonLoader'},
  {id: '1.2 ThandnailList'},
  {id: '2.1 Accordion'},
  {id: '3.1 Http'},
  {id: '3.2'}
];

js.forEach((item) => item.Component = require(`./hw_js/${item.id}/App`).default);
react.forEach((item) => item.Component = require(`./hw_react/${item.id}/App`).default);

const Task_js = ({match}) => {
  let lang = match.path === "/hw_js" ? js : react;
  return (
    <ul className="task_js">
      {lang.map((item) => {
        return (
          <li key={item.id}>
            <Link to={`${match.path}/${item.id}`}>{item.id}</Link>
          </li>
        );
      })}    
    </ul>   
  );
};

const Links = props => (
  <ul>
    <li>
      <Link to="/hw_js">Js</Link>
    </li>
    <li>
      <Link to="/hw_react">React</Link>
    </li>
  </ul>
);

const App = props => (
  <Router>
    <div className="router">
      <Route exact path="/" component={Links}/>
      <Route path="/hw_js" component={Task_js}/>
      <Route exact path="/hw_react" component={Task_js}/>
      {js.map(({id, Component}) => {
        return <Route
          key={id}
          path={`/hw_js/${id}`}
          render={({match}) => <Component {...match}/>}
        />
      })}
      {react.map(({id, Component}) => {
        return <Route
          key={id}
          path={`/hw_react/${id}`}
          render={({match}) => <Component {...match}/>}
        />
      })}

    </div>
  </Router>
);

export default App;
