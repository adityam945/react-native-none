import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  LayoutAnimation,
  Platform,
  UIManager,
} from "react-native";

import TestAccordance from "./TestAcoordanceDateWise";

import Icon from "react-native-vector-icons/MaterialIcons";
import { Container } from "native-base";

export default class Accordian extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
    };

    if (Platform.OS === "android") {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  render() {
    return (
      <Container>
        <TouchableOpacity
          ref={this.accordian}
          style={styles.row}
          onPress={() => this.toggleExpand()}
        >
          <Text style={[styles.title, styles.font]}>
            Casese Reported By days
          </Text>
          <Icon
            name={
              this.state.expanded ? "keyboard-arrow-up" : "keyboard-arrow-down"
            }
            size={30}
            color="black"
          />
        </TouchableOpacity>

        {this.state.expanded && (
          <Container style={styles.child}>
            <TestAccordance />
          </Container>
        )}
      </Container>
    );
  }

  toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({ expanded: !this.state.expanded });
  };
}

const styles = StyleSheet.create({
  title: {
    fontSize: 14,
    fontWeight: "bold",
    color: "grey",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: 56,
    paddingLeft: 25,
    paddingRight: 18,
    alignItems: "center",
    backgroundColor: "grey",
  },
  parentHr: {
    height: 1,
    color: "white",
    width: "100%",
  },
  child: {
    backgroundColor: "lightgrey",
    padding: 16,
  },
  font: {
    color: "black",
  },
});
