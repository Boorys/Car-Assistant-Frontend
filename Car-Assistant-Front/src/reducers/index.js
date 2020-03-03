import { combineReducers } from "redux";
import { contacts } from "./contacts";
import { contactsSearch } from "./contactsSerch";
import { role } from './role'
import { carUserId } from './carUserId'

export default combineReducers({
    contacts,
    contactsSearch,
    role,
    carUserId
});