import React from "react";
import { SafeAreaView } from "react-native";
import CompareSuppliers from "./components/CompareSuppliers"; // Import here

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <CompareSuppliers />
    </SafeAreaView>
  );
};

export default App;
