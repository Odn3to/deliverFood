import {VStack, Image, Text, Box, FormControl, Input, Button, Link, useToast, Icon} from 'native-base'
import { TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react'
import * as React from 'react';

//import * as AuthSession from 'expo-auth-session';
//import * as WebBrowser from 'expo-web-browser';

import Logo from "./assets/logo2.png"

import { logarService } from '../servicos/loginServico';

import AntDesign from 'react-native-vector-icons/AntDesign';

import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';

// type AuthResponse = {
//   params: {
//     access_token: string;
//   };
//   type: string;
// }

export default function Login({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [carregando, setCarregando] = useState(true);
  const toast = useToast();

  GoogleSignin.configure({
    webClientId: '173314048003-j24c1d0ep554kekm77lmv2h9oalf5sdg.apps.googleusercontent.com',
    offlineAccess: true
  });
  
  async function logarGoogle() {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();

      console.log(userInfo)
      // userInfo.user contém as informações do usuário
    } catch (error) {
      console.error(error);
    }
  }
  
  // const [request, response, promptAsync] = AuthSession.useAuthRequest(
  
    // const discovery = AuthSession.useAutoDiscovery('https://accounts.google.com');

    // // Seu ClientId e Redirect URI
    // const clientId = '173314048003-j24c1d0ep554kekm77lmv2h9oalf5sdg.apps.googleusercontent.com';
    // const redirectUri = AuthSession.makeRedirectUri({
    //   // useProxy: true, // Isso utilizará o proxy do Expo, que é necessário para desenvolvimento local
    //   // native: 'com.googleusercontent.apps.173314048003-j24c1d0ep554kekm77lmv2h9oalf5sdg:/oauth2redirect/google', // Esquema do seu app
    //   // For usage in bare and standalone
    //   native: 'com.deliverfood.somethingelse://',
    // });
  
    // // Iniciar a solicitação de autenticação
    // const [request, response, promptAsync] = AuthSession.useAuthRequest(
    //   {
    //     clientId,
    //     scopes: ['profile', 'email'],
    //     redirectUri,
    //   },
    //   discovery
    // );
  
    // React.useEffect(() => {
    //   if (response?.type === 'success') {
    //     const { authentication } = response;
    //     console.log(authentication);
    //     // Agora você tem um token de acesso que pode usar para fazer requisições para a API do Google
    //   }
    // }, [response]);


  const logar = async() => {
    const resultado = await logarService(email, senha);
    console.log(resultado);
  }

  // const logarGoogle = async() => {
  //   try {
  //     console.log("Iniciando login Google");
  //     await promptAsync();
  //   } catch (error) {
  //     console.error(error);
  //     toast.show({
  //       description: "Erro ao tentar login com Google.",
  //     });
  //   }
  // }


  return (
    <VStack flex={1} alignItems="center" p={5} justifyContent="center" background="#EED5B7">
        <Image source={Logo} alt="Logo" w={150} h={150} mb={5}/>

        <FormControl mb={3}>
            <Input 
                placeholder="Usuário" 
                backgroundColor="white"
                borderColor="gray.400"
                borderRadius={5}
                onChangeText={(text: any) => {
                  setEmail(text)}}
                isRequired
            />
        </FormControl>

        <FormControl mb={3}>
            <Input 
                placeholder="Senha" 
                type="password"
                variant="filled"
                backgroundColor="white"
                borderColor="gray.400"
                borderRadius={5}
                onChangeText={(text: any) => {
                  setSenha(text)}}
                isRequired
            />
        </FormControl>
        <Button size="sm" colorScheme="coolGray" w={320} onPress={() => logar()}>Entrar</Button>
        <Link href='https://www.google.com' mt={2}>
            Esqueceu a sua senha?
        </Link>
        
        <Box w="100%" flexDirection="row" justifyContent="center" mt={8}>
          <Button colorScheme="coolGray" mr={2} leftIcon={<AntDesign name="google" size={18} color="white" />} onPress={() => logarGoogle()}/>
          <Button colorScheme="coolGray" leftIcon={<AntDesign name="instagram" size={18} color="white" />} onPress={() => {/* lógica de login com Instagram */}}/>
        </Box>

        <Box w="100%" flexDirection="row" justifyContent="center" mt={8}>
          <Text>Não possui uma conta?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
            <Text color="blue.500"> Faça seu cadastro</Text>
          </TouchableOpacity>
        </Box>

    </VStack>
  );
}
