import React, { useEffect, useState, useRef } from 'react';
import { View, ActivityIndicator, Alert } from 'react-native';
import { WebView } from 'react-native-webview';
import { useLocalSearchParams, router } from 'expo-router';
import { useCart } from '@/contexts/cart-context';
import { handleVNPayReturn } from '@/services/api/payment-api';
import { styles } from '@/styles/payment/main';

export default function VNPayPayment() {
  const { paymentUrl } = useLocalSearchParams();
  const { handlePaymentReturn } = useCart();
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const webViewRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const hasNavigatedToReturn = useRef(false);
  const [currentUrl, setCurrentUrl] = useState(decodeURIComponent(paymentUrl));

  useEffect(() => {
    if (!paymentUrl) {
      Alert.alert('Lỗi', 'Không tìm thấy thông tin thanh toán');
      router.back();
    }
  }, [paymentUrl]);

  if (!paymentUrl) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  const handlePaymentCallback = async (url) => {
    try {
      if (isProcessingPayment || hasNavigatedToReturn.current) return;
      
      setIsProcessingPayment(true);
      hasNavigatedToReturn.current = true;

      const urlObj = new URL(url);
      
      if (url.includes('/api/payment/vnpay_return')) {
        const params = Object.fromEntries(urlObj.searchParams.entries());
        console.log('VNPay Return Params:', params);

        const response = await handleVNPayReturn(params);
        console.log('Payment Response:', response);

        if (response.order && response.order.status === 'paid') {
          await handlePaymentReturn(response);
          
          setTimeout(() => {
            Alert.alert(
              'Thành công',
              `Thanh toán thành công!\nMã đơn hàng: ${response.order._id}`,
              [
                {
                  text: 'OK',
                  onPress: () => {
                    router.replace('/(app)/(tabs)');
                  }
                }
              ]
            );
          }, 500);
        } else {
          setTimeout(() => {
            Alert.alert(
              'Thất bại',
              response.message || 'Thanh toán không thành công',
              [
                {
                  text: 'OK',
                  onPress: () => router.back()
                }
              ]
            );
          }, 500);
        }
      }
    } catch (error) {
      console.error('Payment callback error:', error);
      setTimeout(() => {
        Alert.alert(
          'Lỗi',
          'Có lỗi xảy ra khi xử lý thanh toán',
          [
            {
              text: 'OK',
              onPress: () => router.back()
            }
          ]
        );
      }, 500);
    } finally {
      setIsProcessingPayment(false);
    }
  };

  // Inject JavaScript để chặn các thông báo lỗi từ WebView
  const INJECTED_JAVASCRIPT = `
    window.onerror = function(message, url, line, column, error) {
      return true;
    };
    window.addEventListener('error', function(event) {
      event.stopPropagation();
      event.preventDefault();
      return true;
    }, true);
    true;
  `;

  return (
    <View style={styles.container}>
      {(isProcessingPayment || isLoading) && (
        <View style={[styles.loadingContainer, styles.overlay]}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}
      <WebView
        ref={webViewRef}
        source={{ uri: currentUrl }}
        startInLoadingState
        onLoadStart={(syntheticEvent) => {
          const { nativeEvent } = syntheticEvent;
          setIsLoading(true);
          // Cập nhật URL hiện tại
          setCurrentUrl(nativeEvent.url);
        }}
        onLoadEnd={() => {
          setIsLoading(false);
        }}
        onNavigationStateChange={(navState) => {
          const { url } = navState;
          console.log('Navigation URL:', url);

          // Cập nhật URL hiện tại
          setCurrentUrl(url);

          if (url.includes('/api/payment/vnpay_return')) {
            handlePaymentCallback(url);
          }
        }}
        injectedJavaScript={INJECTED_JAVASCRIPT}
        onMessage={(event) => {
          console.log('WebView message:', event.nativeEvent.data);
        }}
        onError={(syntheticEvent) => {
          // Chỉ log lỗi, không hiển thị alert
          console.warn('WebView error:', syntheticEvent.nativeEvent);
        }}
        onHttpError={(syntheticEvent) => {
          // Chỉ log lỗi HTTP, không hiển thị alert
          console.warn('HTTP error:', syntheticEvent.nativeEvent);
        }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        thirdPartyCookiesEnabled={true}
        sharedCookiesEnabled={true}
        cacheEnabled={false}
      />
    </View>
  );
} 