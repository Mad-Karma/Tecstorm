import React from "react";
import { Image, View, Text, StyleSheet, ScrollView, Dimensions } from "react-native";
import { BarChart, LineChart } from "react-native-chart-kit";

import logoEDP from "@/assets/images/edp-logo.png"
import flash from "@/assets/images/flash.png"

// Obtem a largura do ecrã para o gráfico
const screenWidth = Dimensions.get("window").width;

const chartConfig = {
    backgroundGradientFrom: "#f9f9f9",
    backgroundGradientTo: "#fff",
    decimalPlaces: 0, // Sem casas decimais nos valores
    color: (opacity = 1) => `rgba(255, 127, 62, ${opacity})`, // Cor verde
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: { borderRadius: 8 },
    propsForDots: { r: "5", strokeWidth: "2", stroke: "#4CAF50" },
  };

export default function Contract() {
  return (    
    <ScrollView style={styles.container}>
      <Text style={styles.voltar}>{'<'} Voltar</Text>

      <View style={styles.quadrados}>
        <View style={styles.quadrado1}>
            <Text style={styles.quadrado_frase1}>No total, já poupou</Text>
            <Text style={styles.quadrado_valor1}>143€</Text>
            <Text style={styles.quadrado_frase1}>Com a WattsBetter</Text>
        </View>

        <View style={styles.quadrado2}>
            <Text style={styles.quadrado_frase2}>Trocas realizadas:</Text>
            <Text style={styles.quadrado_valor2}>13</Text>
        </View>
      </View>

      <View style={styles.chartContainer}>
        <View style={styles.contract_top}>
            <Image source={logoEDP} style={styles.logoEDP}></Image>
            <Text style={styles.contract_name}>EDP</Text>
            <View style={styles.elec_container}>
                <Image source={flash} style={styles.contract_electricity}></Image>
            </View>
            <Text style={styles.contract_price}>68,21<Text style={{ color: '#FF7F3F' }}>€</Text></Text>
        </View>

        <View style={{flexDirection: 'row'}}>
            <View style={styles.contract_block1}>
                <View style={styles.categoria_termo}><Text>Termo fixo</Text></View>
                <View style={styles.categoria}>
                    <Text>Potência contratada</Text>
                    <Text>6.9 kVA</Text>
                </View>
                <View style={styles.categoria}>
                    <Text>Preço por dia</Text>
                    <Text>0.400 €/dia</Text>
                </View>
            </View>
            
            <View style={styles.contract_block2}>
                <View style={styles.categoria_termo}><Text>Termo variável</Text></View>
                <View style={styles.categoria}>
                    <Text style={categoria_ponto}>Consumo total</Text>
                    <Text style={categoria_valor}>300.00 kWh</Text>
                </View>
                <View style={styles.categoria}>
                    <Text>Preço por kWh</Text>
                    <Text>0.145 €/kWh</Text>
                </View>
            </View>
        </View>
      </View>

      {/* Gráfico de Consumo Mensal (Barras) */}
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Consumo Mensal</Text>
        <BarChart
          data={{
            labels: ["Nov", "Dec", "Jan", "Fev", "Mar"],
            datasets: [
              {
                data: [38, 50, 60, 55, 65], // Valores de consumo
              },
            ],
          }}
          width={320} // Largura do gráfico
          height={200}
          yAxisLabel="€ "
          chartConfig={chartConfig}
          style={styles.chartStyle}
        />
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

  quadrado2: {
    backgroundColor: 'white',
    borderRadius: 15,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    width: 178,
    alignItems: 'center',
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
    marginTop: '8',
    marginBottom: '10',
    fontWeight: 500,
    color: 'black',
    fontSize: 18,
  },

  quadrado_valor2: {
    color: 'black',
    fontWeight: 900,
    fontSize: 23,
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
    marginLeft: 0,
    width: 165,
  },

  contract_block2: {
    backgroundColor: '#f2f5f7',
    marginLeft: 5,
    width: 165,
  },

  categoria_termo: {
    
  },

  categoria: {

  },

  categoria_ponto: {

  },

  categoria_valor: {

  },

});
