import React from 'react'
import { 
    View, Text, Modal, 
    TouchableOpacity, Pressable, 
    ScrollView, Image, 
} from 'react-native'

import { styles } from '../../styles/booking-modal/booking-modal';

import { MaterialIcons } from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/AntDesign';
import Octicons from '@expo/vector-icons/Octicons';
import Entypo from '@expo/vector-icons/Entypo';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";



export const BookingModal = ({
    restaurant, onClose, orderDateTime, setOrderDateTime,
    selectedTime, setSelectedTime, selectedPeople, setSelectedPeople
}) => {

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

                    {/* Time Selection  */}
                    <Text style={styles.labelText}>Time to Reserve</Text>
                    <View style={styles.selectionContainer}>
                        {/* Day Selector Box  */}
                        <View style={styles.shortSelectorBox}>
                            <AntDesign name="calendar" size={24} color="black" />
                            <Text style={styles.selectedText}>{orderDateTime ? orderDateTime.toLocaleDateString() : ''}</Text>
                        </View>

                        {/* Time Selector Box  */}
                        <View style={styles.shortSelectorBox}>
                            <AntDesign name="clockcircleo" size={24} color="black" />
                            <Text style={styles.selectedText}>{selectedTime}</Text>
                        </View>
                    </View>

                    {/* People Selection  */}
                    <Text style={styles.labelText}>Number of People</Text>
                    <View style={styles.selectionContainer}>
                        <View style={styles.longSelectorBox}>
                            <Octicons name="people" size={24} color="black" />
                            <Text style={styles.selectedText}>
                                {selectedPeople ? `${selectedPeople} People` : ""}
                            </Text>
                            <TouchableOpacity style={styles.dropdownIcon}>
                                <Entypo name="chevron-thin-down" size={hp("2%")} color="black"  />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Name  */}
                    <Text style={styles.labelText}>Your Name</Text>
                    <View style={styles.selectionContainer}>
                        <View style={styles.longSelectorBox}>
                            <Octicons name="person" size={24} color="black" />
                            <Text style={styles.selectedText}>User Name</Text>
                        </View>
                    </View>

                    {/* Phone  */}

                    {/* Email  */}

                    {/* Note  */}
                    {/* Type Note  */}
                    {/* Quick Note  */}

                    {/* Reserve Now Button  */}

                </ScrollView>
            </View>
        </Modal>
    </>
  )
}
