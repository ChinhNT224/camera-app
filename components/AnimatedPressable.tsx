import { TouchableOpacity, ViewStyle } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

interface AnimatedPressableProps {
  children: React.ReactNode;
  style?: ViewStyle;
  onPress?: () => void;
  activeOpacity?: number;
}

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

export default function AnimatedPressable({
  children,
  style,
  onPress,
  activeOpacity = 1,
}: AnimatedPressableProps) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePress = () => {
    scale.value = withSequence(
      withTiming(0.9, { duration: 150 }),
      withSpring(1, {
        damping: 4,
        stiffness: 80,
      })
    );
    onPress?.();
  };

  return (
    <AnimatedTouchable
      onPress={handlePress}
      activeOpacity={activeOpacity}
      style={[
        { flex: 1 },
        style,
        animatedStyle,
      ]}
    >
      {children}
    </AnimatedTouchable>
  );
} 