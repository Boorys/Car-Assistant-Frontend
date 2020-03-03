import React from 'react';
import { Prompt } from 'react-router-dom';
import { getJwt } from '../components/LocalStorage'
import Axios from 'axios';

class ContactPage extends React.Component {
    state = {
        message: {
            text: "",
            author: "",
        },
        isEmpty: true,
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const jwt = getJwt();
        Axios.post(`/page/post/contact`,
            this.state.message, { headers: { Authorization: `${jwt}` } }
        ).then((respone) => {
            if (respone.status === 200) {

                this.props.history.push('/info/thank');
            }
        }).catch(error => {
            if (error.response.status === 400) {
                window.alert(error.response.data.errors);
            }
            else {
                this.props.history.push('/error');
            }

        })

    }

    handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        this.setState({

            [name]: value,
            message: {
                ...this.state.message,
                [name]: value
            }
        })
    }

    render() {

        return (

            <>
                <form onSubmit={this.handleSubmit}>
                    <h3>Send message</h3>
                    <textarea value={this.state.message.text} name="text" onChange={this.handleChange} placeholder="Write..."></textarea>
                    <label>Author:<input value={this.state.message.author} name="author" onChange={this.handleChange}></input></label>
                    <button >Send</button>
                </form>
                <Prompt
                    when={!this.state.isEmpty}
                    message="Form is empty. Do you want to leave this page"
                />
            </>

        );
    }

}

export default ContactPage;