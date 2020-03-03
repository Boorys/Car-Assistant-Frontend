import Article from '../components/Article';
import React, { Component } from 'react';
import { getJwt } from '../components/LocalStorage'
import Axios from 'axios';
import { connect } from "react-redux";
import { getRole } from '../components/LocalStorage'
import { searchRole } from "../actions";

class HomePage extends Component {

    state = {
        articles: [],
        role: getRole(),
    }


    componentDidMount() {
        const jwt = getJwt();

        Axios.get(`/page/get/articles`, { headers: { Authorization: `${jwt}` } }).then(res => this.setState({

            articles: res.data
        })).catch(err => {
            this.props.history.push('/error');
        })
    }

    handleAddArticle = () => {

        this.props.history.push("/add/article")
    }

    render() {
        const artList = this.state.articles.map(article => (
            <Article key={article.articleId} {...article} />
        ))
        console.log(this.props.role)
        return (< >
            <h1>Car assistant</h1>
            {artList}
            {this.props.role === 'ADMIN' ? <button onClick={this.handleAddArticle}>Add article</button> : null}
        </>);
    }
}

export default HomePage;


const mapStateToProps = (state) => {
    return {
        role: state.role
    }
};
const mapDispatchToProps = { searchRole };

export const HomePageContainer = connect(mapStateToProps, mapDispatchToProps)(HomePage);


