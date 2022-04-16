import { combineReducers } from "redux";
import reducerAddress from "./reducerAdress";


const allReducers = combineReducers({
    addresses : reducerAddress
})

export default allReducers