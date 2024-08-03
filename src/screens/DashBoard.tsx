import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { NativeStackScreenProps } from 'react-native-screens/lib/typescript/native-stack/types';
import { rootStackParams } from '../Navigator/stack/StackNavigator';
import { handleImageUpload } from './Register';

const { width } = Dimensions.get('window');
type prop = NativeStackScreenProps<rootStackParams, 'DashBoard'>;

const DashBoardScreen : React.FC<prop> = ({route} : prop) => {
  const [loadedUserData, setLoadedUserData] = useState(route.params.userData);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Dashboard</Text>
        <TouchableOpacity onPress={()=> handleImageUpload(loadedUserData,setLoadedUserData)}>
          <Image source={
              loadedUserData.profileImage ?
              { uri: loadedUserData.profileImage }
              : require('@assets/profile-placeholder.png') }
              style={styles.avatar}
          />
        </TouchableOpacity>
      </View>

      <Text style={styles.greeting}>Hello, {loadedUserData.username} 👋</Text>

      <LinearGradient
        colors={['#6DC0D5', '#6A6FDC']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.insuranceCard}
      >
        <Text style={styles.insuranceText}>Insurance Reviewing...</Text>
        <View style={styles.progressContainer}>
          <View style={styles.progressBar} />
        </View>
        <Text style={styles.insuranceProgress}>3 / 4</Text>
      </LinearGradient>

      <View style={styles.categoryButtons}>
        <TouchableOpacity style={styles.categoryButton}>
          <Text style={styles.categoryButtonText}>Overview</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryButton}>
          <Text style={styles.categoryButtonText}>Apple</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.phoneCard}>
        <Image source={
            require('@assets/Icons/Apple.png') }
            style={styles.phoneIcon} 
        />
        <Text style={styles.phoneText}>iPhone 15 Pro</Text>
      </View>
      <View style={styles.phoneCardExpired}>
        <Image source={
            require('@assets/Icons/Apple.png') }
            style={styles.phoneIcon} 
        />
        <Text style={styles.phoneText}>iPhone 11</Text>
        <Text style={styles.expiredLabel}>Expired</Text>
      </View>

      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 20,
  },
  header: {
    top: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 36,
    fontWeight: 'bold',
  },
  avatar: {
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 45,
    marginTop: 20,
    width: 50,
    height: 50,
    borderRadius: 40,
  },
  greeting: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 20,
    width: 250,
  },
  insuranceCard: {
    borderRadius: 20,
    padding: 20,
    marginVertical: 20,
  },
  insuranceText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  progressContainer: {
    height: 10,
    backgroundColor: '#ccc',
    borderRadius: 5,
    overflow: 'hidden',
    marginVertical: 10,
  },
  progressBar: {
    width: '75%',
    height: '100%',
    backgroundColor: '#fff',
  },
  insuranceProgress: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'right',
  },
  categoryButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  categoryButton: {
    backgroundColor: '#222',
    padding: 10,
    borderRadius: 10,
  },
  categoryButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  phoneCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#222',
    padding: 20,
    borderRadius: 10,
    marginBottom: 10,
  },
  phoneCardExpired: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#222',
    padding: 20,
    borderRadius: 10,
    marginBottom: 10,
    position: 'relative',
  },
  phoneIcon: {
    width: 40,
    height: 40,
    marginRight: 20,
  },
  phoneText: {
    color: '#fff',
    fontSize: 18,
  },
  expiredLabel: {
    color: '#c15146',
    fontFamily: 'Roboto',
    fontSize: 20,
    fontWeight: 'bold',
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 100 ,
  },
  addButton: {
    backgroundColor: '#2A9DF4',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 180,
    marginBottom: 20,
    left: width/2-40,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 24,
  },
});

export { DashBoardScreen };
