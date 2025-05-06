import { View, Text, StyleSheet, ImageBackground, Image, Dimensions, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { Link } from 'expo-router'

import iconBrancoSF from "@/assets/images/icon-branco (sem fundo + sem nome).png"
import fundoGradiente from "@/assets/images/fundo-gradiente.png"

import check from "@/assets/images/check.png"
import cross from "@/assets/images/cross.png"

const { width, height } = Dimensions.get('window');

const calculateFontSize = (percentage) => {
  return (width * percentage) / 100;
};

export default function AutoSwitch() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      
      <ImageBackground source={fundoGradiente} style={styles.container_top}>

        <Image source={iconBrancoSF} style={styles.img_icon} />
          <Text style={styles.text}>Auto Switch</Text>

        <View style={styles.container_floating1}>
          <View style={styles.titulo_container}>
            <Text style={styles.titulo_text}>Plano Gratuito</Text>
          </View>

          <View style={styles.line}>
            <Image source={check} style={styles.check}></Image>
            <Text>Acesso ao simulador de preços</Text>
          </View>

          <View style={styles.line}>
            <Image source={check} style={styles.check}></Image>
            <Text>Acesso à plataforma de investimento</Text>
          </View>

          <View style={styles.line}>
            <Image source={check} style={styles.check}></Image>
            <Text>Apoio ao cliente</Text>
          </View>

          <View style={styles.line}>
            <Image source={cross} style={styles.check}></Image>
            <Text>Acesso a ofertas exclusívos</Text>
          </View>

          <View style={styles.line}>
            <Image source={cross} style={styles.check}></Image>
            <Text>Aconselhamento de analistas para investimentos</Text>
          </View>

        </View>

      </ImageBackground>

      <View style={styles.container_bottom} />
    
    </View>
  );
}

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
    backgroundColor: '#F9F9F9',
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

  container_floating1: {
    flexDirection: 'column',
    zIndex: 1,
    marginTop: '11%',
    width: '85%',
    height: '70%',
    backgroundColor: 'white',
    borderRadius: 15,
    alignItems: 'center',
    elevation: 2, // sombra no Android
    shadowColor: '#000', // sombra no iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
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
  },

  check: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  
  line: {
    marginTop: 10,
    width: 300,
    flexDirection: 'row',
  },

  titulo_text: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 20,
    color: '#FF7F3E'
  }
});