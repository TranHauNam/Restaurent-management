import React, { 
  useEffect, 
  useState ,
  useRef,
} from "react";
import { 
  View, Text, Image, 
  ActivityIndicator, Pressable, 
  TouchableOpacity, ScrollView, 
  Alert, StatusBar, SafeAreaView,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

import { 
  fetchRestaurantById,
  postAvailableTime,
} from "@/services/restaurant-api";
import { Typography } from "@/styles/Typography";
import { styles } from "@/styles/restaurant_main/restaurant-main";
import { Color } from "@/styles/GlobalStyles";
import { BookingOptions } from "../../../components/restaurant_main/find-slot-option";
import { BookingModal } from "../../../components/booking-modal/booking-modal";

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { MaterialIcons } from '@expo/vector-icons';
import { set } from "date-fns";

// Hàm format date về yyyy-mm-dd
const getFormattedDate = (date) => {
  if (!date) return '';
  if (typeof date === 'string') return date; // Nếu đã là string
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// Hàm format time về hh:mm
const getFormattedTime = (time) => {
  if (!time) return '';
  if (typeof time === 'string') {
    // Nếu đã là hh:mm thì trả về luôn
    if (/^\d{2}:\d{2}$/.test(time)) return time;
    // Nếu là chuỗi giờ phút giây thì cắt ra
    const [h, m] = time.split(':');
    return `${h.padStart(2, '0')}:${m.padStart(2, '0')}`;
  }
  // Nếu là Date object
  return time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
};

const RestaurantMain = () => {
  const route = useRouter();
  const id = useLocalSearchParams().id; 
  const time = useLocalSearchParams().time; 
  
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isDescriptionExpanded, setDescriptionExpanded] = useState(false); // State for description toggle
  const [isBookingModalVisible, setBookingModalVisible] = useState(false);
  
  // Booking Options State
  const [orderDateTime, setOrderDateTime] = useState(null);
  const [selectedTime, setSelectedTime] = useState(time || null);
  const [selectedPeople, setSelectedPeople] = useState(null);
  const [findSlotMessage, setFindSlotMessage] = useState("Tìm bàn");
  const availableTimes = useRef({});
  const timeSlotsRef = useRef([]); // Reference to store available times

  useEffect(() => {
    setLoading(true);
    fetchRestaurantById(id).then((data) => {
      setRestaurant(data.restaurent);
      timeSlotsRef.current = data.restaurent.availableTimes || [];
      setLoading(false);
      console.log("id", id);
    }).catch((error) => {
      console.error("Error fetching restaurant:", error);
      setLoading(false);
    });
  }, [id]);

  useEffect(() => {
    const handleAvailableTime = async () => {
      
      if (!orderDateTime || !selectedTime || !selectedPeople) {
        console.log("Please select date, time, and people before finding slots.");
        setFindSlotMessage("Vui lòng nhập đủ thông tin");
        return;
      }

      // Format lại trước khi gọi API
      const formattedDate = getFormattedDate(orderDateTime);
      const formattedTime = getFormattedTime(selectedTime);


      try {
        const result = await postAvailableTime({
          restaurantId: id,
          date: formattedDate,
          time: formattedTime,
          people: selectedPeople,
        });
        console.log("AvialableTIme result", result);
        // setAvailableTimes(result.availableTimes || []);
        availableTimes.current = result.availableTimes;
        if (availableTimes.current.length === 0) {
          setFindSlotMessage("Hiện đang hết bàn");
        } else {
          setFindSlotMessage("Đặt bàn ngay");
        }
        console.log(" restaurant_main/[id] HandleAvialbleTime: Available slots:", result.availableTimes);
      } catch (error) {
        if (error.message.includes("lịch")) {
            // Alert.alert("[id] Lỗi ngày đặt", error.message);
            setFindSlotMessage("Ngày chọn không có lịch");
        } else {
            // Alert.alert("[id] Lỗi", error.message);
            setFindSlotMessage("Vui lòng thử lại sau");
        }
      }
    }
    
    handleAvailableTime();
  }, [orderDateTime, selectedTime, selectedPeople]);


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

  const handleFindSlots = () => {
    setBookingModalVisible(true); //for futther user information
  }

  const handleMapPress = () => {
    route.push(`/map-view/show-map?id=${id}`);
  }

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity  onPress={handleBackPress} style={styles.backBut}>
            <MaterialIcons name="arrow-back" size={hp("3.5%")} 
            color={Color.black}  />
          </TouchableOpacity>
          <Text style={[Typography.header3, styles.headerText]}>{restaurant.name}</Text>
        </View>



      
      <ScrollView style={styles.mainLayout} contentContainerStyle={styles.mainContent}>
        {/* Header */}
        <View style={styles.headerLine} />

        {/* Restaurant Image */}
        <Image style={styles.restaurantImage} source={{uri: `${restaurant.imageUrl}`}} />

        {/* Address and Time */}
        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: hp("2%") }}>
          <MaterialIcons name="location-on" size={hp("3%")} color={Color.primary} />  
          <Text style={[Typography.paragraph, styles.address]}>{restaurant.address}</Text>
        </View>
        
        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: hp("2%") }}>
          <MaterialIcons name="access-time-filled" size={hp("3%")} color={Color.primary} />
          <Text style={[Typography.paragraph, styles.operatingHours]}>
            {restaurant.openTime} -- {restaurant.closeTime}
          </Text>
        </View>
        

        {/* Menu and Description */}
        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: hp("2%") }}>
          <MaterialIcons name="menu-book" size={hp("3%")} color={Color.primary} />
          {/* <Text style={[Typography.paragraph, styles.menuLink]}>Thực đơn</Text> */}
        </View>

        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: hp("2%") }}>
          <MaterialIcons name="access-time-filled" size={hp("3%")} color={Color.primary} />
          <TouchableOpacity onPress={() => {handleMapPress()}}>
            <Text style={[Typography.paragraph, styles.mapLink]}>Xem trên bản đồ</Text>
          </TouchableOpacity>
        </View>


        <Text style={[Typography.header5, styles.sectionTitle]}>Description</Text>
        <Text 
          style={[Typography.paragraph, styles.description]}
          numberOfLines={isDescriptionExpanded ? undefined : 1} 
        >
          {restaurant.description}
        </Text>
        <Text
          style={styles.readMore}
          onPress={() => setDescriptionExpanded(!isDescriptionExpanded)} // Toggle description
        >
          {isDescriptionExpanded ? "Hiển thị ít hơn" : "Xem thêm"}
        </Text>

        {/* Booking Options */}
        <BookingOptions
          timeSlotsRef={timeSlotsRef}
          availableTimes={availableTimes}
          orderDateTime={orderDateTime}
          setOrderDateTime={setOrderDateTime}
          selectedTime={selectedTime}
          setSelectedTime={setSelectedTime}
          selectedPeople={selectedPeople}
          setSelectedPeople={setSelectedPeople}
        />

        {/* Find Slots Button */}
        {findSlotMessage != "Đặt bàn ngay" && (
          <>
            <View 
              style={[styles.findSlotsButton, { backgroundColor: Color.sub }]}
            >
              <Text style={[Typography.smallButton, styles.findSlotsText, { color: Color.lightsub}]}>{findSlotMessage}</Text>
            </View>
          </>
        )}

        {findSlotMessage === "Đặt bàn ngay" && (
          <>
            <TouchableOpacity 
              style={styles.findSlotsButton}
              onPress={() => handleFindSlots()}
            >
              <Text style={[Typography.smallButton, styles.findSlotsText]}>{findSlotMessage}</Text>
            </TouchableOpacity>
          </>
        )}
        
      </ScrollView>
      </SafeAreaView>

      {/* Booking Modal */}
      {isBookingModalVisible && (
        <BookingModal 
          restaurant={restaurant}
          onCloseBookingModal={() => setBookingModalVisible(false)}
          orderDateTime={orderDateTime}
          setOrderDateTime={setOrderDateTime}
          selectedTime={selectedTime}
          setSelectedTime={setSelectedTime}
          selectedPeople={selectedPeople}
          setSelectedPeople={setSelectedPeople}
          resId={id}
        />
      )}
    </>
  );
};

export default RestaurantMain;
