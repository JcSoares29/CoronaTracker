import React, { useState, useEffect } from 'react'
import { View, TextInput, TouchableOpacity, Text } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

import { DrawerActions } from '@react-navigation/native'

import styles from  './styles'

import { Dropdown } from 'react-native-material-dropdown';

import apiCorona from '../../services/apiCorona'

import apiCountryCodes from '../../services/apiCountryCodes'

export default function Cases({ navigation }) {
    const [confirmed, setConfirmed] = useState('')
    const [deaths, setDeaths] = useState('')
    const [recovered, setRecovered] = useState('')
    const [loading, setLoading] = useState(false)

    const [listCountries, setListCountries] = useState([])
    
    async function getCountries() {
        if (loading) return
        setLoading(true)
            
        setListCountries(responseCountries.data.result.map(item => {
            return {value: `${item.name} - ${item.code}`}
        }).sort().filter())

        setLoading(false)
    }

    useEffect(() => {
        getCountries()
    }, [])


    async function handleCountry(country) {
        try {
            console.log(country)
            const response = await apiCorona.get(`/locations?country_code=${country}`)
            setConfirmed(response.data.latest.confirmed)
            setDeaths(response.data.latest.deaths)
            setRecovered(response.data.latest.recovered)
        } catch (err) {
            alert("Erro ao pesquisar informações. O país selecionado pode não conter informações de corona vírus.")
            setConfirmed("")
            setDeaths("")
            setRecovered("")
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
                <Text style={styles.headerText}>Corona Tracker</Text>        
            </View>

            <View style={styles.search}>
                <Dropdown 
                    pickerStyle={{borderBottomColor:'transparent',borderWidth: 0, height: "90%"}}
                    containerStyle={styles.country}
                    overlayStyle={styles.countryOverlay}
                    dropdownPosition={0}
                    onChangeText={text => {
                        handleCountry(text.split(' - ')[1])
                    }} 
                    dropdownOffset={{ top: 0 }}
                    data={listCountries}
                />
            </View>

            <View style={styles.coronaInfo}>
                <Text style={styles.coronaInfoText}>CASOS CONFIRMADOS:</Text>
                <Text style={styles.coronaValue}>{confirmed}</Text>

                <Text style={styles.coronaInfoText}>NÚMERO DE MORTES:</Text>                
                <Text style={[styles.coronaValue, { color: "#ff5555" }]}>{deaths}</Text>

                <Text style={styles.coronaInfoText}>CASOS RECUPERADOS:</Text>
                <Text style={[styles.coronaValue, { marginBottom: 0 }]}>{recovered}</Text>
            </View>


        </View>
    )
}
