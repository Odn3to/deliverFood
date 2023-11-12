import {Image, Box, Checkbox, ScrollView, Text, useToast, Button, Input, HStack} from 'native-base'
import Logo from './assets/logo2.png'
import React, {useEffect} from 'react'
import { secoes } from './utils/cadastroEntradas'
import { isEmail, validarCNPJ, isNumber } from '../utils/utils'

import api from "../servicos/api"

import { WarningOutlineIcon } from 'native-base';

import { useState } from 'react'
import { cadastroUser } from '../servicos/loginServico';

export default function Cadastro({ navigation }: any) {
  const [numSecao, setNumSecao] = useState(0);
  const [dados, setDados] = useState({} as any);
  const [checkBox, setCheckBox] = useState({} as any);
  const [clicou, setClicou] = useState(false);

  const toast = useToast();


  const condition1 = (dados.password !== dados.confirmeSenha) || (dados.cnpj && !validarCNPJ(dados.cnpj)) || (checkBox.tipo == '' || checkBox.tipo == null)
    || (dados.password == '' || dados.password == null);

  const condition2 = (checkBox.tipo === 'Comerciante' && (dados.cnpj == '' || dados.cnpj == null) && numSecao == 1) 
    || (checkBox.tipo === 'Comerciante' && (dados.conta == '' || dados.conta == null) && numSecao == 1) 
    || (checkBox.tipo === 'Comerciante' && (dados.agencia == '' || dados.agencia == null) && numSecao == 1)
    || (checkBox.tipo === 'Comerciante' && (dados.banco == '' || dados.banco == null) && numSecao == 1)

  const condition3 = checkBox.tipo === 'Comerciante' && numSecao == 1 && (!isNumber(dados.cep) || !isNumber(dados.numero) || !isNumber(dados.telefone) 
    || !isNumber(dados.cnpj) || !isNumber(dados.conta) || !isNumber(dados.banco) || !isNumber(dados.agencia))

  const onCadastrar = () => {
    setClicou(true)

    if(condition1 || condition2 || condition3){
      toast.show({
        title: 'Erro nos dados',
        description: 'Verifique os dados e tente novamente!',
        backgroundColor: 'red.500',
      })
      return;
    }

    if(checkBox.tipo == "Comerciante" && numSecao == 0){
      setNumSecao(numSecao + 1);
      setClicou(false)
      return;
    }
    cadastrar();
    setClicou(false);
  }
  
  const cadastrar = async() => {
    const dadosComp = {...dados, ...checkBox};

    api.post('/auth/create', dadosComp)
      .then((res) => {
        if(res){
          toast.show({
            title: 'Cadastro realizado com sucesso',
            description: 'Você já pode fazer login',
            backgroundColor: 'green.500',
          })
          navigation.replace('Login');
        }
      }).catch((err) => {
        console.error(err);
        if(err.response.data.error == "Usuário já existente!"){
          toast.show({
            title: 'Erro ao cadastrar',
            description: 'Usuário já existente!',
            backgroundColor: 'red.500',
          })
        }else if(err.response.data.error == "CNPJ já existente!"){
          toast.show({
            title: 'Erro ao cadastrar',
            description: 'CNPJ já existente!',
            backgroundColor: 'red.500',
          })
        }else{
          toast.show({
            title: 'Erro ao cadastrar',
            description: 'Verifique os dados e tente novamente',
            backgroundColor: 'red.500',
          })
        }
      }
    )
  }

  const atualizarDados = (id: string, valor: string) => {
    setDados({...dados, [id]: valor})
  }

  const atualizarCheck = (id: string, valor: string) => {
    setCheckBox({...checkBox, [id]: valor})
  }

  return (
    <ScrollView flex={1} p={5} background="#EED5B7">
      <Image source={Logo} alt="Logo" w={100} h={100} mb={5} alignSelf={'center'}/>
      <Text marginBottom={5} fontWeight={'bold'} fontSize={'lg'}>{secoes[numSecao].titulo}</Text>
      <Box>
      {
        secoes[numSecao]?.entradaTexto?.map(entrada => {
          return (
              <Box key={entrada.id}>
                  <Input 
                      placeholder={entrada.placeholder}
                      secureTextEntry={entrada.secureTextEntry}
                      variant="filled"
                      backgroundColor="white"
                      borderColor="gray.400"
                      borderRadius={5}
                      marginBottom={5}
                      onChangeText={(text: any) => {
                          atualizarDados(entrada.name, text)}
                      }
                  />
                  {clicou && entrada.name === 'email' && !isEmail(dados[entrada.name]) && dados[entrada.name] != null &&
                    <HStack space={2} alignItems="center" marginBottom={5}>
                      <WarningOutlineIcon color="red.500" size={5} />
                      <Text color="red.500" >  Erro no email informado! Formato inválido!</Text>
                    </HStack>
                  }
                  {clicou && entrada.name === 'cnpj' && dados[entrada.name] != null && !validarCNPJ(dados.cnpj) &&
                    <HStack space={2} alignItems="center" marginBottom={5}>
                      <WarningOutlineIcon color="red.500" size={5} />
                      <Text color="red.500" >  CNPJ inválido!</Text>
                    </HStack>
                  }
                   {clicou && entrada.number && !isNumber(dados[entrada.name]) && dados[entrada.name] != null &&
                    <HStack space={2} alignItems="center" marginBottom={5}>
                      <WarningOutlineIcon color="red.500" size={5} />
                      <Text color="red.500" >  {entrada.name} deve ser um número!</Text>
                    </HStack>
                  }
                  {clicou && entrada.name === 'confirmeSenha' && (dados.password != dados.confirmeSenha) && dados[entrada.name] != null &&
                    <HStack space={2} alignItems="center" marginBottom={5}>
                      <WarningOutlineIcon color="red.500" size={5} />
                      <Text color="red.500" >  Senhas Divergentes!</Text>
                    </HStack>
                  }
                  {clicou && entrada.name === 'password' && (dados.password == '' || dados.password == null) &&
                    <HStack space={2} alignItems="center" marginBottom={5}>
                      <WarningOutlineIcon color="red.500" size={5} />
                      <Text color="red.500" >  Senha é Obrigatório!</Text>
                    </HStack>
                  }
                  {clicou && checkBox.tipo === 'Comerciante' && entrada.required && (dados[entrada.name] == '' || dados[entrada.name] == null) &&
                  <HStack space={2} alignItems="center" marginBottom={5}>
                    <WarningOutlineIcon color="red.500" size={5} />
                    <Text color="red.500" >  {entrada.name} é Obrigatório!</Text>
                  </HStack>
                }
                  
              </Box>
          )
        })
      }
      </Box>
      <Box marginBottom={5}>
        {
          secoes[numSecao]?.checkbox?.map(check => {
            return (
              <Box key={check.id}>
                <Checkbox 
                  key={check.id} 
                  value={check.value}
                  onChange={(isChecked) => atualizarCheck("tipo", isChecked ? check.value : "")}
                >{check.value}
                </Checkbox>
                {clicou && check.value === 'Comerciante' && (checkBox.tipo == null || checkBox.tipo== "") &&
                <HStack space={2} alignItems="center" marginTop={5}>
                  <WarningOutlineIcon color="red.500" size={5} />
                  <Text color="red.500" >  Um tipo de usuário deve ser marcado!</Text>
                </HStack>
              }
            </Box>
            )
          })
        }
      </Box>
      <Button size="sm" colorScheme="coolGray" w={320} onPress={onCadastrar}>Cadastrar</Button>
      <Box marginTop={8}>

      </Box>

    </ScrollView>
  );
}
