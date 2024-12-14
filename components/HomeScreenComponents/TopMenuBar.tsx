import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Keyboard, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { SearchBar } from 'react-native-elements';

const screenWidth = Dimensions.get('window').width;

const TopMenu = ({ appointmentsNumber, useExpand, setSideMenuVisible, setFilterValue }) => {
    const [searchValue, setSearchValue] = useState("");
    const [isFocused, setIsFocused] = useState(false);
    const [showIcons, setShowIcons] = useState(true); // State to control icon visibility
    const [magnifyIcon, setMagnifyIcon] = useState('magnify')
    const widthAnim = useRef(new Animated.Value(40)).current;
    const opacityAnim = useRef(new Animated.Value(1)).current; // Opacity animation value
    const searchBarRef = useRef(null);
    const [backgroundColor, setBackgroundColor] = useState('transparent');

    const updateSearch = (searchValue) => {
        setSearchValue(searchValue);
        setFilterValue(searchValue);
    };

    const handleFocus = () => {
        
        setIsFocused(true);
        setShowIcons(false); // Hide icons
        Animated.parallel([
            Animated.timing(widthAnim, {
                toValue: screenWidth * 0.95, // Expand to full screen width
                duration: 300,
                useNativeDriver: false,
            }),
        ]).start();
    };

    const handleBlur = () => {
        
        
        setShowIcons(true); // Show icons
        Animated.parallel([
            Animated.timing(widthAnim, {
                toValue: 50, // Reset to initial width
                duration: 300,
                useNativeDriver: false,
            }),
        ]).start();
        Keyboard.dismiss();
        
    };

    const handleFocusPress = () => {
        if(isFocused){
            handleBlur();
            setSearchValue(null);
            setFilterValue(null);
            setIsFocused(false);
            setBackgroundColor('transparent');
            setMagnifyIcon('magnify');
            
            return
        }
        setMagnifyIcon('magnify-close');
        handleFocus();
        if (searchBarRef.current) {
            searchBarRef.current.focus();
        }
        setBackgroundColor('#3876BA33');
    };

    return (
        <View style={styles.container}>
            <View style={styles.menuContainer}>
                <View style={styles.menuContainerLeft}>
                    
                        <TouchableOpacity style={styles.iconContainerMic} onPress={() => setSideMenuVisible(true)}>
                            <Icon name="menu" size={25} color="#000" />
                        </TouchableOpacity>
                </View>
                <View style={styles.menuContainerRight}>

                    <TouchableOpacity style={styles.iconContainer} onPress={console.log(2)}>
                        <Icon name="microphone" size={25} color="#000" />
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.iconContainerSearch,{ backgroundColor: backgroundColor }]} onPress={handleFocusPress}>
                        <Icon name={magnifyIcon} size={25} color="#000" />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.iconContainer} onPress={console.log(2)}>
                        <Icon name="bell-outline" size={25} color="#000" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconContainer} onPress={console.log(2)}>
                        <Icon name="account-circle-outline" size={25} color="#000" />
                    </TouchableOpacity>

                </View>
            </View>
            <View style={styles.appointmentTextContainer}>
                {isFocused ? (
                    <SearchBar
                        ref={searchBarRef}
                        placeholder="Search"
                        onChangeText={updateSearch}
                        value={searchValue}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        containerStyle={styles.searchBar}
                        inputContainerStyle={styles.searchContainer}
                        searchIcon={{ size: 25, color: '#000' }}
                    />
                ) : (
                    <>
                        <Text style={styles.appointmentsTextToday}>Total: </Text>
                        <Text style={styles.appointmentsText}> {appointmentsNumber} Patients</Text>
                    </>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'transparent',
        marginTop: 40,
    },
    menuContainerRight: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        height: 30,
        alignSelf: 'flex-end',
    },
    menuContainerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 30,
        left: 15,
    },
    menuContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between', // Ensure left and right containers are at the edges
        width: '100%',
    },
    searchBarContainer: {
        marginRight: 10,
    },
    iconContainer: {
        width: 50,
        height: 50,
        marginHorizontal:1,
        justifyContent: 'center',
        alignItems: 'center', // Center the icon horizontally
    },
    iconContainerSearch:{
        borderRadius: 40,
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center', // Center the icon horizontally
        marginHorizontal:2
    },
    closeSearch: {
        flexDirection: 'row', // Arrange children in a row
        justifyContent: 'space-between', // Distribute space between children
        alignItems: 'center', // Center items vertically
        width: '90%', // Full width of the screen
        padding: 10, // Optional: Add some padding
        backgroundColor: 'transparent', // Optional: Background color
    },
    iconContainerBell: {
        width: 40,
        left: -5,
    },
    iconContainerMic: {},
    searchBar: {
        backgroundColor: 'transparent',
        borderBottomColor: 'transparent',
        borderTopColor: 'transparent',
        width: '95%'
    },
    searchBarInput: {
        backgroundColor: '#fff',
    },
    appointmentsText: {
        marginTop: 10,
        fontSize: 22,
        fontWeight: '500',
        textAlign: 'right',
    },
    appointmentsTextToday: {
        marginTop: 10,
        fontSize: 22,
        fontWeight: '500',
        textAlign: 'right',
        color: 'grey',
    },
    menuItem: {
        justifyContent: 'center',
    },
    appointmentText: {
        color: '#417bbc',
        fontSize: 16,
        fontWeight: 'bold',
        left: "40%",
    },
    searchContainer: {
        borderTopWidth: 0,
        borderBottomWidth: 0,
        borderRadius: 20,
        marginHorizontal: -5,
        padding: -10,
        width: '100%',
        backgroundColor:'#e8e6e6'

    },
    inputContainer: {
        backgroundColor: '#efefef',
        borderRadius: 20,
        width: '100%'
    },
    input: {
        color: '#0f0',
    },
    menuItemRight: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    animatedView: {
        position: 'absolute',
        right: 10,
    },
    appointmentTextContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        left: "5%",
        marginVertical:15
    },
    searchButton: {
        backgroundColor: '#417bbc',
        padding: 10,
        borderRadius: 5,
    },
    searchButtonText: {
        color: '#fff',
        fontSize: 16,
    },
});
export default TopMenu;