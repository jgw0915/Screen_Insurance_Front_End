import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NativeStackScreenProps } from 'react-native-screens/lib/typescript/native-stack/types';
import { rootStackParams } from '../Navigator/stack/StackNavigator';

const { height, width } = Dimensions.get('window');

type prop = NativeStackScreenProps<rootStackParams, 'Home'>;


const HomeScreen = ( {navigation} :prop ) => {
  return (
    <View style={styles.container}>
      <Image
        source={require('@Assets/Images/onboarding.png')}
        style={styles.image}
      />
      <View style={styles.textContainer}>
        <Text style={styles.title}>Screen,{'\n'}Mobile,{'\n'}Protection</Text>
        <TouchableOpacity style={styles.button} onPress={() =>navigation.navigate("Register")}>
          <Text style={styles.buttonText}>Register with Phone</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sign_in_buttom} onPress={()=> navigation.navigate("SignIn")}>
          <Text style={styles.sign_in_buttom_text}>Already have an account?</Text>
        </TouchableOpacity>
        <Text style={styles.terms}>
          By continuing you agree to the Terms of Services & Privacy Policy
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  image: {
    width: width,
    alignContent: 'center',
    alignItems: 'center',
    height: height,
  },
  textContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    marginTop: -450,
  },
  title: {
    fontSize: 50,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    color: '#FFFFFF',
    left: width/2-180,
    height: 200,
    alignSelf: 'flex-start',
  },
  button: {
    backgroundColor: '#1DA1F2',
    borderRadius: 30,
    height: 50,
    marginTop: 20,
    justifyContent: 'center',
    alignContent: 'center',
    width: 300,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  sign_in_buttom: {
    color: '#BBBBBB',
    backgroundColor: 'taransparent',
    paddingVertical: 20,
    marginTop: -10,
  },
  sign_in_buttom_text: {
    color: '#BBBBBB',
    backgroundColor: 'taransparent',
    paddingVertical: 20,
  },
  terms: {
    color: '#BBBBBB',
    textAlign: 'center',
    marginBottom: 20,
    paddingVertical: 10,
    height: 100,
    paddingHorizontal: 20,
  },
});

export { HomeScreen };
