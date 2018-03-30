import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";

import './App.css';

const usersNames = [
  {userName: 'ivchenkodima'},
  {userName: 'burlachenkovv'},
  {userName: 'maksdk'},
  {userName: 'maksdk'},
  {userName: 'maksdk'},
  {userName: 'maksdk'}
];

const Card = ({userName, name, location, avatar_url, company, created_at}) => {
   return (
      <div className="user">
         <img className="user__avatar" src={avatar_url}/>
         <span className="user__name">{name}</span>
         <div className="user__data">
            <span className="user__data--login">{userName}</span>
            <span className="user__data--company">{company}</span>
            <span className="user__data--location">{location}</span>
         </div>
      </div>
  );
}

class App extends Component {
   componentWillMount() {
      let {loadingUser} = this.props;
      loadingUser(usersNames);
   }
   render() {
    console.log(this.props);
      let {users} = this.props;
      return (
         <div className="container">
            {
               users.map((item, i) => <Card key={i} {...item}/>)  
            }
         </div>
      );
   }
}

const mapStateToProps = state => ({
  users: state.users
});

const mapDispatchToProps = dispatch => ({
   loadingUser: usersdata => 
      {
         usersdata.map( item => {
           axios
            .get(`https://api.github.com/users/${item.userName}`)
            .then(({data}) => {
               return dispatch({
                  type: "Loading_user",
                  payload: {
                     userName: item.userName,
                     name: data.name || item.userName,
                     company: data.company || "student",
                     avatar_url: data.avatar_url,
                     location: data.location,
                     created_at: data.created_at
                  }
               });
            });
         });
      }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
