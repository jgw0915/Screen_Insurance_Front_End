import { Ionicons } from '@expo/vector-icons';
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
                : require('@Assets/Images/profile-placeholder.png') } // Replace with the actual image URI
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

        <Text style={{ color: '#898989', fontSize: 16, marginTop: 20 , marginLeft: 5}}>Notifications</Text>

        {/* Do Not Disturb Toggle */}
        <View style={styles.notificationContainer}>
            <Ionicons name="notifications-off-outline" size={34} color="#b971fd" />
            <Text style={styles.notificationText}>Do not disturb</Text>
            <Switch
            trackColor={{ false: '#767577', true: '#6ee864' }}
            thumbColor={isDoNotDisturb ? '#f4f3f4' : '#f4f3f4'}
            onValueChange={handleToggleSwitch}
            value={isDoNotDisturb}
            style={{ marginLeft: 'auto' }}
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
        top: 10,
        left: 10,
        marginLeft: 10,
        marginTop: 50,
        backgroundColor: '#3579ef',
        position: 'absolute',
        width: 35,
        height: 35,
        borderRadius: 35,
    },
    cancelText: {
        padding: 6,
        fontWeight: 'bold',
        fontSize: 22,
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
        fontSize: 26,
        fontWeight: 'bold',
        color: 'white',
        marginTop: 10,
    },
    userPhone: {
        fontSize: 16,
        color: '#6ee864',
        marginTop: 5,
    },
    editProfileButton: {
        width: 120,
        borderColor: '#1A73E8',
        borderBlockColor: '#1A73E8',
        borderWidth: 1,
        backgroundColor: '#302e38',
        padding: 10,
        borderRadius: 20,
        marginTop: 20,
        alignSelf: 'center',
    },
    editProfileText: {
        textAlign: 'center',
        justifyContent: 'center',
        color: 'white',
        fontSize: 18,
    },
    notificationContainer: {
        backgroundColor: '#262626',
        padding: 15,
        height: 80,
        borderRadius: 20,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 10,
    },
    notificationText: {
        marginLeft: 10,
        color: 'white',
        fontSize: 20,
    },
    logoutButton: {
        backgroundColor: '#FF6E67',
        padding: 10,
        width: 240,
        height: 50,
        borderRadius: 20,
        marginTop: "auto",
        marginBottom : 20,
        alignSelf: 'center',
    },
    logoutText: {
        justifyContent: 'center',
        textAlign: 'center',
        alignItems: 'center',
        color: 'white',
        fontSize: 22,
    },
    });

export { UserProfileScreen };
