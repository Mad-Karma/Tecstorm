import React, { useState } from 'react';
import { Modal, Text, Image, View, TextInput, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Link } from 'expo-router'

// Import JSON file (make sure the path is correct for your project structure)
import electricityPrices from '@/assets/data/Precos_ELEGN_filtered_elec_only.json';
import gasPrices from '@/assets/data/Precos_ELEGN_filtered_gas_only.json';

import questionMark from '@/assets/images/question-mark.png'
import flash from '@/assets/images/flash.png'

function getTop5BestCompaniesElec(data, consumoEletricidade) {
  const companyBestOffers = {};

  data
    .filter(contract => {
      const company = contract.COM.toUpperCase();
      return company !== "IBELECTRA" && company !== "OENEO"; // Exclude both companies
    })
    .forEach(contract => {
      const totalCost = (consumoEletricidade * parseFloat(contract["TV|TVFV|TVP"])) + (parseFloat(contract.Pot_Cont) * parseFloat(contract.TF));
      const company = contract.COM;

      if (!companyBestOffers[company] || totalCost < companyBestOffers[company].totalCost) {
        companyBestOffers[company] = { ...contract, totalCost };
      }
    });

  return Object.values(companyBestOffers)
    .sort((a, b) => a.totalCost - b.totalCost) // Sort by lowest total cost
    .slice(0, 5); // Get top 5 companies
}

function getTop5BestOptionsGas(data, consumo) {
  return data
    .map(contract => {
      const TF = parseFloat(contract["TFGN"]) || 0;
      const TVGN = parseFloat(contract["TVGN"]) || 0;

      const totalCost = (30 * TF) + (consumo * TVGN);
      return { ...contract, totalCost };
    })
    .sort((a, b) => a.totalCost - b.totalCost)
    .slice(0, 5);
}

function getTop5BestCombinationsElecGas(elecData, gasData, consumoE, consumoG) {
  const bestElec = getTop5BestCompanies(elecData, consumoE, "electricity");
  const bestGas = getTop5BestCompanies(gasData, consumoG, "gas");

  const combinations = [];

  bestElec.forEach(elecContract => {
    bestGas.forEach(gasContract => {
      const totalCost = elecContract.totalCost + gasContract.totalCost;
      combinations.push({
        electricity: {
          company: elecContract.COM,
          Pot_Cont: elecContract.Pot_Cont,
          TF: elecContract.TF,
          variableTariff: elecContract["TV|TVFV|TVP"],
          totalCost: elecContract.totalCost
        },
        gas: {
          company: gasContract.COM,
          TFGN: gasContract.TFGN,
          TVGN: gasContract.TVGN,
          totalCost: gasContract.totalCost
        },
        combinedTotalCost: totalCost
      });
    });
  });

  return JSON.stringify(
    combinations
      .sort((a, b) => a.combinedTotalCost - b.combinedTotalCost) // Sort by lowest cost
      .slice(0, 5), // Get top 5 combinations
    null,
    2
  ); // Pretty JSON format
}

export default function Five_best_elec() {
  const [top5Options, setTop5Options] = useState([]);
  const [consumoEletricidade, setConsumoEletricidade] = useState('');
  const [consumoGas, setConsumoGas] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCalculate = () => {
    setLoading(true);

    if(consumoEletricidade.length > 0 && consumoGas.length == 0) {
      const bestOptions = getTop5BestCompaniesElec(electricityPrices, parseFloat(consumoEletricidade));
      setTop5Options(bestOptions);
    }
    if(consumoEletricidade.length == 0 && consumoGas.length > 0) {
      const bestOptions = getTop5BestOptionsGas(gasPrices, parseFloat(consumoGas));
      setTop5Options(bestOptions);
    }
    if(consumoEletricidade.length > 0 && consumoGas.length > 0) {
      const bestOptions = getTop5BestCombinationsElecGas(electricityPrices, gasPrices, parseFloat(consumoEletricidade), parseFloat(consumoGas));
      setTop5Options(bestOptions);
    }
    
    setLoading(false);
  };

  return (
    <View style={styles.container}>

      <Link href="/dashboard" style={styles.voltar}>
        <Text style={styles.voltar}>{'<'} Voltar</Text>
      </Link>

      <View style={{flexDirection: 'row'}}>
        <View style={styles.electricidade_container}>
          <View style={styles.electricidade}>
            <Text style={styles.electricidade_text}>Eletricidade</Text>
          </View>

          <TextInput
            style={styles.input1}
            keyboardType="numeric"
            value={0}
            placeholder='Insira o seu consumo'
            onChangeText={setConsumoEletricidade}
          />
        </View>

        <Text style={styles.barra_topo}>|</Text>

        <View style={styles.gas_container}>
          <View style={styles.gas}>
            <Text style={styles.gas_text}>Gás</Text>
          </View>
          
          <TextInput
            style={styles.input2}
            keyboardType="numeric"
            value={0}
            placeholder='Insira o seu consumo'
            onChangeText={setConsumoGas}
          />
        </View>
      </View>

      <Pressable style={styles.botao} onPress={handleCalculate}>
        <Text style={styles.buttonText}>Analisar Ofertas</Text>
      </Pressable>
      
      {loading ? <Text>Loading...</Text> : null}
      
      {consumoEletricidade !== "" && consumoGas === "" && top5Options.length > 0 && (
        <ScrollView style={styles.resultsContainer}>
          {top5Options.map((option, index) => (
            <View key={index} style={styles.result}>
              <View style={{flexDirection: 'row'}}>
                {option.COM === "EDPC" ? (
                  <Image source={require("@/assets/images/edp-logo.png")} style={styles.image} />
                ) : option.COM === "GALP" ? (
                  <Image source={require("@/assets/images/galp-logo.png")} style={styles.image} />
                ) : option.COM === "G9ENERGY" ? (
                  <Image source={require("@/assets/images/g9-logo.png")} style={styles.image} />
                ) : option.COM === "GOLD" ? (
                  <Image source={require("@/assets/images/gold-logo.png")} style={styles.image} />
                ) : option.COM === "IBD" ? (
                  <Image source={require("@/assets/images/ibd-logo.png")} style={styles.image} />
                ) : null}
                
                <View style={{flexDirection: 'column'}}>
                  <Text style={styles.name}>{`${option.COM}`}</Text>
                  <Text style={styles.potencia}>{`Potência: ${option.Pot_Cont.toFixed(2)} kWh`}</Text>
                </View>

                <Text style={styles.custo}>{`€${option.totalCost.toFixed(2)}`}</Text>
              </View>

              <View style={styles.precos}>
                <Text style={styles.preco_dia}>{`Preço por Dia: ${option.TF.toFixed(2)}€`}</Text>
                <Text style={styles.barra}>|</Text>
                <Text style={styles.preco_kwh}>{`Preço por kWh: ${option["TV|TVFV|TVP"].toFixed(2)}€`}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      )}

      {consumoEletricidade === "" && consumoGas !== "" && top5Options.length > 0 && (
        <ScrollView style={styles.resultsContainer}>
          {top5Options.map((option, index) => (
            <View key={index} style={styles.result}>
              <View style={{flexDirection: 'row'}}>
                {option.COM === "EDPC" ? (
                  <Image source={require("@/assets/images/edp-logo.png")} style={styles.image} />
                ) : option.COM === "GALP" ? (
                  <Image source={require("@/assets/images/galp-logo.png")} style={styles.image} />
                ) : option.COM === "G9ENERGY" ? (
                  <Image source={require("@/assets/images/g9-logo.png")} style={styles.image} />
                ) : option.COM === "GOLD" ? (
                  <Image source={require("@/assets/images/gold-logo.png")} style={styles.image} />
                ) : option.COM === "IBD" ? (
                  <Image source={require("@/assets/images/ibd-logo.png")} style={styles.image} />
                ) : null}
                
                <View style={{flexDirection: 'column'}}>
                  <Text style={styles.name}>{`${option.COM}`}</Text>
                  <Text style={{marginLeft: 15, color: 'white'}}>{`Escalão: ${option.Pot_Cont} kWh`}</Text>
                </View>

                <Text style={styles.custo}>{`€${option.totalCost.toFixed(2)}`}</Text>
              </View>

              <View style={styles.precos}>
                <Text style={styles.preco_dia}>{`Preço por Dia: ${option.TFGN.toFixed(2)}€`}</Text>
                <Text style={styles.barra}>|</Text>
                <Text style={styles.preco_kwh}>{`Preço por kWh: ${option["TVGN"].toFixed(2)}€`}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      )}

      {consumoEletricidade !== "" && consumoGas !== "" && top5Options.length > 0 && (
        <ScrollView style={styles.resultsContainer}>
          {top5Options.map((option, index) => (
            <View>
              <View key={index} style={styles.result}>
                <View style={{flexDirection: 'row'}}>
                  {option.COM === "EDPC" ? (
                    <Image source={require("@/assets/images/edp-logo.png")} style={styles.image} />
                  ) : option.COM === "GALP" ? (
                    <Image source={require("@/assets/images/galp-logo.png")} style={styles.image} />
                  ) : option.COM === "G9ENERGY" ? (
                    <Image source={require("@/assets/images/g9-logo.png")} style={styles.image} />
                  ) : option.COM === "GOLD" ? (
                    <Image source={require("@/assets/images/gold-logo.png")} style={styles.image} />
                  ) : option.COM === "IBD" ? (
                    <Image source={require("@/assets/images/ibd-logo.png")} style={styles.image} />
                  ) : null}
                  
                  <View style={{flexDirection: 'column'}}>
                    <Text style={styles.name}>{`${option.COM}`}</Text>
                    <Text style={styles.potencia}>{`Escalão: ${option.Pot_Cont.toFixed(2)} kWh`}</Text>
                  </View>

                  <Text style={styles.custo}>{`€${option.totalCost.toFixed(2)}`}</Text>
                </View>

                <View style={styles.precos}>
                  <Text style={styles.preco_dia}>{`Preço por Dia: ${option.TF.toFixed(2)}€`}</Text>
                  <Text style={styles.barra}>|</Text>
                  <Text style={styles.preco_kwh}>{`Preço por kWh: ${option["TV|TVFV|TVP"].toFixed(2)}€`}</Text>
                </View>
              </View>

              <View key={index} style={styles.result}>
                <View style={{flexDirection: 'row'}}>
                  {option.COM === "EDPC" ? (
                    <Image source={require("@/assets/images/edp-logo.png")} style={styles.image} />
                  ) : option.COM === "GALP" ? (
                    <Image source={require("@/assets/images/galp-logo.png")} style={styles.image} />
                  ) : option.COM === "G9ENERGY" ? (
                    <Image source={require("@/assets/images/g9-logo.png")} style={styles.image} />
                  ) : option.COM === "GOLD" ? (
                    <Image source={require("@/assets/images/gold-logo.png")} style={styles.image} />
                  ) : option.COM === "IBD" ? (
                    <Image source={require("@/assets/images/ibd-logo.png")} style={styles.image} />
                  ) : null}
                  
                  <View style={{flexDirection: 'column'}}>
                    <Text style={styles.name}>{`${option.COM}`}</Text>
                    <Text style={{marginLeft: 15, color: 'white'}}>{`Escalão: ${option.Pot_Cont} kWh`}</Text>
                  </View>

                  <Text style={styles.custo}>{`€${option.totalCost.toFixed(2)}`}</Text>
                </View>

                <View style={styles.precos}>
                  <Text style={styles.preco_dia}>{`Preço por Dia: ${option.TF.toFixed(2)}€`}</Text>
                  <Text style={styles.barra}>|</Text>
                  <Text style={styles.preco_kwh}>{`Preço por kWh: ${option["TV|TVFV|TVP"].toFixed(2)}€`}</Text>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },

  voltar: {
    marginTop: 45,
    marginBottom: 20,
    marginLeft: 10,
    fontSize: 17,
    fontWeight: 500,
    color: '#FF7F3E',
  },

  empty_container: {
    backgroundColor: '#FF7F3E',
    width: '95%',
    height: 150,
    borderRadius: 15,
    marginLeft: 9,
  },

  input1: {
    marginTop: 20,
    marginLeft: 18,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '80%',
    marginVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 5,
    backgroundColor: '#fff'
  },

  input2: {
    marginTop: 20,
    marginLeft: 18,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '80%',
    marginVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 5,
    backgroundColor: '#fff'
  },

  resultsContainer: {
    marginTop: 20,
    width: '100%',
    borderRadius: 8,
  },

  result: {
    marginLeft: 10,
    marginBottom: 15,
    width: '95%',
    height: 150,
    backgroundColor: 'white',
    borderWidth: 2,
    borderRadius: 15,
    borderColor: '#FF7F3E',
  },

  image: {
    marginTop: 10,
    marginLeft: 10,
    width: 70,
    height: 70,
  },

  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 30,
    marginLeft: 15,
  },

  custo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 28,
    marginLeft: 65,
  },

  precos: {
    flexDirection: 'row',
    width: 330,
    height: 30,
    borderRadius: 8,
    marginTop: 18,
    marginLeft: 20,
    backgroundColor: '#ced3d6',
  },

  preco_dia: {
    marginLeft: 15,
    marginTop: 4,
    fontSize: 14,
  },

  preco_kwh: {
    marginLeft: 15,
    marginTop: 4,
    fontSize: 14,
  },

  barra: {
    marginLeft: 15,
    fontSize: 20,
    color: '#FF7F3E',
  },

  potencia: {
    marginLeft: 15,
  },

  botao: {
    width: 140,
    height: 40,
    backgroundColor: '#FF7F3E',
    borderRadius: 5,
    marginLeft: 125,
    marginTop: 10,
  },

  buttonText: {
    marginTop: 7,
    marginLeft: 5,
    color: 'white',
    fontSize: 17,
    fontWeight: 'bold',
  },

  electricidade_container: {
    width: 200,
  },

  electricidade: {
    marginLeft: 20,
    marginRight: 20,
    width: 150,
    height: 40,
    borderRadius: 15,
    backgroundColor: '#FF7F3E',
  },

  electricidade_text: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 26,
    marginTop: 7,
  },

  gas_container: {
    width: 190,
  },

  gas: {
    marginLeft: 20,
    width: 150,
    height: 40,
    borderRadius: 15,
    backgroundColor: '#FF7F3E',
  },

  gas_text: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 60,
    marginTop: 7,
  },

  barra_topo: {
    fontSize: 40,
    marginTop: -11,
    color: '#FF7F3E'
  },

});
