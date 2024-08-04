import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NativeStackScreenProps } from 'react-native-screens/lib/typescript/native-stack/types';
import { rootStackParams } from '../../Navigator/stack/StackNavigator';

type props = NativeStackScreenProps<rootStackParams, 'InsuranceDetail'>;

const InsuranceDetailScreen = ( { navigation, route } : props) => {
  
  
  const handleRenewInsurance = () => {
    // Logic to renew insurance
  };

  return (
    <View style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.sub_phoneName}>{route.params.phone_data.phone_name}</Text>
        <Image
        source={
            route.params.phone_data.phone_type === "IPhone" ?
            require('@assets/Icons/Apple.png')
            : require('@assets/Icons/Android.png')
        } 
        style={styles.profileImage} 
        />
        <Text style={styles.phoneName}>{route.params.phone_data.phone_name}</Text>
        <View style={styles.infoContainer}>
            <Text style={styles.infoTitle}>Insurance No</Text>
            <Text style={styles.insurance_NO_text}>#{route.params.phone_data.insurance_id}</Text>
        </View>
        <View style={styles.infoContainer}>
            <Text style={styles.infoTitle}>Valid From</Text>
            <Text style={styles.valid_date_text}>{route.params.phone_data.valid_date}</Text>
        </View>
        <View style={styles.infoContainer}>
            <Text style={styles.infoTitle}>Expired At</Text>
            <Text style={styles.expired_date_text}>{route.params.phone_data.expired_date}</Text>
        </View>
        <TouchableOpacity style={styles.renewButton} onPress={handleRenewInsurance}>
            <Text style={styles.renewButtonText}>Renew Insurance</Text>
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#0C0C0E',

    },
    backButton: {
        width: 70,
        height: 70,
        marginTop: 45,
        marginBottom: 20,
        marginLeft: 5,
    },
    backButtonText: {
        color: '#FFFFFF',
        fontSize: 32,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        alignSelf: 'center',
        marginBottom: 20,
    },
    phoneName: {
        color: '#FFFFFF',
        fontSize: 36,
        textAlign: 'center',
        marginBottom: 20,
    },
    sub_phoneName: {
        color: '#FFFFFF',
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 20,
        marginTop: -85,
    },
    infoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1C1C1E',
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
    },
    infoTitle: {
        color: '#FFFFFF',
        fontSize: 20,
    },
    insurance_NO_text: {
        color: '#FFFFFF',
        fontSize: 18,
        marginTop: 5,
        marginLeft: 'auto',
        marginRight: 10,
    },
    valid_date_text: {
        color: '#1ed337',
        fontSize: 18,
        marginTop: 5,
        marginLeft: 'auto',
        marginRight: 10,
    },
    expired_date_text: {
        color: '#e25151',
        fontSize: 18,
        marginTop: 5,
        marginLeft: 'auto',
        marginRight: 10,
    },
    renewButton: {
        backgroundColor: '#3B82F6',
        padding: 15,
        borderRadius: 10,
        marginTop: "auto",
        marginBottom: 70,
    },
    renewButtonText: {
        color: '#FFFFFF',
        textAlign: 'center',
        fontSize: 18,
    },
});

export { InsuranceDetailScreen };

