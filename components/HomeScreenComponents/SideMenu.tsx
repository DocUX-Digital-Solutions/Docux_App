import React, {useContext} from 'react';
import { Text,View, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MenuSideButtons from './MenuSideButtons';

const SideMenu = ({ setSideMenuVisible, isSideMenuVisible, selectedSideMenu,setSelectedSideMenu, lengthToday, lengthTomorrow, lengthInReview }) => {
  console.log(lengthInReview)
  const toggleMenu = () => {
    setSideMenuVisible(prevState => !prevState);
  };

  return (
    <View style={styles.menu}>
      {/* If the menu is open, show all elements. If closed, set opacity to 0 */}
      <View style={[styles.logoMenu, { opacity: isSideMenuVisible ? 1 : 0 }]}>
       
        <TouchableOpacity style={styles.arrowIcon} onPress={toggleMenu} >
          <Icon
            name="close"
            size={25}
            color="#fff"
            
          />
        </TouchableOpacity>
      </View>

      {/* Centered icon when the menu is closed */}
      
      <View style={[styles.buttonBox, { opacity: isSideMenuVisible ? 1 : 0 }]}>
        <MenuSideButtons 
          selectedSideMenu={selectedSideMenu}
          setSelectedSideMenu={setSelectedSideMenu}
          lengthToday={lengthToday}
          lengthTomorrow={lengthTomorrow}
          lengthInReview={lengthInReview}
        />
        <TouchableOpacity style={styles.doctorNameTextBox}>
        <Icon
              name="calendar-edit"
              size={30}
              color="#fff"

            />
          <Text style={styles.doctorNameText}>Logoff</Text>
          </TouchableOpacity>
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
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    marginTop: 50,
    marginRight:30,
    position: 'absolute',
    top: 0,
    right: '1%',
    zIndex: 11, // Ensures the menu elements are on top when visible
    width: '100%', // Makes sure the menu spans the full width
    
  },
  buttonBox: {
    alignContent: 'flex-start',
    height: '100%',
    marginTop: 150,
    justifyContent: 'flex-start',
    
  },
  arrowIconButton: {
    // Makes the button take up 50% of the width of the menu
    width: '100%',
    // Ensures the TouchableOpacity is invisible by making it transparent
    backgroundColor: 'black', 
    justifyContent: 'flex-end',  // Centers the icon within the button
    alignItems: 'flex-end', // Centers the icon horizontally
  },
  rankBackground: {
    width: "80%",
    height: "100%", // Adjust height to fit within the parent view
    alignItems: '', // Centers horizontally
    justifyContent: 'center', // Centers vertically
    left:10
  },
  arrowIcon: {
    //backgroundColor:'#000',
    
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
    bottom: '0', // Position it at the very bottom of the screen
    padding: 10, // Optional: Add some padding for spacing inside the text box
    alignContent: 'center',
    left: '10%',
    backgroundColor: 'black',
  },
  doctorNameText:{
    color:'white',
    fontSize:15,
    fontWeight:'500',
  },
  doctorNameTextBox: {
    position: 'absolute', // Position it absolutely within the parent view
    alignContent: 'flex-end',
    top:"72%",
    left:19,
    flexDirection:'row',
    justifyContent:'center',
    

  },
  doctorNameText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '500',
    marginLeft:10
  },

});

export default SideMenu;
