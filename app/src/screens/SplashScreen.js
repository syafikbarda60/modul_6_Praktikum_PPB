import React, { useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Animated,
    Dimensions,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import * as SplashScreen from 'expo-splash-screen';

// Prevent auto hiding
SplashScreen.preventAutoHideAsync();

const { width, height } = Dimensions.get('window');

const CustomSplashScreen = ({ onFinish }) => {
    const fadeAnim = new Animated.Value(0);
    const scaleAnim = new Animated.Value(0.3);
    const slideAnim = new Animated.Value(50);

    useEffect(() => {
        // Start animations
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            }),
            Animated.spring(scaleAnim, {
                toValue: 1,
                friction: 4,
                tension: 40,
                useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 800,
                useNativeDriver: true,
            }),
        ]).start();

        // Hide splash after 2.5 seconds
        const timer = setTimeout(async () => {
            await SplashScreen.hideAsync();
            onFinish();
        }, 2500);

        return () => clearTimeout(timer);
    }, []);

    return (
        <View style={styles.container}>
            {/* Background gradient effect */}
            <View style={styles.gradientTop} />
            <View style={styles.gradientBottom} />

            {/* Logo and Icon */}
            <Animated.View
                style={[
                    styles.logoContainer,
                    {
                        opacity: fadeAnim,
                        transform: [{ scale: scaleAnim }],
                    },
                ]}
            >
                <View style={styles.iconCircle}>
                    <MaterialIcons name="sensors" size={80} color="#fff" />
                </View>
            </Animated.View>

            {/* App Name */}
            <Animated.View
                style={[
                    styles.textContainer,
                    {
                        opacity: fadeAnim,
                        transform: [{ translateY: slideAnim }],
                    },
                ]}
            >
                <Text style={styles.appName}>IoT Monitoring</Text>
                <Text style={styles.appSubtitle}>Smart Temperature Control</Text>
            </Animated.View>

            {/* Loading Indicator */}
            <Animated.View
                style={[
                    styles.loadingContainer,
                    { opacity: fadeAnim },
                ]}
            >
                <View style={styles.loadingBar}>
                    <Animated.View
                        style={[
                            styles.loadingProgress,
                            {
                                transform: [
                                    {
                                        translateX: fadeAnim.interpolate({
                                            inputRange: [0, 1],
                                            outputRange: [-100, 100],
                                        }),
                                    },
                                ],
                            },
                        ]}
                    />
                </View>
                <Text style={styles.loadingText}>Loading...</Text>
            </Animated.View>

            {/* Version */}
            <Animated.View
                style={[
                    styles.versionContainer,
                    { opacity: fadeAnim },
                ]}
            >
                <Text style={styles.versionText}>Version 1.0.0</Text>
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#007AFF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    gradientTop: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: height * 0.4,
        backgroundColor: 'rgba(0, 122, 255, 0.8)',
        borderBottomLeftRadius: width,
        borderBottomRightRadius: width,
    },
    gradientBottom: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: height * 0.3,
        backgroundColor: 'rgba(0, 100, 210, 0.6)',
        borderTopLeftRadius: width,
        borderTopRightRadius: width,
    },
    logoContainer: {
        marginBottom: 30,
    },
    iconCircle: {
        width: 160,
        height: 160,
        borderRadius: 80,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: 'rgba(255, 255, 255, 0.3)',
    },
    textContainer: {
        alignItems: 'center',
        marginBottom: 60,
    },
    appName: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 8,
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 4,
    },
    appSubtitle: {
        fontSize: 16,
        color: 'rgba(255, 255, 255, 0.9)',
        letterSpacing: 1,
    },
    loadingContainer: {
        width: width * 0.6,
        alignItems: 'center',
        position: 'absolute',
        bottom: height * 0.2,
    },
    loadingBar: {
        width: '100%',
        height: 4,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        borderRadius: 2,
        overflow: 'hidden',
        marginBottom: 10,
    },
    loadingProgress: {
        position: 'absolute',
        width: '50%',
        height: '100%',
        backgroundColor: '#fff',
        borderRadius: 2,
    },
    loadingText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '500',
    },
    versionContainer: {
        position: 'absolute',
        bottom: 40,
    },
    versionText: {
        color: 'rgba(255, 255, 255, 0.7)',
        fontSize: 12,
    },
});

export default CustomSplashScreen;