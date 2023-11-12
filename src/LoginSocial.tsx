import {VStack, Image, Text, Box, FormControl, Input, Button, Link, useToast, Icon} from 'native-base'
import * as React from 'react';

import Logo from "./assets/logo2.png"


export default function LoginSocial() {


  return (
    <VStack flex={1} alignItems="center" p={5} justifyContent="center" background="#EED5B7">
        <Image source={Logo} alt="Logo" w={150} h={150} mb={5}/>
        <Text>Login Social</Text>
    </VStack>
  );
}
