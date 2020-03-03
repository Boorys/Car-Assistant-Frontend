import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { HomePageContainer } from '../pages/HomePage';
import ContactPage from '../pages/ContactPage';
import ErrorPage from '../pages/ErrorPage';
import { LoginPageContainer } from '../pages/LoginPage';
import CarsPage from '../pages/CarsPage';
import AddCarPage from '../pages/AddCarPage';
import AccountRegistration from '../pages/AccountRegistrationPage'
import AddCarModel from '../pages/AddCarModelPage'
import { LogoutPageContainer } from '../pages/LogoutPage'
import ConfirmationLoginPage from '../pages/ConfirmationLoginPage'
import SuccessfulRegistrationPage from '../pages/SuccessfulRegistrationPage'
import UpdatePage from '../pages/ShowDetailsCarPage'
import AddArticlePage from '../pages/AddArticlePage'
import ThankInfoPage from '../pages/ThankInfoPage'
import { getRole } from '../components/LocalStorage'
import InactiveAccountPage from '../pages/InactiveAccountPage'

const Page = () => {

  const role = getRole();

  return (
    <>
      <Switch>
        <Route path="/" exact component={HomePageContainer} />
        <Route path="/contact" component={ContactPage} />
        <Route path="/login" component={LoginPageContainer} />
        {role === "USER" || role === "ADMIN" ? <Route path="/cars" component={CarsPage} /> : null}
        {role === "USER" || role === "ADMIN" ? <Route path="/add/car" component={AddCarPage} /> : null}
        <Route path="/add/user" component={AccountRegistration} />
        {role === "ADMIN" ? <Route path="/add/carModel" component={AddCarModel} /> : null}
        {role === "USER" || role === "ADMIN" ? <Route path="/logout" component={LogoutPageContainer} /> : null}
        <Route path="/confirmation/login" component={ConfirmationLoginPage} />
        <Route path="/confirmation/successful" component={SuccessfulRegistrationPage} />
        {role === "USER" || role === "ADMIN" ? <Route path="/show/details" component={UpdatePage} /> : null}
        <Route path="/add/article" component={AddArticlePage} />
        <Route path="/info/thank" component={ThankInfoPage} />
        <Route path="/info/inactive" component={InactiveAccountPage} />
        <Route path="/error" component={ErrorPage} />
        <Route component={ErrorPage} />
      </Switch>
    </>
  );
}

export default Page;

