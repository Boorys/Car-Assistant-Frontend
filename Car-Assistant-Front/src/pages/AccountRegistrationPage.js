import React, { Component } from 'react';
import axios from 'axios';
import { getJwt } from '../components/LocalStorage'


class AccountRegistartion extends Component {
    state = {

        user: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    }

    handleChange = (e) => {

        const name = e.target.name;
        const value = e.target.value;
        this.setState({

            [name]: value,
            user: {
                ...this.state.user,
                [name]: value
            }
        })
    }

    handleSubmit = (e) => {

        e.preventDefault();

        const user = this.state.user;

        if (user.password !== user.confirmPassword) {
            window.alert("Incorrect password!");
        }
        else if (user.firstName === '' || user.lastName === '' || user.email === '' || user.password === '') {
            window.alert("You should complete all fields")
        }
        else {
            const jwt = getJwt();
            axios.post(`/users/register`,
                this.state.user, { headers: { Authorization: `${jwt}` } }).then((respone) => {
                    if (respone.status !== 201) {

                        this.props.history.push('/error');
                    }
                }).catch(error => {

                    if (error.response.status === 400) {
                        window.alert(error.response.data.errors);
                    }
                    if (error.response.status === 409) {

                        window.alert("This email is taken");
                    } else {
                        this.props.history.push('/error');
                    }

                })

            this.props.history.push('/confirmation/successful');
        }
    }

    render() {
        return (

            <form  >

                <label>
                    First name:
              <input type="text" name="firstName" onChange={this.handleChange} value={this.state.user.firstName} />
                </label>

                <label>
                    Last name:
                    <input type="text" name="lastName" value={this.state.user.lastName} onChange={this.handleChange} />
                </label>
                <label>
                    Email:
                    <input type="text" name="email" onChange={this.handleChange} value={this.state.user.email} />
                </label>
                <label>
                    Password:
                    <input type="password" name="password" onChange={this.handleChange} value={this.state.user.password} />
                </label>
                <label>
                    Confirm password:
                    <input type="password" name="confirmPassword" onChange={this.handleChange} value={this.state.user.confirmPassword} />
                </label>
                {/* <input type="submit" value="Create" /> */}

                <button onClick={this.handleSubmit}>Create</button>

            </form>
        )
    }
}

export default AccountRegistartion;


