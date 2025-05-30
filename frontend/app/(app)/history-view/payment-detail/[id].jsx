import React from 'react';

import { useLocalSearchParams, useRouter } from 'expo-router';
import { 
  View, Text,
  StatusBar,
  SafeAreaView,

} from 'react-native';

import { styles } from '@/styles/history-view/history-payment/history-payment-detail';
import { Header } from '@/components/Header';

export default function HistoryPaymentDetail() {
  const router = useRouter();
  const { id } = useLocalSearchParams();


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
        
      </SafeAreaView>
    </>
  )
}

