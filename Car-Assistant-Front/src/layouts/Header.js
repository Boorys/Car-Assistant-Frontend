import React from 'react';
import { Route, Switch } from 'react-router-dom';
import "../styles/Header.css";

import img1 from '../images/header1.jpg';



const Header = () => {


    return (
        <>
            <Switch>
                <Route exact render={() => (
                    <img src={img1} alt="miasto" />
                )} />

            </Switch>

        </>
    );
}

export default Header;