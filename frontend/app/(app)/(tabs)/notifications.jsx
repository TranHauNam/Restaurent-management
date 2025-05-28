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
import { FontSize } from "@/styles/GlobalStyles";

import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";


const Notifications = () => {
  

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={[Typography.header5, styles.headerText]}>Notifications</Text>
          
          
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
              <Text style={[Typography.header5]}>{item.title}</Text>
              <Text style={[Typography.paragraph, styles.notiDescription]}>{item.description}</Text>
              {/* <Text style={[Typography.paragraph, styles.notiContent]}>{item.content}</Text> */}
              <Text style={[Typography.label, styles.notiTime]}>{item.time}</Text>
            </View>
          ))}
          {/* Test  */}
              <Text style={Typography.header1}>Header 1</Text>
              <Text style={Typography.header2}>Header 2</Text>
              <Text style={Typography.header3}>Header 3</Text>
              <Text style={Typography.header4}>Header 4</Text>
              <Text style={Typography.header5}>Header 5</Text>
              <Text style={Typography.header6}>Header 6</Text>
              <Text style={Typography.paragraph}>This is a paragraph text that uses the Roboto Regular font.</Text>
              <Text style={Typography.label}>This is a label text that uses the Roboto Light font.</Text>
              <View style={{ borderWidth: 1,}}>
                <Text style={Typography.largeButton}>Button Text</Text>
              </View>

              <View style={{ borderWidth: 1, width: wp("50%")}}>
                <Text style={Typography.smallButton}>Button Text</Text>
              </View>

              <Text style={{ fontSize: FontSize.size_4xs}}>Size 4xs</Text>
              <Text style={{ fontSize: FontSize.size_3xs}}>Size 3xs</Text>
              <Text style={{ fontSize: FontSize.size_2xs}}>Size 2xs</Text>
              <Text style={{ fontSize: FontSize.size_xs}}>Size xs</Text>
              <Text style={{ fontSize: FontSize.size_s}}>Size s</Text>
              <Text style={{ fontSize: FontSize.size_m}}>Size m</Text>
              <Text style={{ fontSize: FontSize.size_l}}>Size l</Text>
              <Text style={{ fontSize: FontSize.size_xl}}>Size xl</Text>
              <Text style={{ fontSize: FontSize.size_2xl}}>Size 2xl</Text>
              <Text style={{ fontSize: FontSize.size_3xl}}>Size 3xl</Text>
              <Text style={{ fontSize: FontSize.size_4xl}}>Size 4xl</Text>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};



export default Notifications;