import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const Sidebar = ({ navigation }) => {
  const handlePress = (screen) => {
    navigation.navigate(screen);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => handlePress("Home")}>
        <Text style={styles.item}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handlePress("Profile")}>
        <Text style={styles.item}>Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handlePress("Settings")}>
        <Text style={styles.item}>Settings</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  item: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
  },
});

export default Sidebar;
