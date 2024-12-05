import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const MenuSideButtonsClipBoards = () => {
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
        <Icon name="clipboard-text-outline" size={20} color="#fff" />
        </View>
        <Text style={styles.textClipboard}>Hello</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.button,
          selected === 2 ? styles.selected : styles.notSelected,
        ]}
        onPress={() => setSelected(2)}
      >
        <View style={styles.buttonContent}>
        <Icon name="clipboard-text-outline" size={20} color="#fff" />
        </View>
        <Text style={styles.textClipboard}>Hello</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
  
    
    width: '100%',
    height:'100%',
    top:'15%',
     alignItems: 'center'

  },
  button: {
    width: '100%', // 80% of the parent, 2 buttons with spacing
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    width: 65, // Set the width
    height: 65, // Set the height to be the same as the width
    borderRadius: 50, // Half of the width/height to make it a circle
    justifyContent: 'center', // Center content vertically
    alignItems: 'center', // Center content horizontally
    marginVertical:5
   
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
    justifyContent: 'center',
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
  textClipboard:{
    color: 'white',
    fontSize:15,
    fontWeight:'500',
    paddingTop:5
  }
});

export default MenuSideButtonsClipBoards;
