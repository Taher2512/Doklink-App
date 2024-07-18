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
    secondary: '#1E40AF',
    tertiary: '#E9E3F1',
    secondaryContainer: '#E1F5FE',
    surfaceVariant: '#fff',
    onSurfaceVariant: '#1E40AF',
    outline: '#fff',
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
