import { AntDesign } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';

type ImageButtonProps = {
    image_uri: string | undefined;
    onPress: () => void;
    style ?: object;
};

const ImageButton : React.FC<ImageButtonProps> = ({
    image_uri,
    onPress,
    style
}) => {
    const [isFocused, setIsFocused] = useState(false);

    const handlePressIn = () => {
        setIsFocused(true);
    };

    const handlePressOut = () => {
        setIsFocused(false);
    };
    return (
        <View style={styles.imageContainer}>
            <TouchableOpacity
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            onPress={onPress}
            style={style}
            >
            <Image
                source={
                    image_uri?
                    { uri: image_uri }
                    : require('@Assets/profile-placeholder.png')
                }
                style={styles.profileImage}
            />
            {isFocused && (
                <View style={styles.overlay}>
                    <AntDesign name="camera" size={54} color="#f2f2f2" />
                </View>
            )}
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    imageContainer: {
        marginLeft: 'auto',
        marginRight: 'auto',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20,
    },
    profileImage: {
        marginRight: "auto",
        marginLeft : "auto",
        alignContent: 'center',
        justifyContent: 'center',
        width: 120,
        height: 120,
        borderRadius: 60,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
        width: 120,
        height: 120,
        borderRadius: 60,
        marginRight: "auto",
        marginLeft : "auto",
        
    },
});

export { ImageButton };

