import React from 'react'
import {
  useEffect,
  useRef,

} from 'react'
import { 
    SafeAreaView,
    StatusBar,
    StyleSheet, 
    Text, 
    View,
} from 'react-native'

import { Header } from '@/components/Header'
import { styles } from '@/styles/map-view/show-map'
import { MAPBOX } from '@/services/mapbox-api/mapbox'
import pinImage from "../../../assets/images/map-marker.png";
import { restaurantPositions } from '@/data/mocking/restaurant-position';

import Mapbox, {
  Camera,
  MapView,
  LocationPuck,
  ShapeSource,
  SymbolLayer,
  setAccessToken,
} from '@rnmapbox/maps';
import { useRouter, useLocalSearchParams } from 'expo-router'

Mapbox.setAccessToken(MAPBOX.MAPBOX_P_KEY);

function useRestaurantCoordinate(id) {
  if (!id) return null;
  const feature = restaurantPositions.features.find(
    (f) => f.properties?.id?.toString() === id.toString()
  );
  //debug
  console.log(feature ? feature.geometry.coordinates : null);
  //end debug
  return feature ? feature.geometry.coordinates : null;
}

const ShowMap = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const centerCoordinate = useRestaurantCoordinate(id) || [105.85, 21.03]; // fallback: Hà Nội


  const handlebackPress = () => {
    router.back(); // Navigate back to the previous screen
  }
  const handerMarkerPress = (e) => {
    const feature = e.features && e.features[0];
    if (feature && feature.properties && feature.properties.id) {
      const restaurantId = feature.properties.id;
      console.log("Clicked restaurant id:", restaurantId);
      // Bạn có thể thực hiện điều hướng hoặc thao tác khác ở đây
      router.push(`/restaurant_main/${restaurantId}`); // Navigate to restaurant details
    }
  }


  return (
    <>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />
        <SafeAreaView style={styles.container}>
            <Header
            title="Map"
            hasReturn={true}
            onBackPress={handlebackPress}
            />

            <View style={styles.mapContainer}>
                <Mapbox.MapView style={styles.map}>
                  <Mapbox.Camera 
                  centerCoordinate={centerCoordinate}
                  zoomLevel={12}
                  />
                  <Mapbox.LocationPuck />

                  <Mapbox.ShapeSource
                    id="restaurant-source"
                    shape={restaurantPositions}
                    onPress={handerMarkerPress}
                  >
                    <Mapbox.SymbolLayer
                      id="restaurant-symbol"
                      style={{
                        iconImage: pinImage,
                        iconSize: 0.28,
                        iconAnchor: 'bottom',
                        // textField: '{title}',
                        // textFont: ['Open Sans Regular'],
                        // textSize: 12,
                        // textColor: '#000',
                      }}
                    />
                  </Mapbox.ShapeSource>
                </Mapbox.MapView>
            </View>    
        </SafeAreaView>      
    </>
  )
}

export default ShowMap

