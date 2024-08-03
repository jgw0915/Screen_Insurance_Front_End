import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { LoginStackNavigator } from './src/Navigator/stack/StackNavigator';

const App = () =>{
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
        <LoginStackNavigator />
    </GestureHandlerRootView>
  );
}

export default App