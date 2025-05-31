const bookedData = [
  {
    id: 1,
    restaurantName: "Sea Grill of Merrick Park",
    date: "2022-12-17",
    time: "12:15 PM",
    guests: 2,
    status: "Reserved",
  },
  {
    id: 2,
    restaurantName: "Ocean Breeze Diner",
    date: "2022-12-15",
    time: "7:30 PM",
    guests: 4,
    status: "Cancelled",
  },
];


import React from "react";
import { useState } from "react";
import { 
  Text, View, Pressable, SafeAreaView,
  TouchableOpacity, ScrollView, StatusBar, 
} from "react-native";

import { Typography } from "@/styles/Typography";
import { styles } from "@/styles/tabs/history";
import { Color, FontSize } from "@/styles/GlobalStyles";
import { PaymentHistoryItem } from "@/components/history-view/payment-history/history-item-payment";
import { paymentData } from "@/data/mocking/payment";


const History = () => {
  const [paymentView, setPaymentView] = useState(true);

  const handlePaymentView = () => {
    setPaymentView(true);
    // Logic to fetch and display payment history
    // console.log("Payment view selected");
  }
  const handleBookingView = () => {
    setPaymentView(false);
    // Logic to fetch and display booking history
    // console.log("Booking view selected");
  }
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={[Typography.header5, styles.headerText]}>History</Text>
        </View>

        <View style={styles.hisViewOption}>
          <TouchableOpacity style={[styles.optionBox, 
          {
            borderBottomWidth: paymentView ? 2 : 0,
            borderBottomColor: paymentView ? "orange" : "transparent",
          }]}
          onPress={() => {handlePaymentView()}}>
            <Text 
            style={[Typography.header5, 
            { 
              color: paymentView ? "#000" : "#888",
              fontSize: paymentView ? FontSize.size_m : FontSize.size_s,
            }
            ]}>Payments</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.optionBox,
            {
              borderBottomWidth: !paymentView ? 2 : 0,
              borderBottomColor: !paymentView ? "orange" : "transparent",
            }]}
          onPress={() => {handleBookingView()}}>
            <Text 
            style={[Typography.header5, 
            { 
              color: !paymentView ? "#000" : "#888",
              fontSize: !paymentView ? FontSize.size_m : FontSize.size_s,
            }
            ]}>Bookings</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.hisLayout}
        contentContainerStyle={styles.hisContainer}>
          
          {paymentView ? paymentData.map((item, index) => (
            <View key={index} style={styles.hisItem}>
              <PaymentHistoryItem item={item} onPress={() => {}} payment={paymentView} /> 
            </View>
          )) : bookedData.map((item, index) => (
            <View key={index} style={styles.hisItem}>
              
            </View>
          ))}

        </ScrollView>
      </SafeAreaView>    
    </>
  );
};

export default History;