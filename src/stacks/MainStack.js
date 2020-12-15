import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Preload from '../screens/Preload';
import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';
import MainTab from '../stacks/MainTab';
import Perfil from '../screens/Perfil';
import Advogado from '../screens/Advogado';
import Imagens from '../screens/Imagens';
import Home from '../screens/Home';
import Appointments from '../screens/Appointments';
const Stack = createStackNavigator();

export default () => (
    <Stack.Navigator
        initialRouteName="Preload"
        screenOptions={{
            headerShown: false
        }}
    >
        <Stack.Screen name = "Preload" component={Preload} />
        <Stack.Screen name = "SignIn" component={SignIn} />
        <Stack.Screen name = "SignUp" component={SignUp} />
        <Stack.Screen name = "MainTab" component={MainTab} />
        <Stack.Screen name = "Perfil" component={Perfil} />
        <Stack.Screen name = "Advogado" component={Advogado} />
        <Stack.Screen name = "Home" component={Home} />
        <Stack.Screen name = "Imagens" component={Imagens} />
        <Stack.Screen name = "Appointments" component={Appointments} />
    </Stack.Navigator>
);

