/*eslint-disable*/
import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  ScrollView,
  Image,
  StyleSheet,
  StatusBar,
  Text,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  TextInput,
  Button,
  useTheme,
  ActivityIndicator,
} from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import {City, Country, State} from 'country-state-city';
import DateSelector from '../components/DateSelector';
import firestore from '@react-native-firebase/firestore';
import ShowMessage from '../components/dialogBox/ShowMessage';
import {setEmail} from '../store/userSlice';
import {useDispatch} from 'react-redux';

const SignUpPage = ({navigation, route}) => {
  const [fullName, setFullName] = useState('');
  const [mobile, setMobile] = useState('');
  const [countryOpen, setCountryOpen] = useState(false);
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [stateOpen, setStateOpen] = useState(false);
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState('');
  const [cityOpen, setCityOpen] = useState(false);
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [genderOpen, setGenderOpen] = useState(false);
  const [genders, setGenders] = useState([
    {label: 'Male', value: 'male'},
    {label: 'Female', value: 'female'},
    {label: 'Other', value: 'other'},
  ]);
  const [selectedGender, setSelectedGender] = useState('');
  const [loading, setLoading] = useState(false);
  const [countryZIndex, setCountryZIndex] = useState(4000);
  const [stateZIndex, setStateZIndex] = useState(3000);
  const [cityZIndex, setCityZIndex] = useState(2000);
  const [genderZIndex, setGenderZIndex] = useState(1000);
  const [birthDate, setBirthDate] = useState('');

  const theme = useTheme();
  const dispatch = useDispatch();
  const {email} = route.params;

  useEffect(() => {
    const allCountries = Country.getAllCountries();
    const formattedCountries = allCountries.map(country => ({
      value: country.isoCode,
      label: country.name,
    }));
    setCountries(formattedCountries);
  }, []);

  useEffect(() => {
    const countryStates = State.getStatesOfCountry(selectedCountry);
    const formattedStates = countryStates.map(state => ({
      value: state.isoCode,
      label: state.name,
    }));
    setStates(formattedStates);
    setSelectedState('');
    setSelectedCity('');
  }, [selectedCountry]);

  useEffect(() => {
    const allCities = City.getCitiesOfState(selectedCountry, selectedState);
    const formattedCities = allCities.map(city => ({
      value: city.name,
      label: city.name,
    }));
    setCities(formattedCities);
    setSelectedCity('');
  }, [selectedState]);

  const onCountryOpen = useCallback(() => {
    setStateOpen(false);
    setCityOpen(false);
    setGenderOpen(false);
    setCountryZIndex(4000);
    setStateZIndex(3000);
    setCityZIndex(2000);
    setGenderZIndex(1000);
  }, []);

  const onStateOpen = useCallback(() => {
    setCountryOpen(false);
    setCityOpen(false);
    setGenderOpen(false);
    setCountryZIndex(2000);
    setStateZIndex(4000);
    setCityZIndex(3000);
    setGenderZIndex(1000);
  }, []);

  const onCityOpen = useCallback(() => {
    setCountryOpen(false);
    setStateOpen(false);
    setGenderOpen(false);
    setCountryZIndex(2000);
    setStateZIndex(3000);
    setCityZIndex(4000);
    setGenderZIndex(1000);
  }, []);

  const onGenderOpen = useCallback(() => {
    setCountryOpen(false);
    setStateOpen(false);
    setCityOpen(false);
    setCountryZIndex(1000);
    setStateZIndex(2000);
    setCityZIndex(3000);
    setGenderZIndex(4000);
  }, []);

  const submitForm = async () => {
    setLoading(false);
    if (
      fullName === '' ||
      mobile === '' ||
      selectedCountry === '' ||
      selectedState === '' ||
      selectedCity === '' ||
      zipCode === '' ||
      selectedGender === '' ||
      birthDate === ''
    ) {
      ShowMessage({message: 'Please fill out all the fields!', error: true});
      return;
    } else {
      try {
        setLoading(true);
        await firestore().collection('userdetail').add({
          email,
          fullName,
          mobile,
          country: selectedCountry,
          state: selectedState,
          city: selectedCity,
          zipCode,
          gender: selectedGender,
          dob: birthDate,
        });
        setLoading(false);
        dispatch(setEmail(email));
        navigation.reset({
          index: 0,
          routes: [{name: 'BottomTabNavigation'}],
        });
      } catch (error) {
        ShowMessage({
          message: 'Some error occurred. Please try again later.',
          error: true,
        });
      }
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar backgroundColor="#125873" barStyle="light-content" />
      <ScrollView
        contentContainerClass="flexGrow"
        keyboardShouldPersistTaps="handled">
        <View className="flex-1 pt-64 justify-center items-center">
          <View className="h-[565px] w-[565px] absolute -top-[425px] bg-[#125873] rounded-bl-[93px] -rotate-45">
            <Image
              source={require('../assets/logos/mainLogo.png')}
              className="w-36 h-36 absolute bottom-5 left-4 rotate-45"
              resizeMode="contain"
            />
          </View>
          <View className="w-full px-6 pb-6">
            <View className="items-center mb-8">
              <Text className="text-black text-2xl">Enter Details</Text>
            </View>

            <View className="space-y-4">
              <TextInput
                mode="flat"
                label="Full Name"
                value={fullName}
                onChangeText={setFullName}
                theme={{colors: {primary: theme.colors.secondary}}}
                className="bg-slate-100 rounded-lg text-gray-300"
              />
              <TextInput
                mode="flat"
                label="Mobile No."
                keyboardType="numeric"
                value={mobile}
                onChangeText={setMobile}
                theme={{colors: {primary: theme.colors.secondary}}}
                className="bg-slate-100 rounded-lg text-gray-300"
              />
              <View
                style={{
                  zIndex: countryZIndex,
                  elevation: countryZIndex,
                  marginTop: 16,
                }}>
                <DropDownPicker
                  open={countryOpen}
                  onOpen={onCountryOpen}
                  value={selectedCountry}
                  items={countries}
                  setOpen={setCountryOpen}
                  setValue={setSelectedCountry}
                  setItems={setCountries}
                  loading={loading}
                  placeholder="Select Country"
                  placeholderStyle={{
                    color: theme.colors.secondary,
                    fontSize: 15,
                  }}
                  style={{borderColor: theme.colors.secondary}}
                  labelStyle={{color: theme.colors.secondary, fontSize: 15}}
                  listItemLabelStyle={{color: theme.colors.secondary}}
                  arrowIconStyle={{tintColor: theme.colors.secondary}}
                  dropDownContainerStyle={{
                    borderColor: theme.colors.secondary,
                    borderTopWidth: 0,
                    position: 'relative', // Changed from 'absolute' to 'relative'
                    top: 0,
                    zIndex: 1000, // Ensure this is higher than other elements
                  }}
                  searchContainerStyle={{borderBottomWidth: 0}}
                  searchTextInputStyle={{
                    borderBottomWidth: 1,
                    borderColor: theme.colors.secondary,
                  }}
                  ActivityIndicatorComponent={() => (
                    <ActivityIndicator
                      color={theme.colors.secondary}
                      size={20}
                    />
                  )}
                  searchable={true}
                  searchPlaceholder="Search country..."
                  listMode="SCROLLVIEW"
                  scrollViewProps={{
                    nestedScrollEnabled: true,
                  }}
                />
              </View>

              <View
                style={{
                  zIndex: stateZIndex,
                  elevation: stateZIndex,
                  marginTop: 16,
                }}>
                <DropDownPicker
                  disabled={selectedCountry === ''}
                  disabledStyle={{backgroundColor: '#eee'}}
                  open={stateOpen}
                  onOpen={onStateOpen}
                  value={selectedState}
                  items={states}
                  setOpen={setStateOpen}
                  setValue={setSelectedState}
                  setItems={setStates}
                  loading={loading}
                  placeholder="Select State"
                  placeholderStyle={{
                    color: theme.colors.secondary,
                    fontSize: 15,
                  }}
                  style={{borderColor: theme.colors.secondary}}
                  labelStyle={{color: theme.colors.secondary, fontSize: 15}}
                  listItemLabelStyle={{color: theme.colors.secondary}}
                  arrowIconStyle={{tintColor: theme.colors.secondary}}
                  dropDownContainerStyle={{
                    borderColor: theme.colors.secondary,
                    borderTopWidth: 0,
                    position: 'relative', // Changed from 'absolute' to 'relative'
                    top: 0,
                    zIndex: 1000, // Ensure this is higher than other elements
                  }}
                  searchContainerStyle={{borderBottomWidth: 0}}
                  searchTextInputStyle={{
                    borderBottomWidth: 1,
                    borderColor: theme.colors.secondary,
                  }}
                  ActivityIndicatorComponent={() => (
                    <ActivityIndicator
                      color={theme.colors.secondary}
                      size={20}
                    />
                  )}
                  searchable={true}
                  searchPlaceholder="Search state..."
                  listMode="SCROLLVIEW"
                  scrollViewProps={{
                    nestedScrollEnabled: true,
                  }}
                />
              </View>

              <View
                style={{
                  zIndex: cityZIndex,
                  elevation: cityZIndex,
                  marginTop: 16,
                }}>
                <DropDownPicker
                  disabled={selectedState === ''}
                  disabledStyle={{backgroundColor: '#eee'}}
                  open={cityOpen}
                  onOpen={onCityOpen}
                  value={selectedCity}
                  items={cities}
                  setOpen={setCityOpen}
                  setValue={setSelectedCity}
                  setItems={setCities}
                  loading={loading}
                  placeholder="Select City"
                  placeholderStyle={{
                    color: theme.colors.secondary,
                    fontSize: 15,
                  }}
                  style={{borderColor: theme.colors.secondary}}
                  labelStyle={{color: theme.colors.secondary, fontSize: 15}}
                  listItemLabelStyle={{color: theme.colors.secondary}}
                  arrowIconStyle={{tintColor: theme.colors.secondary}}
                  dropDownContainerStyle={{
                    borderColor: theme.colors.secondary,
                    borderTopWidth: 0,
                    position: 'relative', // Changed from 'absolute' to 'relative'
                    top: 0,
                    zIndex: 1000, // Ensure this is higher than other elements
                  }}
                  searchContainerStyle={{borderBottomWidth: 0}}
                  searchTextInputStyle={{
                    borderBottomWidth: 1,
                    borderColor: theme.colors.secondary,
                  }}
                  ActivityIndicatorComponent={() => (
                    <ActivityIndicator
                      color={theme.colors.secondary}
                      size={20}
                    />
                  )}
                  searchable={true}
                  searchPlaceholder="Search city..."
                  listMode="SCROLLVIEW"
                  scrollViewProps={{
                    nestedScrollEnabled: true,
                  }}
                />
              </View>

              <TextInput
                mode="flat"
                label="ZIP Code"
                keyboardType="numeric"
                value={zipCode}
                onChangeText={setZipCode}
                theme={{colors: {primary: theme.colors.secondary}}}
                className="bg-slate-100 rounded-lg text-gray-300"
              />

              <View
                style={{
                  zIndex: genderZIndex,
                  elevation: genderZIndex,
                  marginTop: 16,
                }}>
                <DropDownPicker
                  open={genderOpen}
                  onOpen={onGenderOpen}
                  value={selectedGender}
                  items={genders}
                  setOpen={setGenderOpen}
                  setValue={setSelectedGender}
                  setItems={setGenders}
                  loading={loading}
                  placeholder="Select Gender"
                  placeholderStyle={{
                    color: theme.colors.secondary,
                    fontSize: 15,
                  }}
                  style={{borderColor: theme.colors.secondary}}
                  labelStyle={{color: theme.colors.secondary, fontSize: 15}}
                  listItemLabelStyle={{color: theme.colors.secondary}}
                  arrowIconStyle={{tintColor: theme.colors.secondary}}
                  dropDownContainerStyle={{
                    borderColor: theme.colors.secondary,
                    borderTopWidth: 0,
                    position: 'relative', // Changed from 'absolute' to 'relative'
                    top: 0,
                    zIndex: 1000, // Ensure this is higher than other elements
                  }}
                  listMode="SCROLLVIEW"
                  scrollViewProps={{
                    nestedScrollEnabled: true,
                  }}
                />
              </View>

              <DateSelector
                label={'Date of Birth'}
                placeholder={'Select Date of Birth'}
                value={birthDate}
                onChange={setBirthDate}
              />
            </View>

            <Button
              mode="contained"
              onPress={submitForm}
              className="mt-4 bg-[#125873] "
              labelStyle={{fontSize: 16}}
              loading={loading}>
              {loading ? 'Submitting...' : 'Submit'}
            </Button>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUpPage;

const styles = StyleSheet.create({});
