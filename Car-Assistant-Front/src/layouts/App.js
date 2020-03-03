import React, { Component } from 'react';
import '../styles/App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './Header';
import { NavigationContainer } from './Navigation';
import Page from './Page';
import Footer from './Footer';
import { searchRole } from "../actions";
import { connect } from "react-redux";


class App extends Component {
  render() {
    return (
      <Router>
        <div className="app">
          <header>
            {<Header />}
          </header>
          <main>
            <aside>
              {<NavigationContainer />}
            </aside>
            <section className="page">
              {<Page />}
            </section>
          </main>
          <footer>{<Footer />}</footer>
        </div>
      </Router>
    );
  }
}

export default App;


const mapStateToProps = (state) => {
  return {
    contacts: state.contacts
  }
};
const mapDispatchToProps = { searchRole };

export const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App); 