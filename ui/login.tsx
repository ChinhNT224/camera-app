import TextInput from '@/components/inputs/TextInput';
import { ThemedView } from '@/components/ThemedView';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useRef, useState } from 'react';
import { Animated, Easing, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  // Animation values
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handleLogin = () => {
    // Button press animation
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
        easing: Easing.out(Easing.ease),
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
        easing: Easing.in(Easing.ease),
      }),
    ]).start();

    // Start screen transition animation after button animation
    setTimeout(() => {
      // Changed animation type to a zoom-out fade effect
      Animated.parallel([
        // Fade out the current screen with easing
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
          easing: Easing.bezier(0.25, 0.1, 0.25, 1), // Cubic bezier for smoother motion
        }),
        // Scale up slightly as it fades out
        Animated.timing(slideAnim, {
          toValue: 1.1,
          duration: 500,
          useNativeDriver: true,
          easing: Easing.bezier(0.25, 0.1, 0.25, 1),
        })
      ]).start(() => {
        // Navigate after animation completes
        router.replace('/home');
      });
    }, 150);
  };

  return (
    <ThemedView style={styles.container}>
      <Animated.View style={{
        flex: 1,
        opacity: fadeAnim,
        transform: [
          { scale: Animated.add(1, Animated.multiply(slideAnim, 0.1)) } // Transform using the slide value for scaling
        ]
      }}>
        <SafeAreaView style={{height: '100%'}}>
          {/* Logo and app name */}
          <View style={styles.logoContainer}>
            <Ionicons name="camera" size={48} color="#1E88E5" />
            <Text style={styles.logoText}>Logo app</Text>
          </View>
          
          {/* Login title and subtitle */}
          <Text style={styles.title}>Login</Text>
          <Text style={styles.subtitle}>Login to continue using the app</Text>
          
          {/* Email/phone input */}
          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.input, {outline: 'none'}]}
              placeholder="Enter your email or phone number"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              lablel='Email or phone number'
            />
          </View>
          
          {/* Password input */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Password</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={[styles.passwordInput, {outline: 'none'}]}
                placeholder="Enter password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity 
                style={styles.eyeIcon} 
                onPress={() => setShowPassword(!showPassword)}
              >
                <Ionicons 
                  name={showPassword ? "eye-off-outline" : "eye-outline"} 
                  size={24} 
                  color="#777" 
                />
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.forgotPasswordContainer}>
              <Text style={styles.forgotPassword}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>
          
          {/* Login button */}
          <Animated.View style={{
            transform: [{ scale: scaleAnim }]
          }}>
            <TouchableOpacity 
              style={styles.loginButton} 
              onPress={handleLogin}
              activeOpacity={0.9}
            >
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
          </Animated.View>
          
          {/* Social login options */}
          <Text style={styles.orLoginWith}>Or Login with</Text>
          
          {/* <TouchableOpacity style={styles.facebookButton}>
            <Ionicons name="logo-facebook" size={24} color="#3b5998" />
            <Text style={styles.socialButtonText}>Facebook</Text>
          </TouchableOpacity> */}
          
          <TouchableOpacity style={styles.googleButton}>
            <Image 
              source={require('../assets/images/google-icon.png')} 
              style={{width: 24, height: 24}}
            />
            <Text style={styles.socialButtonText}>Google</Text>
          </TouchableOpacity>
          
          {/* Register link */}
          <View style={styles.registerContainer}>
            <Text style={styles.noAccountText}>Don't have account? </Text>
            <TouchableOpacity onPress={() => router.push('/register')}>
              <Text style={styles.registerText}>Register</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Animated.View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 30,
  },
  logoText: {
    marginTop: 8,
    fontSize: 16,
    color: '#333',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#000',
  },
  subtitle: {
    fontSize: 16,
    color: '#777',
    marginBottom: 30,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    marginBottom: 8,
    color: '#000',
    fontWeight: '500'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 15,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  passwordContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 15,
    backgroundColor: '#fff',
  },
  passwordInput: {
    flex: 1,
    padding: 12,
    fontSize: 16,
    borderRadius: 15,
  },
  eyeIcon: {
    padding: 12,
    justifyContent: 'center',
  },
  forgotPasswordContainer: {
    alignSelf: 'flex-end',
    marginTop: 8,
  },
  forgotPassword: {
    color: '#777',
    fontSize: 14,
    fontWeight: '500',
  },
  loginButton: {
    backgroundColor: '#1E88E5',
    paddingVertical: 14,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  orLoginWith: {
    textAlign: 'center',
    color: '#777',
    marginBottom: 15,
    marginTop: 10
  },
  facebookButton: {
    flexDirection: 'row',
    backgroundColor: '#E6F0FF',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  googleButton: {
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
    paddingVertical: 12,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    marginTop: 15
  },
  socialButtonText: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: '500',
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 10,
    width: '100%',
  },
  noAccountText: {
    color: '#777',
    fontSize: 14,
  },
  registerText: {
    color: '#1E88E5',
    fontSize: 14,
    fontWeight: 'bold',
  }
});