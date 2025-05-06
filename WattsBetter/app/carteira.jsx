import React from "react";
import { Image, View, Text, StyleSheet, ScrollView, Dimensions } from "react-native";
import { BarChart, LineChart } from "react-native-chart-kit";
import { Link } from 'expo-router'

import logoEDP from "@/assets/images/edp-logo.png"
import flash from "@/assets/images/increased.png"
import solar from "@/assets/images/solar1.jpg"
import eolico from "@/assets/images/eolico1.jpg"

const screenWidth = Dimensions.get("window").width;

const chartConfig = {
  backgroundGradientFrom: "white",
  backgroundGradientTo: "white",
  color: (opacity = 1) => `rgba(255, 127, 62, ${opacity})`, // Cor verde para imitar apps de trading
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  strokeWidth: 2,
  propsForDots: {
    r: "3",
    strokeWidth: "1",
    stroke: "#fff",
  },
};

const stockData = {
  labels: ["10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00"],
  datasets: [
    {
      data: [40, 55, 51, 67, 70, 60, 53], // Valores simulados do preço das ações
      strokeWidth: 2,
    },
  ],
};

export default function Carteira() {
  return (    
    <ScrollView style={styles.container}>
        <Link href="/dashboard" style={styles.voltar}>
            <Text style={styles.voltar}>{'<'} Voltar</Text>
        </Link>

      <View style={styles.quadrados}>
        <View style={styles.quadrado1}>
            <Text style={styles.quadrado_frase1}>No total, já poupou</Text>
            <Text style={styles.quadrado_valor1}>143€</Text>
            <Text style={styles.quadrado_frase1}>Com a WattsBetter</Text>
        </View>

        <View style={styles.quadrado2}>
          <View style={styles.quadrado3}>
            <Text style={styles.quadrado_frase2}>Causas apoiadas:</Text>
            <Text style={styles.quadrado_valor2}>13</Text>
          </View>
          <View style={styles.quadrado4}>
            <Text style={styles.quadrado_frase3}>Total investido:</Text>
            <Text style={styles.quadrado_valor3}>36€</Text>
          </View>
        </View>
      </View>

      <View style={styles.chartContainer}>
        <View style={styles.contract_top}>
            <Image source={logoEDP} style={styles.logoEDP}></Image>
            <View>
                <Text style={styles.contract_name}>EDP</Text>
            </View>
            <Image source={flash} style={styles.contract_electricity}></Image>
            <Text style={styles.contract_price}>53,71<Text style={{ color: '#FF7F3F' }}>€</Text></Text>
        </View>

        <View>
          <LineChart
            data={stockData}
            width={350}
            height={200}
            yAxisLabel="€"
            chartConfig={chartConfig}
            bezier
            style={styles.chartStyle}
          />
        </View>
      </View>

      {/* Gráfico de Consumo Mensal (Barras) */}
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Projetos de Financiamento</Text>
        <View>
          <Image source={solar} style={styles.solar}></Image>
          <View>
            <Text style={styles.nome_proj}>Umbrella Infinity</Text>
            <View style={styles.stats}>
              <View style={styles.cat1}>
                <Text style={styles.cat_text}>- Simples bonds</Text>
                <Text style={styles.cat_text}>- 9.5%/year over 3 {'\n'} years</Text>
              </View>
              <View style={styles.cat2}>
                <Text style={styles.cat_text}>- €449,210 restantes</Text>
                <Text style={styles.cat_text}>- Until 1 April</Text>
              </View>
              
              <View style={styles.btns}>
                <View style={styles.investir}>
                  <Text style={styles.investir_text}>Investir</Text>
                </View>
                <View style={styles.detalhes}>
                  <Text style={styles.detalhes_text}>Detalhes</Text>
                </View>
              </View>
            </View>
          </View>

          <Image source={eolico} style={styles.eolico}></Image>
          <View>
            <Text style={styles.nome_proj}>Green On Invest T4</Text>
            <View style={styles.stats}>
              <View style={styles.cat1}>
                <Text style={styles.cat_text}>- Simples bonds</Text>
                <Text style={styles.cat_text}>- 8.5%/year over 2,2 {'\n'} years</Text>
              </View>
              <View style={styles.cat2}>
                <Text style={styles.cat_text}>- €84,790 restantes</Text>
                <Text style={styles.cat_text}>- Until 4 April</Text>
              </View>
              
              <View style={styles.btns}>
                <View style={styles.investir}>
                  <Text style={styles.investir_text}>Investir</Text>
                </View>
                <View style={styles.detalhes}>
                  <Text style={styles.detalhes_text}>Detalhes</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
    padding: 16,
  },

  voltar: {
    marginTop: 35,
    marginBottom: 15,
    fontSize: 17,
    fontWeight: 500,
    color: '#FF7F3E',
  },

  quadrados: {
    flexDirection: 'row',
    width: '100%',
    height: 110,
    marginBottom: 12,
  },

  quadrado1: {
    backgroundColor: '#FF7F3E',
    width: 178,
    alignItems: 'center',
    borderRadius: 15,
    marginRight: 8,
  },

  quadrado3: {
    height: 50,
    marginBottom: 10,
    backgroundColor: 'white',
    borderRadius: 15,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    width: 178,
    flexDirection: 'row',
  },

  quadrado4: {
    height: 50,
    backgroundColor: 'white',
    borderRadius: 15,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    width: 178,
    flexDirection: 'row',
  },

  quadrado_frase1: {
    marginTop: 7,
    marginBottom: 6,
    fontWeight: 500,
    color: 'white',
    fontSize: 18,
  },

  quadrado_valor1: {
    color: 'white',
    fontWeight: 900,
    fontSize: 25,
  },

  quadrado_frase2: {
    marginTop: '14',
    marginLeft: '7',
    fontWeight: 500,
    color: 'black',
    fontSize: 15,
  },

  quadrado_valor2: {
    marginTop: '11',
    marginLeft: '7',
    color: 'black',
    fontWeight: 600,
    fontSize: 20,
  },

  quadrado_frase3: {
    marginTop: '14',
    marginLeft: '7',
    fontWeight: 500,
    color: 'black',
    fontSize: 15,
  },

  quadrado_valor3: {
    marginTop: '11',
    marginLeft: '10',
    color: 'black',
    fontWeight: 600,
    fontSize: 20,
  },

  chartContainer: {
    backgroundColor: "#FFF",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },

  chartTitle: {
    fontSize: 17,
    fontWeight: "600",
    marginBottom: 8,
    color: '#FF7F3E',
  },

  chartStyle: {
    borderRadius: 8,
    marginVertical: 8,
  },

  logoEDP: {
    resizeMode: 'contain',
    width: 80,
    height: 70
  },

  contract_top: {
    flexDirection: 'row',
  },

  contract_name: {
    fontWeight: 'bold',
    fontSize: 25,
    marginLeft: 0,
    marginTop: 7,
  },

  contract_price: {
    fontSize: 28,
    fontWeight: 'bold',
    marginLeft: 80,
    marginTop: 8,
  },

  contract_electricity: {
    marginLeft: 10,
    marginTop: 15,
    width: 20,
    height: 20,
  },

  elec_container: {
    borderColor: '#FF7F3E',
    borderWidth: 1.5,
    borderRadius: 5,
    marginTop: 11,
    width: 25,
    height: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
    marginTop: 12
  },

  contract_block1: {
    backgroundColor: '#f2f5f7',
    width: 340,
    borderRadius: 10,
  },

  contract_cicle: {
    color: '#FF7F3E',
    fontSize: 12,
    position: 'absolute',
    width: 100,
    top: 37,
  },

  contract_block2: {
    backgroundColor: '#f2f5f7',
    width: 340,
    borderRadius: 10,
    marginTop: 10,
  },

  categoria: {
    flexDirection: 'row',
    height: 32,
  },

  categoria_termo: {
    backgroundColor: '#ced3d6',
    borderRadius: 10,
    width: '100%',
    height: 28,
    fontWeight: 'bold',
    fontSize: 500,
    marginBottom: 0,
  },

  categoria_termo_texto: {
    marginLeft: 7,
    marginTop: 2,
    fontWeight: 500,
    fontSize: 16.5,
  },

  categoria_ponto: {
    fontSize: 14,   
    marginLeft: 5,
    marginTop: 5,
    marginBottom: 5,
    color: '#505254',
  },

  categoria_valor: {
    fontSize: 14,
    marginTop: 5,
    marginLeft: 150,
  },

  categoria_valor2: {
    fontSize: 14,
    marginTop: 5,
    marginLeft: 155,
  },

  categoria_valor3: {
    fontSize: 14,
    marginTop: 5,
    marginLeft: 171,
  },

  categoria_valor4: {
    fontSize: 14,
    marginTop: 5,
    marginLeft: 159,
  },

  solar: {
    width: 340,
    height: 150,
  },

  eolico: {
    marginTop: 20,
    width: 340,
    height: 150,
  },

  nome_proj: {
    marginTop: 10,
    fontSize: 18,
  },

  stats: {
    borderRadius: 15,
    width: 340,
    height: 120,
    backgroundColor: '#F9F9F9',
    flexDirection: 'row',
  },

  cat1: {
    marginTop: 8,
    marginLeft: 10,
    width: 150,
  },

  cat2: {
    marginTop: 8,
    marginLeft: 10,
    width: 150,
  },

  btns: {
    flexDirection: 'row',
    marginTop: 75,
    marginLeft: -220,
  },

  investir: {
    marginLeft: 20,
    borderRadius: 50,
    width: 100,
    height: 40,
    backgroundColor: '#FF7F3E',
  },

  investir_text: {
    fontSize: 19,
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 18,
    marginTop: 7,
  },

  detalhes: {
    marginLeft: 10,
    borderRadius: 50,
    width: 100,
    height: 40,
    backgroundColor: '#ababab',
  },

  detalhes_text: {
    fontSize: 19,
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 14,
    marginTop: 7,
  },

});
