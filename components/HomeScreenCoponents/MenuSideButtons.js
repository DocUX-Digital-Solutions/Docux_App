import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const MenuSideButtons = () => {
  const [selected, setSelected] = useState(1); // To track the selected button

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.button,
          selected === 1 ? styles.selected : styles.notSelected,
        ]}
        onPress={() => setSelected(1)}
      >
        <View style={styles.buttonContent}>
          <Text style={styles.textLeft}>Today</Text>
          <Text style={styles.textRight}>7</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.button,
          selected === 2 ? styles.selected : styles.notSelected,
        ]}
        onPress={() => setSelected(2)}
      >
        <View style={styles.buttonContent}>
          <Text style={styles.textLeft}>In Progress</Text>
          <Text style={styles.textRight}>200</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
  
    
    width: '100%',
    padding: 10,
    bottom:"10%"

  },
  button: {
    width: '100%', // 80% of the parent, 2 buttons with spacing
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  selected: {
    backgroundColor: '#1b324d',
  },
  notSelected: {
    backgroundColor: 'transparent',
   
    borderColor: 'black',
  },
  buttonContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  textLeft: {
    color: 'white',
    textAlign: 'left',
    left:10,
    fontSize:15,
    fontWeight:'500'
  },
  textRight: {
    color: 'white',
    textAlign: 'right',
    right:10,
    fontSize:15,
    fontWeight:'500'
  },
});

export default MenuSideButtons;
