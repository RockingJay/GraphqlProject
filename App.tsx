import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {ApolloProvider, ApolloClient, InMemoryCache} from '@apollo/client';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

// Import your Navigation file
import Navigation from './src/navigation/Navigation'; // adjust path if needed
import awsconfig from './src/api-client/aws/aws-exports';

// Setup Apollo Client
const client = new ApolloClient({
  uri: awsconfig.aws_appsync_graphqlEndpoint,
  headers: {
    'x-api-key': awsconfig.aws_appsync_apiKey,
  },
  cache: new InMemoryCache(),
});

export default function App() {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <ApolloProvider client={client}>
        <SafeAreaProvider>
          <NavigationContainer>
            <Navigation />
          </NavigationContainer>
        </SafeAreaProvider>
      </ApolloProvider>
    </GestureHandlerRootView>
  );
}
