let sampleData = [
  {
    title: "Sea Grill of Merrick Park",
    description: "Your Table is Booked",
    content: "Your Table is Booked",
    time: "27/05/2025 - 10:00",
    readed: false,
  }, {
    title: "Sea Grill of Merrick Park",
    description: "Your Table is Booked",
    content: "Your Table is Booked",
    time: "27/05/2025 - 10:00",
    readed: false,
  }, {
    title: "Sea Grill of Merrick Park",
    description: "Thank you for visiting, please come again",
    content: "Thank you for visiting, please come again",
    time: "27/05/2025 - 10:00",
    readed: false,
  }, {
    title: "Sea Grill of Merrick Park",
    description: "Your booking has been canceled",
    content: "Your booking has been canceled",
    time: "27/05/2025 - 10:00",
    readed: false,
  }, 
];

import React from "react";
import { useEffect, useState } from "react";
import { 
  Text, View, SafeAreaView, StatusBar,
  TouchableOpacity, ScrollView,
} from "react-native";

import { Typography } from "@/styles/Typography";
import { styles } from "@/styles/tabs/notifications";
import { Color, FontSize } from "@/styles/GlobalStyles";

import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { set } from "date-fns";



const Notifications = () => {
  
  const [notiUpdate, setNotiUpdate] = useState(false);

  const handleReadAll = () => {
    // Logic to mark all notifications as read
    sampleData = sampleData.map(item => ({ ...item, readed: true }));
    setNotiUpdate(!notiUpdate); // Trigger re-render
    console.log("All notifications marked as read");
  }

  const handleNotificationPress = (item) => {
    // Logic to handle notification press
    item.readed = true; // Mark as read
    setNotiUpdate(!notiUpdate); // Trigger re-render
    console.log("Notification pressed:", item);
  }

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={[Typography.header5, styles.headerText]}>Notifications</Text>
          
          
          {/* Icon Read All */}
          <TouchableOpacity style={styles.readAllIcon} onPress={() => {handleReadAll()}} >
            <FontAwesome6 
              name="check-double" size={hp("2.6%")} 
              color="black"  />
          </TouchableOpacity>
        </View>
        {/* Notifications List */}
        <ScrollView style={styles.notiLayout}
        contentContainerStyle={styles.notiContainer}>
          {sampleData.map((item, index) => (
            <TouchableOpacity 
            key={index} 
            style={[
              styles.notiItem,
              {
                backgroundColor: item.readed ? Color.white : Color.lightsub,
              },
            ]}
            onPress={() => handleNotificationPress(item)}
            >
              <Text style={[Typography.header5]}>{item.title}</Text>
              <Text style={[Typography.paragraph, styles.notiDescription]}>{item.description}</Text>
              {/* <Text style={[Typography.paragraph, styles.notiContent]}>{item.content}</Text> */}
              <Text style={[Typography.label, styles.notiTime]}>{item.time}</Text>
            </TouchableOpacity>
          ))}

        </ScrollView>
      </SafeAreaView>
    </>
  );
};



export default Notifications;