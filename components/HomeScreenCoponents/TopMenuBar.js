import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Keyboard, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { SearchBar } from 'react-native-elements';

const screenWidth = Dimensions.get('window').width;

const TopMenu = ({ appointmentsNumber, useExpand }) => {
    const [searchValue, setSearchValue] = useState("");
    const [isFocused, setIsFocused] = useState(false);
    const widthAnim = useRef(new Animated.Value(50)).current;
    const opacityAnim = useRef(new Animated.Value(1)).current; // Opacity animation value
    const searchBarRef = useRef(null);

    const updateSearch = (searchValue) => {
        setSearchValue(searchValue);
    };

    const handleFocus = () => {
        if (!useExpand) return;

        setIsFocused(true);
        Animated.parallel([
            Animated.timing(widthAnim, {
                toValue: screenWidth * 0.9, // Expand to nearly full screen width
                duration: 300,
                useNativeDriver: false,
            }),
            Animated.timing(opacityAnim, {
                toValue: 0,
                duration: 300,
                useNativeDriver: false,
            }),
        ]).start();
    };

    const handleBlur = () => {
        setIsFocused(false);
        Animated.parallel([
            Animated.timing(widthAnim, {
                toValue: 50, // Reset to initial width
                duration: 300,
                useNativeDriver: false,
            }),
            Animated.timing(opacityAnim, {
                toValue: 1,
                duration: 300,
                useNativeDriver: false,
            }),
        ]).start();
        Keyboard.dismiss();
    };

    const handleFocusPress = () => {
        handleFocus();
        if (searchBarRef.current) {
            searchBarRef.current.focus();
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.menuContainer}>
                <Animated.View style={[styles.menuItem, { opacity: opacityAnim }]}>
                    <Text style={styles.appointmentText}>Today's Appointments {appointmentsNumber}</Text>
                </Animated.View>
                <View style={styles.menuItemRight}>
                    <TouchableOpacity style={styles.microphoneStyle}>
                        <Icon name="microphone" size={30} color="#686868" />
                    </TouchableOpacity>
                    {useExpand ? (
                        <TouchableOpacity onPress={handleFocusPress}>
                            <Animated.View style={[styles.animatedView, { width: widthAnim }]}>
                                <SearchBar
                                    ref={searchBarRef}
                                    placeholder="Search past or upcoming appointments"
                                    onChangeText={updateSearch}
                                    value={searchValue}
                                    onFocus={handleFocus}
                                    onBlur={handleBlur}
                                    containerStyle={styles.searchContainer}
                                    inputContainerStyle={styles.inputContainer}
                                    inputStyle={{ ...styles.input, fontSize: 18 }}
                                />
                            </Animated.View>
                        </TouchableOpacity>
                    ) : (
                        <SearchBar
                            ref={searchBarRef}
                            placeholder="Search past or upcoming appointments"
                            onChangeText={updateSearch}
                            value={searchValue}
                            containerStyle={styles.searchContainer}
                            inputContainerStyle={styles.inputContainer}
                            inputStyle={{ ...styles.input, fontSize: 18 }}
                        />
                    )}
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: 'transparent',
        height:"20%"
    },
    menuContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: '2%',
    },
    menuItem: {
        justifyContent: 'center',
    },
    appointmentText: {
        color: '#417bbc',
        fontSize: 16,
        fontWeight: 'bold',
        left:"40%"
    },
    searchContainer: {
        backgroundColor: 'transparent',
        borderTopWidth: 0,
        borderBottomWidth: 0,
        width: '70%',
    },
    inputContainer: {
        backgroundColor: '#efefef',
        borderRadius: 20,
        maxHeight:'100%'
    },
    input: {
        color: '#000',
    },
    menuItemRight: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    microphoneStyle: {
        marginRight: 10,
    },
    animatedView: {
        position: 'absolute',
        right: 10,
    },
});

export default TopMenu;
