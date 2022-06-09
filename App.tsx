import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import DrawerNavigatior from './navigation/Drawer';

function App() {
    return (
      <NavigationContainer>
        <DrawerNavigatior/>
      </NavigationContainer>
    );
}

export default App;