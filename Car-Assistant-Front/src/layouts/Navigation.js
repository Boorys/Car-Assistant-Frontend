import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import "../styles/Navigation.css";
import { getRole } from '../components/LocalStorage'
import { connect } from "react-redux";
import { searchRole } from "../actions";

const list = [
  { name: "start", path: "/", exact: true },
  { name: "register", path: "/add/user" },
  { name: "contact", path: "/contact" },

]

class Navigation extends Component {

  state = {

    role: getRole(),
    isLogin: localStorage.getItem('user-id')

  }


  render() {

    const menu = list.map(item => (

      <li key={item.name}>
        {<NavLink to={item.path} exact={item.exact ? item.exact : false}>{item.name}</NavLink>}
      </li>
    ))


    return (
      <nav className="main">
        <ul>
          <li>
            {this.props.role === '' ? <NavLink to="/login">Sign in</NavLink> : <NavLink to="/logout">Sign out</NavLink>}
          </li>
          {menu}
          <li>
            {this.props.role === 'USER' || this.props.role === 'ADMIN' ? <NavLink to="/cars">Garage</NavLink> : null}
          </li>
          <li>
            {this.props.role === 'USER' || this.props.role === 'ADMIN' ? <NavLink to="/add/car">Add car</NavLink> : null}
          </li>
          <li>
            {this.props.role === 'ADMIN' ? <NavLink to="/add/carModel">Add car model</NavLink> : null}
          </li>

        </ul>
      </nav>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    role: state.role
  }
};
const mapDispatchToProps = { searchRole };

export const NavigationContainer = connect(mapStateToProps, mapDispatchToProps)(Navigation); 
