import { useEffect, useRef } from 'react';
import { Animated, ViewStyle } from 'react-native';

interface AnimatedViewProps {
  children: React.ReactNode;
  delay?: number;
  style?: ViewStyle;
  initialY?: number;
  duration?: number;
}

export default function AnimatedView({
  children,
  delay = 0,
  style,
  initialY = 20,
  duration = 300,
}: AnimatedViewProps) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const positionAnim = useRef(new Animated.Value(initialY)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: duration,
        delay: delay,
        useNativeDriver: true,
      }),
      Animated.timing(positionAnim, {
        toValue: 0,
        duration: duration,
        delay: delay,
        useNativeDriver: true,
      })
    ]).start();
  }, []);

  return (
    <Animated.View
      style={[
        style,
        {
          opacity: fadeAnim,
          transform: [{ translateY: positionAnim }]
        }
      ]}
    >
      {children}
    </Animated.View>
  );
} 