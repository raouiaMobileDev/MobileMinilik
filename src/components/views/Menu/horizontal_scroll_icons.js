import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableHighlight
} from "react-native";
//import Icon from 'react-native-vector-icons/FontAwesome';

class HorizontalScrollIcons extends Component {
  colorStyle = function(item) {
    if (this.props.categorySelected !== item) {
      return {
        backgroundColor: "#c1c1c1"
      };
    }
    return {
      backgroundColor: "#d68432"
    };
  };

  generateIcon = categories =>
    categories
      ? categories.map(item => (
          <View style={{ marginRight: 15 }} key={item}>
            <TouchableHighlight
              style={[styles.submit, this.colorStyle(item)]}
              onPress={() => this.props.updateCategoryHandler(item)}
              underlayColor="#fff"
            >
              <Text
                style={{
                  color: "#fff",
                  fontSize: 16,
                  marginRight: 5,
                  marginLeft: 5
                }}
              >
                {item}
              </Text>
            </TouchableHighlight>
          </View>
        ))
      : null;

  render() {
    return (
      <ScrollView
        horizontal={true}
        decelerationRate={0}
        snapToInterval={220}
        showsHorizontalScrollIndicator={false}
      >
        <View style={[styles.scrollContainer]}>
          {this.generateIcon(this.props.categories)}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    paddingTop: 7
  },
  shadow: {
    borderWidth: 1,
    borderRadius: 2,
    borderColor: "#ddd",
    borderBottomWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1
  },
  submit: {
    marginTop: 5,
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#fff",
    paddingLeft: 5,
    paddingRight: 5
  },
  submitText: {
    color: "#fff",
    textAlign: "center"
  }
});

export default HorizontalScrollIcons;
