import React, { useState, useEffect } from 'react';
import { Button } from 'react-native-elements';
import { Text, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

import styles from './styles';
import { useTheme } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';

const GetStarted = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Button
        onPress={() => navigation.navigate('SignIn')}
        icon={
          <FontAwesome
            name="lock"
            size={15}
            color={colors.text}
            style={{ marginRight: 5 }}
          />
        }
        title="Get Started"
        titleStyle={{ fontWeight: 'bold', fontSize: 18 }}
      />
    </View>
  );
};
export default GetStarted;
