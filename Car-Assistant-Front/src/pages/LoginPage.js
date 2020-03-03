import React, { Component } from 'react';
import axios from 'axios';
import { connect } from "react-redux";
import { searchRole } from "../actions";


class LoginPage extends Component {
    state = {
        email: '',
        password: '',
    }
    handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        this.setState({
            [name]: value
        })
    }
  
    handleSubmit = (e) => {
        e.preventDefault();

        axios.post('users/login', {
            email: this.state.email,
            password: this.state.password
        }).then(response => {

            localStorage.setItem('cool-jwt', response.headers.authorization);
            localStorage.setItem('user-id', response.headers.userid);
            this.props.searchRole(response.headers.role);
            this.props.history.push('/');
     
        }).catch(error => {
            const { status } = error.response;

            if (status === 401 || status === 403) {
                window.alert("Incorrect password or email")
            }
            else {
                this.props.history.push('/info/inactive')
            }
        });
    }

    render() {
        return (
            < >
                <form onSubmit={this.handleSubmit}  >
                    <label htmlFor="">Email:<input type="text" name="email" onChange={this.handleChange} /></label>
                    <label htmlFor="">Password:<input type="password" name="password" onChange={this.handleChange} /></label>
                    <button >Login</button>
                </form>
            </>
        );
    }
}
export default LoginPage;


const mapStateToProps = state => {
    return {
        role: state.role
    };
};

const mapDispatchToProps = { searchRole };

export const LoginPageContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginPage);