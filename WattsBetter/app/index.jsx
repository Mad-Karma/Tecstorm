import { View, Text, StyleSheet, ImageBackground, Image, Dimensions, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { Link } from 'expo-router'

import iconBrancoSF from "@/assets/images/icon-branco (sem fundo + sem nome).png"
import fundoGradiente from "@/assets/images/fundo-gradiente.png"

const { width, height } = Dimensions.get('window');

const calculateFontSize = (percentage) => {
  return (width * percentage) / 100;
};

const app = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log('Username:', username);
    console.log('Password:', password);
  };

  return (
    <View style={styles.container}>
      
      <ImageBackground source={fundoGradiente} style={styles.container_top}>

        <Image source={iconBrancoSF} style={styles.img_icon} />
          <Text style={styles.text}>Bem vindo! {'\n'} Aceda à sua conta</Text>

        <View style={styles.container_floating}>

          <TextInput 
            style={styles.input} 
            marginTop='10%'
            placeholder='Nome de Utilizador'
            placeholderTextColor="#888"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
          />

          <TextInput 
            style={styles.input} 
            marginTop='6%'
            placeholder='Palavra-passe'
            placeholderTextColor='#888'
            value={password}
            onChangeText={setPassword}
            autoCapitalize="none"
            secureTextEntry={true}
          />

          <Text
            marginTop='2%'
            alignSelf='left'
            marginLeft='10%'
            style={styles.forgot_password}
          >
            Esqueceu a palavra-passe?
          </Text>

          <Link href="/dashboard" asChild>
            <TouchableOpacity style={styles.login_button} onPress={handleLogin}>
              <Text style={styles.login_text}>Log In</Text>
            </TouchableOpacity>
          </Link>

          <View style={styles.container_sign_up}>
            <Text style={styles.text_no_account}>Não tem uma conta?</Text>
            <Link href="/dashboard">
              <Text style={styles.sign_up}>  Registe-se</Text>
              </Link>
          </View>

        </View>

      </ImageBackground>

      <View style={styles.container_bottom} />
    
    </View>
  )
}

export default app

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },

  container_top: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    overflow: 'visible',
  },

  container_bottom: {
    flex: 1,
    width: '100%',
    height: '50%',
    backgroundColor: '#ebedeb',
    zIndex: 0,
  },

  img_icon: {
    resizeMode: 'contain',
    width: '100%',
    height: '35%',
    marginTop: '18%',
  },

  text: {
    color: 'white',
    fontSize: calculateFontSize(8),
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: '-10%',
  },

  container_floating: {
    flexDirection: 'column',
    zIndex: 1,
    marginTop: '11%',
    width: '85%',
    height: '100%',
    backgroundColor: 'white',
    borderRadius: 15,
    alignItems: 'center',
  },

  input: {
    width: '85%',
    height: '12%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 10,
    fontSize: 16,
  },

  forgot_password: {
    color: '#FF7F3E',
  },

  login_button: {
    backgroundColor: '#FF7F3E',
    justifyContent: 'center',
    alignItems: 'center',
    width: '85%',
    height: '12%',
    borderRadius: 10,
    marginTop: '17%',
  },

  login_text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: calculateFontSize(4.5),
  },

  container_sign_up: {
    flexDirection: 'row',
    marginTop: '8%',
  },

  text_no_account: {
    color: '#757575',
  },

  sign_up: {
    color: '#FF7F3E',
  }

})