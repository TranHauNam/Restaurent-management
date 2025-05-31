import React from "react";
import { 
  View, Text, ScrollView, 
  SafeAreaView, StatusBar, Image, TouchableOpacity

 } from "react-native";

import { Header } from "@/components/Header";
import { RestaurantSmallWindow } from "@/components/restaurant-small-window";
import { restaurantData } from "@/data/mocking/restaurant";
import { styles } from "@/styles/history-view/booked-history/history-booked-detail";
import { Typography } from "@/styles/Typography";
import { BookingDetailInfo } from "@/components/history-view/booking-history/booking-detail-infor";

import { useLocalSearchParams, useRouter } from "expo-router";


const getStatusColor = (status) => {
  switch (status) {
    case "Reserved":
    case "Success":
      return "#4CAF50"; // xanh lá
    case "Pending":
      return "#FFC107"; // vàng
    case "Error":
    case "Cancelled":
      return "#F44336"; // đỏ
    default:
      return "#FFC107"; // mặc định vàng
  }
};

export default function HistoryPaymentDetail() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    // Lấy dữ liệu đặt bàn từ ID (giả sử đã có dữ liệu)
    // Dữ liệu mẫu, thay bằng dữ liệu thực tế khi tích hợp
    const booking = {
        restaurantName: "Nhà hàng ABC",
        restaurantAddress: "123 Đường Lớn, Quận 1",
        status: "Reserved",
        date: "31/05/2025",
        time: "18:30",
        code: "BK123456",
        bookingCode: "CODE7890",
        people: 4,
        name: "Nguyễn Văn A",
        phone: "0901234567",
        email: "nguyenvana@email.com",
        note: "Bàn gần cửa sổ",
        image: "https://via.placeholder.com/60"
    };

    const restaurant = [
        {
            id: "rest1",
            name: "Sunset Grill",
            phone: "+1-555-123-4567",
            address: "123 Ocean Drive, Miami, FL 33139",
            imageURL: "https://picsum.photos/300/200",
            openTime: "08:00",
            closeTime: "22:00",
            availableTimes: [
                "08:00", "09:00", "10:00", "12:00", "14:00", "18:00", "20:00"
            ],
            menuIds: ["m101", "m102", "m103", "m104"]
        },
    ]
    
    const handleBackPress = () => {
        // Navigate back to the previous screen
        router.back();
    }

  return (
    <>
    
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <SafeAreaView style={styles.container}>
      {/* Header */}
      <Header 
        title="Table Booked"
        hasReturn
        onBackPress={handleBackPress}
      />

      <ScrollView style={styles.mainLayout} contentContainerStyle={styles.mainContainer}>           
        <View style={styles.smallBoxContainer}>
          <RestaurantSmallWindow
            restaurant={restaurant[0]}
          />
        </View>

      {/* Trạng thái */}
      <View style={styles.statusSection}>
        <Text style={[Typography.header4,styles.statusLabel]}>STATUS</Text>
        <View style={styles.statusRow}>
          <View style={[
                styles.statusDot,
                { backgroundColor: getStatusColor(booking.status) }
              ]}/>
          <Text
            style={[
              Typography.header5,
              styles.statusText,
              { color: getStatusColor(booking.status) }
          ]}>
            Reserved
          </Text>
        </View>
        <Text style={[Typography.label, styles.statusTime]}>01/06/2025 - 10:30</Text>
      </View>

      <View style={styles.boxDivider} />

      {/* Chi tiết */}
      <View style={styles.detailSection}>
        <Text style={[Typography.header5, styles.detailHeader]}>CHI TIẾT</Text>
        <BookingDetailInfo
          code={booking.code}
          bookingCode={booking.bookingCode}
          date={booking.date}
          time={booking.time}
          people={booking.people}
          name={booking.name}
          phone={booking.phone}
          email={booking.email}
          note={booking.note}
        />
      </View>
    </ScrollView>
    </SafeAreaView>
    </>
  );
}

