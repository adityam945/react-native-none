import React, { Component } from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  View,
  Picker,
  Button,
  Alert,
} from "react-native";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      isLoading: true,
      active: "",
    };
  }

  componentDidMount() {
    fetch("https://api.covid19india.org/data.json")
      .then((response) => response.json())
      .then((json) => {
        this.setState({ data: json.statewise });
      })
      .catch((error) => console.error(error))
      .finally(() => {
        this.setState({ isLoading: false });
      });
  }

  state = {
    PickerValueHolder: { state: "Total", statecode: "TT" },
  };

  GetPickerSelectedItemValue = (event) => {
    PickerValueHolder: event.target.PickerValueHolder;
  };

  labelItem = () => {
    this.labelItem = {};
  };

  render() {
    const { data, isLoading } = this.state;

    return (
      <View style={{ flex: 1, padding: 24 }}>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <View>
            <Picker
              selectedValue={this.state.PickerValueHolder}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({
                  PickerValueHolder: itemValue,
                  active: itemValue,
                })
              }
            >
              <Picker.item label="select" value="select" key="key" />
              {this.state.data.map((item, key) => (
                <Picker.Item
                  label={item.state}
                  value={item.state}
                  key={key.state}
                  itemValue={item.statecode}
                />
              ))}
            </Picker>
            <Button
              title="Click Here To Get Picker Selected Item Value"
              onPress={this.GetPickerSelectedItemValue}
            />
            <Text> {"Index =" + this.state.active}</Text>
          </View>
        )}
      </View>
    );
  }
}
