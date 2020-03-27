import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

import styles from './styles'

import Header from '../../../Header'

export default function About({navigation}) {
    return (
        <View style={styles.container}>
            <Header navigation={navigation}/>
        </View>
    )
}