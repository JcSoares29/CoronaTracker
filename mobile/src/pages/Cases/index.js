import React, { useState } from 'react'
import { View, Text } from 'react-native'

import styles from  './styles'

import Header from '../../../Header'

import { Dropdown } from 'react-native-material-dropdown';

import apiCorona from '../../services/apiCorona'

import apiCountryCodes from '../../services/apiCountryCodes'

export default function Cases({ navigation }) {
    const [confirmed, setConfirmed] = useState('')
    const [deaths, setDeaths] = useState('')
    const [recovered, setRecovered] = useState('')
    const [loading, setLoading] = useState(false)
    const [enable, setEnable] = useState(false)

    const [listCountries, setListCountries] = useState([])
    
    async function getCountries() {
        if (loading) return
        setLoading(true)

        const responseCountries = await apiCountryCodes.get('/countries')
            
        const lstCountries = responseCountries.data.result.map((item, i) => {           
            return {value: `${item.name} - ${item.code}`}
        }).sort((a, b) => {
            return a.value > b.value
        })

        setListCountries(lstCountries)
        console.log('oi')
    }


    getCountries()

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
            <Header navigation={navigation}/>

            <View style={styles.search}>
                <Dropdown 
                    pickerStyle={{height: "70%"}}
                    containerStyle={styles.country}
                    dropdownPosition={0}
                    onChangeText={async (text) => {
                        setEnable(true)
                        await handleCountry(text.split(' - ')[1])
                        setEnable(false)
                    }} 
                    disabled={enable}
                    rippleInsets={{top: 0, bottom: 0}}
                    dropdownOffset={{ top: 0, left: 0 }}
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
