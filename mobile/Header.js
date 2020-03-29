import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { SearchBar } from 'react-native-elements';

import { DrawerActions } from '@react-navigation/native'

import { StyleSheet } from 'react-native'
import Constants from 'expo-constants'

export default function Header( {navigation, enableSearch='none',enableSearchBar=false , searchFunction, searchBarValue} ) {
    const [searchBar, setSearchBar] = useState(true)

    function showSearchOrTitle() {
        if (searchBar && enableSearchBar) {
            return (
                <SearchBar 
                    round
                    inputStyle={styles.searchControlInput}
                    containerStyle={styles.searchControl}
                    placeholder="Digite o nome do país"
                    onChangeText={Text => {
                        searchFunction(Text)
                    }}
                    value={searchBarValue}
                />
            )
        } else {
            return (<Text style={styles.headerText}>Corona Tracker</Text>)
        }
    }
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity 
                    onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())} 
                    style={styles.menuButton}
                >
                    <Ionicons name='ios-menu' size={45} color="#FFF" backgroundColor="transparent"/>                    
                </TouchableOpacity>
                {showSearchOrTitle()}                
                <View style={[styles.searchContainer, {display: enableSearch}]}>
                    <TouchableOpacity                        
                        onPress={() => {
                            if (searchBar) {
                                setSearchBar(false)
                            } else {
                                setSearchBar(true)
                            }
                            console.log(searchBar)                    
                        }} 
                        style={styles.searchButton}
                    >
                        <Ionicons name='ios-search' size={45} color="#FFF" backgroundColor="transparent"/>                    
                    </TouchableOpacity>

                </View>
            
            </View>
        </View>
        
    )
}

const styles = StyleSheet.create({
    container: {
        height: 80,
        width: "100%",    
        paddingTop: Constants.statusBarHeight,
        backgroundColor: "#44475a",
    }, 

    header: {       
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',        
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

    searchContainer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'flex-end',
        justifyContent: 'flex-end'
    },

    searchButton: {
        marginRight: 10,
        justifyContent: 'flex-end',
    },

    searchControl: {
        backgroundColor: "#282a36",
        alignItems: 'stretch',
        alignSelf: 'stretch',
        height: 50,
        width: '85%',
        marginLeft: 5,
        borderTopWidth: 0,
    },

    searchControlInput: {
        color: '#CCC'
    }

})