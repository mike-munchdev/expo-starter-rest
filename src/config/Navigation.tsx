import React, { useEffect, useState, useMemo, createContext } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';

import AsyncStorage from '@react-native-community/async-storage';
import { MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { useTheme, DefaultTheme, DarkTheme } from '@react-navigation/native';

import themes from '../constants/themes';

import { Home } from '../screens/Home';
import { Settings } from '../screens/Settings';

import { AuthContext, AppContext } from './context';
import { GetStarted } from '../screens/GetStarted/';

import { Sidebar } from '../screens/Sidebar';
import { AlertHelper } from '../utils/alert';
import { Profile } from '../screens/Profile';
import { Splash } from '../screens/Splash';

import { SignIn } from '../screens/SignIn';
import { SignUp } from '../screens/SignUp';
import { Multimedia } from '../screens/Multimedia';
import { Bible } from '../screens/Bible';
import { Events } from '../screens/Events';
import { More } from '../screens/More';

const AuthStack = createStackNavigator();
const Tabs = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const HomeStack = createStackNavigator();
const MultimediaStack = createStackNavigator();
const BibleStack = createStackNavigator();
const EventsStack = createStackNavigator();
const MoreStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const SettingsStack = createStackNavigator();

const DrawerScreen = () => {
  return (
    <Drawer.Navigator initialRouteName="App" drawerContent={() => <Sidebar />}>
      <Drawer.Screen name="App" component={HomeTabsScreen} />
      <Drawer.Screen name="Settings" component={SettingsStackScreen} />
      <Drawer.Screen name="Profile" component={ProfileStackScreen} />
    </Drawer.Navigator>
  );
};

const HomeTabsScreen = () => {
  const { colors } = useTheme();

  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          switch (route.name) {
            case 'Home':
              return (
                <MaterialCommunityIcons name="home" size={24} color={color} />
              );
            case 'Multimedia':
              return (
                <MaterialCommunityIcons
                  name="library-video"
                  size={24}
                  color={color}
                />
              );
            case 'Bible':
              return (
                <MaterialCommunityIcons name="bible" size={24} color={color} />
              );
            case 'Events':
              return (
                <MaterialCommunityIcons
                  name="calendar"
                  size={24}
                  color={color}
                />
              );
            case 'More':
              return (
                <MaterialCommunityIcons
                  name="dots-horizontal"
                  size={24}
                  color={color}
                />
              );
            default:
              return (
                <MaterialCommunityIcons name="cog" size={24} color={color} />
              );
          }
        },
      })}
    >
      <Tabs.Screen name="Home" component={HomeStackScreen} />
      <Tabs.Screen name="Multimedia" component={MultimediaStackScreen} />
      <Tabs.Screen name="Bible" component={BibleStackScreen} />
      <Tabs.Screen name="Events" component={EventsStackScreen} />
      <Tabs.Screen name="More" component={MoreStackScreen} />
    </Tabs.Navigator>
  );
};

const HomeStackScreen = () => (
  <HomeStack.Navigator screenOptions={{ headerShown: false }}>
    <HomeStack.Screen name="Home" component={Home} />
  </HomeStack.Navigator>
);
const MultimediaStackScreen = () => (
  <MultimediaStack.Navigator screenOptions={{ headerShown: false }}>
    <MultimediaStack.Screen name="Multimedia" component={Multimedia} />
  </MultimediaStack.Navigator>
);
const BibleStackScreen = () => (
  <BibleStack.Navigator screenOptions={{ headerShown: false }}>
    <BibleStack.Screen name="Bible" component={Bible} />
  </BibleStack.Navigator>
);
const EventsStackScreen = () => (
  <EventsStack.Navigator screenOptions={{ headerShown: false }}>
    <EventsStack.Screen name="Events" component={Events} />
  </EventsStack.Navigator>
);
const MoreStackScreen = () => (
  <MoreStack.Navigator screenOptions={{ headerShown: false }}>
    <MoreStack.Screen name="More" component={More} />
  </MoreStack.Navigator>
);
const SettingsStackScreen = () => (
  <SettingsStack.Navigator screenOptions={{ headerShown: false }}>
    <SettingsStack.Screen name="Settings" component={Settings} />
  </SettingsStack.Navigator>
);
const ProfileStackScreen = () => (
  <ProfileStack.Navigator screenOptions={{ headerShown: false }}>
    <ProfileStack.Screen name="Profile" component={Profile} />
  </ProfileStack.Navigator>
);

const AuthStackScreen = () => (
  <AuthStack.Navigator headerMode="none">
    <AuthStack.Screen
      name="GetStarted"
      component={GetStarted}
      options={{ headerShown: false }}
    />
    <AuthStack.Screen
      name="SignIn"
      component={SignIn}
      options={{ headerShown: false }}
    />
    <AuthStack.Screen
      name="SignUp"
      component={SignUp}
      options={{ headerShown: false }}
    />
  </AuthStack.Navigator>
);

const RootStack = createStackNavigator();

const RootStackScreen = (props: any) => {
  const { userToken } = props;

  return (
    <RootStack.Navigator headerMode="none">
      {userToken ? (
        <RootStack.Screen
          name="App"
          component={DrawerScreen}
          options={{
            animationEnabled: false,
          }}
        />
      ) : (
        <RootStack.Screen
          name="Auth"
          component={AuthStackScreen}
          options={{
            animationEnabled: false,
          }}
        />
      )}
    </RootStack.Navigator>
  );
};

export default () => {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const [currentTheme, setCurrentTheme] = useState(themes.blue);

  const updateTheme = async (theme: any) => {
    setCurrentTheme(theme);
    await AsyncStorage.setItem('currentTheme', JSON.stringify(currentTheme));
  };
  const updateUser = async (user: any) => {
    setUser(user);
    await AsyncStorage.setItem('user', JSON.stringify(user));
  };

  const authContext = useMemo(() => {
    return {
      getIsStarted: async () => {
        const isStarted = await AsyncStorage.getItem('isStarted');
        return isStarted;
      },
      setIsStarted: async (value: boolean) => {
        await AsyncStorage.setItem('isStarted', String(value));
      },
      signIn: async (token: string, customer: any, location?: string) => {
        setIsLoading(false);
        setUserToken(token);
        const user = { firstName: 'Michael', lastName: 'Griffin' };
        setUser(user);
        await AsyncStorage.setItem('token', token);
        await AsyncStorage.setItem('user', JSON.stringify(user));
      },
      signUp: (message: string, navigation: any) => {
        AlertHelper.setOnClose(() => {
          navigation.navigate('SignIn');
        });
        AlertHelper.show('success', 'Sign Up', message);
      },
      signOut: async () => {
        await AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('user');
        setIsLoading(false);
        setUserToken(null);
        setUser(null);
      },
    };
  }, []);

  useEffect(() => {
    (async () => {
      // set context values from AsyncStorage upon load
      const token = await AsyncStorage.getItem('token');

      if (token) {
        setUserToken(token);
      }
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    })();
  }, []);

  if (isLoading) {
    return <Splash />;
  }

  return (
    <AuthContext.Provider value={authContext}>
      <AppContext.Provider
        value={{
          user,
          setUserContext: updateUser,
          setCurrentThemeContext: updateTheme,
        }}
      >
        <NavigationContainer theme={currentTheme}>
          <RootStackScreen userToken={userToken} />
        </NavigationContainer>
      </AppContext.Provider>
    </AuthContext.Provider>
  );
};
