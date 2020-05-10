import React, { Component } from "react";

import {
  AppRegistry,
  StyleSheet,
  FlatList,
  Text,
  View,
  Alert,
  Platform,
  Modal,
  ScrollView,
} from "react-native";

export default class Project extends Component {
  constructor(props) {
    super(props);
    //setting default state
    this.state = { isLoading: true, search: "" };
    this.arrayholder = [];
    openModal: false;
  }
  componentDidMount() {
    return fetch("https://api.covid19india.org/states_daily.json")
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState(
          {
            isLoading: false,
            dataSource: responseJson.states_daily,
          },
          function () {
            this.arrayholder = responseJson.states_daily;
          }
        );
      })
      .catch((error) => {
        console.error(error);
      });
  }

  search = (text) => {
    console.log(text);
  };
  clear = () => {
    this.search.clear();
  };

  SearchFilterFunction(text) {
    //passing the inserted text in textinput
    const newData = this.arrayholder.filter(function (item) {
      //applying filter for the inserted text in search bar
      const itemData = item.date ? item.date.toUpperCase() : "".toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });

    this.setState({
      //setting the filtered newData on datasource
      //After setting the data it will automatically re-render the view
      dataSource: newData,
      search: text,
    });
  }

  ListViewItemSeparator = () => {
    //Item sparator view
    return (
      <View
        style={{
          width: "70%",
          backgroundColor: "#080808",
        }}
      />
    );
  };

  GetGridViewItem(item) {
    Alert.alert(item);
  }

  modalView(item) {
    <Modal animationType="slide" transparent={false}>
      <Text>{item} </Text>
    </Modal>;
  }

  render() {
    return (
      <View style={styles.MainContainer}>
        <FlatList
          data={this.state.dataSource}
          renderItem={({ item }) => (
            <View style={styles.GridViewBlockStyle}>
              <View>
                <Text
                  style={styles.GridViewInsideTextItemStyle}
                  onPress={this.GetGridViewItem.bind(this, `${item.date}`)}
                >
                  Date:{"         "} {item.date}
                </Text>
                <Text style={styles.GridViewInsideTextItemStyle}>
                  {item.status}{" "}
                </Text>
              </View>
              <ScrollView>
                <Text>state:{item.an}</Text>
                <Text>state:{item.an}</Text>
                <Text>state:{item.an}</Text>
                <Text>state:{item.an}</Text>
                <Text>state:{item.an}</Text>
                <Text>state:{item.an}</Text>
                <Text>state:{item.an}</Text>
                <Text>state:{item.an}</Text>
                <Text>state:{item.an}</Text>
                <Text>state:{item.an}</Text>
              </ScrollView>
            </View>
          )}
          numColumns={1}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    justifyContent: "center",
    flex: 1,
    margin: 10,
    paddingTop: Platform.OS === "ios" ? 20 : 0,
  },

  GridViewBlockStyle: {
    justifyContent: "center",
    flex: 1,
    alignItems: "center",
    height: 200,
    margin: 5,
    backgroundColor: "#00BCD4",
  },
  GridViewInsideTextItemStyle: {
    color: "#fff",
    padding: 10,
    fontSize: 15,
    justifyContent: "center",
  },
});

AppRegistry.registerComponent("Project", () => Project);
