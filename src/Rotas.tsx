import React from "react";
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

import Login from './Login';
import Cadastro from './Cadastro';
import LoginSocial from "./LoginSocial";

export default function Rotas(){
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
                <Stack.Screen name="LoginSocial" component={LoginSocial} options={{headerShown: false}}/>
                <Stack.Screen name="Cadastro" component={Cadastro} options={{headerShown: false}}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}