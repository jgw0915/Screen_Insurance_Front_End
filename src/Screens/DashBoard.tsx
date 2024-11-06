import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NativeStackScreenProps } from 'react-native-screens/lib/typescript/native-stack/types';
import { PhoneCard } from '../Components/PhoneCard';
import { PhoneCardColumn } from '../Components/PhoneCardColumn';
import { rootStackParams } from '../Navigator/stack/StackNavigator';

const { width } = Dimensions.get('window');
type props = NativeStackScreenProps<rootStackParams, 'DashBoard'>;

const DashBoardScreen : React.FC<props> = ({navigation,route} : props) => {
  const [loadedUserData, setLoadedUserData] = useState(route.params.userData);
  const [selectedCategory, setSelectedCategory] = useState<'Overview' | 'IPhone' | 'Android'>('Overview');

  const renderPhoneCards = () => {
    return loadedUserData.insured_phone === null ? null : loadedUserData.insured_phone
      .filter(phone => selectedCategory === 'Overview' || phone.phone_type === selectedCategory)
      .map((phone) => (
        <PhoneCard
            key={phone.insurance_id}
            phone_data={phone}
            onPress={() => navigation.navigate('InsuranceDetail', { phone_data: phone , userData: loadedUserData})}
          />
      ));
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Dashboard</Text>
        <TouchableOpacity onPress={()=> navigation.navigate('UserProfile',{ userData: route.params.userData })}>
          <Image source={
              loadedUserData.profileImage ?
              { uri: loadedUserData.profileImage }
              : require('@Assets/Images/profile-placeholder.png') }
              style={styles.avatar}
          />
        </TouchableOpacity>
      </View>

      <Text style={styles.greeting}>Hello, {loadedUserData.username} 👋</Text>
      <View>
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
      </View>
      <View style={styles.categoryButtons}>
        <TouchableOpacity
          style={
            selectedCategory === 'Overview'
            ? styles.selectedCategoryButton
            :styles.unSelectedCategoryButton
          }
          onPress={()=>setSelectedCategory('Overview')}
          >
          <Text style={styles.categoryButtonText} >Overview</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={
            selectedCategory === 'IPhone'
            ? styles.selectedCategoryButton
            :styles.unSelectedCategoryButton
          }
          onPress={()=>setSelectedCategory('IPhone')}
          >
          <Text style={styles.categoryButtonText}>Apple</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={
            selectedCategory === 'Android'
            ? styles.selectedCategoryButton
            :styles.unSelectedCategoryButton
          }
          onPress={()=>setSelectedCategory('Android')}
          >
          <Text style={styles.categoryButtonText}>Android</Text>
        </TouchableOpacity>
      </View>

      <PhoneCardColumn>
        { renderPhoneCards() }
      </PhoneCardColumn>

      <TouchableOpacity style={styles.addButton} onPress={()=>navigation.navigate("NewInsurance",{phoneName:loadedUserData.current_phone_name,phoneType: loadedUserData.current_phone_type,phoneNumber:loadedUserData.phoneNumber,userData:loadedUserData})}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
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
    marginBottom: 20,
  },
  selectedCategoryButton: {
    backgroundColor: '#2A9DF4',
    padding: 10,
    borderRadius: 10,
    marginRight: 10,
  },
  unSelectedCategoryButton: {
    backgroundColor: '#222',
    padding: 10,
    borderRadius: 10,
    marginRight: 10,
  },
  categoryButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  addButton: {
    backgroundColor: '#2A9DF4',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
    left: width/2-40,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 32,
  },
});

export { DashBoardScreen };
