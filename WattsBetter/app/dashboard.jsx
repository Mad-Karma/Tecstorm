import { View, Text, StyleSheet, ImageBackground, Image, Dimensions, TextInput, TouchableOpacity } from 'react-native';

import { Link } from 'expo-router'

import solarPanels from "@/assets/images/solar-panels.jpg"
import switchIcon from "@/assets/images/icon-switch.png"
import profileIcon from "@/assets/images/icon-profile.png"
import compareIcon from "@/assets/images/icon-compare.png"
import walletIcon from "@/assets/images/icon-wallet.png"

const { width, height } = Dimensions.get('window');

const calculateFontSize = (percentage) => {
  return (width * percentage) / 100;
};


export default function TabTwoScreen() {
  return (
    <View style={styles.container}>

      {/* Welcome card */}
      <ImageBackground source={solarPanels} style={styles.welcome_card}>
        <Text style={styles.welcome_text}>Olá, João</Text>

        <View style={styles.saved_container_1}>
          <View style={styles.saved_container_2}>
            <Text style={styles.saved_text}>Este mês poupou</Text>
            <Text style={styles.last_change_text}>A última mudança de contrato {'\n'} foi à <Text style={styles.last_change_days}>10</Text> dias</Text>
          </View>
          <Text style={styles.saved_ammount}>35,5€ <Text style={styles.saved_ammount_arrow}>></Text></Text>
        </View>
      </ImageBackground>

      {/* Shortcuts card */}
      <View style={styles.shortcuts_card}>
        <Text style={styles.shortcuts_title}>Acessos rápidos</Text>

        <View style={styles.shortcuts_container}>
          <View style={styles.shortcut}>
            <View style={styles.shortcuts_image_container}>
              <Image source={compareIcon} style={styles.shortcuts_image}></Image>
            </View>
            <Text style={styles.shortcuts_name}>Simular{'\n'}Preços</Text>
          </View>
        
          <View style={styles.shortcut}>
            <View style={styles.shortcuts_image_container}>
              <Image source={switchIcon} style={styles.shortcuts_image}></Image>
            </View>
            <Text style={styles.shortcuts_name}>Gestor{'\n'}Contratos</Text>
          </View>

          <View style={styles.shortcut}>
            <View style={styles.shortcuts_image_container}>
              <Image source={walletIcon} style={styles.shortcuts_image}></Image>
            </View>
            <Text style={styles.shortcuts_name}>Carteira</Text>
          </View>

          <View style={styles.shortcut}>
            <View style={styles.shortcuts_image_container}>
              <Image source={profileIcon} style={styles.shortcuts_image}></Image>
            </View>
            <Text style={styles.shortcuts_name}>Perfil</Text>
          </View>
        </View>
      </View>

      {/* Contract card */}
      <View style={styles.contracts_card}>
        <Text style={styles.contracts_title}>O seu contrato atual</Text>

        <View>
          <View>
            <View>
              <Image></Image>
              <View>
                <Text>Galp</Text>
                <View>
                  <Image></Image>
                  <Text>Eletricidade</Text>
                </View>
              </View>
            </View>

            <Text>65,34€</Text>
          </View>

          <Text>Ciclo</Text>
          <Text>Potência</Text>
        </View>

        <Link href="/login">
          <Text style={styles.contracts_ver}>Ver</Text>
        </Link>
      </View>

      {/* Investments + Contracts card */}
      <View style={styles.inv_proj_card}>

        {/* Investments card */}
        <View>
          <Text style={styles.investments_title}>Ações:</Text>
        </View>

        {/* Projects card */}
        <View>
          <Text style={styles.projects_title}>Projetos:</Text>
        </View>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#edebeb',
  },

  // ---- Welcome card ---

  welcome_card: {
    flexDirection: 'column',
    flex: 0.25,
    width: '100%',
    borderRadius: 15,
    overflow: 'hidden',
  },

  welcome_text: {
    color: 'white',
    marginTop: '10%',
    marginBottom: '2%',
    marginLeft: '5%',
    fontSize: calculateFontSize(8),
    fontWeight: 'bold',
  },

  saved_container_1: {
    marginLeft: '4%',
    flexDirection: 'row',
  },

  saved_container_2: {
    paddingLeft: '2%',
    paddingTop: '3%',
    paddingBottom: '3%',
    flexDirection: 'column',
    backgroundColor: 'rgba(59, 61, 60, 0.6)',
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
  },

  saved_text: {
    color: 'white',
    fontSize: calculateFontSize(5.5),
    fontWeight: 'bold',
  },

  saved_ammount: {
    paddingLeft: '6%',
    paddingRight: '2%',
    paddingTop: '4%',
    color: 'white',
    fontSize: calculateFontSize(9),
    fontWeight: 'bold',
    backgroundColor: 'rgba(59, 61, 60, 0.6)',
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
  },

  saved_ammount_arrow: {
    color: '#FF7F3E',
    fontWeight: 350,
  },

  last_change_text: {
    marginTop: '2%',
    color: 'white',
    fontSize: calculateFontSize(3.7),
    fontWeight: 500,
  },

  last_change_days: {
    color: 'white',
    fontSize: calculateFontSize(4),
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },

  // ---- Shortcuts card  ---

  shortcuts_card: {
    flexDirection: 'column',
    flex: 0.15,
    marginTop: '2.5%',
    marginLeft: '2.5%',
    marginRight: '2.5%',
  },

  shortcuts_title: {
    marginLeft: '2.5%',
    color: '#FF7F3E',
    fontSize: calculateFontSize(5),
    fontWeight: 'bold',
  },

  shortcuts_container: {
    marginTop: '2%',
    width: '100%',
    flexDirection: 'row',
  },

  shortcut: {
    width: '20%',
    marginLeft: '2.5%',
    marginRight: '2.5%',
    alignItems: 'center',
  },

  shortcuts_image_container: {
    height: '60%',
    width: '90%',
    borderRadius: 100,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },

  shortcuts_image: {
    width: '60%',
    height: '60%',
    resizeMode: 'contain',
  },

  shortcuts_name: {
    marginTop: '5%',
    textAlign: 'center',
    fontWeight: 'bold',
  },

  // ---- Contract card  ---

  contracts_card: {
    flexDirection: 'column',
    flex: 0.25,
    width: '100%',
    marginTop: '10%',
    marginLeft: '5%',
    backgroundColor: 'red',
  },

  contracts_title: {
    color: '#FF7F3E',
    fontSize: calculateFontSize(5),
    fontWeight: 'bold',
  },

  // ---- Investments + Projects card  ---

  inv_proj_card: {
    flexDirection: 'row',
    flex: 0.35,
    width: '100%',
    marginTop: '',
    marginLeft: '5%',
    backgroundColor: 'yellow',
  },

  investments_title: {
    color: '#FF7F3E',
    fontSize: calculateFontSize(5),
    fontWeight: 'bold',
  },

  projects_title: {
    color: '#FF7F3E',
    fontSize: calculateFontSize(5),
    fontWeight: 'bold',
  },
});
