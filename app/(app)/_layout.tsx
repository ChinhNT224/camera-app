import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { StyleSheet } from 'react-native';

import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function AppLayout() {
  const colorScheme = useColorScheme();
  const iconColor = colorScheme === 'dark' ? Colors.dark.tabIconDefault : Colors.light.tabIconDefault;
  const selectedIconColor = colorScheme === 'dark' ? Colors.dark.tabIconSelected : Colors.light.tabIconSelected;

  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="/home"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => (
            <Ionicons 
              name="home-outline" 
              size={24} 
              color={focused ? selectedIconColor : iconColor} 
            />
          ),
        }}
      />
      <Tabs.Screen
        name="calendar"
        options={{
          title: 'Calendar',
          tabBarIcon: ({ focused }) => (
            <Ionicons 
              name="calendar-outline" 
              size={24} 
              color={focused ? selectedIconColor : iconColor} 
            />
          ),
        }}
      />
      <Tabs.Screen
        name="files"
        options={{
          title: 'Files',
          tabBarIcon: ({ focused }) => (
            <Ionicons 
              name="folder-outline" 
              size={24} 
              color={focused ? selectedIconColor : iconColor} 
            />
          ),
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: 'Favorites',
          tabBarIcon: ({ focused }) => (
            <Ionicons 
              name="heart-outline" 
              size={24} 
              color={focused ? selectedIconColor : iconColor} 
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused }) => (
            <Ionicons 
              name="person-outline" 
              size={24} 
              color={focused ? selectedIconColor : iconColor} 
            />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    height: 60,
    paddingBottom: 5,
    paddingTop: 5,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
});