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

import Mapbox from '@rnmapbox/maps';
import { useRouter } from 'expo-router'

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
                <Mapbox.MapView style={styles.map} />
            </View>    
        </SafeAreaView>      
    </>
  )
}

export default ShowMap

