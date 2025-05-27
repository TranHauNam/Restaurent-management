import { View, Text, Modal, ScrollView, TextInput, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import { styles } from "@/styles/restaurant_main/people-selection";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

export const ShowPeopleSelection = ({selectedPeople, setSelectedPeople, setShowPeoplePicker, showPeoplePicker }) => {

  const quickPeopleList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  
  const [tempOrderPeople, setTempOrderPeople] = useState();

  return (
    <>
      <Modal 
        visible={showPeoplePicker} 
        transparent 
        animationType="slide" 
        onRequestClose={() => setShowPeoplePicker(false)}
      >

      <View style={styles.darkOpacityBackground}>
        <View style={styles.whiteSmallScreen}>
        <MaterialCommunityIcons 
          name="close" 
          size={30} 
          color="black" 
          style={{position: "absolute", right: 20, top: 20}} 
          onPress={() => setShowPeoplePicker(false)}
        />
            <Text style={styles.headerText}>Select Number of People</Text>
            <View style={styles.contentContainer}>
              {/* Quick selection */}
              <ScrollView
                style={{maxHeight: hp("12%"), }}
              >
                <View style={styles.quickScrollSelect}>
                  {quickPeopleList.map((item, index) => (
                    <View 
                      key={index} 
                      style={[styles.quickPeopleSelectBut, {
                        borderWidth: tempOrderPeople === item ? 2 : 1,
                        borderColor: tempOrderPeople === item ? "orange" : "gray",
                      }]}
                      onTouchEnd={() => {
                        setTempOrderPeople(item);                        
                      }}
                    >
                      <View style={{flexDirection: "row", alignItems: "center"}}>
                        <Text style={{fontSize: 14}}>{item}</Text>
                        <Text style={{fontSize: 14}}> People</Text>
                      </View>
                    </View>
                  ))}
                </View>
              </ScrollView>
              {/* People Number Input */}              
              <TextInput
                style={styles.textInput}
                placeholder="Enter number of people"
                keyboardType="numeric"
                value={tempOrderPeople ? String(tempOrderPeople) : ""}
                onChangeText={text => {
                  const num = parseInt(text, 10);
                  if (!isNaN(num)) {
                    setTempOrderPeople(num);
                  } else {
                    setTempOrderPeople("");
                  }
                }}
              />
              
              {/* Agree Button */}
              <TouchableOpacity
                style={styles.confirmButton}
                onPress={() => {
                  const num = parseInt(tempOrderPeople)
                  if (!isNaN(num)) {
                    setSelectedPeople(num);                    
                  }
                  setShowPeoplePicker(false);
                }}
              >
                <Text style={styles.confirmButText}>Confirm</Text>
              </TouchableOpacity>
            </View>
        </View>
      </View>
    </Modal>
    </>
  );
}