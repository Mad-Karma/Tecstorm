import React, { useState } from 'react';
import { Text, Button, View, TextInput, StyleSheet, ScrollView } from 'react-native';

import gasPrices from '@/assets/data/Precos_ELEGN_filtered_gas_only.json';

function getTop5BestOptions(data, consumo) {
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

export default function FiveBestElec() {
  const [top5Options, setTop5Options] = useState([]);
  const [consumo, setConsumo] = useState('200');
  const [loading, setLoading] = useState(false);

  const handleCalculate = () => {
    setLoading(true);
    setTimeout(() => {
      const bestOptions = getTop5BestOptions(electricityPrices, parseFloat(consumo));
      setTop5Options(bestOptions);
      setLoading(false);
    }, 500); // Simulating loading state
  };

  return (
    <View style={styles.container}>
      <Text>Enter Consumption (kWh):</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={consumo}
        onChangeText={setConsumo}
      />
      <Button title="Get Top 5 Best Options" onPress={handleCalculate} />
      
      {loading ? <Text>Loading...</Text> : null}
      
      {top5Options.length > 0 && (
        <ScrollView style={styles.resultsContainer}>
          {top5Options.map((option, index) => (
            <View key={index} style={styles.result}>
              <Text>{`Option ${index + 1}:`}</Text>
              <Text>{`COM: ${option.COM}`}</Text>
              <Text>{`Pot_Cont: ${option.Pot_Cont}`}</Text>
              <Text>{`TF: ${option.TF}`}</Text>
              <Text>{`Tarifa Variável: ${option["TVGN"]}`}</Text>
              <Text>{`Custo Total: €${option.totalCost.toFixed(2)}`}</Text>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
}
