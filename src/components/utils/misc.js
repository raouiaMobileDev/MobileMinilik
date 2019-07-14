import {
    Dimensions,
    Platform,
    AsyncStorage
} from 'react-native';

export const FIREBASEURL = `https://sellitap-e48c8.firebaseio.com`;
export const APIKEY = `AIzaSyD2raRNg7gb1bFPbB3WENlXEq2WEwI8NCA`;

export const SIGNUP = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${APIKEY}`;
export const SIGNIN = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${APIKEY}`;

export const REFRESH = `https://securetoken.googleapis.com/v1/token?key=${APIKEY}`;


export const getOrientation = (value) =>{
    return Dimensions.get("window").height > value ? "portrait" : "landscape" 
}

export const setOrientationListener = (cb) => {
    return Dimensions.addEventListener("change",cb)
}

export const removeOrientationListener = () => {
    return Dimensions.removeEventListener("change")
}

export const getPlatform = () => {
    if(Platform.OS === 'ios'){
        return "ios"
    } else {
        return "android"
    }
}


export const navigatorDrawer = (event, $this) => {
    if(event.type === "NavBarButtonPress" && event.id === "DrawerButton"){
        $this.props.navigator.toggleDrawer({
            side: 'left',
            animated: true
        })  
    }
}


export const navigatorDeepLink = (event, $this) =>{
    if(event.type === 'DeepLink'){
        $this.props.navigator.toggleDrawer({
            side: 'left',
            animated: true
        });

        if(event.payload.typeLink === 'tab'){
            $this.props.navigator.switchToTab({
                tabIndex: event.payload.indexLink
            });
        } else {
            if (event.link !== 'Restaurant'){
            $this.props.navigator.showModal({
                screen: event.link,
                title: event.payload.title,
                animationType:'slide-horizontal',
                navigatorStyle:{
                    navBarTextFontSize:20,
                    navBarTextColor:'#000',
                    navBarTextFontFamily: 'RobotoCondensed-Bold',
                    navBarTitleTextCentered: true, // ANDROID ONLY
                    navBarBackgroundColor: '#fff',
                    navBarButtonColor:'#d68432',
                    topBarShadowColor: 'blue',
                    navigationBarColor: '#d68432',
                    statusBarColor: '#d68432',
                  },
                backButtonHidden: false
            })
        }
    } 
    }
}


export const getTokens = (cb) => {
    AsyncStorage.multiGet([
        '@minilikApp@token',
        '@minilikApp@refreshToken',
        '@minilikApp@expireToken',
        '@minilikApp@uid',
    ]).then(value=>{
        cb(value)
    })
}

export const setTokens = (values,cb) => {
    const dateNow = new Date();
    const expiration = dateNow.getTime() + (3600 * 1000);

    AsyncStorage.multiSet([
        ['@minilikApp@token', values.token],
        ['@minilikApp@refreshToken', values.refToken],
        ['@minilikApp@expireToken', expiration.toString()],
        ['@minilikApp@uid', values.uid],
    ]).then( response => {
        cb();
    })
}

export const gridTwoColumns = (list) => {
    let newArticles = [];
    let articles = list;

    let count = 1;
    let vessel = {};

    if(articles){
        articles.forEach( element =>{
            if(count == 1){
                vessel["blockOne"] = element;
                count++;
            } else {
                vessel["blockTwo"] = element;
                newArticles.push(vessel);

                count = 1;
                vessel = {};
            }
        })
    }
    return newArticles;
}



export const getCategoriesByName = (list) => {
    let newCategories = [];
    let categories = list;
    if(categories){
        categories.forEach( element =>{
            newCategories.push(element.name);
            }
        )
    }
    return newCategories;
  }


  export const platsByCategory = (list, value) => {
    let newPlays = [];
    let plats = list;

    if(plats){
    plats.forEach(element => {
        if(element.category.name===value)
            newPlays.push(element)
    })
    }
    return newPlays;
  }


 