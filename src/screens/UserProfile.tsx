import { CommonActions } from '@react-navigation/native';
import React from 'react';
import { Image, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import { NativeStackScreenProps } from 'react-native-screens/lib/typescript/native-stack/types';
import { rootStackParams } from '../Navigator/stack/StackNavigator';

type props = NativeStackScreenProps<rootStackParams, 'UserProfile'>;


const UserProfileScreen : React.FC<props> = ({ navigation , route } : props) => {
    const [isDoNotDisturb, setIsDoNotDisturb] = React.useState(false);

    const handleToggleSwitch = () => setIsDoNotDisturb(previousState => !previousState);

    return (
        <View style={styles.container}>
        {/* Cancel Button */}
        <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
            <Text style={styles.cancelText}>X</Text>
        </TouchableOpacity>

        
        {/* User Profile */}
        <View style={styles.profileContainer}>
            <Image
                source={
                route.params.userData.profileImage ?
                { uri: route.params.userData.profileImage }
                : require('@Assets/profile-placeholder.png') } // Replace with the actual image URI
                style={styles.profileImage}
            />
            <Text style={styles.userName}>
                {
                    route.params.userData.username === "" || null?
                    "NA":
                    route.params.userData.username
                }
            </Text>
            <Text style={styles.userPhone}>
                {
                    route.params.userData.phoneNumber === "" || null?
                    "NA":
                    route.params.userData.phoneNumber
                }
            </Text>
        </View>

        {/* Edit Profile Button */}
        <TouchableOpacity
            style={styles.editProfileButton}
            onPress={() => navigation.navigate('EditProfile', { userData: route.params.userData })}
        >
            <Text style={styles.editProfileText}>Edit Profile</Text>
        </TouchableOpacity>

        {/* Do Not Disturb Toggle */}
        <View style={styles.notificationContainer}>
            <Text style={styles.notificationText}>Do not disturb</Text>
            <Switch
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={isDoNotDisturb ? '#f5dd4b' : '#f4f3f4'}
            onValueChange={handleToggleSwitch}
            value={isDoNotDisturb}
            />
        </View>

        {/* Log out Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={()=> navigation.dispatch(
            CommonActions.reset({
            index: 0,
            routes: [{ name: 'Home'} ],  // Replace 'Home' with the screen you want to navigate to
            }))}>
            <Text style={styles.logoutText}>Log out</Text>
        </TouchableOpacity>
        </View>
    );
    };

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
        padding: 20,
    },
    cancelButton: {
        marginLeft: 10,
        marginTop: 50,
        backgroundColor: '#1A73E8',
        position: 'absolute',
        width: 30,
        height: 30,
        borderRadius: 40,
    },
    cancelText: {
        padding: 5,
        fontSize: 18,
        alignContent: 'center',
        justifyContent: 'center',
        color: 'white',
        alignItems: 'center',
        textAlign: 'center',
    },
    profileContainer: {
        alignItems: 'center',
        marginTop: 100,
    },
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 120,
    },
    userName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        marginTop: 10,
    },
    userPhone: {
        fontSize: 16,
        color: '#A0A0A0',
        marginTop: 5,
    },
    editProfileButton: {
        backgroundColor: '#1A73E8',
        padding: 10,
        borderRadius: 20,
        marginTop: 20,
        alignSelf: 'center',
    },
    editProfileText: {
        color: 'white',
        fontSize: 16,
    },
    notificationContainer: {
        backgroundColor: '#262626',
        padding: 15,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 30,
    },
    notificationText: {
        color: 'white',
        fontSize: 16,
    },
    logoutButton: {
        backgroundColor: '#FF6E67',
        padding: 15,
        width: 150,
        borderRadius: 20,
        marginTop: 300,
        alignSelf: 'center',
    },
    logoutText: {
        justifyContent: 'center',
        textAlign: 'center',
        alignItems: 'center',
        color: 'white',
        fontSize: 16,
    },
    });

export { UserProfileScreen };
