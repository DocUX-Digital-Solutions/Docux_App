import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

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
          <View style={styles.calenderBox}>
            <Icon
              name="calendar-today"
              size={30}
              color="#fff"

            />
            <Text style={styles.textLeft}>Today</Text>
          </View>
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
          <View style={styles.calenderBox}>
            <Icon
              name="calendar-month"
              size={30}
              color="#fff"

            />
            <Text style={styles.textLeft}>Tomorrow</Text>
          </View>
          <Text style={styles.textRight}>7</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.button,
          selected === 3 ? styles.selected : styles.notSelected,
        ]}
        onPress={() => setSelected(3)}
      >
        <View style={styles.buttonContent}>
          <View style={styles.calenderBox}>
            <Icon
              name="calendar-edit"
              size={30}
              color="#fff"

            />
            <Text style={styles.textLeft}>In Review</Text>
          </View>
          <Text style={styles.textRight}>7</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.divider} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {


    width: '100%',
    paddingTop: 10,
    bottom: "10%"

  },
  button: {
    width: '100%', // 80% of the parent, 2 buttons with spacing
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginBottom:10
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
    width: '90%',
  },
  textLeft: {
    color: 'white',
    textAlign: 'left',
    left: 10,
    fontSize: 22,
    fontWeight: '500'
  },
  textRight: {
    color: 'white',
    textAlign: 'right',
    right: 10,
    fontSize: 22,
    fontWeight: '500'
  },
  calenderBox: {
    flexDirection: 'row',
    alignContent: 'center'
  },
  divider: {
    marginTop:10,
    height: 1,
    backgroundColor: '#fff'
  }
});

export default MenuSideButtons;
