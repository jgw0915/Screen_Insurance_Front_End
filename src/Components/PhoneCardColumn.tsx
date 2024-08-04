import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';

type ColProps = {
    children: React.ReactNode;
  };

const PhoneCardColumn = ({children, ...rest}: ColProps) => {
    return (
        <ScrollView style={styles.root}>
            {children}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    root: {
        display: 'flex',
        flexDirection: 'column',
        height: 200,
    },
});

export { PhoneCardColumn };
