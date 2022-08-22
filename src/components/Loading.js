import React from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';

import {Colors} from '../styles';

// TODO: Complete Loading
// REF: https://styled-components.com/docs/basics#attaching-additional-props
const StyledIndicator = styled.ActivityIndicator.attrs((props) => ({
  size: props.size || 'large',
  color: props.color || props.theme.colors.primary,
}))`
  size: ${(props) => props.size};
  color: ${(props) => props.color};
`;

const Loading = ({size, color}) => {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size={size} color={color} />
      {/* <StyledIndicator size={size} color={color} /> */}
    </View>
  );
};

Loading.propTypes = {
  size: PropTypes.string,
  color: PropTypes.string,
};

Loading.defaultProps = {
  size: 'large',
  color: Colors.PRIMARY,
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Loading;
