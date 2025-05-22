import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, ActivityIndicator, Pressable, TouchableOpacity, ScrollView } from "react-native";
import { Color, FontFamily, FontSize, Border } from "@/styles/GlobalStyles";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { MaterialIcons } from '@expo/vector-icons';
import DatePicker from 'react-native-date-picker';
import { fetchRestaurantById } from "@/services/api";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ShowTimePiker } from "./show-time-picker"; // Import the ShowTimePiker component
// import { set } from "date-fns";

const SingleRestaurant = () => {
  const route = useRouter();
  const id = useLocalSearchParams().id; // Get restaurant ID from route params
  const eatTime = 60 * 60 * 1000; // 1 hour in milliseconds
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [orderDateTime, setOrderDateTime] = useState('');
  const [isDescriptionExpanded, setDescriptionExpanded] = useState(false); // State for description toggle
  const [showTimeGrid, setShowTimeGrid] = useState(false);
  const [selectedPeople, setSelectedPeople] = useState(null); // State for selected number of people
  const [showPeoplePicker, setShowPeoplePicker] = useState(false); // State to toggle People Picker visibility
  
  const showDatePicker = () => setDatePickerVisibility(true);
  const hideDatePicker = () => setDatePickerVisibility(false);
  
  useEffect(() => {
    setLoading(true);
    fetchRestaurantById(id).then((data) => {
      setRestaurant(data.restaurent);
      setLoading(false);
      console.log("id", id);
    }).catch((error) => {
      console.error("Error fetching restaurant:", error);
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Color.primary} />
      </View>
    );
  };

  const handleBackPress = () => {
    route.back();
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <TouchableOpacity  onPress={handleBackPress}>
          <MaterialIcons name="arrow-back" size={hp("3.5%")} color={Color.black} />
        </TouchableOpacity>
        <Text style={styles.restaurantTitle}>{restaurant.name}</Text>
      </View>
      <View style={styles.headerLine} />

      {/* Restaurant Image */}
      <Image style={styles.restaurantImage} source={{uri: `${restaurant.imageUrl}`}} />

      {/* Address and Time */}
      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: hp("2%") }}>
        <MaterialIcons name="location-on" size={hp("3%")} color={Color.primary} />  
        <Text style={styles.address}>{restaurant.address}</Text>
      </View>
      
      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: hp("2%") }}>
        <MaterialIcons name="access-time-filled" size={hp("3%")} color={Color.primary} />
        <Text style={styles.operatingHours}>{restaurant.openTime}</Text>
        <Text style={[styles.operatingHours]}>-</Text>
        <Text style={styles.operatingHours}>{restaurant.closeTime}</Text>
      </View>
      

      {/* Menu and Description */}
      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: hp("2%") }}>
        <MaterialIcons name="menu-book" size={hp("3%")} color={Color.primary} />
        <Text style={styles.menuLink}>Menu</Text>
      </View>

      <Text style={styles.sectionTitle}>Description</Text>
      <Text 
        style={styles.description}
        numberOfLines={isDescriptionExpanded ? undefined : 1} 
      >
        {restaurant.description}
      </Text>
      <Text
        style={styles.readMore}
        onPress={() => setDescriptionExpanded(!isDescriptionExpanded)} // Toggle description
      >
        {isDescriptionExpanded ? "Show Less" : "Read More"}
      </Text>

      {/* Booking Options */}
      <View style={styles.bookingOptionList}>
        {/* Date Picker */}
        <TouchableOpacity 
          style={[styles.bookingOption, { flexDirection: "row", justifyContent: "center" }]}
          onPress={showDatePicker}
        >
          
          <MaterialIcons name="calendar-today" size={hp("2%")} color={Color.primary} style={{marginHorizontal: wp('1%'),}} />
          <Text 
            style={[styles.bookingOptionText, {marginHorizontal: wp('1%')}]}>
            {orderDateTime ? 
            `${orderDateTime.getDate().toString().padStart(2, '0')}/${(orderDateTime.getMonth() + 1)
                .toString().padStart(2, '0')}/${orderDateTime.getFullYear()}`
             : 'Date'}
          </Text>
          <DatePicker
            modal
            open={isDatePickerVisible}
            date={orderDateTime ? new Date(orderDateTime) : new Date()}
            onConfirm={(date) => {
                hideDatePicker();
                setOrderDateTime(date);
            }}
            onCancel={hideDatePicker}
            mode="date"
          />
        </TouchableOpacity>

        {/* Time Picker */}
        <TouchableOpacity 
          style={[styles.bookingOption, { flexDirection: "row", justifyContent: "center" }]}
          onPress={() => setShowTimeGrid(!showTimeGrid)} // Toggle time grid visibility
        >
          <MaterialIcons name="access-time" size={hp("2.2%")} color={Color.primary} style={{marginHorizontal: wp('1%'),}} />
          <Text style={[styles.bookingOptionText, { marginHorizontal: wp("1%") }]}>
            {selectedTime ? selectedTime : "Time"} 
          </Text>          
        </TouchableOpacity>

        {/* People Picker */}
        <TouchableOpacity 
          style={[styles.bookingOption, { flexDirection: "row", justifyContent: "center" }]}
          onPress={() => setShowPeoplePicker(!showPeoplePicker)} // Toggle people picker visibility
        >

          <MaterialIcons name="people-alt" size={hp("2.2%")} color={Color.primary} style={{marginHorizontal: wp('1%'),}} />
          <Text style={[styles.bookingOptionText, { marginHorizontal: wp("1%") }]}>
              {selectedPeople ? `${selectedPeople} People` : "People"} {/* Show selected number or default text */}
          </Text>        
        </TouchableOpacity>
      </View>

      {showTimeGrid && (
        <ShowTimePiker availableTimes={restaurant.availableTimes} /> // Use the ShowTimePiker component
      )}

      {/* People Picker Dropdown */}
      {showPeoplePicker && (
        <View style={styles.peoplePicker}>
          {[...Array(10).keys()].map((num) => (
            <Pressable
              key={num + 1}
              style={[
                styles.peopleOption,
                selectedPeople === num + 1 && styles.selectedPeopleOption, // Highlight selected option
              ]}
              onPress={() => {
                setSelectedPeople(num + 1); // Set selected number of people
                setShowPeoplePicker(false); // Close the dropdown
              }}
            >
              <Text
                style={[
                  styles.peopleOptionText,
                  selectedPeople === num + 1 && styles.selectedPeopleOptionText, // Highlight selected text
                ]}
              >
                {num + 1}
              </Text>
            </Pressable>
          ))}
        </View>
      )}

      {/* Find Slots Button */}
      <Pressable style={styles.findSlotsButton}>
        <Text style={styles.findSlotsText}>Find Slots</Text>
      </Pressable>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white,
    paddingHorizontal: wp("6%"),
    paddingTop: hp("6%"),
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  headerContainer: {
    marginBottom: hp("2%"),

    flexDirection: "row",
    gap: wp("2%"),
  },
  restaurantTitle: {
    fontSize: wp("5%"),
    color: Color.secondary,
    fontFamily: FontFamily.segoeUI,
    fontWeight: "700",
    // marginBottom: hp("2%"),
  },
  headerLine: {
    height: 1,
    backgroundColor: Color.primary,
    marginBottom: hp("2%"),
  },
  restaurantImage: {
    width: "100%",
    height: hp("24%"),
    borderRadius: Border.br_8xs,
    marginBottom: hp("2%"),
  },
  address: {
    fontSize: FontSize.size_sm,
    color: Color.tertiary,
    fontFamily: FontFamily.segoeUI,
    // marginBottom: hp("1%"),
    marginLeft: wp("2%"),
  },
  operatingHours: {
    fontSize: FontSize.size_sm,
    color: Color.tertiary,
    fontFamily: FontFamily.segoeUI,
    // marginBottom: hp("2%"),
    marginLeft: wp("2%"),
  },
  menuLink: {
    fontSize: FontSize.size_sm,
    color: Color.primary,
    textDecorationLine: "underline",
    // marginBottom: hp("4%"),
    marginLeft: wp("2%"),
  },
  sectionTitle: {
    fontSize: FontSize.size_sm,
    color: Color.primary,
    fontFamily: FontFamily.segoeUI,
    fontWeight: "700",
    marginBottom: hp("1%"),
  },
  description: {
    fontSize: FontSize.size_xs,
    color: Color.tertiary,
    fontFamily: FontFamily.segoeUI,
    
  },
  readMore: {
    fontSize: FontSize.size_sm,
    color: Color.primary,
    textDecorationLine: "underline",
    marginBottom: hp("4%"),
  },
  bookingOptionList: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: hp("4%"),
  },
  bookingOption: {
    flex: 1,
    alignItems: "center",
    paddingVertical: hp("1%"),
    borderWidth: 1,
    borderColor: Color.sub,
    borderRadius: Border.br_8xs,
    marginHorizontal: wp("1%"),
  },
  bookingOptionText: {
    fontSize: FontSize.size_xs,
    color: Color.tertiary,
    fontFamily: FontFamily.segoeUI,
  },
  findSlotsButton: {
    backgroundColor: Color.primary,
    paddingVertical: hp("1.5%"),
    borderRadius: Border.br_8xs,
    alignItems: "center",
  },
  findSlotsText: {
    fontSize: FontSize.size_sm,
    color: Color.white,
    fontFamily: FontFamily.segoeUI,
    fontWeight: "700",
  },
  
  peoplePicker: {
    backgroundColor: Color.white,
    borderRadius: Border.br_8xs,
    padding: wp("2%"),
    marginTop: hp("1%"),
    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 4,
  },
  peopleOption: {
    paddingVertical: hp("1%"),
    paddingHorizontal: wp("4%"),
    borderBottomWidth: 1,
    borderBottomColor: Color.sub,
  },
  selectedPeopleOption: {
    backgroundColor: Color.primary,
  },
  peopleOptionText: {
    fontSize: FontSize.size_xs,
    fontFamily: FontFamily.segoeUI,
    color: Color.tertiary,
    textAlign: "center",
  },
  selectedPeopleOptionText: {
    color: Color.white,
  },
});

export default SingleRestaurant;