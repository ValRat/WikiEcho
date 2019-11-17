/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TextInput,
  Button,
  Alert,
  ActivityIndicator,
  FlatList,
  Linking
} from 'react-native';

class WikiFetch extends Component {
  constructor(props: any) {
    super(props);
    this.state = {isLoading: true}
  }

  componentDidMount() {
    const getData = async () => {
      let wikiBaseApiUrl = 'https://en.wikipedia.org/w/api.php'

      let params = {
        action: 'parse',
        page: 'Vancouver Public Library',
        format: 'json'
      };
      let requestUrl = wikiBaseApiUrl + '?origin=*'
      Object.keys(params).forEach((key) => {requestUrl += '&'+key+'='+params[key];});
      let output = await fetch(requestUrl);
      let outputJson = await output.json();
      this.setState({
        isLoading: false,
        dataSource: outputJson.parse.langlinks
      })

    }
    getData();
  }

  async handleClick(url: string) {
    let canOpen = await Linking.canOpenURL(url);
    if (canOpen) {
      Linking.openURL(url);
    } else {
      console.log('Cannot open: ' + url);
    }
  }

  render() {
    if (this.state.isLoading) {
      return(
        <View style={{flex: 1, justifyContent: 'center', padding:20}}>
          <ActivityIndicator size='large' color='#b2cefe'/>
        </View>
      )
    }

            // item.url
            // item.langname
            // item['*']
    return (
      <>
        <View style={{flex:1, paddingTop:20}}>
        <FlatList
          data={this.state.dataSource}
          renderItem={({item}) => (
            <>
              <Button title={item.langname} onPress={() => this.handleClick(item.url)}></Button>
              <View>
                <Text style={{fontSize:20, padding: 5}}>{item['*']}</Text>
              </View>
              <View>
                <Text style={{fontFamily:'monospace'}}>
                  {decodeURIComponent(item.url)}
                </Text>
              </View>
            </>
          )}
          keyExtractor={({lang}, index) => lang}
        />
        </View>
      </>
    )
  }

}


const App = () => {
  const usingHermes = typeof HermesInternal === 'object' && HermesInternal !== null;

  return (
    <>
     <WikiFetch />
    </>
  );
};

const styles = StyleSheet.create({
  helloWorld : {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
});

export default App;
