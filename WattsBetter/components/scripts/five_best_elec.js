import React, { useState } from 'react';
import { Text, Button, View, TextInput, StyleSheet, ScrollView } from 'react-native';

// Import JSON file (make sure the path is correct for your project structure)
import electricityPrices from 'WattsBetter/assets/data/Precos_ELEGN_filtered_elec_only.json';

// Function to get the 5 best options based on total cost
function getTop5BestOptions(data, consumo) {
  return data
    .map(contract => {
      const totalCost = (consumo * parseFloat(contract["TV|TVFV|TVP"])) + (parseFloat(contract.Pot_Cont) * parseFloat(contract.TF));
      return { ...contract, totalCost };
    })
    .sort((a, b) => a.totalCost - b.totalCost) // Sort by lowest cost
    .slice(0, 5); // Get top 5
}

export default function App() {
  const [top5Options, setTop5Options] = useState([]);
  const [consumo, setConsumo] = useState('200'); // Default consumption of 200 kWh
  const [loading, setLoading] = useState(false);

  const handleCalculate = () => {
    setLoading(true);
    const bestOptions = getTop5BestOptions(electricityPrices, parseFloat(consumo));
    setTop5Options(bestOptions);
    setLoading(false);
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
      
      {loading && <Text>Loading...</Text>}
      
      {top5Options.length > 0 && (
        <ScrollView style={styles.resultsContainer}>
          {top5Options.map((option, index) => (
            <View key={index} style={styles.result}>
              <Text>{`Option ${index + 1}:`}</Text>
              <Text>{`COM: ${option.COM}`}</Text>
              <Text>{`Pot_Cont: ${option.Pot_Cont}`}</Text>
              <Text>{`TF: ${option.TF}`}</Text>
              <Text>{`Tarifa Variável: ${option["TV|TVFV|TVP"]}`}</Text>
              <Text>{`Custo Total: €${option.totalCost.toFixed(2)}`}</Text>
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    padding: 20,
  },
  input: {
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
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  result: {
    marginBottom: 10,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
});
