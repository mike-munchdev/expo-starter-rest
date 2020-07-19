import React, { useState, useEffect, useContext } from 'react';
import { Button } from 'react-native-elements';
import { Text, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

import styles from './styles';
import { useTheme } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { StackActions } from '@react-navigation/native';
import { AppContext, AuthContext } from '../../config/context';

const SignIn = () => {
  const { colors } = useTheme();
  const { signIn } = useContext(AuthContext);
  return (
    <View style={styles.container}>
      <Button
        onPress={() => {
          signIn('michael');
        }}
        icon={
          <FontAwesome
            name="lock"
            size={15}
            color={colors.text}
            style={{ marginRight: 5 }}
          />
        }
        title="Sign In"
        titleStyle={{ fontWeight: 'bold', fontSize: 18 }}
      />
    </View>
  );
};
export default SignIn;
