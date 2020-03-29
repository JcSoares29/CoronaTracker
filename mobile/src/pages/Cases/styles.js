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

    mainContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between'
    },

    search: {
        position: 'absolute',
        left:     0,
        top:      -6,
        width: "100%",
        height: '100%',
    },
    
    country: {
        fontSize: 24,
        height: 50,
        width: "100%",
        backgroundColor: "#FFF",
        borderWidth: 2,
        borderColor: '#000',
        padding: 5
    },

    countryList: {
        height: "100%",
        width: "100%",
        color: '#CCC',
        backgroundColor: "#FFF",
        borderRadius: 5,
        padding: 5
    },

    itemStyle: {
        borderColor: "#000",
        borderTopWidth: 0,
        borderBottomWidth: 2
    },

    itemTextStyle: {
        fontSize: 24,
    },

    countryOverlay: {
        top: 50
    },

    coronaInfo: {
        flex: 1,
        justifyContent: 'space-between',
        width: "100%",
        height: "100%",
        padding: 24,
        borderRadius: 8,
        borderColor: "#FFF", 
        borderWidth: 2,
        backgroundColor: "#6272a4"
    },

    titleStyle: {
        fontSize: 40,
        alignSelf: 'center',
        justifyContent: 'center',
        color: "#ff79c6",
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