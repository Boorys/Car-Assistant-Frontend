import React, { Component } from 'react';
import axios from 'axios';
import { getUserId } from '../components/LocalStorage'
import { connect } from "react-redux";
import { searchRole } from "../actions";
import '../styles/ButtonGroup.css'

const ShowUser = (props) => {
    return (
        <h3>{props.value.firstName} {props.value.lastName}</h3>
    );
}


class LogoutPage extends Component {
    state = {
        user: {}
    }

    handleLogout = () => {
        localStorage.clear();
        this.props.searchRole('');
        this.props.history.push("/")
    }

    handleChangePage = () => {
        this.props.history.push("/")
    }

    componentDidMount(e) {

        const userId = getUserId();
        axios.get(`users/getUser/${userId}`).then(response => {
            this.setState({ user: response.data })
        }).catch(error => {
            const { status } = error.response;

            if (status === 401 || status === 403) {
                this.props.history.push('/');
            }
        });
    }

    render() {
        return (
            <>
                <ShowUser value={this.state.user}></ShowUser>

                <h3>Do you want to log out?</h3>
                <div className="button">

                    <button onClick={this.handleLogout} className="buttonLeft" >Yes</button>
                    <button onClick={this.handleChangePage} className="buttonRight">No</button>

                </div>
            </>);
    }
}

export default LogoutPage;


const mapStateToProps = state => {
    return {
        role: state.role
    };
};

const mapDispatchToProps = { searchRole };

export const LogoutPageContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(LogoutPage);