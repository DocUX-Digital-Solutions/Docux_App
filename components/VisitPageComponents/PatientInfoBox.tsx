import React, { useEffect, useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, View,ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const PatientInfoBox = ({ timeAppointment, namePatient, symptoms, navigation }) => {
    const [lateOnTimeTextColor, setLateOnTimeTextColor] = useState('red');
    const [opacityValue, setOpacityValue] = useState(1);
    const [appointmentTime, setAppointmentTime] = useState(null)




    return (
        <View style={styles.container}>
            <View style={styles.textPatientCard}>
                <Text style={[styles.headerText,{color:fontColor}]}>Patient Card</Text>
            </View>
            <View style={styles.innerContainerBox}>
                <TouchableOpacity style={styles.topdotsMenu}>
                    <Icon name="dots-horizontal" size={25} color="#d8dce4" />
                </TouchableOpacity>
                <View style={styles.topPatientInforBox}>


                    <Text style={styles.alertBox}>Alert: REFERED FROM ER</Text>
                    <Text style={styles.smallTextStyle}>Patient:{namePatient} </Text>
                    <Text style={styles.smallTextStyle}>Time:    {timeAppointment}</Text>
                    <Text style={styles.smallTextStyle}>Reason for Visit: {symptoms}</Text>
                </View>
                <View style={styles.dividerStyle}></View>
                <View style={styles.summaryTextBox}>
                    <Text style={styles.smallTextStyle}>
                    A React Component that will be used to render sticky headers, should be used together with stickyHeaderIndices. You may need to set this component if your sticky header uses custom transforms, for example, when you want your list to have an animated and hidable header. If a component has not been provided, the default ScrollViewStickyHeader component will be used.A React Component that will be used to render sticky headers, should be used together with stickyHeaderIndices. You may need to set this component if your sticky header uses custom transforms, for example, when you want your list to have an animated and hidable header. If a component has not been provided, the default ScrollViewStickyHeader component will be used.A React Component that will be used to render sticky headers, should be used together with stickyHeaderIndices. You may need to set this component if your sticky header uses custom transforms, for example, when you want your list to have an animated and hidable header. If a component has not been provided, the default ScrollViewStickyHeader component will be used.A React Component that will be used to render sticky headers, should be used together with stickyHeaderIndices. You may need to set this component if your sticky header uses custom transforms, for example, when you want your list to have an animated and hidable header. If a component has not been provided, the default ScrollViewStickyHeader component will be used.A React Component that will be used to render sticky headers, should be used together with stickyHeaderIndices. You may need to set this component if your sticky header uses custom transforms, for example, when you want your list to have an animated and hidable header. If a component has not been provided, the default ScrollViewStickyHeader component will be used.A React Component that will be used to render sticky headers, should be used together with stickyHeaderIndices. You may need to set this component if your sticky header uses custom transforms, for example, when you want your list to have an animated and hidable header. If a component has not been provided, the default ScrollViewStickyHeader component will be used.A React Component that will be used to render sticky headers, should be used together with stickyHeaderIndices. You may need to set this component if your sticky header uses custom transforms, for example, when you want your list to have an animated and hidable header. If a component has not been provided, the default ScrollViewStickyHeader component will be used.A React Component that will be used to render sticky headers, should be used together with stickyHeaderIndices. You may need to set this component if your sticky header uses custom transforms, for example, when you want your list to have an animated and hidable header. If a component has not been provided, the default ScrollViewStickyHeader component will be used.A React Component that will be used to render sticky headers, should be used together with stickyHeaderIndices. You may need to set this component if your sticky header uses custom transforms, for example, when you want your list to have an animated and hidable header. If a component has not been provided, the default ScrollViewStickyHeader component will be used.A React Component that will be used to render sticky headers, should be used together with stickyHeaderIndices. You may need to set this component if your sticky header uses custom transforms, for example, when you want your list to have an animated and hidable header. If a component has not been provided, the default ScrollViewStickyHeader component will be used.A React Component that will be used to render sticky headers, should be used together with stickyHeaderIndices. You may need to set this component if your sticky header uses custom transforms, for example, when you want your list to have an animated and hidable header. If a component has not been provided, the default ScrollViewStickyHeader component will be used.A React Component that will be used to render sticky headers, should be used together with stickyHeaderIndices. You may need to set this component if your sticky header uses custom transforms, for example, when you want your list to have an animated and hidable header. If a component has not been provided, the default ScrollViewStickyHeader component will be used.A React Component that will be used to render sticky headers, should be used together with stickyHeaderIndices. You may need to set this component if your sticky header uses custom transforms, for example, when you want your list to have an animated and hidable header. If a component has not been provided, the default ScrollViewStickyHeader component will be used.A React Component that will be used to render sticky headers, should be used together with stickyHeaderIndices. You may need to set this component if your sticky header uses custom transforms, for example, when you want your list to have an animated and hidable header. If a component has not been provided, the default ScrollViewStickyHeader component will be used.A React Component that will be used to render sticky headers, should be used together with stickyHeaderIndices. You may need to set this component if your sticky header uses custom transforms, for example, when you want your list to have an animated and hidable header. If a component has not been provided, the default ScrollViewStickyHeader component will be used.A React Component that will be used to render sticky headers, should be used together with stickyHeaderIndices. You may need to set this component if your sticky header uses custom transforms, for example, when you want your list to have an animated and hidable header. If a component has not been provided, the default ScrollViewStickyHeader component will be used.A React Component that will be used to render sticky headers, should be used together with stickyHeaderIndices. You may need to set this component if your sticky header uses custom transforms, for example, when you want your list to have an animated and hidable header. If a component has not been provided, the default ScrollViewStickyHeader component will be used.A React Component that will be used to render sticky headers, should be used together with stickyHeaderIndices. You may need to set this component if your sticky header uses custom transforms, for example, when you want your list to have an animated and hidable header. If a component has not been provided, the default ScrollViewStickyHeader component will be used.A React Component that will be used to render sticky headers, should be used together with stickyHeaderIndices. You may need to set this component if your sticky header uses custom transforms, for example, when you want your list to have an animated and hidable header. If a component has not been provided, the default ScrollViewStickyHeader component will be used.A React Component that will be used to render sticky headers, should be used together with stickyHeaderIndices. You may need to set this component if your sticky header uses custom transforms, for example, when you want your list to have an animated and hidable header. If a component has not been provided, the default ScrollViewStickyHeader component will be used.A React Component that will be used to render sticky headers, should be used together with stickyHeaderIndices. You may need to set this component if your sticky header uses custom transforms, for example, when you want your list to have an animated and hidable header. If a component has not been provided, the default ScrollViewStickyHeader component will be used.A React Component that will be used to render sticky headers, should be used together with stickyHeaderIndices. You may need to set this component if your sticky header uses custom transforms, for example, when you want your list to have an animated and hidable header. If a component has not been provided, the default ScrollViewStickyHeader component will be used.A React Component that will be used to render sticky headers, should be used together with stickyHeaderIndices. You may need to set this component if your sticky header uses custom transforms, for example, when you want your list to have an animated and hidable header. If a component has not been provided, the default ScrollViewStickyHeader component will be used.A React Component that will be used to render sticky headers, should be used together with stickyHeaderIndices. You may need to set this component if your sticky header uses custom transforms, for example, when you want your list to have an animated and hidable header. If a component has not been provided, the default ScrollViewStickyHeader component will be used.A React Component that will be used to render sticky headers, should be used together with stickyHeaderIndices. You may need to set this component if your sticky header uses custom transforms, for example, when you want your list to have an animated and hidable header. If a component has not been provided, the default ScrollViewStickyHeader component will be used.A React Component that will be used to render sticky headers, should be used together with stickyHeaderIndices. You may need to set this component if your sticky header uses custom transforms, for example, when you want your list to have an animated and hidable header. If a component has not been provided, the default ScrollViewStickyHeader component will be used.A React Component that will be used to render sticky headers, should be used together with stickyHeaderIndices. You may need to set this component if your sticky header uses custom transforms, for example, when you want your list to have an animated and hidable header. If a component has not been provided, the default ScrollViewStickyHeader component will be used.A React Component that will be used to render sticky headers, should be used together with stickyHeaderIndices. You may need to set this component if your sticky header uses custom transforms, for example, when you want your list to have an animated and hidable header. If a component has not been provided, the default ScrollViewStickyHeader component will be used.A React Component that will be used to render sticky headers, should be used together with stickyHeaderIndices. You may need to set this component if your sticky header uses custom transforms, for example, when you want your list to have an animated and hidable header. If a component has not been provided, the default ScrollViewStickyHeader component will be used.A React Component that will be used to render sticky headers, should be used together with stickyHeaderIndices. You may need to set this component if your sticky header uses custom transforms, for example, when you want your list to have an animated and hidable header. If a component has not been provided, the default ScrollViewStickyHeader component will be used.
                    </Text>
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
        width: '35%', // Adjusted width to fit within the screen

        marginHorizontal: "2%",
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

        width: '100%', // Adjusted width to fit within the screen

        minHeight: 200, // Adjust this value to control the overall height
        marginHorizontal: "2%",
        paddingBottom:15
    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: "#346aac"
    },
    alertBox: {
        fontSize: 12,
        fontWeight: '900',
        marginBottom: 5
    },
    topPatientInforBox: {
        width: '100%',
        left: "5%",
        top: 10,
        paddingBottom: 20
    },
    dividerStyle: {
        marginTop: 7,
        borderBottomColor: "#f2f2f2",
        borderBottomWidth: '1',
    },
    summaryTextBox: {

        width: '90%',
        marginHorizontal: '5%',
        marginTop: 7



    },
    timeArive: {
        flex: 1,
        alignItems: 'center',
    },
    timeAriveTextBox: {
        position: 'absolute',
        left: "4%",
    },
    timeAriveText: {
        color: 'red',
        fontWeight: 'bold'
    },
    topdotsMenu: {
        position: 'absolute',
        right: "4%",
    },
    nameText: {
        fontSize: 18,
        fontWeight: '500'
    },
    timeText: {
        fontSize: 18,
        fontWeight: '500',
    },
});

export default PatientInfoBox;
