import { Ionicons } from '@expo/vector-icons';
import { useRouter, Link } from 'expo-router';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AnimatedPressable from '@/components/AnimatedPressable';
import AnimatedView from '@/components/AnimatedView';

type BoxStatus = 'Online' | 'Offline' | 'Error';

interface BoxData {
  id: string;
  name: string;
  maxCamera: number;
  remainCamera: number;
  lastUpdate: string;
  status: BoxStatus;
}

const mockBoxes: BoxData[] = [
  {
    id: '1',
    name: 'Box 1',
    maxCamera: 10,
    remainCamera: 5,
    lastUpdate: '25/05/2025 - 10:00',
    status: 'Online'
  },
  {
    id: '2',
    name: 'Box 2',
    maxCamera: 10,
    remainCamera: 5,
    lastUpdate: '25/05/2025 - 10:00',
    status: 'Offline'
  },
  {
    id: '3',
    name: 'Box 3',
    maxCamera: 10,
    remainCamera: 5,
    lastUpdate: '25/05/2025 - 10:00',
    status: 'Error'
  },
  {
    id: '4',
    name: 'Box 4',
    maxCamera: 10,
    remainCamera: 5,
    lastUpdate: '25/05/2025 - 10:00',
    status: 'Online'
  },
];

const getStatusStyle = (status: BoxStatus) => {
  switch (status) {
    case 'Online':
      return styles.statusOnline;
    case 'Offline':
      return styles.statusOffline;
    case 'Error':
      return styles.statusError;
    default:
      return styles.statusOffline;
  }
};

export default function BoxScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <AnimatedPressable onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </AnimatedPressable>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>Boxs</Text>
        </View>
      </View>

      {/* Box List */}
      <ScrollView style={styles.scrollView}>
        {mockBoxes.map((box, index) => (
          <AnimatedView 
            key={box.id}
            delay={150 + (index * 100)}
            initialY={20}
          >
            <Link 
              href="/camera"
              asChild
            >
              <AnimatedPressable 
                style={styles.boxCard}
              >
                {/* Box Info */}
                <View style={styles.boxInfo}>
                  <Image 
                    source={require('../assets/images/camera-box.png')} 
                    style={styles.boxImage}
                  />
                  <View style={styles.boxDetails}>
                    <Text style={styles.boxName}>{box.name}</Text>
                    <Text style={styles.boxSubtext}>
                      Max quantity of camera: {box.maxCamera}
                    </Text>
                    <Text style={styles.boxSubtext}>
                      Remain: {box.remainCamera}
                    </Text>
                  </View>
                  <View style={styles.arrowContainer}>
                    <Ionicons name="chevron-forward" size={20} color="#707376" />
                  </View>
                </View>
                <View style={styles.updateInfo}>
                  {/* Update Info */}
                  <View>
                    <Text style={styles.updateLabel}>Update</Text>
                    <Text style={styles.updateTime}>{box.lastUpdate}</Text>
                  </View>
                  {/* Status Info */}
                  <View style={styles.rightContent}>
                    <View style={[styles.statusBadge, getStatusStyle(box.status)]}>
                      <Text style={styles.statusText}>{box.status}</Text>
                    </View> 
                  </View>
                </View>
              </AnimatedPressable>
            </Link>
          </AnimatedView>
        ))}
      </ScrollView>
    </SafeAreaView>
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
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    position: 'relative',
  },
  backButton: {
    padding: 8,
    position: 'absolute',
    left: 16,
    zIndex: 1,
  },
  headerTitleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  boxCard: {
    flexDirection: 'column',
    borderRadius: 15,
    padding: 16,
    marginBottom: 16,
    borderColor: "#BEBEBE",
    borderWidth: 1,
  },
  boxInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  boxImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  boxDetails: {
    flex: 1,
  },
  boxName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  boxSubtext: {
    fontSize: 13,
    color: '#666',
    marginBottom: 2,
  },
  updateInfo: {
    marginTop: 12,
    flexDirection: 'row',
  },
  updateLabel: {
    fontSize: 13,
    color: '#666',
    marginRight: 4,
  },
  updateTime: {
    fontSize: 13,
    color: '#000',
    fontWeight: '500',
  },
  rightContent: {
    position: 'absolute',
    right: 0,
    alignItems: 'center',
    flexDirection: 'row',
  },
  statusBadge: {
    paddingHorizontal: 32,
    paddingVertical: 10,
    borderRadius: 20,
    // marginRight: 12,
  },
  statusOnline: {
    backgroundColor: '#27FF68',
    opacity: 0.7,
  },
  statusOffline: {
    backgroundColor: '#707376',
    opacity: 0.7,
  },
  statusError: {
    backgroundColor: '#FF1115',
    opacity: 0.7,
  },
  statusText: {
    fontSize: 13,
    fontWeight: '500',
  },
  arrowContainer: {
    width: 48,
    height: 48,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
});