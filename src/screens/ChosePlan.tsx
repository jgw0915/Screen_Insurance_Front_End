import { Ionicons } from '@expo/vector-icons';
import { CommonActions } from '@react-navigation/native';
import React, { useState } from 'react';
import { ImageBackground, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NativeStackScreenProps } from 'react-native-screens/lib/typescript/native-stack/types';
import { rootStackParams } from '../Navigator/stack/StackNavigator';


type props = NativeStackScreenProps<rootStackParams, 'ChosePlan'>;
const ChosePlanScreen = ({navigation,route}:props) => {
    const [modalVisible, setModalVisible] = useState(false);
    const handleNavigate = () => {
        setModalVisible(true); 
    };

    const [selectedColor, setSelectedColor] = useState('');
    const handleSelectColor = (color:string) => {
        setSelectedColor(color);
        
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
            <Text style={styles.subtitle}>Choose Plan</Text>
            <Text style={styles.subtitlecontent}>Unlock all features with Premium Plan.</Text>
        </View>   

        <View style={styles.chosecontainer}>
            <TouchableOpacity
                style={[
                    styles.box,
                    { borderColor: 'white', borderWidth: 2 }, 
                ]}
                onPress={() => handleSelectColor('plan1')}
            >
                {selectedColor === 'plan1' ? (
                <ImageBackground
                    source={{ uri: 'https://png.pngtree.com/thumb_back/fh260/background/20190221/ourmid/pngtree-geometric-green-gradient-beautiful-gradient-poster-image_30647.jpg' }} // 替换为你的渐变图像URL
                    style={styles.imageBackground} 
                    resizeMode="cover"
                >
                    <Text style={styles.checkmark}><Ionicons name="checkmark-circle-outline" size={25} color="black" /></Text>
                    <Text style={styles.boxText}>Monthly</Text>
                    <Text style={styles.boxText}>$1499/mo</Text>
                </ImageBackground>
                ) : (
                <View style={styles.boxContent}>
                    <Text style={styles.choseboxText}>Monthly</Text>
                    <Text style={styles.choseboxText}>$1499/mo</Text>
                </View>
            )}
            </TouchableOpacity>

            <TouchableOpacity
                style={[
                styles.box,
                { borderColor: 'white', borderWidth: 2 },
                ]}
                onPress={() => handleSelectColor('plan2')}
            >
                {selectedColor === 'plan2' ? (
                    <ImageBackground
                        source={{ uri: 'https://png.pngtree.com/thumb_back/fh260/background/20190221/ourmid/pngtree-geometric-green-gradient-beautiful-gradient-poster-image_30647.jpg' }} // 替换为你的渐变图像URL
                        style={styles.imageBackground} 
                        resizeMode="cover" 
                    >
                        <Text style={styles.checkmark}><Ionicons name="checkmark-circle-outline" size={25} color="black" /></Text>
                        <Text style={styles.boxText}>Monthly</Text>
                        <Text style={styles.boxText}>$1599/yr</Text>
                    </ImageBackground>
                    ) : (
                    <View style={styles.boxContent}>
                        <Text style={styles.choseboxText}>Monthly</Text>
                        <Text style={styles.choseboxText}>$1599/yr</Text>
                    </View>
                )}
            </TouchableOpacity>
        </View>

        <TouchableOpacity 
        style={styles.nextButton} 
        onPress={handleNavigate}>
            <Text style={styles.ButtonText}>Submit</Text>
        </TouchableOpacity>

        {/* 模态框 */}
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
            setModalVisible(!modalVisible);
            }}
        >
            <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Apply Insurance Successfully</Text>
                <Text style={styles.modalSubtitle}>We are reviewing your insurance application and will notify you if it is approved. If the policy has not been established, your money will be placed in a trust account.</Text>
                <TouchableOpacity
                    style={styles.modalButton}
                    onPress={() => {
                        setModalVisible(!modalVisible);
                        navigation.dispatch(
                            CommonActions.reset({
                                index: 0,
                                routes: [{ name: 'DashBoard',params: {userData: route.params.userData} }],  // Replace 'Home' with the screen you want to navigate to
                            })
                        );
                    }}
                >
                    <Text style={styles.modalButtonText}>I will waiting for the approval</Text>
                </TouchableOpacity>
            </View>
            </View>
        </Modal>
        
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
    chosecontainer: {
        flex: 0.5,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row', 
        gap: 25, 
    },
    box: {
        width: 150,
        height: 200,
        borderRadius: 10,
        overflow: 'hidden', 
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkmark: {
        position: 'absolute',
        top: 5,
        left: 5,
        fontSize: 18,
        color: '#000',
        fontWeight: 'bold',
    },
    boxText: {
        fontSize: 18,
        color: '#000',
        fontWeight: 'bold',
        marginVertical: 3,
    },
    choseboxText: {
        fontSize: 18,
        color: '#FFF',
        fontWeight: 'bold',
        marginVertical: 3,
    },
    boxContent: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageBackground: {
        flex: 1, 
        width: '100%', 
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.7)', 
        
    },
    modalContent: {
        width: 325,
        padding: 20,
        backgroundColor: '#2D2D2D',
        borderRadius: 10,
        alignItems: 'center',
    },
    modalTitle: {
        color: 'white',
        fontSize: 19,
        fontWeight: 'bold',
        marginBottom: 12,
    },
    modalSubtitle: {
        fontSize: 13,
        color: 'gray',
        marginBottom: 20,
    },
    modalButton: {
        width: '100%',
        padding: 10,
        borderRadius: 25,
        borderColor: 'gray',
        alignItems: 'center',
        backgroundColor: '#1E90FF',
    },
    modalButtonText: {
        fontWeight: 'bold',
        fontSize: 16,
        color: 'white',
    },

});


export { ChosePlanScreen };

