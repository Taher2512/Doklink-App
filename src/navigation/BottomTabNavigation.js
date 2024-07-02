import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useTheme} from 'react-native-paper';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Settings from '../screens/Settings';
import Profile from '../screens/Profile';

const Tab = createBottomTabNavigator();

export default function BottomTabNavigation() {
  const theme = useTheme();

  return (
    <Tab.Navigator
      backBehavior="history"
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: theme.colors.secondary,
          borderBottomWidth: 1,
          borderBottomColor: '#ccc',
        },
        tabBarShowLabel: false,
        headerTintColor: theme.colors.primary,
        tabBarStyle: {
          position: 'absolute',
          bottom: 25,
          left: 20,
          right: 20,
          borderRadius: 20,
          height: '10.5%',
          elevation: 0,
          backgroundColor: '#1E40AF',
          ...styles.shadow,
        },
      }}
      initialRouteName="Home">
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Image
                source={require('../assets/icons/portfolio.png')}
                resizeMode="contain"
                style={{
                  width: 32,
                  height: 32,
                  tintColor: '#fff',
                }}
              />

              <Text
                style={{
                  fontWeight: focused ? 700 : 400,
                  color: focused ? '#fff' : '#fff',
                  fontSize: 12,
                }}>
                Home
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Image
                source={require('../assets/icons/portfolio.png')}
                resizeMode="contain"
                style={{
                  width: 32,
                  height: 32,
                  tintColor: '#fff',
                }}
              />

              <Text
                style={{
                  fontWeight: focused ? 700 : 400,
                  color: focused ? '#fff' : '#fff',
                  fontSize: 12,
                }}>
                Settings
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Image
                source={require('../assets/icons/portfolio.png')}
                resizeMode="contain"
                style={{
                  width: 32,
                  height: 32,
                  tintColor: '#fff',
                }}
              />

              <Text
                style={{
                  fontWeight: focused ? 700 : 400,
                  color: focused ? '#fff' : '#fff',
                  fontSize: 12,
                }}>
                Profile
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});
