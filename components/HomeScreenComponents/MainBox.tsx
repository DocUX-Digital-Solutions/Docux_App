import React, { useContext, useRef, useState } from 'react';
import { View, FlatList, StyleSheet, Animated, Text } from 'react-native';
import PatientCard from './PatientCard';
import TopMenu from './TopMenuBar';


const MainBox = ({ navigation, setSideMenuVisible,jsonData,patientsNumber }) => {
    
    const scrollY = useRef(new Animated.Value(0)).current;
    const [listHeight, setListHeight] = useState(0);
    const [contentHeight, setContentHeight] = useState(1);
    const [searchValue, setSearchValue] = useState(null);
    
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
            {jsonData.length === 0 ? (
                <View style={styles.noPatientsContainer}>
                    <Text style={styles.noPatientsText}>No patients found</Text>
                </View>
            ) : (
                <FlatList
                    data={jsonData}
                    keyExtractor={(item) => item.id}
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