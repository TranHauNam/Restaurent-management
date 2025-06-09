import React from 'react';

import { useLocalSearchParams, useRouter } from 'expo-router';
import { 
  View, Text, Image,
  StatusBar,
  SafeAreaView,
  ScrollView,

} from 'react-native';

import { Header } from '@/components/Header';
import { Typography } from '@/styles/Typography';
import { styles } from '@/styles/history-view/history-payment/history-payment-detail';
import { paymentData } from '@/data/mocking/payment';
import { restaurantData } from '@/data/mocking/restaurant';
import { foodData } from '@/data/mocking/food';
import { RestaurantSmallWindow } from '@/components/restaurant-small-window';
import { PaymentStatusBox } from '@/components/history-view/payment-history/payment-status-smallwin';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { FontSize } from '@/styles/GlobalStyles';

const PaymentMethodMessage = ({ method }) => {
  let message;
  switch (method) {
    case "Credit Card":
      message = "Credit Card Payment 💳";
      break;
    case "Paypal":
      message = "Paypal Payment 💳";
      break;
    default:
      message = "Cash Payment 💵";
  }
  return (
    <Text style={[Typography.header6, styles.payLaberText,
      { fontSize: FontSize.size_m,},
    ]}>
      {message}
    </Text>
  );
};

const getRestaurant = (restaurantId) => {
  //fetch restaurant as ID

  return restaurantData.find(restaurant => restaurant.id == restaurantId);
}

const getFood = (foodID) => {
  //fetch food as ID
  return foodData.find(food => food.id == foodID);
}

const renderMenuListItem = (menu) => {
  return (
    <>
      <View style={styles.menuItemContainer}>
        <View style={styles.menuInforContainer}>
          <Image
            style={styles.menuItemImage}
            source={{ uri: menu.imageURL }}
          />
          <Text style={[Typography.header6]}>{menu.name}</Text>
          <Text style={[Typography.paragraph, { marginTop: -hp("0.2%")}]}>x {menu.quantity}</Text>
        </View>
        <Text style={[Typography.header6, styles.payValueText, 
          {alignSelf: "flex-start", marginTop: -hp("0.4%"), }]}>
          {(menu.price * menu.quantity).toLocaleString("vn-VN")} VND
        </Text>
      </View>

      {/* Item Divider  */}
      <View style={styles.itemDivider} />
    </>
  );
}


export default function HistoryPaymentDetail() {
    const router = useRouter();
    const { id } = useLocalSearchParams();
    const item = paymentData.find(payment => payment.id == id);
    const restaurant = getRestaurant(item.restaurantID);
  


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
          title="Chi tiết thanh toán"
          onBackPress={() => {handleBackPress()}}
          hasReturn={true}
        />
        
        {/* MainView  */}
        <ScrollView 
        style={styles.mainLayout}
        contentContainerStyle={styles.mainContainer}>
          {/* Payment State  */}
          <View style={styles.smallBoxContainer}>
            <PaymentStatusBox status={item.status} />
          </View>


          {/* Restaurant Info  */}
          <View style={styles.smallBoxContainer}>
            <RestaurantSmallWindow
              restaurant={restaurant}
            />
          </View>

          {/* Payment  */}
          <View style={styles.paymentContainer}>
            <Text style={[Typography.header5, styles.payBoxHeader]}>Thanh toán</Text>
            <View style={styles.insideBox}>
              <Text style={[Typography.paragraph, styles.payLaberText]}>Giá thực đơn</Text>
              {/* <Text style={[Typography.header6, styles.payValueText]}>
                {(item.amount - item.vat).toLocaleString("vi-VN")} VND
              </Text> */}
            </View>

            {/* List Menu Price  */}
            {item.orders.map((menu, index) => (
              <React.Fragment key={index}>
                {renderMenuListItem(menu)}
              </React.Fragment>
            ))}

            

            {/* Subtotal Price  */}

            {/* VAT  */}
            <View style={styles.insideBox}>
              <Text style={[Typography.paragraph, styles.payLaberText]}>Giá trị thuế</Text>
              <Text style={[Typography.header6, styles.payValueText]}>
                {item.vat.toLocaleString("vi-VN")} VND
              </Text>
            </View>

            <View style={styles.calculateDivideLine}></View>

            {/* Total Price  */}
            <View style={styles.insideBox}>
                <PaymentMethodMessage method={item.method} />
                <Text style={[Typography.header6, styles.payValueText]}>
                  {item.amount.toLocaleString("vi-VN")} VND
                </Text>
            </View>
          </View>
          
          <View style={styles.boxDivider} />

          {/* RelatedInforBox  */}
          <View style={styles.smallBoxContainer}>
            {/* Payment Code  */}
            <View style={[styles.insideBox, { marginTop: -hp("1.2%"), marginBottom: hp("4%")}]}>
                <Text style={[Typography.header6, styles.payLaberText]}>
                    Mã thanh toán: {item.code}
                </Text>

                <Text style={[Typography.label, styles.timeLabelText,]}>
                    {item.date}, {item.time}
                </Text>
                {/* <View style={{ backgroundColor: "white", marginBottom: hp("4%")}}></View> */}

            </View>
          </View>
          
          {/* Footer  */}
          
        </ScrollView>
        {/* Payment  */}
        
      </SafeAreaView>
    </>
  )
}

