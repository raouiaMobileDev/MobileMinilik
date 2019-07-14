import React, { Component } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { Navigation } from "react-native-navigation";

import HorizontalScroll from "./horizontal_scroll_icons";
import { Block } from "../Menu/Block";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { getPlats } from "../../store/actions/plat_action";
import { getPubs } from "../../store/actions/pub_action";
import { getCategories } from "../../store/actions/category_action";

import { getCategoriesByName, platsByCategory } from "../../utils/misc";
import {
  handlePlat,
  navBarOnPressPanier,
  navRightButtonPanier
} from "../../utils/navigator/navigator";

//import Icon from 'react-native-vector-icons/FontAwesome';
//import { NetInfo } from 'react-native';

class Menu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isConnected: true,
      isLoading: true,
      plats: [],
      pubs: [],
      platPubs: [],
      idRestaurant: props.restaurant.id,
      restaurant: props.restaurant,
      categories: [],
      allPlats: [],

      isLoading: true,
      articles: [],
      categorySelected: ""
    };

    Navigation.events().bindComponent(this);
  }

  navigationButtonPressed({ buttonId }) {
    navBarOnPressPanier(this, buttonId, this.props.isPanierAllowed);
  }

  gridTwoColumnsPlatPub = (list_plats, list_pubs) => {
    let newPlatsPubs = [];
    let plats = list_plats;
    let pubs = list_pubs;
    let vessel = {};

    for (i = 0; i < plats.length; i++) {
      vessel["blockOne"] = plats[i];
      vessel["blockTwo"] = pubs[i];
      newPlatsPubs.push(vessel);
      vessel = {};
    }
    return newPlatsPubs;
  };

  PlatsRestaurant = (list_plats, idRestaurant) => {
    let newPlatsRestaurant = [];
    let plats = list_plats;

    for (i = 0; i < plats.length; i++) {
      if (plats[i].restaurant.id === idRestaurant)
        newPlatsRestaurant.push(plats[i]);
    }
    return newPlatsRestaurant;
  };

  componentDidMount() {
    this.loadData();
    this.updateNavBar();
  }

  ///this function is used   to extraire the data (list) of element recevied from the firebase DB and put this data in state
  loadData = () => {
    this.props.getPubs().then(() => {
      this.setState({
        pubs: this.props.Pubs.list
      });

      this.props.getCategories().then(() => {
        const newCategory = getCategoriesByName(this.props.Category.list);
        this.setState({
          categories: newCategory,
          categorySelected: newCategory[0]
        });
      });

      this.props.getPlats().then(() => {
        var plats = this.props.Plats.list;

        if (plats.length !== 0) {
          //&& this.state.pubs.length!==0
          const listPlatsRestaurant = this.PlatsRestaurant(
            plats,
            this.state.idRestaurant
          );
          const newPlats = platsByCategory(
            listPlatsRestaurant,
            this.state.categorySelected
          );
          const newPlatsPubs = this.gridTwoColumnsPlatPub(
            newPlats,
            this.state.pubs
          );

          this.setState({
            isLoading: false,
            platPubs: newPlatsPubs,
            allPlats: listPlatsRestaurant
          });
        }
      });
    });
  };

  handleFirstConnectivityChange = isConnected => {
    this.setState({
      isConnected: isConnected
    });

    if (this.state.isConnected) this.loadData();

    NetInfo.isConnected.removeEventListener(
      "connectionChange",
      this.handleFirstConnectivityChange
    );
  };

  netConnection = () =>
    !this.state.isConnected ? (
      <View style={styles.offlineContainer}>
        <Text style={styles.offlineText}>
          Veuillez activer la connexion Internet
        </Text>
      </View>
    ) : null;

  showPlats = () =>
    this.state.platPubs.map((item, i) => (
      <Block
        key={"Plat_${i}"}
        item={item}
        restaurant={this.state.restaurant}
        pubOne={this.state.pubs[0]}
        pubTwo={this.state.pubs[1]}
        onPress={this.handlePresPlat}
      />
    ));

  handlePresPlat = (plat, restaurant, pub1, pub2) => {
    handlePlat(this, plat, restaurant, pub1, pub2);
  };

  updateCategoryHandler = value => {
    this.setState({
      isLoading: true,
      categorySelected: value,
      articles: []
    });

    let newPlats = platsByCategory(this.state.allPlats, value);
    let newPlatsPubs = this.gridTwoColumnsPlatPub(newPlats, this.state.pubs);

    this.setState({
      platPubs: newPlatsPubs,
      isLoading: false
    });
  };

  updateNavBar = () => {
    const options = {
      topBar: {
        title: {
          text: this.state.restaurant.name
        },
        rightButtons: [
          {
            id: "Panier",
            icon: navRightButtonPanier(this.props.isPanierAllowed)
          }
        ]
      }
    };

    Navigation.mergeOptions(this.props.componentId, options);
  };

  render() {
    this.updateNavBar();
    return (
      <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
          <HorizontalScroll
            categories={this.state.categories}
            categorySelected={this.state.categorySelected}
            updateCategoryHandler={this.updateCategoryHandler}
          />

          {/* {this.netConnection()} */}
          {/* {this.loadingImage()} */}

          <View style={styles.menuContainer}>
            <View style={{ flex: 1 }}>{this.showPlats()}</View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: "#f6f7f8",
    position: "relative"
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f6f7f8",
    position: "relative"
    //backgroundColor:'#eeefef'
    //marginTop: 5,
  },
  isLoading: {
    flex: 1,
    alignItems: "center",
    marginTop: 50
  },
  menuContainer: {
    padding: 10,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    position: "relative"
  },

  offlineContainer: {
    backgroundColor: "#b52424",
    //backgroundColor: '#d68432',
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
    position: "absolute",
    top: 0,
    marginBottom: 10
  },
  offlineText: {
    color: "#fff"
  }
});

function mapStateToProps(state) {
  return {
    Plats: state.plats,
    Pubs: state.pubs,
    Category: state.Category
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getPlats, getPubs, getCategories }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Menu);
