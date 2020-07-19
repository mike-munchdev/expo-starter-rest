import React, { useState, useEffect, useContext, Fragment } from 'react';
import { Text, View, SafeAreaView } from 'react-native';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';

import styles from './styles';
import colors from '../../constants/colors';

import { AuthContext, AppContext } from '../../config/context';

import SidebarMenuItem from './SidebarMenuItem';

import { useNavigation } from '@react-navigation/native';
import { Divider, Header } from 'react-native-elements';
import { useTheme } from '@react-navigation/native';

const Sidebar = () => {
  const { signOut } = useContext(AuthContext);
  const { user } = useContext(AppContext);
  const { colors } = useTheme();
  const navigation = useNavigation();

  return (
    <Fragment>
      <Header backgroundColor={colors.background} />
      <View style={styles.container}>
        <View style={{ marginLeft: 10, marginBottom: 20 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <FontAwesome
              name="user-circle"
              // color={colors.text}
              size={32}
            />
            <TouchableOpacity
              onPress={() => navigation.navigate('Profile')}
              style={{ marginLeft: 15 }}
            >
              <Text style={{ fontSize: 18 }}>{`${
                user ? `${user.firstName} ${user.lastName}` : ''
              }`}</Text>

              <Text style={{ fontSize: 14 }}>View Profile</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Divider style={{ marginBottom: 20 }} />
        <View style={{ marginLeft: 10, marginBottom: 20 }}>
          <SidebarMenuItem
            onPress={async () => {
              navigation.navigate('Home');
            }}
            icon={() => (
              <MaterialCommunityIcons
                name="home"
                size={20}
                // color={colors.text}
              />
            )}
            title="Home"
          />
        </View>
        <Divider style={{ marginBottom: 20 }} />
        <View style={{ marginLeft: 10, marginBottom: 20 }}>
          <SidebarMenuItem
            onPress={async () => {
              navigation.navigate('Settings');
            }}
            iconName="cog"
            // iconColor={colors}
            iconSize={20}
            title="Settings"
          />
          <SidebarMenuItem
            onPress={async () => {
              await signOut();
            }}
            iconName="sign-out"
            // iconColor={colors.text}
            iconSize={20}
            title="Logout"
            viewStyles={{ marginTop: 20 }}
          />
        </View>
        <Divider style={{ marginBottom: 20 }} />
      </View>
    </Fragment>
  );
};
export default Sidebar;
