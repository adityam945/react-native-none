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
import { Card, CardItem } from "native-base";
export default class PickerWithIcon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: "",
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
      <Container style={{ paddingTop: 50 }}>
        <Content>
          <Form>
            <Picker
              mode="dropdown"
              iosHeader="Select your SIM"
              iosIcon={<Icon name="arrow-down" />}
              style={{ width: undefined }}
              selectedValue={this.state.selected}
              onValueChange={this.onValueChange.bind(this)}
              style={{ height: 40 }}
            >
              <Picker.Item label="Pick a Date" value="select" />
              {this.state.data.map((item, key) => (
                <Picker.Item
                  label={`${item.date}`}
                  value={`Daily Confirmed:   ${item.dailyconfirmed} \n Daily Deceased:  ${item.dailydeceased} \n Daily Recovered:  ${item.dailyrecovered} \n Total Confirmed:  ${item.totalconfirmed} \n Total Deceased:  ${item.totaldeceased} \n Total Recovered:  ${item.totalrecovered} `}
                />
              ))}
            </Picker>
          </Form>
          <Text style={{ fontSize: 15 }}>Records: </Text>
          <Card
            style={{
              height: 180,
              marginTop: 20,
              maxWidth: "90%",
              alignItems: "center",
              justifyContent: "center",
              marginLeft: 15,
              backgroundColor: "teal",
            }}
          >
            <CardItem style={{ backgroundColor: "teal" }}>
              <Text style={{ fontSize: 18 }}> {this.state.selected}</Text>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}
