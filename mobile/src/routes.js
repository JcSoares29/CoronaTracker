import React from 'react'
import { Image, View, StyleSheet, ScrollView, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator, DrawerItemList, DrawerContentScrollView  } from '@react-navigation/drawer'

import VirusImg from './assets/virus.png'

const AppDrawer = createDrawerNavigator()

import Cases from './pages/Cases'

const CustomDrawer = (props) => {
    return (
        <DrawerContentScrollView style={styles.menu} {...props}>
            <View style={styles.logo}>
                <Image source={VirusImg}/>
                <Text style={styles.title}>Corona Tracker</Text>
            </View>            
            <DrawerItemList  {...props} />
        </DrawerContentScrollView>
    )    
}

export default function Routes() {
    return (
        <NavigationContainer>
            <AppDrawer.Navigator 
                drawerContent={props => <CustomDrawer {...props} />} 
                initialRouteName="Home"
                drawerContentOptions={{
                    activeTintColor: '#bd93f9',
                    itemStyle: { marginVertical: 10, fontSize: 30, height: 50 },
                }}    
            >
                <AppDrawer.Screen name="Home" component={Cases} />
            </AppDrawer.Navigator>
        </NavigationContainer>
    )    
}

const styles =  StyleSheet.create({
    menu: {
        backgroundColor: "#282a36"
    },

    logo: {
        flex: 1,
        flexDirection: 'row',
        alignItems: "center",
        marginBottom: 10,               
        padding: 5,   
        borderRadius: 5,
        borderColor: "#FFF", 
        borderWidth: 2,
        backgroundColor: "#6272a4"
    },

    title: {
        marginLeft: 10,
        fontSize: 20,
        fontWeight: 'bold',
        color: "#f8f8f2"
    }

})

