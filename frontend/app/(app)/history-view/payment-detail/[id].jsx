import React from 'react';

import { useLocalSearchParams, useRouter } from 'expo-router';
import { 
  View, Text,
  StatusBar,
  SafeAreaView,
  ScrollView,

} from 'react-native';

import { Header } from '@/components/Header';
import { Typography } from '@/styles/Typography';
import { styles } from '@/styles/history-view/history-payment/history-payment-detail';
import { paymentData } from '@/data/mocking/payment';

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

export default function HistoryPaymentDetail() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const item = paymentData.find(payment => payment.id == id);


  const handleBackPress = () => {
    // Navigate back to the previous screen
    router.back();
  }
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <SafeAreaView style={styles.container}>
        {/* Header  */}
        <Header 
          title="Payment Detail"
          onBackPress={() => {handleBackPress()}}
          hasReturn={true}
        />
        
        {/* MainView  */}
        <ScrollView 
        style={styles.mainLayout}
        contentContainerStyle={styles.mainContainer}>
          {/* Payment  */}
          <View style={styles.paymentContainer}>
            <Text style={[Typography.header5, styles.payBoxHeader]}>Payment</Text>
            <View style={styles.insideBox}>
              <Text style={[Typography.paragraph, styles.payLaberText]}>Menu Price</Text>
              {/* <Text style={[Typography.header6, styles.payValueText]}>
                {(item.amount - item.vat).toLocaleString("vi-VN")} VND
              </Text> */}
            </View>

            {/* List Menu Price  */}
            {item.orders.map((menu, index) => (
              <View key={index} style={[styles.insideBox, {  marginLeft: wp("4%") }]}>
                <Text style={[Typography.paragraph, styles.payLaberText]}>{menu.name}</Text>
                <Text style={[Typography.header6, styles.payValueText]}>
                  {menu.price.toLocaleString("vi-VN")} VND
                </Text>
              </View>
            ))}

            {/* VAT  */}
            <View style={styles.insideBox}>
              <Text style={[Typography.paragraph, styles.payLaberText]}>VAT</Text>
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

        </ScrollView>
        {/* Payment  */}
        
      </SafeAreaView>
    </>
  )
}

