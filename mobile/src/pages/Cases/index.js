import React, { useState, useEffect } from 'react'
import { View, TextInput, TouchableOpacity, Text } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

import { DrawerActions } from '@react-navigation/native'

import styles from  './styles'

import api from '../../services/api'

export default function Cases({ navigation }) {
    const [confirmed, setConfirmed] = useState('')
    const [deaths, setDeaths] = useState('')
    const [recovered, setRecovered] = useState('')

    const [country, setCountry] = useState('')


    async function handleCountry() {
        try {
            console.log(country)
            const response = await api.get(`/locations?country=${country.toLowerCase()}`)
            console.log(response)
            setConfirmed(response.data.latest.confirmed)
            setDeaths(response.data.latest.deaths)
            setRecovered(response.data.latest.recovered)
        } catch (err) {
            alert("Erro ao pesquisar informações. Verifique se o país digitado está correto")
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
                <TextInput 
                    onChangeText={text => setCountry(text)} 
                    placeholder="Digite o nome do país" 
                    style={styles.country}
                    value={country}
                />
                <TouchableOpacity onPress={handleCountry} style={styles.submit}>
                    <Text style={styles.submitText}>Obter</Text>
                </TouchableOpacity>
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
