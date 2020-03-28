import React, { useState } from 'react'

import { FiPower } from 'react-icons/fi'

import VirusImg from '../../assets/covid-virus.png'

import './styles.css'

import api from '../../services/apiCorona'
import apiCountryCodes from '../../services/apiCountryCodes'

export default function Cases() {
    const [confirmed, setConfirmed] = useState('')
    const [deaths, setDeaths] = useState('')
    const [recovered, setRecovered] = useState('')
    const [currCountry, setCurrCountry] = useState('')
    const [loading, setLoading] = useState(false)
    const [listCountries, setListCountries] = useState([])
    const [fullListCountries, setfullListCountries] = useState([])
    const [countryLabel, setCountryLabel] = useState('')

    async function getCountries() {
        if (loading) return
        setLoading(true)

        const responseCountries = await apiCountryCodes.get('/countries')
            
        const newList = responseCountries.data.result.map(item => {
            return {name: item.name, code: item.code}
        }).sort()

        setListCountries(newList)
        setfullListCountries(newList)

        console.log(listCountries)

    }


    getCountries()

    function handleDisplay(text) {
        console.log(currCountry)
        if (currCountry === '') {
            setListCountries(fullListCountries)
            return
        }

        const newList = fullListCountries.filter((a) => {
            return a.name.toLowerCase().startsWith(currCountry.toLowerCase())
        })

        console.log(fullListCountries)
        setListCountries(newList)
    }

    async function handleSelectedCountry(e, code) {
        e.preventDefault()

        try {
            console.log(currCountry)
            const response = await api.get(`/locations?country_code=${code.toLowerCase()}`)
            setConfirmed(response.data.latest.confirmed)
            setDeaths(response.data.latest.deaths)
            setRecovered(response.data.latest.recovered)
        } catch (err) {
            alert('Erro ao obter a informação do país. Tente novamente.')
        } 
    }

    return (
        <div className='cases-container'>
            <header className='cases-header'>
                <img src={VirusImg} alt="Vírus COVID"/>
                <h1>Casos recentes de CODVID-19 por País</h1>
                <button type="button">
                    <FiPower size={18} color="#e02041" />
                </button>
            </header>

            <div className='search-country'>
                <form onSubmit={e => e.preventDefault()}>
                    <input 
                        placeholder='Digite o nome do país'
                        value={currCountry}
                        onChange={e => {
                            setCurrCountry(e.target.value)
                            handleDisplay()
                        }}
                    />

                    <ul className='countries-list'>
                        {listCountries.map(item => (
                            <li 
                                onClick={(e) => {
                                    setCountryLabel(item.name)     
                                    handleSelectedCountry(e, item.code) 
                                }} 
                                key={item.code}>
                                    {`${item.name} - ${item.code}`}
                            </li>     
                        ))}
                    </ul>
                </form>

                <div className='info-corona-virus'>
                    <h1>{countryLabel}</h1>
                    <p>CASOS CONFIRMADOS:</p>
                    <span>{confirmed}</span>
                    <p>NÚMERO DE MORTES: </p>
                    <span>{deaths}</span>
                    <p>CASOS RECUPERADOS: </p>
                    <span>{recovered}</span>
                </div>
            </div>

        
        </div>               
    )
}