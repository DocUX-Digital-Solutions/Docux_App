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
            <Icon name="checkbox-blank-circle" style={styles.transcriptDot} size={10} color="#336aac" />
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
        borderRadius: 10,
        alignItems: 'center',
        width: '90%',
    
        
    },
    flatListContent: {
        width: '100%',
        height: '100%',
    },
    smallTextStyle: {
        fontSize: 11,
        fontWeight: '500'
    },
    textPatientCard: {
        alignSelf: 'flex-start',
        marginHorizontal: '6%',
        marginBottom: 4
    },
    innerContainerBox: {
        backgroundColor: '#fff',
        borderRadius: 10,
        width: '100%',
        minHeight: 200,
        marginHorizontal: "2%",
        paddingBottom: 15
    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: "#346aac"
    },
    transcriptDot:{
        paddingTop:3,
        marginRight:10
    },
    alertBox: {
        fontSize: 12,
        fontWeight: '900',
        marginBottom: 5
    },
    topPatientInforBox: {
        width: '100%',
        left: "5%",
        top: '4%',
        paddingBottom: 20
    },
    transcriptBox: {
        width: '95%',
        alignContent: 'center',
        alignSelf: 'center',
        marginTop: 30
    },
    transcriptText: {
        fontSize: 18,
    },
    transcriptTextBox: {
        flexDirection: 'row',
        alignItems: 'flex-start', // Align items to the top
        marginBottom: 20,
        width:"90%"
    },
});

export default PatientTranscript;
