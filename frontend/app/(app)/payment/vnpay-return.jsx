import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useCart } from '@/contexts/cart-context';
import { Header } from '@/components/Header';
import Icon from 'react-native-vector-icons/Ionicons';
import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const VNPayReturn = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { handlePaymentReturn } = useCart();
  const [status, setStatus] = useState('loading'); // loading, success, error
  const [message, setMessage] = useState('');

  useEffect(() => {
    const processPayment = async () => {
      try {
        const result = await handlePaymentReturn(params);
        setStatus(result.success ? 'success' : 'error');
        setMessage(result.message);

        // Auto redirect after 3 seconds
        setTimeout(() => {
          if (result.success) {
            router.replace('/orders');
          } else {
            router.back();
          }
        }, 3000);
      } catch (error) {
        setStatus('error');
        setMessage(error.message);
      }
    };

    processPayment();
  }, [params, handlePaymentReturn, router]);

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <SafeAreaView style={styles.container}>
        <Header title="Kết quả thanh toán" />

        <View style={styles.content}>
          {status === 'loading' && (
            <View style={styles.centerContainer}>
              <ActivityIndicator size="large" color="#2E8B57" />
              <Text style={styles.loadingText}>Đang xử lý thanh toán...</Text>
            </View>
          )}

          {status === 'success' && (
            <View style={styles.centerContainer}>
              <Icon name="checkmark-circle" size={64} color="#2E8B57" />
              <Text style={styles.successText}>Thanh toán thành công!</Text>
              <Text style={styles.messageText}>{message}</Text>
              <Text style={styles.redirectText}>
                Đang chuyển đến trang đơn hàng...
              </Text>
            </View>
          )}

          {status === 'error' && (
            <View style={styles.centerContainer}>
              <Icon name="close-circle" size={64} color="#ff4444" />
              <Text style={styles.errorText}>Thanh toán thất bại</Text>
              <Text style={styles.messageText}>{message}</Text>
              <Text style={styles.redirectText}>
                Đang quay lại trang giỏ hàng...
              </Text>
            </View>
          )}
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    paddingHorizontal: wp('4%'),
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: hp('2%'),
    color: '#666',
    marginTop: hp('2%'),
  },
  successText: {
    fontSize: hp('2.4%'),
    fontWeight: 'bold',
    color: '#2E8B57',
    marginTop: hp('2%'),
  },
  errorText: {
    fontSize: hp('2.4%'),
    fontWeight: 'bold',
    color: '#ff4444',
    marginTop: hp('2%'),
  },
  messageText: {
    fontSize: hp('1.8%'),
    color: '#666',
    marginTop: hp('1%'),
    textAlign: 'center',
  },
  redirectText: {
    fontSize: hp('1.6%'),
    color: '#999',
    marginTop: hp('2%'),
  },
});

export default VNPayReturn;
