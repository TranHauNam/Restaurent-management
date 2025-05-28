const sampleData = [
  {
    title: "Sea Grill of Merrick Park",
    description: "Your Table is Booked",
    content: "Your Table is Booked",
    time: "27/05/2025 - 10:00",
  }, {
    title: "Sea Grill of Merrick Park",
    description: "Your Table is Booked",
    content: "Your Table is Booked",
    time: "27/05/2025 - 10:00",
  }, {
    title: "Sea Grill of Merrick Park",
    description: "Thank you for visiting, please come again",
    content: "Thank you for visiting, please come again",
    time: "27/05/2025 - 10:00",
  }, {
    title: "Sea Grill of Merrick Park",
    description: "Your booking has been canceled",
    content: "Your booking has been canceled",
    time: "27/05/2025 - 10:00",
  }, 
];

import React from "react";
import { 
  Text, View, SafeAreaView, StatusBar,
  TouchableOpacity, ScrollView,
} from "react-native";

import { styles } from "@/styles/tabs/notifications";
import { Typography } from "@/styles/Typography";

import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";


const Notifications = () => {
  

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerText}>Notifications</Text>
          
          
          {/* Icon Read All */}
          <TouchableOpacity style={styles.readAllIcon} onPress={() => {}} >
            <FontAwesome6 
              name="check-double" size={hp("2.6%")} 
              color="black"  />
          </TouchableOpacity>
        </View>
        {/* Notifications List */}
        <ScrollView style={styles.notiLayout}
        contentContainerStyle={styles.notiContainer}>
          {sampleData.map((item, index) => (
            <View key={index} style={styles.notiItem}>
              <Text style={styles.notiTitle}>{item.title}</Text>
              <Text style={styles.notiDescription}>{item.description}</Text>
              <Text style={styles.notiContent}>{item.content}</Text>
              <Text style={styles.notiTime}>{item.time}</Text>
            </View>
          ))}
          <Text style={Typography.header1}>Header 1</Text>
          <Text style={Typography.header2}>Header 2</Text>
          <Text style={Typography.header3}>Header 3</Text>
          <Text style={Typography.header4}>Header 4</Text>
          <Text style={Typography.header5}>Header 5</Text>
          <Text style={Typography.header6}>Header 6</Text>
          <Text style={Typography.paragraph}>This is a paragraph text that uses the Roboto Regular font.</Text>
          <Text style={Typography.label}>This is a label text that uses the Roboto Light font.</Text>
          <View>
            <Text style={Typography.button}>Button Text</Text>
          </View>
          


        </ScrollView>
      </SafeAreaView>
    </>
  );
};



export default Notifications;