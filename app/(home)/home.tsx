import { ThemedView } from '@/components/ThemedView';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useEffect, useRef } from 'react';
import { Animated, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
  const router = useRouter();

  // Create animated values for each card
  const camerasScale = useRef(new Animated.Value(1)).current;
  const addCameraScale = useRef(new Animated.Value(1)).current;
  const playbackScale = useRef(new Animated.Value(1)).current;

  // Create an array of animated values for notifications
  const notificationScales = useRef([
    new Animated.Value(1),
    new Animated.Value(1),
    new Animated.Value(1)
  ]).current;

  // Animation values for initial loading animations
  const fadeAnim = useRef({
    header: new Animated.Value(0),
    welcome: new Animated.Value(0),
    featuresTitle: new Animated.Value(0),
    camerasCard: new Animated.Value(0),
    addCameraCard: new Animated.Value(0),
    playbackCard: new Animated.Value(0),
    notificationsTitle: new Animated.Value(0),
    notifications: [
      new Animated.Value(0),
      new Animated.Value(0),
      new Animated.Value(0)
    ],
    bottomNav: new Animated.Value(0)
  }).current;

  // Animation values for position
  const positionAnim = useRef({
    header: new Animated.Value(-20),
    welcome: new Animated.Value(20),
    featuresTitle: new Animated.Value(20),
    camerasCard: new Animated.Value(30),
    addCameraCard: new Animated.Value(30),
    playbackCard: new Animated.Value(30),
    notificationsTitle: new Animated.Value(20),
    notifications: [
      new Animated.Value(40),
      new Animated.Value(40),
      new Animated.Value(40)
    ],
    bottomNav: new Animated.Value(20)
  }).current;

  // Function to handle card press animation
  const animatePress = (scale: any) => {
    // Reset the scale to 1 before starting new animation
    scale.setValue(1);

    // Zoom out more noticeably and then zoom back in with spring effect
    Animated.sequence([
      // Zoom out more (to 0.9 instead of 0.95)
      Animated.timing(scale, {
        toValue: 0.9,
        duration: 150,
        useNativeDriver: true,
      }),
      // Zoom back in with spring for a more dynamic effect
      Animated.spring(scale, {
        toValue: 1,
        friction: 4,
        tension: 40,
        useNativeDriver: true,
      })
    ]).start();
  };

  // Making Home Screen Animations Faster

  // I see you want to speed up the animations on your home screen. Currently, your animations have a duration of 500ms with various delays between elements, which creates a nice staggered effect but might feel a bit slow. Let's modify the animation timing to make everything appear faster.

  // Here's how to update your home screen animations:

  // Run animations when component mounts
  useEffect(() => {
    // Create a staggered animation sequence
    const animations = [
      // Header animation
      Animated.parallel([
        Animated.timing(fadeAnim.header, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(positionAnim.header, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        })
      ]),

      Animated.parallel([
        Animated.timing(fadeAnim.welcome, {
          toValue: 1,
          duration: 300,
          delay: 50,
          useNativeDriver: true,
        }),
        Animated.timing(positionAnim.welcome, {
          toValue: 0,
          duration: 300,
          delay: 50,
          useNativeDriver: true,
        })
      ]),

      // Features title animation
      Animated.parallel([
        Animated.timing(fadeAnim.featuresTitle, {
          toValue: 1,
          duration: 300,
          delay: 100,
          useNativeDriver: true,
        }),
        Animated.timing(positionAnim.featuresTitle, {
          toValue: 0,
          duration: 300,
          delay: 100,
          useNativeDriver: true,
        })
      ]),

      // Feature cards animations
      Animated.parallel([
        // Cameras card
        Animated.parallel([
          Animated.timing(fadeAnim.camerasCard, {
            toValue: 1,
            duration: 300,
            delay: 150,
            useNativeDriver: true,
          }),
          Animated.timing(positionAnim.camerasCard, {
            toValue: 0,
            duration: 300,
            delay: 150,
            useNativeDriver: true,
          })
        ]),

        // Add camera card
        Animated.parallel([
          Animated.timing(fadeAnim.addCameraCard, {
            toValue: 1,
            duration: 300,
            delay: 200,
            useNativeDriver: true,
          }),
          Animated.timing(positionAnim.addCameraCard, {
            toValue: 0,
            duration: 300,
            delay: 200,
            useNativeDriver: true,
          })
        ]),

        // Playback card
        Animated.parallel([
          Animated.timing(fadeAnim.playbackCard, {
            toValue: 1,
            duration: 300,
            delay: 250,
            useNativeDriver: true,
          }),
          Animated.timing(positionAnim.playbackCard, {
            toValue: 0,
            duration: 300,
            delay: 250,
            useNativeDriver: true,
          })
        ])
      ]),

      // Notifications title animation
      Animated.parallel([
        Animated.timing(fadeAnim.notificationsTitle, {
          toValue: 1,
          duration: 300,
          delay: 300,
          useNativeDriver: true,
        }),
        Animated.timing(positionAnim.notificationsTitle, {
          toValue: 0,
          duration: 300,
          delay: 300,
          useNativeDriver: true,
        })
      ]),

      // Notifications animations
      ...fadeAnim.notifications.map((fadeValue, index) =>
        Animated.parallel([
          Animated.timing(fadeValue, {
            toValue: 1,
            duration: 300,
            delay: 350 + (index * 50),
            useNativeDriver: true,
          }),
          Animated.timing(positionAnim.notifications[index], {
            toValue: 0,
            duration: 300,
            delay: 350 + (index * 50),
            useNativeDriver: true,
          })
        ])
      ),

      // Bottom nav animation
      Animated.parallel([
        Animated.timing(fadeAnim.bottomNav, {
          toValue: 1,
          duration: 300,
          delay: 500,
          useNativeDriver: true,
        }),
        Animated.timing(positionAnim.bottomNav, {
          toValue: 0,
          duration: 300,
          delay: 500,
          useNativeDriver: true,
        })
      ])
    ];

    // Run all animations in sequence with faster stagger
    Animated.stagger(25, animations).start();
  }, []);

  return (
    <ThemedView style={styles.container}>
      {/* Header */}
      <Animated.View style={[
        styles.header,
        {
          opacity: fadeAnim.header,
          transform: [{ translateY: positionAnim.header }]
        }
      ]}>
        <Image
          source={require('../../assets/images/icon.png')}
          style={styles.profilePic}
        />
        <Text style={styles.headerTitle}>Home</Text>
        <TouchableOpacity style={styles.settingsButton}>
          <Ionicons name="settings-outline" size={24} color="black" />
        </TouchableOpacity>
      </Animated.View>

      <ScrollView style={styles.scrollView}>
        {/* Welcome message */}
        <Animated.View style={[
          styles.welcomeSection,
          {
            opacity: fadeAnim.welcome,
            transform: [{ translateY: positionAnim.welcome }]
          }
        ]}>
          <Text style={styles.welcomeTitle}>How may I help you</Text>
          <Text style={styles.welcomeTitle}>today?</Text>
        </Animated.View>

        {/* Features section */}
        <View style={styles.featuresSection}>
          <Animated.View style={[
            styles.sectionHeader,
            {
              opacity: fadeAnim.featuresTitle,
              transform: [{ translateY: positionAnim.featuresTitle }]
            }
          ]}>
            <Text style={styles.sectionTitle}>Features</Text>
            <Text style={styles.sectionSubtitle}>Others</Text>
          </Animated.View>

          <View style={styles.featureCardsContainer}>
            {/* Cameras card - takes full height on left */}
            <Animated.View style={[
              {
                transform: [
                  { scale: camerasScale },
                  { translateY: positionAnim.camerasCard }
                ],
                opacity: fadeAnim.camerasCard,
                width: '48%',
                height: '100%'
              }
            ]}>
              <TouchableOpacity
                style={[styles.featureCard, styles.camerasCard]}
                onPress={() => {
                  animatePress(camerasScale);
                  router.push('/camera');
                }}
                activeOpacity={1}
              >
                <LinearGradient
                  colors={['#4776E6', '#1E88E5', '#0D47A1']}
                  style={styles.gradientBackground}
                >
                  <Ionicons name="camera-outline" size={32} color="white" />
                  <View style={styles.cardTitleContainer}>
                    <Text style={styles.featureCardTitle}>Cameras</Text>
                  </View>
                  <Ionicons
                    name="arrow-forward-outline"
                    size={20}
                    color="white"
                    style={styles.cardArrow}
                  />
                </LinearGradient>
              </TouchableOpacity>
            </Animated.View>

            <View style={styles.rightCardsColumn}>
              {/* Add camera card - top right */}
              <Animated.View style={[
                {
                  transform: [
                    { scale: addCameraScale },
                    { translateY: positionAnim.addCameraCard }
                  ],
                  opacity: fadeAnim.addCameraCard,
                  height: '48%'
                }
              ]}>
                <TouchableOpacity
                  style={[styles.featureCard, styles.addCameraCard]}
                  onPress={() => animatePress(addCameraScale)}
                  activeOpacity={1}
                >
                  <LinearGradient
                    colors={['#FF9800', '#FF5722', '#E91E63']}
                    style={styles.gradientBackground}
                  >
                    <Ionicons name="camera-outline" size={32} color="white" />
                    <Text style={styles.featureCardTitle}>Add camera</Text>
                    <Ionicons
                      name="arrow-forward-outline"
                      size={20}
                      color="white"
                      style={styles.cardArrow}
                    />
                  </LinearGradient>
                </TouchableOpacity>
              </Animated.View>

              {/* Playback card - bottom right */}
              <Animated.View style={[
                {
                  transform: [
                    { scale: playbackScale },
                    { translateY: positionAnim.playbackCard }
                  ],
                  opacity: fadeAnim.playbackCard,
                  height: '48%'
                }
              ]}>
                <TouchableOpacity
                  style={[styles.featureCard, styles.playbackCard]}
                  onPress={() => animatePress(playbackScale)}
                  activeOpacity={1}
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
                </TouchableOpacity>
              </Animated.View>
            </View>
          </View>
        </View>

        {/* Notifications section */}
        <View style={styles.notificationsSection}>
          <Animated.View style={[
            styles.sectionHeader,
            {
              opacity: fadeAnim.notificationsTitle,
              transform: [{ translateY: positionAnim.notificationsTitle }]
            }
          ]}>
            <Text style={styles.sectionTitle}>Recent notifications</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See all</Text>
            </TouchableOpacity>
          </Animated.View>

          {/* Warning notification */}
          <Animated.View style={[
            {
              transform: [
                { scale: notificationScales[0] },
                { translateY: positionAnim.notifications[0] }
              ],
              opacity: fadeAnim.notifications[0]
            }
          ]}>
            <TouchableOpacity
              style={styles.notificationCard}
              onPress={() => animatePress(notificationScales[0])}
              activeOpacity={1}
            >
              <View style={styles.notificationIconContainer}>
                <Ionicons name="alert-circle-outline" size={24} color="white" />
              </View>
              <View style={styles.notificationContent}>
                <Text style={styles.notificationTitle}>Warning</Text>
                <Text style={styles.notificationText}>Detected fire</Text>
                <Text style={styles.notificationText}>Detected fire at 2th floor</Text>
              </View>
            </TouchableOpacity>
          </Animated.View>

          {/* Regular notifications */}
          {[1, 2].map((item, index) => (
            <Animated.View
              key={index}
              style={[
                {
                  transform: [
                    { scale: notificationScales[index + 1] },
                    { translateY: positionAnim.notifications[index + 1] }
                  ],
                  opacity: fadeAnim.notifications[index + 1]
                }
              ]}
            >
              <TouchableOpacity
                style={styles.notificationCard}
                onPress={() => animatePress(notificationScales[index + 1])}
                activeOpacity={1}
              >
                <View style={styles.notificationIconContainer}>
                  <Ionicons name="alert-circle-outline" size={24} color="white" />
                </View>
                <View style={styles.notificationContent}>
                  <Text style={styles.notificationTitle}>notification type</Text>
                  <Text style={styles.notificationText}>summary</Text>
                  <Text style={styles.notificationText}>content</Text>
                </View>
              </TouchableOpacity>
            </Animated.View>
          ))}
        </View>
      </ScrollView>

      {/* Bottom navigation */}
      <Animated.View style={[
        styles.bottomNav,
        {
          opacity: fadeAnim.bottomNav,
          transform: [{ translateY: positionAnim.bottomNav }]
        }
      ]}>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="home-outline" size={24} color="#1E88E5" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="calendar-outline" size={24} color="#777" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="folder-outline" size={24} color="#777" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="heart-outline" size={24} color="#777" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="person-outline" size={24} color="#777" />
        </TouchableOpacity>
      </Animated.View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 10,
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
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
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
    // height: 240, // Total height for the feature cards section
    marginBottom: 20,
  },
  rightCardsColumn: {
    width: '48%',
    justifyContent: 'space-between',
  },
  featureCard: {
    borderRadius: 12,
    overflow: 'hidden', // Important for the gradient to respect the border radius
    position: 'relative',
  },
  gradientBackground: {
    width: '100%',
    height: '100%',
    padding: 16,
    position: 'relative',
  },
  camerasCard: {
    // width: '48%',
    height: '100%', // Takes full height
  },
  addCameraCard: {
    height: '98%', // Takes about half the height
  },
  playbackCard: {
    height: '99%', // Takes about half the height
  },
  cardTitleContainer: {
    marginTop: 'auto', // Push title to bottom for cameras card
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
    paddingBottom: 80, // Extra space for bottom nav
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
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  navItem: {
    alignItems: 'center',
    padding: 10,
  },
});