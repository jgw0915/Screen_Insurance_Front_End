import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import { NativeStackScreenProps } from 'react-native-screens/lib/typescript/native-stack/types';
import { rootStackParams } from '../Navigator/stack/StackNavigator';

type props = NativeStackScreenProps<rootStackParams, 'OptionInsurance'>;

const OptionInsuranceScreen = ({navigation,route}:props) => {

    type SwitchStates = {
        [key: string]: boolean;
    };

    const [switchStates, setSwitchStates] = useState<SwitchStates>({
        item1: false, // face id
        item2: false, // camera
        item3: false, // lost insurance
    });

    const handleSwitchChange = (item: string) => {
        setSwitchStates((prevStates) => ({
          ...prevStates,
          [item]: !prevStates[item],
        }));
    };

    const next = () => {
        navigation.navigate("ChosePlan", {
            userData: route.params.userData,
            phoneName: route.params.phoneName,
            phoneType: route.params.phoneType,
            phoneNumber: route.params.phoneNumber,
        });
    };

    return (
        <View style={styles.container}>

        <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
        >
            <Ionicons name="arrow-back" size={34} color="white" />
        </TouchableOpacity>
        <Text style={styles.title}>New Insurance</Text>
       

        <View style={styles.optionContainer}>
            <Text style={styles.subtitle}>Insurance Package</Text>
            <Text style={styles.subtitlecontent}>Now you can customize your insurance package. Or you can change it later in the <Text style={styles.boldText}>Divice Inventory</Text>. Insurance packages may change to insurance prices.</Text>
            
            <View style={styles.header}>
                <Ionicons name="aperture-outline" size={30} color="white" style={styles.icon} />
                <Text style={styles.icontitle}>Screen Protection</Text>
            </View>


            <View style={styles.option}>
            <Text style={styles.optionText}>   Face ID</Text>
            <Switch
               value={switchStates['item1']}
               onValueChange={() => handleSwitchChange('item1')}
               style={styles.switch}
            />
            </View>

            <View style={styles.option}>
            <Text style={styles.optionText}>   Camera</Text>
            <Switch
               value={switchStates['item2']}
               onValueChange={() => handleSwitchChange('item2')}
               style={styles.switch}
            />
            </View>

            <View style={styles.option}>
            <Text style={styles.optionText}>   Lost Insurance</Text>
            
            <Switch
               value={switchStates['item3']}
               onValueChange={() => handleSwitchChange('item3')}
               style={styles.switch}
            />
            </View>
        </View>   

        <TouchableOpacity 
        style={styles.nextButton} 
        onPress={next}>
            <Text style={styles.ButtonText}>Next</Text>
        </TouchableOpacity>
        
        </View>
    );
};



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1A1A1A',
        padding: 20,
    },
    backButton: {
        marginTop: 50,
        position: 'absolute',
        top: 10,
        left: 10,
    },
    backButtonText: {
        fontSize: 30,
        color: '#FFF',
    },
    title: {
        textAlign: 'center',
        color: '#FFF',
        fontSize: 23,
        marginVertical: 20,
        marginTop: 50,
    },
    subtitle: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#FFF',
        marginVertical: 10,
        paddingHorizontal: 0,
    },
    subtitlecontent: {
        fontSize: 16,
        color: '#666',
        marginBottom: 20,
    },
    boldText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 14,
    },
    optionContainer: {
        marginTop: 20,
        marginBottom: 30,
    },
    option: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#444',
        marginVertical: 7,
    },
    optionText: {
        fontSize: 18,
        color: '#FFF',
        fontWeight: 'bold',
    },
    switch: {
        marginLeft: 10,
    },
    nextButton: {
        backgroundColor: '#1E90FF',
        padding: 15,
        borderRadius: 30,
        alignItems: 'center',
        position: 'absolute',
        bottom: 50, 
        left: 20,
        right: 20,
    },
    ButtonText: {
        fontSize: 18,
        color: '#FFF',
        fontWeight: 'bold',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center', 
        marginBottom: 10,
    },
    icon: {
        marginTop: 10,
        marginRight: 10,
    },
    icontitle: {
        marginTop: 10,
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold', 
        lineHeight: 25,
    },
});

export { OptionInsuranceScreen };

