import { ThemedView } from '@/components/ThemedView';
import AnimatedPressable from '@/components/AnimatedPressable';
import AnimatedView from '@/components/AnimatedView';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { StyleSheet, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <ThemedView style={styles.container}>
        {/* Header */}
        <AnimatedView style={styles.header} initialY={-20}>
          <Image
            source={require('../assets/images/icon.png')}
            style={styles.profilePic}
          />
          <Text style={styles.headerTitle}>Home</Text>
          <TouchableOpacity style={styles.settingsButton}>
            <Ionicons name="settings-outline" size={24} color="black" />
          </TouchableOpacity>
        </AnimatedView>

        {/* Welcome message */}
        <AnimatedView style={styles.welcomeSection} delay={50}>
          <Text style={styles.welcomeTitle}>How may I help you</Text>
          <Text style={styles.welcomeTitle}>today?</Text>
        </AnimatedView>

        {/* Features section */}
        <View style={styles.featuresSection}>
          <AnimatedView style={styles.sectionHeader} delay={100}>
            <Text style={styles.sectionTitle}>Features</Text>
            <Text style={styles.sectionSubtitle}>Others</Text>
          </AnimatedView>

          <View style={styles.featureCardsContainer}>
            {/* Cameras card - takes full height on left */}
            <AnimatedView style={styles.leftCardContainer} delay={150}>
              <AnimatedPressable
                style={styles.featureCard}
                onPress={() => router.push('/box')}
              >
                <LinearGradient
                  colors={['#4776E6', '#1E88E5', '#0D47A1']}
                  style={styles.gradientBackground}
                >
                  <Ionicons name="camera-outline" size={32} color="white" />
                  <View style={styles.cardTitleContainer}>
                    <Text style={styles.featureCardTitle}>Boxs</Text>
                  </View>
                  <Ionicons
                    name="arrow-forward-outline"
                    size={20}
                    color="white"
                    style={styles.cardArrow}
                  />
                </LinearGradient>
              </AnimatedPressable>
            </AnimatedView>

            <View style={styles.rightCardsColumn}>
              {/* Add camera card - top right */}
              <AnimatedView style={styles.rightCardContainer} delay={200}>
                <AnimatedPressable
                  style={styles.featureCard}
                >
                  <LinearGradient
                    colors={['#FF9800', '#FF5722', '#E91E63']}
                    style={styles.gradientBackground}
                  >
                    <Ionicons name="camera-outline" size={32} color="white" />
                    <Text style={styles.featureCardTitle}>Add box</Text>
                    <Ionicons
                      name="arrow-forward-outline"
                      size={20}
                      color="white"
                      style={styles.cardArrow}
                    />
                  </LinearGradient>
                </AnimatedPressable>
              </AnimatedView>

              {/* Playback card - bottom right */}
              <AnimatedView style={styles.rightCardContainer} delay={250}>
                <AnimatedPressable
                  style={styles.featureCard}
                >
                  <LinearGradient
                    colors={['#00BCD4', '#26A69A', '#009688']}
                    style={styles.gradientBackground}
                  >
                    <Ionicons name="videocam-outline" size={32} color="white" />
                    <Text style={styles.featureCardTitle}>Playback</Text>
                    <Ionicons
                      name="arrow-forward-outline"
                      size={20}
                      color="white"
                      style={styles.cardArrow}
                    />
                  </LinearGradient>
                </AnimatedPressable>
              </AnimatedView>
            </View>
          </View>
        </View>
        {/* Rencent notifications */}
        <View style={{ paddingHorizontal: 16, marginTop: 30 }}>
          <AnimatedView style={styles.sectionHeader} delay={300}>
            <Text style={styles.sectionTitle}>Recent notifications</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See all</Text>
            </TouchableOpacity>
          </AnimatedView>
        </View>

        <ScrollView 
          style={styles.scrollView} 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: insets.bottom + 60 // Add bottom padding for tab bar
          }}
        >
          {/* Notifications section */}
          <View style={styles.notificationsSection}>
            {/* Warning notification */}
            <AnimatedView delay={350}>
              <AnimatedPressable style={styles.notificationCard}>
                <View style={styles.notificationIconContainer}>
                  <Ionicons name="alert-circle-outline" size={24} color="white" />
                </View>
                <View style={styles.notificationContent}>
                  <Text style={styles.notificationTitle}>Warning</Text>
                  <Text style={styles.notificationText}>Detected fire</Text>
                  <Text style={styles.notificationText}>Detected fire at 2th floor</Text>
                </View>
              </AnimatedPressable>
            </AnimatedView>

            {/* Regular notifications */}
            {[1, 2].map((item, index) => (
              <AnimatedView key={index} delay={400 + (index * 50)}>
                <AnimatedPressable style={styles.notificationCard}>
                  <View style={styles.notificationIconContainer}>
                    <Ionicons name="alert-circle-outline" size={24} color="white" />
                  </View>
                  <View style={styles.notificationContent}>
                    <Text style={styles.notificationTitle}>notification type</Text>
                    <Text style={styles.notificationText}>summary</Text>
                    <Text style={styles.notificationText}>content</Text>
                  </View>
                </AnimatedPressable>
              </AnimatedView>
            ))}
          </View>
        </ScrollView>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#fff',
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  settingsButton: {
    padding: 8,
  },
  scrollView: {
    flex: 1,
  },
  welcomeSection: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 10,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  featuresSection: {
    paddingHorizontal: 16,
    paddingTop: 10,
    height: '30%',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#555',
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#777',
  },
  featureCardsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  leftCardContainer: {
    width: '48%',
    height: '100%',
  },
  rightCardsColumn: {
    width: '48%',
    height: '100%',
    justifyContent: 'space-between',
  },
  rightCardContainer: {
    height: '48%',
  },
  featureCard: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
  },
  gradientBackground: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
  },
  camerasCard: {
    height: '100%',
  },
  addCameraCard: {
    height: '100%',
  },
  playbackCard: {
    height: '100%',
  },
  cardTitleContainer: {
    marginTop: 'auto',
  },
  featureCardTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
  },
  cardArrow: {
    position: 'absolute',
    top: 16,
    right: 16,
  },
  notificationsSection: {
    paddingHorizontal: 16,
  },
  seeAllText: {
    color: '#1E88E5',
    fontSize: 14,
  },
  notificationCard: {
    backgroundColor: '#F44336',
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  notificationIconContainer: {
    marginRight: 16,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  notificationText: {
    color: 'white',
    fontSize: 14,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingTop: 10,
  },
  navItem: {
    alignItems: 'center',
    padding: 10,
  },
});