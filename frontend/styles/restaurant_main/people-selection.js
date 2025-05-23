import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    darkOpacityBackground: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        
        justifyContent: "flex-end",
    },

    whiteSmallScreen: {
        width: "100%",
        height: "40%",

        backgroundColor: "white",
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,

        flexDirection: "column",
    },

    headerText: {
        marginTop: 20, 
        marginLeft: 30,
        marginBottom: 10,

        fontSize: 20, 
        fontWeight: "bold", 
    },
});