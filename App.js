import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Routes from './src/routes';
import BooksListPage from './src/screens/BooksListPage';
import PhotosPage from './src/screens/PhotosPage';
import SignIn from './src/screens/SignIn';
import SignUp from './src/screens/SignUp';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name={Routes.SignUp} component={SignUp}/>
        <Stack.Screen name={Routes.SignIn} component={SignIn}/>
        <Stack.Screen name={Routes.BooksListPage} component={BooksListPage} />
        <Stack.Screen name={Routes.PhotosPage} component={PhotosPage}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};