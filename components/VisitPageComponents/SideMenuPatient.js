import React, {useContext} from 'react';
import { Text,View, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MenuSideButtonsClipBoards from './MenuSideButtonsClipBoards';

const SideMenuPatient = ({ setSideMenuVisible, isSideMenuVisible }) => {

  const toggleMenu = () => {
    setSideMenuVisible(prevState => !prevState);
  };

  return (
    <View style={styles.menu}>
      {/* If the menu is open, show all elements. If closed, set opacity to 0 */}
      <View style={[styles.logoMenu]}>
        <ImageBackground
          style={styles.rankBackground}
          source={require('../../assets/logo_no_text.png')}
          resizeMode="contain"
        />
      </View>
      {/* Centered icon when the menu is closed */}
     
      <View style={[styles.buttonBox]}>
        <MenuSideButtonsClipBoards />
      </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  menu: {
    backgroundColor: '#011c39',
    height: '100%',
    position: 'relative',
  },
  logoMenu: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 11, // Ensures the menu elements are on top when visible
    width: '100%', // Makes sure the menu spans the full width
    height:'15%'
  },
  buttonBox: {
    alignContent: 'center',
    height: '100%',
    justifyContent: 'center',
  },
  arrowIconButton: {
    // Makes the button take up 50% of the width of the menu
    width: '50%',
    // Ensures the TouchableOpacity is invisible by making it transparent
    backgroundColor: 'black', 
    justifyContent: 'center',  // Centers the icon within the button
    alignItems: 'center', // Centers the icon horizontally
  },
  rankBackground: {
    width: "70%",
    height: "100%", // Adjust height to fit within the parent view
    alignItems: '', // Centers horizontally
    justifyContent: 'center', // Centers vertically
    left:10
  },
  arrowIcon: {
    marginLeft: 10,
  },
  centeredIcon: {
    position: 'absolute',
    top: "25%",
    left: '50%',
    transform: [{ translateX: -15 }, { translateY: -15 }],
    zIndex: 11, // Ensure the centered icon is on top of other elements
    width: '100%',
    height: "50%",
    backgroundColor: 'transparent', // Makes the button transparent
    justifyContent: 'center',  // Centers the icon within the button
    alignItems: 'center', // Centers the icon horizontally
  },
  doctorNameTextBox: {
    width: '100%',
    alignSelf: 'center',
    position: 'absolute', // Position it at the bottom of the container
    bottom: 10, // Ensure it aligns with the bottom of the parent container
    padding: 10, // Optional: Add some padding for spacing inside the text box
    alignContent:'center',
    left:'10%'
  },
  doctorNameText:{
    color:'white',
    fontSize:15,
    fontWeight:'500',
  }

});

export default SideMenuPatient;
