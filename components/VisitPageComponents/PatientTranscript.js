import React, { useEffect, useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, View, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const PatientInfoBox = ({ timeAppointment, namePatient, symptoms, navigation }) => {
    const [lateOnTimeTextColor, setLateOnTimeTextColor] = useState('red');
    const [opacityValue, setOpacityValue] = useState(1);
    const [appointmentTime, setAppointmentTime] = useState(null);
    const [data, setData] = useState([
        { id: '1', text: 'A React Component that will be used to render sticky headers, should be used together with stickyHeaderIndices. You may need to set this component if your sticky header uses custom transforms, for example, when you want your list to have an animated and hidable header. If a component has not been provided, the default ScrollViewStickyHeader component will be used.' },
        { id: '1', text: 'A React Component that will be used to render sticky headers, should be used together with stickyHeaderIndices. You may need to set this component if your sticky header uses custom transforms, for example, when you want your list to have an animated and hidable header. If a component has not been provided, the default ScrollViewStickyHeader component will be used.' },
        { id: '1', text: 'A React Component that will be used to render sticky headers, should be used together with stickyHeaderIndices. You may need to set this component if your sticky header uses custom transforms, for example, when you want your list to have an animated and hidable header. If a component has not been provided, the default ScrollViewStickyHeader component will be used.' },
        { id: '1', text: 'A React Component that will be used to render sticky headers, should be used together with stickyHeaderIndices. You may need to set this component if your sticky header uses custom transforms, for example, when you want your list to have an animated and hidable header. If a component has not been provided, the default ScrollViewStickyHeader component will be used.' },
        { id: '1', text: 'A React Component that will be used to render sticky headers, should be used together with stickyHeaderIndices. You may need to set this component if your sticky header uses custom transforms, for example, when you want your list to have an animated and hidable header. If a component has not been provided, the default ScrollViewStickyHeader component will be used.' },
        { id: '1', text: 'A React Component that will be used to render sticky headers, should be used together with stickyHeaderIndices. You may need to set this component if your sticky header uses custom transforms, for example, when you want your list to have an animated and hidable header. If a component has not been provided, the default ScrollViewStickyHeader component will be used.' },
        { id: '1', text: 'A React Component that will be used to render sticky headers, should be used together with stickyHeaderIndices. You may need to set this component if your sticky header uses custom transforms, for example, when you want your list to have an animated and hidable header. If a component has not been provided, the default ScrollViewStickyHeader component will be used.' },
        { id: '1', text: 'A React Component that will be used to render sticky headers, should be used together with stickyHeaderIndices. You may need to set this component if your sticky header uses custom transforms, for example, when you want your list to have an animated and hidable header. If a component has not been provided, the default ScrollViewStickyHeader component will be used.' },
        { id: '1', text: 'A React Component that will be used to render sticky headers, should be used together with stickyHeaderIndices. You may need to set this component if your sticky header uses custom transforms, for example, when you want your list to have an animated and hidable header. If a component has not been provided, the default ScrollViewStickyHeader component will be used.' },
        { id: '1', text: 'A React Component that will be used to render sticky headers, should be used together with stickyHeaderIndices. You may need to set this component if your sticky header uses custom transforms, for example, when you want your list to have an animated and hidable header. If a component has not been provided, the default ScrollViewStickyHeader component will be used.' },
        { id: '1', text: 'A React Component that will be used to render sticky headers, should be used together with stickyHeaderIndices. You may need to set this component if your sticky header uses custom transforms, for example, when you want your list to have an animated and hidable header. If a component has not been provided, the default ScrollViewStickyHeader component will be used.' },
        { id: '1', text: 'A React Component that will be used to render sticky headers, should be used together with stickyHeaderIndices. You may need to set this component if your sticky header uses custom transforms, for example, when you want your list to have an animated and hidable header. If a component has not been provided, the default ScrollViewStickyHeader component will be used.' },

    ]);

    const renderItem = ({ item }) => (
        <View style={styles.transcriptTextBox}>
            <Icon name="checkbox-blank-circle" style={styles.transcriptDot} size={10} color="#336aac" />
            <Text style={styles.transcriptText}>{item.text}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.textPatientCard}>
                <Text style={styles.headerText}>Transcript</Text>
            </View>
            <View style={styles.innerContainerBox}>
                <View style={styles.transcriptBox}>
                    <FlatList
                        data={data}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id}
                        scrollEnabled={false} // Disable scrolling
                    />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'transparent',
        borderRadius: 10,
        alignItems: 'center',
        width: '58%',
       paddingBottom:30
        
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
        fontSize: 12,
    },
    transcriptTextBox: {
        flexDirection: 'row',
        alignItems: 'flex-start', // Align items to the top
        marginBottom: 20,
        width:"95%"
    },
});

export default PatientInfoBox;
