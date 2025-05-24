import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { LiveStreamingView } from '@/components/LiveStreamingView';

export default function CamerasScreen() {
    const router = useRouter();

    return (
        <ThemedView style={styles.container}>
            <Stack.Screen
                options={{
                    headerTitle: "Cameras",
                    headerLeft: () => (
                        <TouchableOpacity
                            onPress={() => router.back()}
                            style={styles.backButton}
                        >
                            <Ionicons name="arrow-back" size={24} color="#1E88E5" />
                        </TouchableOpacity>
                    ),
                }}
            />

            <ScrollView style={styles.scrollView}>
                <View style={styles.header}>
                    <ThemedText type="title">Live Cameras</ThemedText>
                    <ThemedText style={styles.subtitle}>Monitor your cameras in real-time</ThemedText>
                </View>

                <View style={styles.cameraGrid}>
                    <View style={styles.cameraCard}>
                        <ThemedText style={styles.cameraLabel}>Camera 1</ThemedText>
                        <LiveStreamingView />
                        <View style={styles.cameraControls}>
                            <TouchableOpacity style={styles.controlButton}>
                                <Ionicons name="volume-mute-outline" size={20} color="#1E88E5" />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.controlButton}>
                                <Ionicons name="expand-outline" size={20} color="#1E88E5" />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.cameraCard}>
                        <ThemedText style={styles.cameraLabel}>Camera 2</ThemedText>
                        <View style={styles.offlineCamera}>
                            <Ionicons name="videocam-off-outline" size={40} color="#777" />
                            <ThemedText style={styles.offlineText}>Offline</ThemedText>
                        </View>
                        <View style={styles.cameraControls}>
                            <TouchableOpacity style={styles.controlButton}>
                                <Ionicons name="volume-mute-outline" size={20} color="#777" />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.controlButton}>
                                <Ionicons name="expand-outline" size={20} color="#777" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backButton: {
        padding: 8,
    },
    scrollView: {
        flex: 1,
        padding: 16,
    },
    header: {
        marginBottom: 24,
    },
    subtitle: {
        fontSize: 16,
        color: '#777',
        marginTop: 8,
    },
    cameraGrid: {
        flexDirection: 'column',
        gap: 20,
    },
    cameraCard: {
        borderRadius: 12,
        padding: 16,
        backgroundColor: '#f5f5f5',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    cameraLabel: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 12,
    },
    cameraControls: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 12,
        gap: 12,
    },
    controlButton: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    offlineCamera: {
        height: 250,
        backgroundColor: '#e0e0e0',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    offlineText: {
        marginTop: 8,
        color: '#777',
    }
});