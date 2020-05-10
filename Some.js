import React, { Component } from "react";

import {
  AppRegistry,
  StyleSheet,
  View,
  Platform,
  Picker,
  ActivityIndicator,
  Button,
  Alert,
} from "react-native";

export default class Project extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,

      PickerValueHolder: "",
    };
  }

  componentDidMount() {
    return fetch("https://reactnativecode.000webhostapp.com/FruitsList.php")
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState(
          {
            isLoading: false,
            dataSource: responseJson,
          },
          function () {
            // In this block you can do something with new state.
          }
        );
      })
      .catch((error) => {
        console.error(error);
      });
  }

  GetPickerSelectedItemValue = () => {
    Alert.alert(this.state.PickerValueHolder);
  };

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, paddingTop: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <View style={styles.MainContainer}>
        <Picker
          selectedValue={this.state.PickerValueHolder}
          onValueChange={(itemValue, itemIndex) =>
            this.setState({ PickerValueHolder: itemValue })
          }
        >
          {this.state.dataSource.map((item, key) => (
            <Picker.Item
              label={item.fruit_name}
              value={item.fruit_name}
              key={key}
            />
          ))}
        </Picker>

        <Button
          title="Click Here To Get Picker Selected Item Value"
          onPress={this.GetPickerSelectedItemValue}
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
  },
});

import React, { Component } from "react";
import {
  Container,
  Header,
  Content,
  Icon,
  Picker,
  Form,
  Text,
  View,
} from "native-base";

export default class PickerWithIcon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: "key1",
      data: [],
      isLoading: true,
    };
  }

  componentDidMount() {
    fetch("https://api.covid19india.org/data.json")
      .then((response) => response.json())
      .then((json) => {
        this.setState({ data: json.cases_time_series });
      })
      .catch((error) => console.error(error))
      .finally(() => {
        this.setState({ isLoading: false });
      });
  }

  onValueChange(value) {
    this.setState({
      selected: value,
    });
  }
  render() {
    return (
      <Container>
        <Header />
        <Content>
          <Form>
            <Picker
              mode="dropdown"
              iosHeader="Select your SIM"
              iosIcon={<Icon name="arrow-down" />}
              style={{ width: undefined }}
              selectedValue={this.state.selected}
              onValueChange={this.onValueChange.bind(this)}
            >
              <Picker.Item label="Select" value="select" />
              {this.state.data.map((item, key) => (
                <Picker.Item
                  label={`${item.date}`}
                  value={`Daily Confirmed:   ${item.dailyconfirmed} \n Daily Deceased: ${item.dailydeceased} \n Daily Recovered: ${item.dailyrecovered} \n Total Confirmed: ${item.totalconfirmed} \n Total Deceased: ${item.totaldeceased} \n Total Recovered: ${item.totalrecovered} `}
                  key={key.state}
                  itemValue={item.statecode}
                  style={{ height: 70 }}
                />
              ))}
            </Picker>
          </Form>
          <Text> {this.state.selected}</Text>
        </Content>
      </Container>
    );
  }
}

{
  (this.state.selectectedItems || []).map((item, index) => {
    return (
      <View>
        <Text key={index}>
          {item.label} {item.value}
        </Text>
      </View>
    );
  });
}
