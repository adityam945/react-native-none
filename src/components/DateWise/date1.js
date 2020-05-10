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
            dataSource: responseJson.cases_time_series,
          },
          function () {
            this.arrayholder = responseJson.cases_time_series;
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
        <View style={{ paddingRight: 5, paddingLeft: 5 }}>
          <TextInput
            style={styles.textInputStyle}
            onChangeText={(text) => this.SearchFilterFunction(text)}
            value={this.state.text}
            underlineColorAndroid="transparent"
            placeholder="Search Here"
          />
        </View>
        <Text>Search Format: Date Month</Text>
        <FlatList
          data={this.state.dataSource}
          ItemSeparatorComponent={this.ListViewItemSeparator}
          //Item Separator View
          renderItem={({ item }) => (
            <View
              style={{
                width: "90%",
                marginLeft: 10,
                flex: 1,
              }}
            >
              <Card style={{ marginTop: 15 }}>
                <CardItem header style={styles.cardHeaderStyle}>
                  <Text style={{ fontSize: 25, fontWeight: "bold" }}>
                    {item.date}
                  </Text>
                </CardItem>
                <CardItem
                  style={{
                    flexDirection: "column",
                  }}
                >
                  <Card style={styles.cardItemStyle}>
                    <Text style={{ fontSize: 22, fontWeight: "bold" }}>
                      Daily Reports
                    </Text>
                    <Text style={styles.textStyle}>
                      Confirmed:{item.dailyconfirmed}
                    </Text>
                    <Text style={styles.textStyle}>
                      Deceased:{item.dailydeceased}
                    </Text>
                    <Text style={styles.textStyle}>
                      Recovered:{item.dailyrecovered}
                    </Text>
                  </Card>
                </CardItem>
                <CardItem
                  style={{
                    flexDirection: "column",
                  }}
                >
                  <Card style={styles.cardItemStyle}>
                    <Text style={{ fontSize: 22, fontWeight: "bold" }}>
                      Total Reports
                    </Text>
                    <Text style={styles.textStyle}>
                      Confirmed:{item.totalconfirmed}
                    </Text>
                    <Text style={styles.textStyle}>
                      Deceased:{item.totaldeceased}
                    </Text>
                    <Text style={styles.textStyle}>
                      Recovered:{item.totalrecovered}
                    </Text>
                  </Card>
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
    width: "90%",
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
  },
});
