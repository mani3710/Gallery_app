import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  createContext,
  useContext,
} from 'react';
// import { Provider as PaperProvider } from 'react-native-paper';
import { ThemeProvider as ElementProvider } from 'react-native-elements';
import { ThemeProvider as StyleProvider } from 'styled-components/native';
// import { Appearance } from 'react-native';
import { useSelector } from 'react-redux';
import { DarkTheme, LightTheme } from '../../styles';

// const systemColorScheme = Appearance.getColorScheme() || 'light';

const ThemeContext = createContext();

// TODO: Use Toggle to store the user preferred theme
const ThemeProvider = ({ children }) => {
  const userReducer = useSelector(state => state.data);

  // const isSystemColorSchemeDark = systemColorScheme === 'dark';
  const isSystemColorSchemeDark = userReducer.isDarkMode;
  const [isDark, setIsDark] = useState(isSystemColorSchemeDark);

  let theme = isDark ? DarkTheme : LightTheme;

  console.log(`ThemeProvider isDark = ${isDark}`);

  const onThemeChange = ({ colorScheme }) => {
    console.log('ThemeProvider OnThemeChange colorScheme =', colorScheme);
    setIsDark(colorScheme === 'dark');
  };

  // useEffect(() => {
  //   Appearance.addChangeListener(onThemeChange);

  //   return () => Appearance.removeChangeListener(onThemeChange);
  // }, []);

  const toggleTheme = useCallback(() => {
    return setIsDark(!isDark);
  }, [isDark]);

  const preferences = useMemo(
    () => ({
      toggleTheme,
      isDark,
      theme,
    }),
    [toggleTheme, isDark, theme],
  );

  return (
    <ThemeContext.Provider value={preferences}>
      {/* <PaperProvider theme={theme}> */}
        <ElementProvider useDark={isDark} theme={theme}>
          <StyleProvider theme={theme}>{children}</StyleProvider>
        </ElementProvider>
      {/* </PaperProvider> */}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
export default ThemeProvider;
