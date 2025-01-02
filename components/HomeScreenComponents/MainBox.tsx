import React, { useContext, useRef, useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Animated, Text } from 'react-native';
import PatientCard from './PatientCard';
import TopMenu from './TopMenuBar';


const MainBox = ({ navigation, setSideMenuVisible, jsonData, patientsNumber }) => {

    const [searchValue, setSearchValue] = useState(null);
    const [content, setContent] = useState(jsonData);

    useEffect(() => {
        const itemsSearch = [];

        try {
            for (const item of jsonData) {
                if (item.patientName.toLowerCase().includes(searchValue.toLowerCase()) || item.reason.toLowerCase().includes(searchValue.toLowerCase())) {
                    itemsSearch.push(item);
                }
            }
            setContent(itemsSearch);
        } catch (error) {
            setContent(jsonData);
        }

    }, [searchValue]);


    const renderItem = ({ item }) => (
        <View style={styles.cardsContainer}>
            <View style={styles.cardWrapper}>
                <PatientCard
                    item={item}
                    navigation={navigation}
                />
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.topBar}>
                <TopMenu appointmentsNumber={patientsNumber} useExpand={true} setSideMenuVisible={setSideMenuVisible} setFilterValue={setSearchValue} />
            </View>
            {content.length === 0 ? (
                <View style={styles.noPatientsContainer}>
                    <Text style={styles.noPatientsText}>No patients found</Text>
                </View>
            ) : (
                <FlatList
                    data={content}
                    keyExtractor={(item) => item.appointmentId}
                    renderItem={renderItem}
                    style={styles.flatListContent}
                    showsVerticalScrollIndicator={false}
                    scrollEventThrottle={16}
                    contentContainerStyle={{ paddingBottom: 50 }}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    topBar: {},
    listContentContainer: {
        paddingBottom: 20,
    },
    flatListContent: {
        width: '100%',
        height: '100%',
    },
    scrollBarContainer: {
        right: 6,
        top: '15%',
        width: 5,
        height: '80%',
        backgroundColor: '#c3c3c3',
        borderRadius: 5,
    },
    scrollIndicator: {
        width: '100%',
        backgroundColor: '#194a81',
        borderRadius: 5,
    },
    cardsContainer: {
        flexWrap: 'wrap',
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
    },
    cardWrapper: {
        width: '90%',
        padding: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 5,
    },
    noPatientsContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    noPatientsText: {
        fontSize: 18,
        color: 'grey',
    },
});

export default MainBox;