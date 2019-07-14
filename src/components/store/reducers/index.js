import { combineReducers } from 'redux';
import Restaurants from './restaurant_reducer';
import pubs from './pub_reducer';
import plats from './plat_reducer';
import User from './user_reducer'
import Category from './category_reducer';
import Basket from './basket_reducer';
import Command from './command_reducer';


const rootReducer = combineReducers({
    
    User,
    Restaurants,
    pubs,
    plats, 
    Category,
    Basket,
    Command
})

export default rootReducer;