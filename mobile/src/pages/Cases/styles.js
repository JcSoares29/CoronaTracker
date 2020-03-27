import { StyleSheet } from 'react-native'
import Constants from 'expo-constants'

export default StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Constants.statusBarHeight,
        backgroundColor: "#44475a",
    }, 

    header: {
        flex: 0,
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "flex-start",        
        backgroundColor: "#282a36",
        borderBottomWidth: 5,
        borderBottomColor: "#ff79c6"
    },

    headerText: {
        marginLeft: 25,
        color: "#FFF",
        fontSize: 20,
        fontWeight: 'bold'
    },

    menuButton: {
        marginLeft: 15,
    },

    search: {
        flex: 0,
        flexDirection: 'row',
        justifyContent: "space-between",
        padding: 15,
    },

    country: {
        height: 50,
        color: "#282a36",
        width: "70%",
        backgroundColor: "#FFF",
        borderRadius: 5,
        padding: 5
    },

    submit: {
        flex: 1,
        width: "20%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#ff5555",
        height: 50,
        borderRadius: 5,
        marginLeft: 10,
    },

    submitText: {
        color: "#FFF",
        fontSize: 24,
        fontWeight: "bold"
    },

    coronaInfo: {
        padding: 24,
        borderRadius: 8,
        marginBottom: 20,
        marginHorizontal: 10,
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