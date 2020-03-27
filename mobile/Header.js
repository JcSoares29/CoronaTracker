import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

import { DrawerActions } from '@react-navigation/native'

import { StyleSheet } from 'react-native'
import Constants from 'expo-constants'

export default function Header( {navigation} ) {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity 
                    onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())} 
                    style={styles.menuButton}
                >
                    <Ionicons name='ios-menu' size={45} color="#FFF" backgroundColor="transparent"/>
                </TouchableOpacity>
                <Text style={styles.headerText}>Corona Tracker</Text>        
        </View>
        </View>
        
    )
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
        height: 60,
        width: "100%",    
        paddingTop: Constants.statusBarHeight,
        backgroundColor: "#44475a",
    }, 

    header: {       
        flexDirection: 'row',
        alignItems: "center",   
        backgroundColor: "#282a36",
        borderBottomColor: "#ff79c6",
        borderBottomWidth: 5
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
})