import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useTheme} from 'react-native-paper';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import Home from '../screens/Home';
import Settings from '../screens/Settings';
import Profile from '../screens/Profile';
import {SafeAreaView} from 'react-native-safe-area-context';

const Tab = createBottomTabNavigator();

export default function BottomTabNavigation() {
  const theme = useTheme();

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: theme.colors.background}}>
      <Tab.Navigator
        backBehavior="history"
        screenOptions={{
          headerShown: false,
          headerStyle: {
            backgroundColor: theme.colors.secondary,
            elevation: 0,
            shadowOpacity: 0,
          },
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'normal',
            fontSize: 18,
          },
          tabBarShowLabel: false,
          headerTintColor: theme.colors.primary,
          tabBarStyle: styles.tabBar,
        }}
        initialRouteName="Home">
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: ({focused, color, size}) => (
              <TabBarIcon
                focused={focused}
                iconName="home"
                color={color}
                size={size}
              />
            ),
          }}
        />
        {/* <Tab.Screen
          name="Settings"
          component={Settings}
          options={{
            tabBarIcon: ({focused, color, size}) => (
              <TabBarIcon
                focused={focused}
                iconName="settings"
                color={color}
                size={size}
              />
            ),
          }}
        /> */}
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarIcon: ({focused, color, size}) => (
              <TabBarIcon
                focused={focused}
                iconName="person"
                color={color}
                size={size}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
}

const TabBarIcon = ({focused, iconName, color, size}) => {
  const theme = useTheme();

  return (
    <View style={styles.tabBarItemContainer}>
      <View
        style={[
          styles.iconContainer,
          focused ? styles.iconContainerFocused : null,
        ]}>
        <Icon
          name={iconName}
          size={size}
          color={focused ? '#FFFFFF' : theme.colors.secondary}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    bottom: 25,
    left: 20,
    right: 20,
    elevation: 0,
    backgroundColor: '#B6D0E2',
    borderRadius: 15,
    height: 70,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
  },
  tabBarItemContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#F0F0F0',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
  },
  iconContainerFocused: {
    backgroundColor: '#125873',
  },
});
