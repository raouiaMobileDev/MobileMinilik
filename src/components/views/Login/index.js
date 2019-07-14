import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import Form from "./Form";
import { getPlatform } from "../../utils/misc";

class Login extends Component {
  static get options() {
    return {
      topBar: {
        title: {
          text: "Connexion",
          fontSize: 14,
          alignment: "center"
        }
      }
    };
  }

  constructor(props) {
    super(props);

    this.state = {
      platform: getPlatform()
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.forum}>
          <Form platform={this.state.platform} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff"
  },
  forum: {
    flex: 1,
    marginTop: 20,
    flexDirection: "column",
    width: 250
  },
  itemImage: {
    width: "100%",
    height: 200
  }
});

export default Login;
