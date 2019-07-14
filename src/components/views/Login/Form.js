import React, { Component } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import Input from "./Input";
import ValidationRules from "../../utils/forms/validationRules";
import { handlePressRestaurant } from "../../utils/navigator/navigator";
import { connect } from "react-redux";
import { signUp, signIn } from "../../store/actions/user_actions";
import { bindActionCreators } from "redux";
import { setTokens } from "../../utils/misc";

class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      type: "Se connecter",
      action: "Se connecter",
      actionMode: "Enregistrer",
      hasErrors: false,
      form: {
        email: {
          value: "",
          valid: false,
          type: "textinput",
          rules: {
            isRequired: true,
            isEmail: true
          }
        },
        password: {
          value: "",
          valid: false,
          type: "textinput",
          rules: {
            isRequired: true
          }
        },
        confirmPassword: {
          value: "",
          valid: false,
          type: "textinput",
          rules: {
            confirmPass: "password"
          }
        }
      }
    };
  }

  updateInput = (name, value) => {
    this.setState({
      hasErrors: false
    });

    let formCopy = this.state.form;
    formCopy[name].value = value;

    let rules = formCopy[name].rules;
    let valid = ValidationRules(value, rules, formCopy);

    formCopy[name].valid = valid;

    this.setState({
      form: formCopy
    });
  };

  changeFormType = () => {
    const type = this.state.type;
    this.setState({
      type: type === "Se connecter" ? "Enregistrer" : "Se connecter",
      action: type === "Se connecter" ? "Enregistrer" : "Se connecter",
      actionMode: type === "Se connecter" ? "Se connecter" : "Enregistrer"
    });
  };

  confirmPassword = () =>
    this.state.type != "Se connecter" ? (
      <Input
        placeholder="Mot de passe (6 caractères)"
        type={this.state.form.confirmPassword.type}
        value={this.state.form.confirmPassword.value}
        onChangeText={value => this.updateInput("confirmPassword", value)}
        secureTextEntry
      />
    ) : null;

  manageAccess = () => {
    if (!this.props.User.userData.uid) {
      this.setState({ hasErrors: true });
    } else {
      setTokens(this.props.User.userData, () => {
        this.setState({ hasErrors: false });
        handlePressRestaurant(true);
      });
    }
  };

  goRestaurant = async () => {
    handlePressRestaurant(false);
  };

  submitUser = () => {
    let isFormValid = true;
    let formToSubmit = {};
    const formCopy = this.state.form;

    for (let key in formCopy) {
      if (this.state.type === "Se connecter") {
        if (key !== "confirmPassword") {
          isFormValid = isFormValid && formCopy[key].valid;
          formToSubmit[key] = formCopy[key].value;
        }
      } else {
        isFormValid = isFormValid && formCopy[key].valid;
        formToSubmit[key] = formCopy[key].value;
      }
    }

    if (isFormValid) {
      if (this.state.type === "Se connecter") {
        this.props.signIn(formToSubmit).then(() => {
          this.manageAccess();
        });
      } else {
        this.props.signUp(formToSubmit).then(() => {
          this.manageAccess();
        });
      }
    } else {
      this.setState({
        hasErrors: true
      });
    }
  };

  formHasErrors = () =>
    this.state.hasErrors ? (
      <View style={styles.errorContainer}>
        <Text style={styles.errorLabel}>Email non validé</Text>
      </View>
    ) : null;

  render() {
    return (
      <View style={styles.formInputContainer}>
        <Input
          placeholder="Adresse email"
          type={this.state.form.email.type}
          value={this.state.form.email.value}
          onChangeText={value => this.updateInput("email", value)}
          autoCapitalize={"none"}
          keyboardType={"email-address"}
        />

        <Input
          placeholder="Mot de passe (6 caractères)"
          type={this.state.form.password.type}
          value={this.state.form.password.value}
          onChangeText={value => this.updateInput("password", value)}
          secureTextEntry
        />

        {this.confirmPassword()}
        {this.formHasErrors()}

        <View
          style={
            this.props.platform === "android"
              ? styles.buttonStyleAndroid
              : styles.buttonStyleIos
          }
        >
          <Button
            title={this.state.action}
            color="#fd9727"
            onPress={this.submitUser}
          />
        </View>

        <View style={styles.ouView}>
          <Text> Ou </Text>
        </View>

        <View
          style={
            this.props.platform === "android"
              ? styles.buttonStyleAndroid
              : styles.buttonStyleIos
          }
        >
          <Button
            title={this.state.actionMode}
            color="lightgrey"
            onPress={this.changeFormType}
          />
        </View>

        <View>
          <Button
            title="Découvrir"
            color="lightgrey"
            onPress={this.goRestaurant}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  formInputContainer: {
    minHeight: 400
  },
  buttonStyleAndroid: {
    marginBottom: 10,
    marginTop: 10
  },
  buttonStyleIos: {
    marginBottom: 0
  },
  errorContainer: {
    marginBottom: 20,
    marginTop: 10
  },
  errorLabel: {
    color: "red",
    fontFamily: "Roboto-Black"
  },
  ouView: {
    alignItems: "center",
    justifyContent: "center"
  }
});

function mapStateToProps(state) {
  return {
    User: state.User
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ signUp, signIn }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form);
