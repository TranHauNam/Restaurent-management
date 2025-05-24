import { View, Text, Modal, ScrollView, TextInput, TouchableOpacity } from "react-native";
import { styles } from "@/styles/restaurant_main/people-selection";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

export const ShowPeopleSelection = ({selectedPeople, setSelectedPeople, setShowPeoplePicker}) => {

  const quickPeopleList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

  return (
    <>
      <Modal 
        visible={true} 
        transparent 
        animationType="fade" 
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
                        borderWidth: selectedPeople === item ? 2 : 1,
                        borderColor: selectedPeople === item ? "orange" : "gray",
                      }]}
                      onTouchEnd={() => {
                        setSelectedPeople(item);
                        setShowPeoplePicker(false);
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
              />
              
              {/* Agree Button */}
              <TouchableOpacity
                style={styles.confirmButton}
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