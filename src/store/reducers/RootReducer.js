import {combineReducers} from 'redux'
import AuthReducer from './AuthReducer';
import ContactReducer from './ContactReducer';


const RootReducer = combineReducers({
authReducer:AuthReducer,
contactReducer:ContactReducer
});





export default RootReducer