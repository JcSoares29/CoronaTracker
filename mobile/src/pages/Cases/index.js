import React, { useState } from 'react'
import { View, Text, FlatList, TextInput, TouchableOpacity } from 'react-native'

import { Ionicons } from '@expo/vector-icons'

import styles from  './styles'

import Header from '../../../Header'

import apiCorona from '../../services/apiCorona'

import apiCountryCodes from '../../services/apiCountryCodes'

export default function Cases({ navigation }) {
    const [confirmed, setConfirmed] = useState('')
    const [deaths, setDeaths] = useState('')
    const [recovered, setRecovered] = useState('')
    const [countryName, setCountryName] = useState('')
    const [loading, setLoading] = useState(false)
    const [opacity, setOpacity] = useState(0)
    const [currCountry, setCurrCountry] = useState('')

    const [listCountries, setListCountries] = useState([])
    const [fullListCountries, setfullListCountries] = useState([])
    
    async function getCountries() {
        if (loading) return
        setLoading(true)

        const responseCountries = await apiCountryCodes.get('/countries')
            
        const lstCountries = responseCountries.data.result.map((item, i) => {           
            return {name: item.name, code: item.code}
        }).sort((a, b) => {
            return a.name > b.name
        })

        setListCountries(lstCountries)
        setfullListCountries(lstCountries)
    }

    function handleDisplay(text) {
        if (text === '') {
            setListCountries(fullListCountries)
            return
        }

        const newList = fullListCountries.filter((a) => {
            return a.name.toLowerCase().startsWith(text.toLowerCase())
        })

        setListCountries(newList)
    }


    getCountries()

    

    async function handleCountry(country, countryName) {
        try {
            console.log(country)
            const response = await apiCorona.get(`/locations?country_code=${country}`)
            setCountryName(countryName)
            setConfirmed(response.data.latest.confirmed)
            setDeaths(response.data.latest.deaths)
            setRecovered(response.data.latest.recovered)
        } catch (err) {
            alert("Erro ao pesquisar informações. O país selecionado pode não conter informações de corona vírus.")
            setCountryName("")
            setConfirmed("")
            setDeaths("")
            setRecovered("")
        }

        setOpacity(0)
    }

    return (
        <View style={styles.container}>
            <Header 
                navigation={navigation}
                searchFunction={() => {
                    if (opacity === 0) {
                        setOpacity(100)
                    } else {
                        setOpacity(0)
                    }                    
                }}
                enableSearch={'flex'}
            />

            <View style={styles.mainContainer}>
                <View style={styles.coronaInfo}>
                    <Text style={styles.titleStyle}>{countryName}</Text>
                    <Text style={styles.coronaInfoText}>CASOS CONFIRMADOS:</Text>
                    <Text style={styles.coronaValue}>{confirmed}</Text>

                    <Text style={styles.coronaInfoText}>NÚMERO DE MORTES:</Text>                
                    <Text style={[styles.coronaValue, { color: "#ff5555" }]}>{deaths}</Text>

                    <Text style={styles.coronaInfoText}>CASOS RECUPERADOS:</Text>
                    <Text style={[styles.coronaValue, { marginBottom: 0 }]}>{recovered}</Text>
                </View>

                <View style={[styles.search, {opacity: opacity} ] }>
                    <TextInput 
                        style={styles.country} 
                        onChangeText={Text => {
                            handleDisplay(Text)
                        }}
                    />

                    <FlatList
                        data={listCountries}
                        style={styles.countryList} 
                        keyExtractor={listCountries => String(listCountries.code)}
                        showsVerticalScrollIndicator={true}
                        onEndReached={() => { return }}
                        onEndReachedThreshold={0.2}
                        renderItem={({ item: listCountries }) => (
                            <TouchableOpacity 
                                onPress={() => {handleCountry(listCountries.code, listCountries.name)}} 
                                style={styles.itemStyle}
                            >
                                <Text style={styles.itemTextStyle}>{listCountries.name}</Text>
                            </TouchableOpacity>
                        )}
                    />     
{/*                     <Dropdown 
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
                    /> */}
                </View> 


            </View>

            
        </View>
    )
}
