import React from 'react'
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
import { restaurantPositions } from '@/data/mocking/restaurant-position'

import Mapbox, {
  
} from '@rnmapbox/maps';
import { useRouter } from 'expo-router'

const pinImage = { uri: 'https://picsum.photos/200'};

Mapbox.setAccessToken(MAPBOX.MAPBOX_P_KEY);

const ShowMap = () => {
  const router = useRouter();

  const handlebackPress = () => {
    router.back(); // Navigate back to the previous screen
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
                  <Mapbox.Camera followUserLocation followZoomLevel={12} />
                  <Mapbox.LocationPuck />

                  <Mapbox.ShapeSource
                    id="restaurant-source"
                    shape={restaurantPositions}
                  >
                    <Mapbox.SymbolLayer
                      id="restaurant-symbol"
                      style={{
                        iconImage: pinImage,
                        iconSize: 0.1,
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

