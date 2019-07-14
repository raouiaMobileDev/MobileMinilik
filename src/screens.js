import {Navigation} from 'react-native-navigation';

import Home from './components/views/Home';
import Login from './components/views/Login';
import Restaurant from './components/views/Restaurant';
import Menu from './components/views/Menu';
import Plat from './components/views/Plat';
import Panier from './components/views/Admin/Panier';
import NotAllow from './components/views/Admin/NotAllow';
import Command from './components/views/Admin/Command';

//import {Provider} from 'react-redux';
//import {store} from './store';

import ConfigureStore from './components/store/config';
import { Provider } from 'react-redux';
const store = ConfigureStore();


export function registerScreens() {

Navigation.registerComponentWithRedux('Home',
  () => Home,
 Provider,
 store
  );

Navigation.registerComponentWithRedux('Restaurant', 
 () => Restaurant,
  Provider,
  store
  );

Navigation.registerComponentWithRedux('Login', 
 () => Login,
  Provider,
  store
  );

Navigation.registerComponentWithRedux('Menu', 
  () => Menu,
   Provider,
   store
   );

  Navigation.registerComponentWithRedux('Plat', 
   () => Plat,
    Provider,
    store
    );
   
  Navigation.registerComponentWithRedux('Panier', 
   () => Panier,
    Provider,
    store
    );
  Navigation.registerComponentWithRedux('NotAllow', 
    () => NotAllow,
     Provider,
     store
     ); 
  Navigation.registerComponentWithRedux('Command', 
     () => Command,
      Provider,
      store
      ); 








/*
  Navigation.registerComponent('Home', () => require('./Home').default);
  Navigation.registerComponent('Initializing', () => require('./Initializing').default);
  Navigation.registerComponent('SignIn', () => require('./SignIn').default);
  Navigation.registerComponent('SignUp', () => require('./SignUp').default);
  Navigation.registerComponent('Screen2', () => require('./Screen2').default);
  */
}