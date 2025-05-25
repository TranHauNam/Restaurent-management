import React from 'react'
import { 
    View, Text, Modal, 
    TouchableOpacity, Pressable, 
    ScrollView, Image, 
} from 'react-native'

import { styles } from '../../styles/booking-modal/booking-modal';

import { MaterialIcons } from '@expo/vector-icons';




export const BookingModal = ({restaurant, onClose}) => {

    // console.log("restaurant", restaurant); // correct

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

                {/* Scorll View  */}
                <ScrollView 
                    style={styles.mainScrollView}
                    contentContainerStyle={styles.scrollViewContent}
                >
                    {/* Restaurant Info  */}
                    <Text style={styles.restaurantText}>Restaurant:</Text>
                    <View style={styles.restaurantBox}>
                        <Image
                            style={styles.restaurantImage}
                            source={{uri: `${restaurant.imageUrl}`}}
                        />
                    </View>
                </ScrollView>
            </View>
        </Modal>
    </>
  )
}
