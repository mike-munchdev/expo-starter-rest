import React, { useContext, FC } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  TouchableHighlight,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import styles from './styles';
import colors from '../../constants/colors';
import { AuthContext } from '../../config/context';

export interface IHeaderProps {
  title?: string;
}
const Header: FC<IHeaderProps> = ({ title }) => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.header}>
      <View style={styles.headerLeft}>
        <TouchableOpacity
          style={styles.leftIcon}
          onPress={() => navigation.openDrawer()}
        >
          <FontAwesome
            name="user-circle"
            color={colors.white.normal}
            size={25}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.headerCenter}>
        {title ? (
          <Text style={styles.headerCenterTitle}>{title}</Text>
        ) : (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('SelectPharmacy');
            }}
          >
            <View style={styles.headerCenter}>
              <Text style={styles.headerCenterTitle}>{title}</Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.headerRight}></View>
    </SafeAreaView>
  );
};

export default Header;
