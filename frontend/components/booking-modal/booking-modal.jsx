import React from 'react';
import { useState, useEffect } from 'react';
import { 
    View, Text, Modal, 
    TouchableOpacity, Pressable, 
    ScrollView, Image, TextInput,
    Alert,
} from 'react-native';

import { 
    postTableBooking,
} from "@/services/api/table-api";
import { styles } from '../../styles/booking-modal/booking-modal';
import { Color } from '../../styles/GlobalStyles';
import { NoteManager } from './note-bm';
import { ShowPeopleSelection } from '../restaurant_main/people-selection';

import { MaterialIcons } from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/AntDesign';
import Octicons from '@expo/vector-icons/Octicons';
import Entypo from '@expo/vector-icons/Entypo';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import DatePicker from 'react-native-date-picker';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';

// Hàm format date về yyyy-mm-dd
const getFormattedDate = (date) => {
  if (!date) return '';
  if (typeof date === 'string') return date; // Nếu đã là string
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};


export const BookingModal = ({
    restaurant, onCloseBookingModal, orderDateTime, setOrderDateTime,
    selectedTime, setSelectedTime, selectedPeople, setSelectedPeople
}) => {

    // console.log("restaurant", restaurant); // correct

    // Date and Time Picker States
    const [isDatePickerVisibleBM, setDatePickerVisibilityBM] = useState(false);
    const showDatePickerBM = () => setDatePickerVisibilityBM(true);
    const hideDatePickerBM = () => setDatePickerVisibilityBM(false);

    const [isTimePickerVisibleBM, setTimePickerVisibilityBM] = useState(false);
    const showTimePickerBM = () => setTimePickerVisibilityBM(true);
    const hideTimePickerBM = () => setTimePickerVisibilityBM(false);

    // People Selection States
    const [isPpSelectVisibleBM, setPpSelecVisibleBM] = useState(false);

    // Input Sates
    const [note, setNote] = useState([]);
    const [name, setName] = useState("User Name");
    const [phone, setPhone] = useState("0123456789");
    const [email, setEmail] = useState("example@email.com");

    

    // Helper for min/max time
    const getPrepareRangeTime = (hour, minute) => {
        let baseDate = orderDateTime ? new Date(orderDateTime) : new Date();
        if (isNaN(baseDate.getTime())) baseDate = new Date();
        baseDate.setHours(hour, minute, 0, 0);
        return baseDate;
    };

    const handleReservePress = async () => {
        // Validate required fields
        if (!orderDateTime || !selectedPeople || 
            !name.trim() || !phone.trim() || !email.trim()) {
            Alert.alert("Thiếu thông tin",
            "Vui lòng nhập đầy đủ ngày, số người, tên, số điện thoại và email!");
            return;
        }

        const residRS = restaurant._id;
        const nameRS = name;
        const phoneRS = phone;
        const peopleRS = selectedPeople;
        const dateRS = getFormattedDate(orderDateTime);
        const timeRS = selectedTime;
        
        try {
            const result = await postTableBooking({
                restaurantId: residRS,
                name: nameRS,
                phone: phoneRS,
                email: email,
                date: dateRS,
                people: peopleRS,
                tableReservationTime: timeRS,
            })
            console.log("Booking result:", result.message);
            Alert.alert("Đặt bàn thành công", result.message);
        } catch (error) {
            console.log("ERROR booking table:", error);
            Alert.alert("Lỗi khi đặt bàn", `${error.message}`);
        }
    }


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
                            <Text style={styles.shortSelectedText}>{orderDateTime ? orderDateTime.toLocaleDateString() : ''}</Text>
                        </TouchableOpacity>

                        {/* Time Selector Box  */}
                        <TouchableOpacity 
                            style={styles.shortSelectorBox}
                            onPress={showTimePickerBM}
                        >
                            <AntDesign name="clockcircleo" size={24} color="black" />
                            <Text style={styles.shortSelectedText}>{selectedTime}</Text>
                        </TouchableOpacity>
                    </View>

                    {/* People Selection  */}
                    <Text style={styles.labelText}>Number of People</Text>
                    <View style={styles.selectionContainer}>
                        <View style={styles.longSelectorBox}>
                            <Octicons name="people" size={24} color="black" />
                            <Text style={styles.longSelectedText}>
                                {selectedPeople ? `${selectedPeople} People` : ""}
                            </Text>
                            <TouchableOpacity 
                                style={styles.dropdownIcon}
                                onPress={() => setPpSelecVisibleBM(!isPpSelectVisibleBM)} // Toggle people selection
                            >
                                <Entypo name="chevron-thin-down" size={hp("2%")} color="black"  />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Name  */}
                    <Text style={styles.labelText}>Your Name</Text>
                    <View style={styles.selectionContainer}>
                        <View style={styles.longSelectorBox}>
                            <Octicons name="person" size={24} color="black" />
                            <TextInput 
                                style={styles.longSelectedText}
                                value={name}
                                onChangeText={(text) => setName(text)} 
                            />
                        </View>
                    </View>

                    {/* Phone  */}
                    <Text style={styles.labelText}>Your Phone Number</Text>
                    <View style={styles.selectionContainer}>
                        <View style={styles.longSelectorBox}>
                            <Octicons name="device-mobile" size={24} color="black" />
                            <TextInput 
                                style={styles.longSelectedText} 
                                value={phone}
                                onChangeText={(text) => setPhone(text)}
                            />
                        </View>
                    </View>

                    {/* Email  */}
                    <Text style={styles.labelText}>Your Email</Text>
                    <View style={styles.selectionContainer}>
                        <View style={styles.longSelectorBox}>
                            <Octicons name="mail" size={24} color="black" />
                            <TextInput 
                                style={styles.longSelectedText} 
                                value={email}
                                onChangeText={(text) => setEmail(text)}
                            />
                        </View>
                    </View>

                    <NoteManager
                        note={note}
                        setNote={setNote}
                    />

                    {/* Reserve Now Button  */}
                    <TouchableOpacity style={styles.reserveButton} onPress={handleReservePress}>
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
            date={getPrepareRangeTime(10, 30)}
            onConfirm={(date) => {
                hideTimePickerBM();
                setSelectedTime(date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
            }}
            onCancel={hideTimePickerBM}
            mode="time"
            minuteInterval={30}
            minimumDate={getPrepareRangeTime(10, 30)}
            maximumDate={getPrepareRangeTime(18, 30)}
        />

        {/* People Select Component  */}
        { isPpSelectVisibleBM && (
            <ShowPeopleSelection 
                selectedPeople={selectedPeople}
                setSelectedPeople={setSelectedPeople}
                setShowPeoplePicker={setPpSelecVisibleBM}
                showPeoplePicker={isPpSelectVisibleBM}
            />
        )}
    </>
  )
}
