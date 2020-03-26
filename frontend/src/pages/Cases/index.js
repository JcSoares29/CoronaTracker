import React, { useState } from 'react'

import { FiPower } from 'react-icons/fi'

import VirusImg from '../../assets/covid-virus.png'

import './styles.css'

import api from '../../services/apiCorona'

export default function Cases() {
    const [confirmed, setConfirmed] = useState('')
    const [deaths, setDeaths] = useState('')
    const [recovered, setRecovered] = useState('')

    const [country, setCountry] = useState('')

    async function handleSelectedCountry(e) {
        e.preventDefault()

        try {
            console.log(country)
            const response = await api.get(`/locations?country=${country.toLowerCase()}`)
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

            <form onSubmit={handleSelectedCountry}>
                <input 
                    placeholder='Digite o nome do país'
                    value={country}
                    onChange={e => setCountry(e.target.value)}
                />
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