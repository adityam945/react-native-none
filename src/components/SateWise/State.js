import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Platform,
  TextInput,
} from "react-native";
import { SearchBar } from "react-native-elements";
import { Container, Card, CardItem } from "native-base";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    //setting default state
    this.state = { isLoading: true, search: "" };
    this.arrayholder = [];
  }
  componentDidMount() {
    return fetch("https://api.covid19india.org/data.json")
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState(
          {
            isLoading: false,
            dataSource: responseJson.statewise,
          },
          function () {
            this.arrayholder = responseJson.statewise;
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
      const itemData = item.state ? item.state.toUpperCase() : "".toUpperCase();
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

  render() {
    if (this.state.isLoading) {
      //Loading View while data is loading
      return (
        <View style={{ flex: 1, paddingTop: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }
    return (
      //ListView to show with textinput used as search bar
      <View style={styles.viewStyle}>
        <TextInput
          style={styles.textInputStyle}
          onChangeText={(text) => this.SearchFilterFunction(text)}
          value={this.state.text}
          underlineColorAndroid="transparent"
          placeholder="Search Here"
        />
        <FlatList
          data={this.state.dataSource}
          ItemSeparatorComponent={this.ListViewItemSeparator}
          //Item Separator View
          renderItem={({ item }) => (
            <View
              style={{
                width: "100%",
                alignItems: "center",
                marginLeft: 5,
              }}
            >
              <Card style={{ marginTop: 15 }}>
                <CardItem header style={styles.cardHeaderStyle}>
                  <Text style={{ fontSize: 25, fontWeight: "bold" }}>
                    {item.state} ({item.statecode})
                  </Text>
                </CardItem>
                <CardItem
                  style={{
                    flexDirection: "column",
                  }}
                >
                  <Card style={styles.cardItemStyle}>
                    <Text style={styles.textStyle}>Active:{item.active}</Text>
                  </Card>
                  <Card style={styles.cardItemStyle}>
                    <Text style={styles.textStyle}>
                      Confirmed:{item.confirmed}
                    </Text>
                  </Card>
                  <Card style={styles.cardItemStyle}>
                    <Text style={styles.textStyle}>Deaths:{item.active}</Text>
                  </Card>
                </CardItem>
                <CardItem style={styles.cardFooterStyle}>
                  <Text style={{ fontSize: 15 }}>
                    Last Upadated:{item.lastupdatedtime}
                  </Text>
                </CardItem>
              </Card>
            </View>
          )}
          enableEmptySections={true}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewStyle: {
    justifyContent: "center",
    flex: 1,
    backgroundColor: "white",
    marginTop: Platform.OS == "ios" ? 30 : 0,
    paddingTop: 50,
  },
  textStyle: {
    padding: 10,
  },
  cardHeaderStyle: {
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 5,
  },
  cardItemStyle: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  cardFooterStyle: {
    alignItems: "center",
    justifyContent: "center",
  },
  textStyle: {
    fontSize: 18,
  },
  textInputStyle: {
    height: 40,
    borderWidth: 1,
    paddingLeft: 10,
    borderColor: "#009688",
    backgroundColor: "#FFFFFF",
    margin: 10,
  },
});
