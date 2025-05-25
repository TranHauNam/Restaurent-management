import React from 'react'
import { View, Text, Modal, TouchableOpacity, Pressable } from 'react-native'

import { styles } from '../../styles/booking-modal/booking-modal';

import { MaterialIcons } from '@expo/vector-icons';




export const BookingModal = ({restaurant, onClose}) => {
  return (
    <>
        <Modal
            transparent={true}
            visible={true}
            animationType="slide"
            onRequestClose={onClose} // For Android back button
        >
            <View style={styles.container}>
                {/* Header  */}
                <View style={styles.headerContainer}>
                    {/* Back but  */}
                    <TouchableOpacity style={styles.backBut} onPress={onClose}>
                        <MaterialIcons name="arrow-back" size={24} color="black" />
                    </TouchableOpacity>

                    <Text style={styles.headerText}>Tables Booking Information</Text>
                </View>
            </View>
        </Modal>
    </>
  )
}
