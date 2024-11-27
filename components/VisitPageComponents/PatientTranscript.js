import React, { useEffect, useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, View, FlatList } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const PatientTranscript = () => {
    const [lateOnTimeTextColor, setLateOnTimeTextColor] = useState('red');
    const [opacityValue, setOpacityValue] = useState(1);
    const [appointmentTime, setAppointmentTime] = useState(null);
    const [data, setData] = useState([
        { id: '1', text: 'A React Component that will be used to render sticky headers, should be used together with stickyHeaderIndices. You may need to set this component if your sticky header uses custom transforms, for example, when you want your list to have an animated and hidable header. If a component has not been provided, the default ScrollViewStickyHeader component will be used.' },
        { id: '2', text: 'A React Component that will be used to render sticky headers, should be used together with stickyHeaderIndices. You may need to set this component if your sticky header uses custom transforms, for example, when you want your list to have an animated and hidable header. If a component has not been provided, the default ScrollViewStickyHeader component will be used.' },
        { id: '3', text: 'A React Component that will be used to render sticky headers, should be used together with stickyHeaderIndices. You may need to set this component if your sticky header uses custom transforms, for example, when you want your list to have an animated and hidable header. If a component has not been provided, the default ScrollViewStickyHeader component will be used.' },
        { id: '4', text: 'A React Component that will be used to render sticky headers, should be used together with stickyHeaderIndices. You may need to set this component if your sticky header uses custom transforms, for example, when you want your list to have an animated and hidable header. If a component has not been provided, the default ScrollViewStickyHeader component will be used.' },
        { id: '5', text: 'A React Component that will be used to render sticky headers, should be used together with stickyHeaderIndices. You may need to set this component if your sticky header uses custom transforms, for example, when you want your list to have an animated and hidable header. If a component has not been provided, the default ScrollViewStickyHeader component will be used.' },
        { id: '6', text: 'A React Component that will be used to render sticky headers, should be used together with stickyHeaderIndices. You may need to set this component if your sticky header uses custom transforms, for example, when you want your list to have an animated and hidable header. If a component has not been provided, the default ScrollViewStickyHeader component will be used.' },
        { id: '7', text: 'A React Component that will be used to render sticky headers, should be used together with stickyHeaderIndices. You may need to set this component if your sticky header uses custom transforms, for example, when you want your list to have an animated and hidable header. If a component has not been provided, the default ScrollViewStickyHeader component will be used.' },
        { id: '8', text: 'A React Component that will be used to render sticky headers, should be used together with stickyHeaderIndices. You may need to set this component if your sticky header uses custom transforms, for example, when you want your list to have an animated and hidable header. If a component has not been provided, the default ScrollViewStickyHeader component will be used.' },
        { id: '9', text: 'A React Component that will be used to render sticky headers, should be used together with stickyHeaderIndices. You may need to set this component if your sticky header uses custom transforms, for example, when you want your list to have an animated and hidable header. If a component has not been provided, the default ScrollViewStickyHeader component will be used.' },
        { id: '10', text: 'A React Compo    nent that will be used to render sticky headers, should be used together with stickyHeaderIndices. You may need to set this component if your sticky header uses custom transforms, for example, when you want your list to have an animated and hidable header. If a component has not been provided, the default ScrollViewStickyHeader component will be used.' },
        { id: '11', text: 'A React Component that will be used to render sticky headers, should be used together with stickyHeaderIndices. You may need to set this component if your sticky header uses custom transforms, for example, when you want your list to have an animated and hidable header. If a component has not been provided, the default ScrollViewStickyHeader component will be used.' },
        { id: '12', text: 'A React Component that will be used to render sticky headers, should be used together with stickyHeaderIndices. You may need to set this component if your sticky header uses custom transforms, for example, when you want your list to have an animated and hidable header. If a component has not been provided, the default ScrollViewStickyHeader component will be used.' },

    ]);

    const renderItem = ({ item }) => (
        <View style={styles.transcriptTextBox}>
            <Text style={styles.transcriptText}>{item.text}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
 
 <FlatList
                    data={data}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                    style={styles.flatListContent}
                    showsVerticalScrollIndicator={false}
                    scrollEventThrottle={16}
                    contentContainerStyle={{ paddingVertical: 25 }}
                />
  
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        borderRadius: 20,
        alignItems: 'center',
        width: '90%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: .1,
    },
    flatListContent: {
        width: '100%',
        height: '100%',
    },
    transcriptText: {
        fontSize: 18,
        flexShrink: 1, // Allow text to shrink if necessary
    },
    transcriptTextBox: {
        flexDirection: 'row',
        alignItems: 'flex-start', // Align items to the top
        marginBottom: 20,
        width: '100%', // Ensure full width of the container
        flexWrap: 'wrap', // Allow wrapping of text
        paddingHorizontal: 10, // Optional: Add padding for better readability
    },
});


export default PatientTranscript;
