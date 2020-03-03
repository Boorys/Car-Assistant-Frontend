import React, { Component } from 'react';
import { getJwt } from '../components/LocalStorage'
import Axios from 'axios';

class AddArticlePage extends Component {
    state = {

        article: {
            title: '',
            text: '',
            author: '',
        }
    }

    handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        this.setState({

            [name]: value,
            article: {
                ...this.state.article,
                [name]: value
            }
        })
    }


    handleSend = () => {

        const jwt = getJwt();
        Axios.post(`/page/add/article`,
            this.state.article, { headers: { Authorization: `${jwt}` } }
        ).then((respone) => {
            if (respone.status === 201) {

                this.props.history.push('/');
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



    render() {
        return (<>

            <h1>Create new article</h1>
            <br />
            <label >Title:<input type="text" name="title" onChange={this.handleChange} /></label>
            <br />
            <label>Text:<textarea name="text" value={this.state.article.text} onChange={this.handleChange} placeholder="Write..."></textarea></label>
            <label >Author:<input type="text" name="author" onChange={this.handleChange} /></label>
            <button onClick={this.handleSend}>Create</button>

        </>);
    }
}

export default AddArticlePage;