import React, { useState, useRef, useEffect } from 'react';
import { FlatList, TouchableOpacity, Text, StyleSheet, View, Animated, ImageBackground, TextInput } from 'react-native';
import { SearchBar } from 'react-native-elements';
import Svg, { Path } from 'react-native-svg';
import BillingCodeSuggested from './BillingCodeSuggested';
import BillingCodeIncluded from './BillingCodeIncluded';
const VeraHealthBox = () => {
    const [searchValue, setSearchValue] = useState("");
    const searchBarRef = useRef(null);
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const [textButton, setTextButton] = useState("VIEW");
    const [fontColor, setFontColor] = useState("#000");

    const [allCodes, setAllCodes] = useState([]);
    const [suggestedCodes, setSuggestedCodes] = useState([]);
    const [suggestedCodeSearch, setSuggestedCodeSearch] = useState([]);
    const [codesIncluded, setCodesIncluded] = useState([]);
    const DATA = [
        { id: '1', title: 'Short' },
        { id: '2', title: 'Medium Length' },
        { id: '3', title: 'A much longer button title to test resizing' },
    ];
    const removeCode = (codeNumberToRemove) => {
        setCodesIncluded((prevCodes) => prevCodes.filter((code) => code.codeNumber !== codeNumberToRemove));
    };

    const addCode = (newCode) => {
        setCodesIncluded((prevCodes) => [...prevCodes, newCode]);
        setSuggestedCodes((prevCodes) => prevCodes.filter((code) => code !== newCode));
        setSearchValue(""); // Clear the search input
    };



    const updateSearch = (value) => {
        setSearchValue(value);
        if (value.trim().length > 0) {
            const filteredCodes = allCodes
                .filter(
                    (code) =>
                        code.codeNumber.toLowerCase().includes(value.toLowerCase()) ||
                        code.description.toLowerCase().includes(value.toLowerCase())
                )
                .filter((code) => !codesIncluded.some((included) => included.codeNumber === code.codeNumber)); // Exclude already included codes
            setSuggestedCodeSearch(filteredCodes);
        } else {
            setSuggestedCodeSearch([]);
        }
    };

    const toggleDropdown = () => {
        setIsDropdownVisible(!isDropdownVisible);
        setTextButton((prev) => (prev === "VIEW" ? "HIDE" : "VIEW"));
        setFontColor((prev) => (prev === "#000" ? "#346AAC" : "#000"));
    };

    const renderCodesIncluded = () => {
        return codesIncluded.length > 0 ? (
            codesIncluded.map((code) => (
                <BillingCodeIncluded
                    key={code.codeNumber}
                    codeInfo={code}
                    onRemove={() => removeCode(code.codeNumber)} // Pass the removal function
                />
            ))) : (
            <Text>No codes found</Text>
        );
    };

    const handleSuggestedClicked = (text) =>{
        console.log(text);
        setSearchValue(text);

    }

    const renderCodesSuggested = () => {
        return suggestedCodes.length > 0 ? (
            suggestedCodes.map((code) => (
                <BillingCodeSuggested
                    key={code.codeNumber}
                    codeInfo={code}
                    onRemove={() => addCode(code)} // Add the selected code to `codesIncluded`
                />
            ))
        ) : (
            <Text>No codes found</Text>
        );
    };
    const renderItemSuggested = ({ item }) => (
        <TouchableOpacity style={styles.buttonSuggested} onPress={()=>handleSuggestedClicked(item.title)}>
            <Text style={styles.buttonSuggestedText}>{item.title}</Text>
        </TouchableOpacity>
    );

    const renderCodesSuggestedSearch = () => {
        return suggestedCodeSearch.length > 0 ? (
            suggestedCodeSearch.map((code) => (
                <BillingCodeSuggested
                    key={code.codeNumber}
                    codeInfo={code}
                    onRemove={() => addCode(code)} // Add the selected code to `codesIncluded`
                />
            ))
        ) : (
            <Text>No codes found</Text>
        );
    };


    return (
        <View style={styles.container}>
            <View
                style={[
                    styles.innerBox,
                    isDropdownVisible && {

                        paddingBottom: 10,
                    },
                ]}
            >
                <View style={styles.header}>
                    <ImageBackground
                        style={styles.logoStyle}
                        source={require('../../assets/veraHealth.png')}
                        resizeMode="contain"
                    />

                    <TouchableOpacity style={styles.viewButton} onPress={toggleDropdown}>
                        <Text style={styles.viewButtonText}>{textButton}</Text>
                    </TouchableOpacity>
                </View>
                {isDropdownVisible && (
                    <Animated.View>
                        <FlatList
                data={DATA}
                renderItem={renderItemSuggested}
                keyExtractor={item => item.id}
                style={styles.buttonSuggestionList}
                scrollEnabled={false}
            />
                        <TextInput
                            style={styles.searchContainer}
                            placeholder="Ask a question..."
                            value={searchValue}
                            onChangeText={(text) => updateSearch(text)}
                        />
                        {searchValue.length === 0 ? (
                            <>

                            </>
                        ) : (
                            <></>
                        )}
                    </Animated.View>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        width: '100%',
        paddingBottom: 10,
    },
    innerBox: {
        backgroundColor: '#fff',
        borderRadius: 10,
        width: '90%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
    },
    headerText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#000',
    },
    viewButton: {
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    viewButtonText: {
        color: '#346AAC',
        fontSize: 16,
        fontWeight: 'bold',
    },
    searchBar: {
        backgroundColor: 'transparent',
        borderTopWidth: 0,
        borderBottomWidth: 0,

    },
    searchContainer: {
        backgroundColor: 'white',
        borderRadius: 15,
        borderWidth: 1,
        height:50,
        paddingLeft:20,
        fontSize:16,
        width:"95%",
        alignSelf:'center',
        borderColor: 'rgba(0, 0, 0, 0.2)',
        

    },
    includedBox: {
        padding: 10,
    },
    suggestedBox: {
        padding: 10,
    },
    suggestedText: {
        fontWeight: 'bold',
    },
    logoStyle: {
        width: 100,
        height: 40,
    },
    buttonSuggested: {
        backgroundColor: '#E3E4E6',
        paddingVertical: 5,
        paddingHorizontal: 10,
        marginVertical: 5,
        borderRadius: 10,
        alignItems: 'flex-start', // Align items to the start (left) of the button
        maxWidth: '96%',
        alignSelf: 'flex-start',
        paddingLeft: 10,
        justifyContent: 'center', // Center content vertically
    },
    buttonSuggestedText: {
        color: 'black',
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'left', // Align text to the left
        width: '100%', // Ensure text takes the full width of the container
    },
    buttonSuggestionList:{
        paddingLeft:10,
        paddingBottom:10
    }



});

export default VeraHealthBox;
