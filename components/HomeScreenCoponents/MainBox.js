import React, { useContext, useRef, useState } from 'react';
import { View, FlatList, StyleSheet, Animated } from 'react-native';
import PatientBox from './PatientBox';
import TopMenu from './TopMenuBar'
import { UserContext } from '../../data/loadData';

const MainBox = ({navigation}) => {
    const { organizedAppointments } = useContext(UserContext);
    const scrollY = useRef(new Animated.Value(0)).current;
    const [listHeight, setListHeight] = useState(0);
    const [contentHeight, setContentHeight] = useState(1);

    const renderItem = ({ item }) => (
        <PatientBox timeDataBlock={Object.values(item.appointments)} time={item.time} navigation={navigation}/>
    );

    const handleScroll = Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
        { useNativeDriver: false }
    );

    const indicatorHeight = listHeight * (listHeight / contentHeight) *1.5;

    const translateY = scrollY.interpolate({
        inputRange: [0, Math.max(0, contentHeight - listHeight)],
        outputRange: [0, Math.max(0, listHeight - indicatorHeight) * 0.85], // Stop 10% from the bottom
        extrapolate: 'clamp',
    });

    return (
        <View style={styles.container}>
            <View style={styles.topBar}>
                <TopMenu appointmentsNumber={20} useExpand={false} />
            </View>

            <View style={styles.scrollBarContainer}>
                <Animated.View
                    style={[
                        styles.scrollIndicator,
                        { height: indicatorHeight, transform: [{ translateY }] },
                    ]}
                />
            </View>
            <FlatList
                data={Object.entries(organizedAppointments).map(([time, appointments], index) => ({
                    id: index.toString(),
                    time,
                    appointments,
                }))}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                style={styles.flatListContent}
                contentContainerStyle={[styles.listContentContainer, { paddingBottom:50}]}
                showsVerticalScrollIndicator={false}
                onScroll={handleScroll}
                onLayout={(e) => setListHeight(e.nativeEvent.layout.height)}
                onContentSizeChange={(w, h) => setContentHeight(h)}
                scrollEventThrottle={16}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#f5f5f7",
        flex: 1,
    },
    topBar: {
        height: "10%",
        marginTop: '1.5%'
    },
    listContentContainer: {
        paddingBottom: 20,
    },
    flatListContent: {
        width: '100%',
        height: '100%',
    },
    scrollBarContainer: {
        position: 'absolute',
        right: 6,
        top: '15%', // Adjust this value to position the scrollbar correctly
        width: 5,
        height: '80%', // Make the grey scrollbar take up 80% of the screen height
        backgroundColor: '#c3c3c3',
        borderRadius: 5,
    },
    scrollIndicator: {
        width: '100%',
        backgroundColor: '#194a81',
        borderRadius: 5,
    },
});

export default MainBox;
