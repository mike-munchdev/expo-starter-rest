import React, { useState, useEffect, Fragment } from 'react';
import { Text, View } from 'react-native';

import styles from './styles';
import { Header } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '@react-navigation/native';

const Multimedia = () => {
  const navigation = useNavigation();
  const { colors } = useTheme();
  return (
    <Fragment>
      <Header
        backgroundColor={colors.border}
        leftComponent={{
          icon: 'menu',
          color: colors.text,
          onPress: () => navigation.openDrawer(),
        }}
        centerComponent={{
          text: 'Multimedia'.toUpperCase(),
          style: { color: colors.text, fontWeight: 'bold', fontSize: 16 },
        }}
      />
      <View style={styles.container}>
        <Text>Multimedia</Text>
      </View>
    </Fragment>
  );
};
export default Multimedia;
