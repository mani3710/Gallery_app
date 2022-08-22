import {Dimensions, PixelRatio} from 'react-native';

const WINDOW_WIDTH = Dimensions.get('window').width;
const WINDOW_HEIGHT = Dimensions.get('window').height;

// ? Guideline sizes are based on iPhone 11 Pro dimensions (375 x 812)
const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

export const scaleSize = (size) => (WINDOW_WIDTH / guidelineBaseWidth) * size;
export const verticalScaleSize = (size) =>
  (WINDOW_HEIGHT / guidelineBaseHeight) * size;

export const scaleFont = (size) => size * PixelRatio.getFontScale();

export const dimensions = (
  top,
  right = top,
  bottom = top,
  left = right,
  property,
) => {
  // ? styles[`${property}Right`] = scaleSize(right);
  let styles = {};

  styles[`${property}Top`] = top;
  styles[`${property}Right`] = right;
  styles[`${property}Bottom`] = bottom;
  styles[`${property}Left`] = left;

  return styles;
};

// margin
export const margin = (top, right, bottom, left) => {
  return dimensions(top, right, bottom, left, 'margin');
};
export const marginHorizontal = (size) => {
  return margin(0, size, 0, size);
};
export const marginVertical = (size) => {
  return margin(size, 0, size, 0);
};
export const marginTop = (size) => {
  return margin(size, 0, 0, 0);
};
export const marginRight = (size) => {
  return margin(0, size, 0, 0);
};
export const marginBottom = (size) => {
  return margin(0, 0, size, 0);
};
export const marginLeft = (size) => {
  return margin(0, 0, 0, size);
};

// padding
export const padding = (top, right, bottom, left) => {
  return dimensions(top, right, bottom, left, 'padding');
};
export const paddingHorizontal = (size) => {
  return padding(0, size, 0, size);
};
export const paddingVertical = (size) => {
  return padding(size, 0, size, 0);
};
export const paddingTop = (size) => {
  return padding(size, 0, 0, 0);
};
export const paddingRight = (size) => {
  return padding(0, size, 0, 0);
};
export const paddingBottom = (size) => {
  return padding(0, 0, size, 0);
};
export const paddingLeft = (size) => {
  return padding(0, 0, 0, size);
};

export const boxShadow = (
  color,
  offset = {height: 2, width: 2},
  radius = 8,
  opacity = 0.2,
) => {
  return {
    shadowColor: color,
    shadowOffset: offset,
    shadowOpacity: opacity,
    shadowRadius: radius,
    elevation: radius,
  };
};
