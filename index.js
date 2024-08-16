import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {MD3LightTheme as DefaultTheme, PaperProvider} from 'react-native-paper';

const theme = {
  ...DefaultTheme,
  // Specify custom property in nested object
  colors: {
    ...DefaultTheme.colors,
    primary: '#fff',
    secondary: '#125873',
    tertiary: '#d9f7f7',
    secondaryContainer: '#E1F5FE',
    surfaceVariant: '#fff',
    onSurfaceVariant: '#125873',
    outline: '#fff',
    textColor: 'black',
  },
};

export default function Main() {
  return (
    <PaperProvider theme={theme}>
      <App />
    </PaperProvider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
