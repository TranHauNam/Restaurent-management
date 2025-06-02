import React, { useEffect } from 'react'
import { useState } from 'react'
import { StyleSheet, Text, View, Pressable, TouchableOpacity } from 'react-native'

import { Typography } from '@/styles/Typography';
import { ShowPeopleSelection } from './people-selection';
import { Color, FontFamily, FontSize, Border } from "@/styles/GlobalStyles";

import DatePicker from 'react-native-date-picker';
import { MaterialIcons } from '@expo/vector-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { set } from 'date-fns';

// Thêm hàm formatDate
const formatDate = (date) => {
  if (!date) return '';
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const TimeOrder = ({selectedTime, showTimePicker, isTimePickerVisible, hideTimePicker,setSelectedTime, getPrepareRangeTime }) => {
  return (
    <>
      <TouchableOpacity 
          style={[styles.bookingOption, { flexDirection: "row", justifyContent: "center" }]}
          onPress={showTimePicker}
      >
          <MaterialIcons name="access-time" size={hp("2.2%")} color={Color.primary} style={{marginHorizontal: wp('1%'),}} />
          <Text style={[Typography.paragraph ,styles.bookingOptionText]}>
            {selectedTime ? selectedTime : "Time"} 
          </Text>

          <DatePicker
              modal
              open={isTimePickerVisible}
              date={getPrepareRangeTime(11, 15)}
              onConfirm={(date) => {
                  hideTimePicker();
                  setSelectedTime(date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
              }}
              onCancel={hideTimePicker}
              mode="time"
              minuteInterval={15}
              minimumDate={getPrepareRangeTime(11, 15)}
              maximumDate={getPrepareRangeTime(11, 45)}
          />
      </TouchableOpacity>

    </>
  );
}

//---------------------- NOT DELETE ------------------------
export const ShowTimeSelection = ({
  availableTimes, setSelectedTime, selectedTime, 
  orderDateTime, setOrderDateTime, timeSlotsRef
}) => {
  return (
    <View>
      <Text style={styles.sectionTitle}>Select a time you like</Text>
      <View style={styles.timeGrid}>
        {timeSlotsRef.current.map((time, index) => (
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
    </View>
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
          style={[Typography.paragraph ,styles.bookingOptionText]}>
          {orderDateTime ? 
          formatDate(orderDateTime)
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
    </>
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
        <Text style={[Typography.paragraph ,styles.bookingOptionText]}>
            {selectedPeople ? `${selectedPeople} People` : "People"} {/* Show selected number or default text */}
        </Text>        
      </TouchableOpacity>
    </>
  );
}

export const BookingOptions = ({
  availableTimes, orderDateTime, setOrderDateTime,
  selectedTime, setSelectedTime, selectedPeople, setSelectedPeople,
  timeSlotsRef,
}) => {
   
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const showDatePicker = () => setDatePickerVisibility(true);
  const hideDatePicker = () => setDatePickerVisibility(false);


  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const showTimePicker = () => setTimePickerVisibility(true);
  const hideTimePicker = () => setTimePickerVisibility(false);
  const [showPeoplePicker, setShowPeoplePicker] = useState(false);
  


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


    //debug
    // useEffect(() => {
    //   console.log("Date Order Time:", orderDateTime);
    // }, [orderDateTime]),
    //end debug

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
          showTimePicker={showTimePicker}
          isTimePickerVisible={isTimePickerVisible}
          hideTimePicker={hideTimePicker}
          setSelectedTime={setSelectedTime}
          getPrepareRangeTime={getPrepareRangeTime} 
        />

        {/* People Picker */}
        <PeopleOrder
          setShowPeoplePicker={setShowPeoplePicker}
          showPeoplePicker={showPeoplePicker}
          selectedPeople={selectedPeople}
        />
      </View>


      {showPeoplePicker && (
        <ShowPeopleSelection
          selectedPeople={selectedPeople}
          setSelectedPeople={setSelectedPeople}
          setShowPeoplePicker={setShowPeoplePicker}
          showPeoplePicker={showPeoplePicker}
        />
      )}

      <ShowTimeSelection
        timeSlotsRef={timeSlotsRef}
        availableTimes={availableTimes}
        setSelectedTime={setSelectedTime}
        selectedTime={selectedTime}
        orderDateTime={orderDateTime}
        setOrderDateTime={setOrderDateTime}
      />
      

    </>
  );
}

const styles = StyleSheet.create({
  bookingOptionList: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: hp("2.4%"),
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
    marginHorizontal: wp("1%"),

    color: Color.secondary,
    fontSize: FontSize.size_xs,
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
    // fontSize: FontSize.size_sm,
    color: Color.primary,
    // fontFamily: FontFamily.segoeUI,
    fontWeight: "700",
    marginBottom: hp("1%"),
  },

  timeGrid: {
    marginBottom: hp("4%"),
    
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",

    paddingHorizontal: wp("2%"),
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
    // fontSize: FontSize.size_xs,
    // fontFamily: FontFamily.segoeUI,
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

