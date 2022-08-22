import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
// import {
//   DarkTheme as PaperDarkTheme,
//   DefaultTheme as PaperDefaultTheme,
// } from 'react-native-paper';
import merge from 'deepmerge';

// REF: https://callstack.github.io/react-native-paper/theming.html
// REF: https://reactnavigation.org/docs/themes/
// REF: https://reactnativeelements.com/docs/customization
// const sampleTheme = {
//   dark: true,
//   mode: 'adaptive',
//   roundness: 2,
//   colors: {
//     primary: '',
//     secondary: '',
//     accent: '',
//     background: '',
//     surface: '',
//     card: '',
//     text: '',
//     disabled: '',
//     placeholder: '',
//     backdrop: '',
//     onSurface: '',
//     border: '',
//     notification: '',
//     white: '',
//     black: '',
//     grey0: '',
//     grey1: '',
//     grey2: '',
//     grey3: '',
//     grey4: '',
//     grey5: '',
//     greyOutline: '',
//     searchBg: '',
//     success: '',
//     error: '',
//     warning: '',
//     divider: '',
//   },
//   fonts: {
//     regular: '',
//     medium: '',
//     light: '',
//     thin: '',
//   },
//   animation: {
//     scale: 1,
//   },
//   platform: {
//     ios: {
//       primary: '',
//       secondary: '',
//       grey: '',
//       searchBg: '',
//       success: '',
//       error: '',
//       warning: '',
//     },
//     android: {
//       primary: '',
//       secondary: '',
//       grey: '',
//       searchBg: '',
//       success: '',
//       error: '',
//       warning: '',
//     },
//     web: {
//       primary: '',
//       secondary: '',
//       grey: '',
//       searchBg: '',
//       success: '',
//       error: '',
//       warning: '',
//     },
//   },
// };

const customCommonTheme = {
  roundness: 2,
  colors: {
    primary: '#5628F3',
    accent: '#F1C40F',
    white: '#FFFFFF',
    black: '#000000',
  },
};

// TODO: Remove Color suffix

const customLightTheme = {
  colors: {
    backgroundColor: '#FFFFFF',
    textColor: '#000',
    tinyTextColor: '#343036',
    carouselIndicatorColor: '#343036',
    menuBackgroundColor: '#7B1FA2',
    menuColor: '#7B1FA2',
    borderColor: '#AB47BC',
    blackOrWhite: '#fff',
    notificationColor: "#521e69",
    
  },
};     
const customDarkTheme = {
  colors: {
    backgroundColor: '#101217',
    textColor: '#FFFFFF',
    tinyTextColor: '#959296',
    carouselIndicatorColor: '#959296',
    menuBackgroundColor: '#1d222b',
    menuColor: '#fff',
    borderColor: '#d6b4db',
    blackOrWhite: '#101217',
    notificationColor: "#0f0d0f"
  },
};

const CombinedDefaultTheme = merge.all([
  NavigationDefaultTheme,
  customCommonTheme,
  customLightTheme,
]);
const CombinedDarkTheme = merge.all([
  NavigationDarkTheme,
  customCommonTheme,
  customDarkTheme,
]);

export { CombinedDefaultTheme as LightTheme, CombinedDarkTheme as DarkTheme };
