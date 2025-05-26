import React from 'react';
import { useState } from 'react';
import { 
    View, Text, Modal, 
    TouchableOpacity, Pressable, 
    ScrollView, Image, 
} from 'react-native';

import { styles } from '../../styles/booking-modal/booking-modal';

import { MaterialIcons } from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/AntDesign';
import Octicons from '@expo/vector-icons/Octicons';
import Entypo from '@expo/vector-icons/Entypo';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import DatePicker from 'react-native-date-picker';



export const BookingModal = ({
    restaurant, onCloseBookingModal, orderDateTime, setOrderDateTime,
    selectedTime, setSelectedTime, selectedPeople, setSelectedPeople
}) => {

    // console.log("restaurant", restaurant); // correct
    const [isDatePickerVisibleBM, setDatePickerVisibilityBM] = useState(false);

    const showDatePickerBM = () => setDatePickerVisibilityBM(true);
    const hideDatePickerBM = () => setDatePickerVisibilityBM(false);

    const [isTimePickerVisibleBM, setTimePickerVisibilityBM] = useState(false);
    const showTimePickerBM = () => setTimePickerVisibilityBM(true);
    const hideTimePickerBM = () => setTimePickerVisibilityBM(false);

    // Helper for min/max time
    const getPrepareRangeTime = (hour, minute) => {
        //querry database
        // Pass proper Date day valu
        if (orderDateTime != null) {
            const d = new Date(orderDateTime);
            d.setHours(hour, minute, 0, 0);
            return d;
        } else {
            const d = new Date();
            d.setHours(hour, minute, 0, 0);
            return d;
        }
    };

  return (
    <>
        {/* Main View Booking Modal  */}
        <Modal
            transparent={true}
            visible={true}
            animationType="slide"
            onRequestClose={onCloseBookingModal} // For Android back button
        >
            <View style={styles.container}>
                {/* Header  */}
                <View style={styles.headerContainer}>
                    {/* Back but  */}
                    <TouchableOpacity style={styles.backBut} onPress={onCloseBookingModal}>
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
                    <Text style={styles.restaurantText}>Restaurant</Text>
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
                        <TouchableOpacity 
                            style={styles.shortSelectorBox}
                            onPress={showDatePickerBM}
                        >
                            <AntDesign name="calendar" size={24} color="black" />
                            <Text style={styles.selectedText}>{orderDateTime ? orderDateTime.toLocaleDateString() : ''}</Text>
                        </TouchableOpacity>

                        {/* Time Selector Box  */}
                        <TouchableOpacity 
                            style={styles.shortSelectorBox}
                            onPress={showTimePickerBM}
                        >
                            <AntDesign name="clockcircleo" size={24} color="black" />
                            <Text style={styles.selectedText}>{selectedTime}</Text>
                        </TouchableOpacity>
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
                    <Text style={styles.labelText}>Your Phone Number</Text>
                    <View style={styles.selectionContainer}>
                        <View style={styles.longSelectorBox}>
                            <Octicons name="device-mobile" size={24} color="black" />
                            <Text style={styles.selectedText}>0123456789</Text>
                        </View>
                    </View>

                    {/* Email  */}
                    <Text style={styles.labelText}>Your Email</Text>
                    <View style={styles.selectionContainer}>
                        <View style={styles.longSelectorBox}>
                            <Octicons name="mail" size={24} color="black" />
                            <Text style={styles.selectedText}>useremail@gmail.com</Text>
                        </View>
                    </View>
                        

                    {/* Note  */}
                    {/* Type Note  */}
                    <Text style={styles.labelText}>Note - Not Require</Text>
                    <View style={styles.selectionContainer}>
                        <View style={styles.longSelectorBox}>
                            <Octicons name="note" size={24} color="black" />
                            <Text style={styles.selectedText}></Text>
                        </View>
                    </View>

                    {/* Quick Note  */}
                    <ScrollView 
                        style={styles.quickSelectNoteView}
                        contentContainerStyle={styles.quickSelectNoteContainer}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                    >
                        <View style={styles.quickSelectCard}>
                            <Text>Children</Text>
                        </View>
                        <View style={styles.quickSelectCard}>
                            <Text>Happy Birthday</Text>
                        </View>
                        <View style={styles.quickSelectCard}>
                            <Text>Window View</Text>
                        </View>

                    </ScrollView>

                    {/* Reserve Now Button  */}
                    <TouchableOpacity style={styles.reserveButton}>
                        <Text style={styles.reserveButtonText}>Reserve Now</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        </Modal>

        {/* Date Picker Component  */}
        <DatePicker
            modal
            open={isDatePickerVisibleBM}
            date={orderDateTime ? new Date(orderDateTime) : new Date()}
            onConfirm={(date) => {
                hideDatePickerBM();
                setOrderDateTime(date);
            }}
            onCancel={hideDatePickerBM}
            mode="date"
        />

        {/* Time Picker Component  */}
        <DatePicker
            modal
            open={isTimePickerVisibleBM}
            date={getPrepareRangeTime(11, 15)}
            onConfirm={(date) => {
                hideTimePickerBM();
                setSelectedTime(date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
            }}
            onCancel={hideTimePickerBM}
            mode="time"
            minuteInterval={15}
            minimumDate={getPrepareRangeTime(11, 15)}
            maximumDate={getPrepareRangeTime(11, 45)}
        />
    </>
  )
}
