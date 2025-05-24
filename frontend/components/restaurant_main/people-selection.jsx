import { View, Text, Modal, ScrollView } from "react-native";
import { styles } from "@/styles/restaurant_main/people-selection";
import { MaterialCommunityIcons } from "@expo/vector-icons";

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
            <View style={{flexDirection: "column", alignItems: "flex-start", justifyContent: "space-between", marginHorizontal: 20}}>
              <ScrollView
                style={{height: "30%",}}
              >
                <View style={{flexDirection: "row", flexWrap: "wrap", justifyContent: "flex-start", alignItems: "center"}}>
                  {quickPeopleList.map((item, index) => (
                    <View 
                      key={index} 
                      style={{
                        margin: 4,

                        backgroundColor: "white", 
                        borderWidth: selectedPeople === item ? 2 : 1,
                        borderColor: selectedPeople === item ? "orange" : "gray",
                        borderRadius: 40, 

                        padding: 10, 
                      }}
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
            </View>
        </View>
      </View>
    </Modal>
    </>
  );
}