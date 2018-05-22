// @flow
import React, { Component } from 'react';
import {
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
// NOTE: react-navigation の 1.0.0-beta.19 しか呼び出せない
import { type NavigationScreenProp } from 'react-navigation/src/TypeDefinition';
import { getCoordinates } from './GeolocationService';
import CITIES from './cities.json';

type State = {
  data: *[],
}

type Props = {
  navigation: NavigationScreenProp<*>,
}

class CityListScreen extends Component<{}> {
  constructor(props: Props) {
    super(props);
    this.state = { data: CITIES };
  }

  componentDidMount() {
    getCoordinates()
      .then(({ latitude, longitude }) => {
        CITIES.unshift({
          name: '現在地',
          en: '',
          latitude,
          longitude,
        })
        this.setState({ data: CITIES });
      });
  }

  onPress(item: *) {
    const { navigation } = this.props;
    navigation.navigate('Weather', { city: item });
  }

  render() {
    return (
      <FlatList
        data={this.state.data}
        keyExtractor={item => item.en}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => this.onPress(item)}
                    style={styles.itemContainer}
            >
            <Text style={styles.text}>
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
      />
    );
  }
}

const styles = StyleSheet.create({
  itemContainer: {
    padding: 8,
    height: 48,
    justifyContent: 'center',
  },
  text: {
    fontSize: 18,
  },
});

export default CityListScreen;
