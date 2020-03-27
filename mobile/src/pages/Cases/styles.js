import { StyleSheet } from 'react-native'
import Constants from 'expo-constants'

export default StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        alignItems: "center",
        justifyContent: 'flex-start',
        backgroundColor: "#44475a",
    }, 

    search: {
        width: "100%",
        justifyContent: 'space-between',
        padding: 15,
    },
    
    country: {
        height: 50,
        width: "100%",
        backgroundColor: "#FFF",
        borderRadius: 5,
        padding: 5
    },

    countryOverlay: {
        top: 50
    },

    submit: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#ff5555",
        height: 50,
        borderRadius: 5,
    },

    submitText: {
        color: "#FFF",
        fontSize: 24,
        fontWeight: "bold"
    },

    coronaInfo: {
        width: "95%",
        padding: 24,
        borderRadius: 8,
        borderColor: "#FFF", 
        borderWidth: 2,
        backgroundColor: "#6272a4"
    },

    coronaInfoText: {
        fontSize: 25,
        fontWeight: 'bold',
        color: "#282a36",

    },

    coronaValue: {
        fontSize: 25,
        fontWeight: 'bold',
        color: "#50fa7b",
        marginBottom: 50
    }
})