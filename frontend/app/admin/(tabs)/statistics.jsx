import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Statistics() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Thống kê doanh thu</Text>
            <Text style={styles.subtitle}>Tính năng đang được phát triển</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
    },
}); 