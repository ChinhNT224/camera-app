import { Stack } from 'expo-router';
import HomeScreen from '../(auth)';

export default function HomeLayout() {
  return (
    <Stack screenOptions={{
      headerShown: false,
    }}>
      <HomeScreen />
    </Stack>
  );
}