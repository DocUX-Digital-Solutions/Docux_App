import React, { useState, useRef, useEffect } from 'react';
import { TouchableOpacity, Text, StyleSheet, View, Animated } from 'react-native';
import { SearchBar } from 'react-native-elements';
import Svg, { Path } from 'react-native-svg';
import DiagnosticCodeSuggested from './DiagnosticCodeSuggested';  // Adjusted import name
import DiagnosticCodeIncluded from './DiagnosticCodeIncluded';

const DiagnosticCodeBox = ({diagnosticCodes, suggestedDiagnosticCodes}) => {
    const [searchValue, setSearchValue] = useState("");
    const searchBarRef = useRef(null);
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const [textButton, setTextButton] = useState("VIEW");
    const [fontColor, setFontColor] = useState("#000");
    const [allCodes, setAllCodes] = useState([]);
    const [suggestedCodes, setSuggestedCodes] = useState([]);
    const [suggestedCodeSearch, setSuggestedCodeSearch] = useState([]);
    const [codesIncluded, setCodesIncluded] = useState([]);

    const removeCode = (codeNumberToRemove) => {
        setCodesIncluded((prevCodes) => prevCodes.filter((code) => code.codeNumber !== codeNumberToRemove));
    };

    const addCode = (newCode) => {
        setCodesIncluded((prevCodes) => [...prevCodes, newCode]);
        setSuggestedCodes((prevCodes) => prevCodes.filter((code) => code !== newCode));
        setSearchValue(""); // Clear the search input
    };

        useEffect(() => {
        const proccessCodes = () =>{
            const totalItems = [];
            const selectedCodes = [];
            const sugestedItems = [];
            try{
            for (let i = 0; i < diagnosticCodes.length; i++) {
                try{
                    var codesKeyList = diagnosticCodes[i].split("-");

                    
                    var splitDict = {codeNumber:codesKeyList[0].replace(/\s+/g, ''), description: codesKeyList[1].replace(/\s+/g, '')};
                    
                    if (typeof splitDict === 'object' && splitDict !== null) {
                    totalItems.push(splitDict);
                    selectedCodes.push(splitDict);
                    }
                }catch(error){
    
                }
    
            }
    
            for (let i = 0; i < suggestedDiagnosticCodes.length; i++) {
                try{
                    var codesKeyList = suggestedDiagnosticCodes[i].split("-");
                    var splitDict = {codeNumber:codesKeyList[0], description: codesKeyList[1]};
                    if (typeof splitDict === 'object' && splitDict !== null) {
                    totalItems.push(splitDict);
                    sugestedItems.push(splitDict);
                    }
                }catch(error){
                    
                }
    
            }
    
            setAllCodes(totalItems);
            setCodesIncluded(selectedCodes);
            setSuggestedCodes(sugestedItems);
            }catch(error){
            }
    
    
        }
        proccessCodes();
        
    }, []);

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
            <DiagnosticCodeIncluded
                key={code.codeNumber}
                codeInfo={code}
                onRemove={() => removeCode(code.codeNumber)} // Pass the removal function
            />
        )) ) : (
            <Text>No codes found</Text>
        );
    };

    const renderCodesSuggested = () => {
        return suggestedCodes.length > 0 ? (
            suggestedCodes.map((code) => (
                <DiagnosticCodeSuggested
                    key={code.codeNumber}
                    codeInfo={code}
                    onRemove={() => addCode(code)} // Add the selected code to `codesIncluded`
                />
            ))
        ) : (
            <Text>No codes found</Text>
        );
    };
    const renderCodesSuggestedSearch = () => {
        return suggestedCodeSearch.length > 0 ? (
            suggestedCodeSearch.map((code) => (
                <DiagnosticCodeSuggested
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
                        backgroundColor: '#FFFDF0',
                        paddingBottom: 0,
                    },
                ]}
            >
                <View style={styles.header}>
                    <Text style={[styles.headerText, { color: fontColor }]}>
                        DIAGNOSTIC CODES - {codesIncluded.length}
                    </Text>
                    <TouchableOpacity style={styles.viewButton} onPress={toggleDropdown}>
                        <Text style={styles.viewButtonText}>{textButton}</Text>
                    </TouchableOpacity>
                </View>
                {isDropdownVisible && (
                    <Animated.View>
                        <SearchBar
                            ref={searchBarRef}
                            placeholder="Add Codes"
                            onChangeText={updateSearch}
                            value={searchValue}
                            containerStyle={styles.searchBar}
                            inputContainerStyle={styles.searchContainer}
                            searchIcon={{ size: 18, color: '#000' }}
                        />
                        {searchValue.length === 0 ? (
                            <>
                                <View style={styles.includedBox}>
                                    <Text style={styles.headerItemText}>SELECTED DIAGNOSTIC CODES</Text>
                                    {renderCodesIncluded()}
                                </View>
                                <Svg height="1" width="100%">
                                    <Path
                                        d="M 0 1 L 1000 1"
                                        stroke="black"
                                        strokeWidth="1"
                                        strokeDasharray="6 3"
                                    />
                                </Svg>
                                <View style={styles.suggestedBox}>
                                    <Text style={styles.headerItemText}>SUGGESTED DIAGNOSTIC CODES</Text>
                                    {renderCodesSuggested()}
                                </View>
                            </>
                        ) : (
                            <View style={styles.suggestedBox}>
                                    <Text style={styles.headerItemText}>SUGGESTED DIAGNOSTIC CODES</Text>
                                    {renderCodesSuggestedSearch()}
                                </View>
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
        borderBottomColor: 'transparent',
        borderTopColor: 'transparent',
        width: '95%',
    },
    searchContainer: {
        borderTopWidth: 0,
        borderBottomWidth: 0,
        borderRadius: 20,
        width: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
    },
    includedBox: {
        padding: 10,
    },
    suggestedBox: {
        backgroundColor: '#FFF9D1',
        padding: 10,
    },
    headerItemText: {
        fontWeight: 'bold',
    },
    codeItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5,
    },
    codeText: {
        fontSize: 16,
    },
    addButton: {
        color: 'green',
        fontWeight: 'bold',
    },
    removeButton: {
        color: 'red',
        fontWeight: 'bold',
    },
});

export default DiagnosticCodeBox;
