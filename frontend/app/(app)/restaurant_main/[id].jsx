import React, { 
  useEffect, 
  useState ,
  useRef,
} from "react";
import { View, Text, Image, ActivityIndicator, Pressable, TouchableOpacity, ScrollView } from "react-native";
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
  const [availableTimes, setAvailableTimes] = useState([]);

  useEffect(() => {
    setLoading(true);
    fetchRestaurantById(id).then((data) => {
      setRestaurant(data.restaurent);
      setAvailableTimes(data.restaurent.availableTimes || []);
      setLoading(false);
      console.log("id", id);
    }).catch((error) => {
      console.error("Error fetching restaurant:", error);
      setLoading(false);
    });
  }, [id]);

  useEffect(() => {
    const handleAvailableTime = async () => {
      // setBookingModalVisible(true); //for futther user information
      if (!orderDateTime || !selectedTime || !selectedPeople) {
        console.log("Please select date, time, and people before finding slots.");
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
        setAvailableTimes(result.availableTimes || []);
        console.log("Available slots:", result.availableTimes);
      } catch (error) {
        console.error("Error fetching available slots:", error);
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
    // // setBookingModalVisible(true); //for futther user information
    // if (!orderDateTime || !selectedTime || !selectedPeople) {
    //   console.log("Please select date, time, and people before finding slots.");
    //   return;
    // }
    // // Format lại trước khi gọi API
    // const formattedDate = getFormattedDate(orderDateTime);
    // const formattedTime = getFormattedTime(selectedTime);

    // try {
    //   const result = await postAvailableTime({
    //     restaurantId: id,
    //     date: formattedDate,
    //     time: formattedTime,
    //     people: selectedPeople,
    //   });
    //   availableTimesRef.current = result.availableTimes || [];
    //   console.log("Available slots:", result.availableTimes);
    // } catch (error) {
    //   console.error("Error fetching available slots:", error);
    // }
  }

  const handleMapPress = () => {
    route.push(`/map-view/show-map?id=${id}`);
  }

  return (
    <>
      <ScrollView style={styles.container}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <TouchableOpacity  onPress={handleBackPress}>
            <MaterialIcons name="arrow-back" size={hp("3.5%")} color={Color.black} />
          </TouchableOpacity>
          <Text style={[Typography.header3, styles.restaurantTitle]}>{restaurant.name}</Text>
        </View>
        <View style={styles.headerLine} />

        {/* Restaurant Image */}
        <Image style={styles.restaurantImage} source={{uri: `${restaurant.imageUrl}`}} />

        {/* Address and Time */}
        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: hp("2%") }}>
          <MaterialIcons name="location-on" size={hp("3%")} color={Color.primary} />  
          <Text style={[Typography.paragraph, styles.address]}>{restaurant.address}   | </Text>
          <TouchableOpacity onPress={() => {handleMapPress()}}>
            <Text style={[Typography.paragraph, styles.mapLink]}>View on Map</Text>
          </TouchableOpacity>
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
          <Text style={[Typography.paragraph, styles.menuLink]}>Menu</Text>
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
          {isDescriptionExpanded ? "Show Less" : "Read More"}
        </Text>

        {/* Booking Options */}
        <BookingOptions 
          availableTimes={availableTimes}
          orderDateTime={orderDateTime}
          setOrderDateTime={setOrderDateTime}
          selectedTime={selectedTime}
          setSelectedTime={setSelectedTime}
          selectedPeople={selectedPeople}
          setSelectedPeople={setSelectedPeople}
        />
        

        {/* Find Slots Button */}
        <Pressable 
          style={styles.findSlotsButton}
          onPress={() => handleFindSlots()}
        >
          <Text style={styles.findSlotsText}>Find Slots</Text>
        </Pressable>
      </ScrollView>

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
        />
      )}
    </>
  );
};

export default RestaurantMain;
