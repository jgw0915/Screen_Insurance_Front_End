import React, { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet } from 'react-native';

const Loader = () => {
    const rotateAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        // Start the animation when the component is mounted
        Animated.loop(
        Animated.timing(rotateAnim, {
            toValue: 1,
            duration: 1000, // You can adjust the speed here
            easing: Easing.linear,
            useNativeDriver: true, // Enable native driver for better performance
        })
        ).start();
    }, [rotateAnim]);

    const rotate = rotateAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'], // Rotate from 0 to 360 degrees
    });

    return (
        <Animated.View style={[styles.loader, { transform: [{ rotate }] }]} />
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    loader: {
        width: 30, // Size of the loader
        height: 30,
        borderWidth: 4,
        borderColor: '#1E90FF', // Main color of the loader
        borderRadius: 30, // Make it circular
        borderLeftColor: 'transparent', // Create the 270-degree effect by hiding one section
        borderBottomColor: 'transparent', // Optional: Hide another section for a different effect
    },
});

export { Loader };

