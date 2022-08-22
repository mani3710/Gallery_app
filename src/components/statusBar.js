import React from 'react';
import { StatusBar } from 'react-native';
import PropTypes from 'prop-types';

import { Colors } from '../styles';
import { useTheme } from '../contexts';
// TODO: Handle Edge Case for wrongly typed string
const Splash = ({ backgroundColor }) => {
  const { theme } = useTheme();
  return <StatusBar backgroundColor={theme.colors.notificationColor} />;
};

Splash.propTypes = {
  backgroundColor: PropTypes.string,
};

Splash.defaultProps = {
  backgroundColor: Colors.GREEN[700],
};

export default Splash;
