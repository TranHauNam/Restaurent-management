import { StyleSheet, Text, View, Pressable, TouchableOpacity } from 'react-native'
import React from 'react'
import { useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import DatePicker from 'react-native-date-picker';
import { Color, FontFamily, FontSize, Border } from "@/styles/GlobalStyles";
import { MaterialIcons } from '@expo/vector-icons';

export const TimeOrder = ({selectedTime, setShowTimeGrid, showTimeGrid}) => {
  return (
    <>
      <TouchableOpacity 
          style={[styles.bookingOption, { flexDirection: "row", justifyContent: "center" }]}
          onPress={() => setShowTimeGrid(!showTimeGrid)} // Toggle time grid visibility
      >
          <MaterialIcons name="access-time" size={hp("2.2%")} color={Color.primary} style={{marginHorizontal: wp('1%'),}} />
          <Text style={[styles.bookingOptionText, { marginHorizontal: wp("1%") }]}>
            {selectedTime ? selectedTime : "Time"} 
          </Text>          
      </TouchableOpacity>
    </>
  );
}

export const ShowTimeSelection = ({availableTimes, selectedTime}) => {
  return (
    <>
      <Text style={styles.sectionTitle}>Select a time you like</Text>
      <View style={styles.timeGrid}>
        {availableTimes.map((time, index) => (
          <Pressable
            key={index}
            style={[
              styles.timeSlot,
              selectedTime === time && styles.selectedTimeSlot, 
            ]}
            onPress={() => {
              setSelectedTime(selectedTime === time ? null : time)
              if (selectedTime !== time) {
                // Update orderDateTime with the selected time
                const [hours, minutes] = time.split(":");
                const updatedDateTime = new Date(orderDateTime || new Date());
                updatedDateTime.setHours(parseInt(hours, 10), parseInt(minutes, 10), 0, 0);
                setOrderDateTime(updatedDateTime);
              }
            }} 
          >
            <Text
              style={[
                styles.timeSlotText,
                selectedTime === time ? styles.selectedTimeSlotText : styles.unselectedTimeSlotText, 
              ]}
            >
              {time}
            </Text>
          </Pressable>
        ))}
      </View>
    </>
  )
}

export const DateOrder = ({orderDateTime, isDatePickerVisible, hideDatePicker, setOrderDateTime, showDatePicker}) => {
  return (
    <>
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
        <ShowDateSelection
          isDatePickerVisible={isDatePickerVisible}
          orderDateTime={orderDateTime}
          hideDatePicker={hideDatePicker}
          setOrderDateTime={setOrderDateTime}
        />
      </TouchableOpacity>
    </>
  );
}

export const ShowDateSelection = ({isDatePickerVisible, orderDateTime, hideDatePicker, setOrderDateTime}) => {
  return (
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
  );
}

export const PeopleOrder = ({setShowPeoplePicker, showPeoplePicker, selectedPeople}) => {
  return (
    <>
      <TouchableOpacity 
        style={[styles.bookingOption, { flexDirection: "row", justifyContent: "center" }]}
        onPress={() => setShowPeoplePicker(!showPeoplePicker)} // Toggle people picker visibility
      >

        <MaterialIcons name="people-alt" size={hp("2.2%")} color={Color.primary} style={{marginHorizontal: wp('1%'),}} />
        <Text style={[styles.bookingOptionText, { marginHorizontal: wp("1%") }]}>
            {selectedPeople ? `${selectedPeople} People` : "People"} {/* Show selected number or default text */}
        </Text>        
      </TouchableOpacity>
    </>
  );
}

export const ShowPeopleSelection = ({selectedPeople, setSelectedPeople, setShowPeoplePicker}) => {
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
}

export const BookingOptions = ({availableTimes}) => {
  const [selectedTime, setSelectedTime] = useState(null);
  const [orderDateTime, setOrderDateTime] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [showTimeGrid, setShowTimeGrid] = useState(false);
  const [selectedPeople, setSelectedPeople] = useState(null); 
  const [showPeoplePicker, setShowPeoplePicker] = useState(false);

  const showDatePicker = () => setDatePickerVisibility(true);
  const hideDatePicker = () => setDatePickerVisibility(false);

  return (
    <>
      <View style={styles.bookingOptionList}>
        {/* Date Picker */}
        <DateOrder 
          orderDateTime={orderDateTime}
          isDatePickerVisible={isDatePickerVisible}
          hideDatePicker={hideDatePicker}
          setOrderDateTime={setOrderDateTime}
          showDatePicker={showDatePicker}
        /> 

        {/* Time Picker */}
        <TimeOrder 
          selectedTime={selectedTime} 
          setShowTimeGrid={setShowTimeGrid}
          showTimeGrid={showTimeGrid} 
        />

        {/* People Picker */}
        <PeopleOrder
          setShowPeoplePicker={setShowPeoplePicker}
          showPeoplePicker={showPeoplePicker}
          selectedPeople={selectedPeople}
        />
      </View>

      {showTimeGrid && (
        <ShowTimeSelection 
          availableTimes={availableTimes} 
          setSelectedTime={setSelectedTime}
        /> 
      )}

      {showPeoplePicker && (
        <ShowPeopleSelection
          selectedPeople={selectedPeople}
          setSelectedPeople={setSelectedPeople}
          setShowPeoplePicker={setShowPeoplePicker}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
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

  sectionTitle: {
    fontSize: FontSize.size_sm,
    color: Color.primary,
    fontFamily: FontFamily.segoeUI,
    fontWeight: "700",
    marginBottom: hp("1%"),
  },

  timeGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: hp("4%"),
  },

  timeSlot: {
    backgroundColor: Color.sub,
    borderRadius: Border.br_8xs,
    paddingVertical: hp("1%"),
    paddingHorizontal: wp("4%"),
    marginBottom: hp("1%"),
    marginHorizontal: wp("3%"),
  },

  selectedTimeSlot: {
    backgroundColor: Color.primary,
  },

  timeSlotText: {
    fontSize: FontSize.size_xs,
    fontFamily: FontFamily.segoeUI,
    color: Color.tertiary,
    textAlign: "center",
  },

  selectedTimeSlotText: {
    color: Color.white,
  },

  unselectedTimeSlotText: {
    color: Color.tertiary,
  },
})

