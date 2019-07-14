
import { Navigation } from 'react-native-navigation'
import { getBasket } from '../../../components/store/actions/basket_functions';

import PanierIcon from '../../../assets/images/Nav/Shopping/shopping.jpg'
import Panier1Icon from '../../../assets/images/Nav/Shopping/shopping1.jpg'
import Panier2Icon from '../../../assets/images/Nav/Shopping/shopping2.jpg'
import Panier3Icon from '../../../assets/images/Nav/Shopping/shopping3.jpg'
import Panier4Icon from '../../../assets/images/Nav/Shopping/shopping4.jpg'
import Panier5Icon from '../../../assets/images/Nav/Shopping/shopping5.jpg'
import Panier6Icon from '../../../assets/images/Nav/Shopping/shopping6.jpg'
import Panier7Icon from '../../../assets/images/Nav/Shopping/shopping7.jpg'
import Panier8Icon from '../../../assets/images/Nav/Shopping/shopping8.jpg'
import Panier9Icon from '../../../assets/images/Nav/Shopping/shopping9.jpg'
import Panier9PlusIcon from '../../../assets/images/Nav/Shopping/shopping9Plus.jpg'


export const goLogin = () => Navigation.setRoot({
  root: {
    stack: {
      id: 'login',
      children: [
        {
          component: {
            name: 'Login',
          }
        }
    ],
    }
  }
})

export const goRestaurant = () => Navigation.setRoot({
  root: {
    stack: {
      id: 'res',
      children: [
        {
          component: {
            name: 'Restaurant',
          }
        }
    ],
    }
  }
})


export const handlePressRestaurant=(isAllowed)=>Navigation.setRoot({
  root: {
    stack: {
      id: 'res',
      children: [
        {
          component: {
            name: 'Restaurant',
            passProps: {
              isPanierAllowed:isAllowed
            },
          }
        }
    ],
    options: {
      topBar: {
        title: {
          text: 'Salons de thé',
          fontSize: 14,
          alignment: 'center'
        },
        rightButtons: [
          {
           // text: 'Add',
            id: 'Panier',
            icon: navRightButtonPanier (isAllowed)
          }
        ]
      }
    }
    }
  }
})



export const navRightButtonPanier = (isAllowed)=>
{

icon = null;
icon = PanierIcon
/*
if(!isAllowed) { icon = PanierIcon }
else 
{
  switch(getBasket().length){
    case 0 : icon = PanierIcon;  break;
    case 1 : icon = Panier1Icon;  break;
    case 2 : icon = Panier2Icon;  break;
    case 3 : icon = Panier3Icon;  break;
    case 4 : icon = Panier4Icon;  break;
    case 5 : icon = Panier5Icon;  break;
    case 6 : icon = Panier6Icon;  break;
    case 7 : icon = Panier7Icon;  break;
    case 8 : icon = Panier8Icon;  break;
    case 9 : icon = Panier9Icon;  break;
    default: icon = Panier9PlusIcon
}
}
*/
return icon;
}




export const navBarOnPressPanier = ( $this, buttonId, isAllowed) => {
  if(buttonId === "Panier" && isAllowed=== true){

    Navigation.push($this.props.componentId, {
      component: {
        name: 'Panier',
        options: {
          topBar: {
            title: {
              text: 'Panier',
              fontSize: 14,
              alignment: 'center'
            },
            rightButtons: [ ]
          }
        }
      }
    });

    }
  else 
    if(buttonId === "Panier" && isAllowed=== false){
      Navigation.push($this.props.componentId, {
        component: {
          name: 'NotAllow',
          options: {
            topBar: {
              title: {
                text: 'Panier',
                fontSize: 14,
                alignment: 'center'
              },
              rightButtons: [ ]
            }
          }
        }
      });
  }

}



export const handleMenu = ($this, restaurant, name_restaurant) => 

  Navigation.push($this.props.componentId, {
    component: {
      name: 'Menu',
      passProps: {
      restaurant: restaurant,
      isPanierAllowed:$this.props.isPanierAllowed
      },
      options: {
        topBar: {
          title: {
            text: name_restaurant
          },
          rightButtons: [
            {
              id: 'Panier',
              icon: navRightButtonPanier ($this.props.isPanierAllowed)
            }
          ]
        }
      }
    }
  });

 


  export const handlePlat = ($this, plat, restaurant, pub1, pub2) =>
  Navigation.push($this.props.componentId, {
    component: {
      name: 'Plat',
      passProps: {
        restaurant: restaurant,
        plat:plat,
        pubOne:pub1,
        pubTwo:pub2,
        isPanierAllowed:$this.props.isPanierAllowed
      },
      options: {
        topBar: {
          title: {
            text: plat.name
          },
          rightButtons: [
            {
              id: 'Panier',
              icon: navRightButtonPanier ($this.props.isPanierAllowed)
            }
          ]
        }
      }
     
    }
  });


  export const handleCommand = ($this) =>
  Navigation.push($this.props.componentId, {
    component: {
      name: 'Command',
      passProps: {
        totalPrice: $this.state.totalPrice,
      },
      options: {
        topBar: {
          title: {
            text: 'Commande'
          },
          rightButtons: [ ]
        }
      }
    }
  });
















   /*
  this.props.navigator.push({
    screen: "Command",
    title: "Commande",
    navigatorStyle: navStyle,
    animationType: "slide-horizontal",
    passProps: {
      totalPrice: this.state.totalPrice,
    },
  });
  */



/*
//handlePlat (this.props.navigator, this.props.isPanierAllowed, plat, restaurant, pub1, pub2) 

Navigation.push(this.props.componentId, {
  component: {
    name: 'Plat',
    passProps: {
      restaurant: restaurant,
      plat:plat,
      pubOne:pub1,
      pubTwo:pub2
    },
    options: {
      topBar: {
        title: {
          text: plat.name
        }
      }
    }
  }
});

*/








  
/*
export const goLogin = () => Navigation.showModal({
  stack: {
    children: [{
      component: {
        name: 'Login',
      //  passProps: {
      //    text: 'stack with one child'
      //  },
        options: {
          topBar: {
            title: {
              text: 'Connexion',
              fontSize: 14,
              alignment: 'center'
            }
          }
        }
      }
    }]
  }
});
*/








/*

export const handlePressRestaurant = (navigator, isAllowed) => {
  console.log('click restaurant')
  Promise.all([
    Icon.getImageSource('bars',20,'white'),
    Icon.getImageSource('dollar',20,'white'),
    Icon.getImageSource('search',20,'white'),
    Icon.getImageSource('shopping-cart',20,'white'),
    Icon.getImageSource('coffee',20,'white'),
]).then( sources => {

  navigator.push({
    screen: 'Restaurant',
    title: 'Salons de thé',
    navigatorStyle: navStyle,
    passProps: {
      isPanierAllowed:isAllowed
    },
    navigatorButtons:{
      leftButtons:[navLeftButton(sources)],
      rightButtons: [navRightButtonPanier(sources, isAllowed) 
       // , navRightButtonValidate(sources)
      ]
  }
  });

})
}


Navigation.push(this.props.componentId, {
  component: {
    name: 'Menu',
    passProps: {
    isPanierAllowed:this.props.isPanierAllowed,
    restaurant: restaurant
    },
    options: {
      topBar: {
        title: {
          text: name_restaurant
        },
        rightButtons: [
          {
            //id: 'addPost',
            //text: 'Add'
            id: 'search',
            icon: require('../../../assets/images/Nav/shopping.jpg')
          }
        ]
      }
    }
  }
});











 get options() {
  return {
    topBar: {
      title: {
        text: 'Salons de thé'
      },
      rightButtons: [
        {
          //id: 'addPost',
          //text: 'Add'
          id: 'search',
          icon: require('../../../assets/images/Nav/Shopping/shopping1.jpg')
        }
      ]
    }
  };
}

*/


/*

import Icon from 'react-native-vector-icons/FontAwesome';
export const navStyle = {
  navBarTextFontSize:20,
  navBarTextColor:'#ffffff',
  navBarTextFontFamily: 'RobotoCondensed-Bold',
  navBarTitleTextCentered: true, // ANDROID ONLY
  navBarBackgroundColor: '#d68432',
  navBarButtonColor:'#ffffff',
  topBarShadowColor: 'blue',
  //navigationBarColor: '#d68432',
  statusBarColor: '#ba742e',
}


export const handlePressRestaurant = (navigator, isAllowed) => {
  console.log('click restaurant')
  Promise.all([
    Icon.getImageSource('bars',20,'white'),
    Icon.getImageSource('dollar',20,'white'),
    Icon.getImageSource('search',20,'white'),
    Icon.getImageSource('shopping-cart',20,'white'),
    Icon.getImageSource('coffee',20,'white'),
]).then( sources => {

  navigator.push({
    screen: 'Restaurant',
    title: 'Salons de thé',
    navigatorStyle: navStyle,
    passProps: {
      isPanierAllowed:isAllowed
    },
    navigatorButtons:{
      leftButtons:[navLeftButton(sources)],
      rightButtons: [navRightButtonPanier(sources, isAllowed) 
       // , navRightButtonValidate(sources)
      ]
  }
  });

})
}


export const handleMenu = (navigator, isAllowed, restaurant, name_restaurant) => {
  console.log('click restaurant')
  Promise.all([
    Icon.getImageSource('bars',20,'white'),
    Icon.getImageSource('dollar',20,'white'),
    Icon.getImageSource('search',20,'white'),
    Icon.getImageSource('shopping-cart',20,'white'),
    Icon.getImageSource('coffee',20,'white'),
]).then( sources => {

  navigator.push({
    screen: 'Menu',
    title: name_restaurant,
    navigatorStyle: navStyle,
    passProps: {
      isPanierAllowed:isAllowed,
      restaurant: restaurant
    },
    navigatorButtons:{
      rightButtons: [navRightButtonPanier(sources, isAllowed) 
       // , navRightButtonValidate(sources)
      ]
  }
  });

})
}





export const handlePlat = (navigator, isAllowed, plat, restaurant, pub1, pub2) => {
  console.log('click restaurant')
  Promise.all([
    Icon.getImageSource('bars',20,'white'),
    Icon.getImageSource('dollar',20,'white'),
    Icon.getImageSource('search',20,'white'),
    Icon.getImageSource('shopping-cart',20,'white'),
    Icon.getImageSource('coffee',20,'white'),
]).then( sources => {

  navigator.push({
    screen: 'Plat',
    title: plat.name,
    passProps: {
      restaurant: restaurant,
      plat:plat,
      pubOne:pub1,
      pubTwo:pub2
    },
    navigatorStyle: navStyle,
    navigatorButtons:{
      //leftButtons:[navLeftButton(sources)],
      rightButtons: [navRightButtonPanier(sources, isAllowed) 
       // , navRightButtonValidate(sources)
      ]
  }
  });

})
}


export const navBarOnPress = (event, $this) => {
  if(event.type === "NavBarButtonPress" && event.id === "PanierButton"){
    $this.props.navigator.push({
      screen: 'Panier',
      title: 'Panier',
      navigatorStyle: navStyle,
      animationType:'slide-horizontal',
    });
    }
  else 
    if(event.type === "NavBarButtonPress" && event.id === "NotAllowButton"){
      $this.props.navigator.push({
        screen: 'NotAllow',
        title: 'Panier',
        navigatorStyle: navStyle,
        animationType:'slide-horizontal',
      });
      }
  }



const navLeftButton = (sources) => {
    return {
        title:'Drawer',
        id: 'DrawerButton',
        icon: sources[0],
        disableIconTint: true,
        buttonColor: 'white'
    }
  }
  const navRightButtonPanier = (sources, isAllowed) => {
    return {
        title: 'Panier' ,
        id: isAllowed ? 'PanierButton' : 'NotAllowButton',
        icon: sources[3],
        disableIconTint: true,
        buttonColor: 'white'
    }
  }
  const navRightButtonValidate = (sources) => {
    return {
        title:'Validate',
        id: 'ValidateButton',
        icon: sources[4],
        disableIconTint: true,
        buttonColor: 'white'
    }
  }


*/


