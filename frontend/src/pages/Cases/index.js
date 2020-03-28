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
    const [display, setDisplay] = useState('none')
    const [currCountry, setCurrCountry] = useState('')
    const [loading, setLoading] = useState(false)
    const [listCountries, setListCountries] = useState([])
    const [fullListCountries, setfullListCountries] = useState([])

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

    function handleDisplay() {
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
        setDisplay('block')
    }

    async function handleSelectedCountry(e) {
        e.preventDefault()

        try {
            console.log(currCountry)
            const response = await api.get(`/locations?country_code=${currCountry.toLowerCase()}`)
            setConfirmed(response.data.latest.confirmed)
            setDeaths(response.data.latest.deaths)
            setRecovered(response.data.latest.recovered)
        } catch (err) {
            alert('Erro ao obter a informação do país. Tente novamente.')
        } 
        
        setDisplay('none')
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

            <form onSubmit={handleSelectedCountry}>
                <input 
                    placeholder='Digite o código do país'
                    value={currCountry}
                    onChange={e => {
                        console.log(`e.target.value - ${e.target.value}`)
                        setCurrCountry(e.target.value === '' ? '' : e.target.value)
                        handleDisplay()
                    }}
                />

                <ul style={{display: display}} className='countries-list'>
                    {listCountries.map(item => (
                        <li 
                            onClick={(e) => {     
                                setCurrCountry(item.code) 
                                setDisplay('none')  
                            }} 
                            key={item.code}>
                                {`${item.name} - ${item.code}`}
                        </li>     
                    ))}
                </ul>
                <button type='submit'>Confirmar</button>
            </form>

            <div className='info-corona-virus'>
                <p>CASOS CONFIRMADOS: {confirmed}</p>
                <p>NÚMERO DE MORTES: {deaths}</p>
                <p>CASOS RECUPERADOS: {recovered}</p>
            </div>
        </div>               
    )
}