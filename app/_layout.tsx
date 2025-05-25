import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { Platform } from 'react-native';

import { useColorScheme } from '@/hooks/useColorScheme';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      {/* Define the root stack navigator */}
      <Stack
        initialRouteName="(auth)"
        screenOptions={{
          headerShown: false,
          animation: Platform.OS === 'android' ? 'slide_from_right' : 'default',
          presentation: 'card',
          animationDuration: 200,
          gestureEnabled: true,
          gestureDirection: 'horizontal',
          ...Platform.select({
            ios: {
              fullScreenGestureEnabled: true,
            },
          }),
        }}
      >
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen 
          name="camera" 
          options={{ 
            headerShown: false,
            animation: 'slide_from_right',
            presentation: 'card',
            gestureEnabled: true,
            gestureDirection: 'horizontal',
          }} 
        />
        <Stack.Screen 
          name="box" 
          options={{ 
            headerShown: false,
            animation: 'slide_from_right',
            presentation: 'card',
            gestureEnabled: true,
            gestureDirection: 'horizontal',
          }} 
        />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
