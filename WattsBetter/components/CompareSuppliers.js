import React, { useState, useEffect } from "react";
import { View, Text, Button, FlatList } from "react-native";
import * as DocumentPicker from "react-native-document-picker";
import * as XLSX from "xlsx";
import RNFS from "react-native-fs";

const CompareSuppliers = () => {
  const [bestSupplier, setBestSupplier] = useState(null);
  const [allSuppliers, setAllSuppliers] = useState([]);

  useEffect(() => {
    loadExcelFromAssets(); // Automatically load Excel when the component mounts
  }, []);

  // 📌 Load Excel file from assets folder
  const loadExcelFromAssets = async () => {
    try {
      const path = `${RNFS.MainBundlePath}/assets/data/eletricidade.xlsx`;
      const data = await RNFS.readFile(path, "base64");

      processExcelData(data);
    } catch (error) {
      console.error("Error loading Excel file from assets:", error);
    }
  };

  // 📌 Allow user to upload an Excel file
  const handleFilePick = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });

      const fileUri = result[0].uri;
      const response = await fetch(fileUri);
      const blob = await response.blob();

      const reader = new FileReader();
      reader.onload = (e) => {
        processExcelData(e.target.result);
      };

      reader.readAsArrayBuffer(blob);
    } catch (error) {
      console.error("Error reading file:", error);
    }
  };

  // 📌 Process Excel data
  const processExcelData = (fileData) => {
    const workbook = XLSX.read(fileData, { type: "base64" });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
    const suppliers = extractSupplierData(jsonData);
    const best = findBestSupplier(suppliers);

    setAllSuppliers(suppliers);
    setBestSupplier(best);
  };

  // 📌 Extract supplier data from JSON
  const extractSupplierData = (data) => {
    let suppliers = [];
    const headers = data[0];

    for (let i = 1; i < data.length; i++) {
      let row = data[i];
      suppliers.push({
        power: row[0], // Power level
        Iberdrola: { power_price: row[1], energy_price: row[2] },
        Goldenergy: { power_price: row[3], energy_price: row[4] },
        Galp: { power_price: row[5], energy_price: row[6] },
        MEO: { power_price: row[7], energy_price: row[8] },
      });
    }
    return suppliers;
  };

  // 📌 Find the best supplier based on prices
  const findBestSupplier = (suppliers) => {
    let bestSupplier = {};

    suppliers.forEach((row) => {
      let lowestPower = Math.min(
        row.Iberdrola.power_price,
        row.Goldenergy.power_price,
        row.Galp.power_price,
        row.MEO.power_price
      );

      let lowestEnergy = Math.min(
        row.Iberdrola.energy_price,
        row.Goldenergy.energy_price,
        row.Galp.energy_price,
        row.MEO.energy_price
      );

      bestSupplier[row.power] = {
        bestPowerSupplier: Object.keys(row).find(
          (supplier) => row[supplier]?.power_price === lowestPower
        ),
        bestEnergySupplier: Object.keys(row).find(
          (supplier) => row[supplier]?.energy_price === lowestEnergy
        ),
      };
    });

    return bestSupplier;
  };

  return (
    <View style={{ padding: 20 }}>
      <Button title="Upload Excel File" onPress={handleFilePick} />

      {bestSupplier && (
        <View>
          <Text style={{ fontSize: 18, fontWeight: "bold", marginTop: 20 }}>
            Best Supplier Results:
          </Text>
          <FlatList
            data={Object.entries(bestSupplier)}
            keyExtractor={(item) => item[0]}
            renderItem={({ item }) => (
              <Text>
                Power {item[0]} kW: {item[1].bestPowerSupplier} (Potência),{" "}
                {item[1].bestEnergySupplier} (Energia)
              </Text>
            )}
          />
        </View>
      )}
    </View>
  );
};

export default CompareSuppliers;

