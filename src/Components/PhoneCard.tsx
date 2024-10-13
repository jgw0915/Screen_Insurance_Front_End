import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { insured_phone } from '../data/Type/data_type';

type PhoneCardProps = {
    style?: object;
    phone_data : insured_phone;
    onPress: (phone_data:insured_phone) => void;
};

export const PhoneCard:React.FC<PhoneCardProps> = ({
    style = {},
    phone_data,
    onPress
}) => {

    return (
        <TouchableOpacity style={styles.phoneCard} onPress={()=> onPress(phone_data)}>
            <Image source={
                phone_data.phone_type === "IPhone" ?
                require('@Assets/Icons/Apple.png')
                : require('@Assets/Icons/Android.png')
            }
                style={styles.phoneIcon}
            />
            <Text style={styles.phoneText}>{ phone_data.phone_name }</Text>
            {phone_data.expired && <Text style={styles.expiredLabel}>Expires</Text>}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    phoneIcon: {
        width: 60,
        height: 60,
        marginRight: 20,
    },
    phoneText: {
    color: '#fff',
    fontSize: 18,
    },
    phoneCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#222',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
    },
    expiredLabel: {
        color: '#c15146',
        fontFamily: 'Roboto',
        fontSize: 20,
        fontWeight: 'bold',
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 'auto',
        marginRight: -5,
    },
});