import React from 'react'
import { 
    View, Text, Modal, 
    TouchableOpacity, Pressable, 
    ScrollView, Image, 
} from 'react-native'

import { styles } from '../../styles/booking-modal/booking-modal';

import { MaterialIcons } from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/AntDesign';




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
                        <View style={styles.restaurantInfoTextContainer}>
                            <Text style={styles.restaurantName}>{restaurant.name}</Text>
                            <Text style={styles.restaurantAddress}>{restaurant.address}</Text>
                            <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
                                <Text style={styles.restaurantAddress}>Phone</Text>
                                <Text style={styles.restaurantPhone}>0123456789</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.divider} />

                    {/* Booking Info  */}
                    <Text style={styles.labelText}>Time to Reserve</Text>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        {/* Day Selector Box  */}
                        <View style={styles.selectorBox}>
                            <AntDesign name="calendar" size={24} color="black" />
                            <Text>Day</Text>
                        </View>

                        {/* Time Selector Box  */}
                        <View style={styles.selectorBox}>
                            <AntDesign name="clockcircleo" size={24} color="black" />
                            <Text>Day</Text>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </Modal>
    </>
  )
}
