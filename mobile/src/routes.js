import React from 'react'
import { Image, View, StyleSheet, ScrollView, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator, DrawerItemList, DrawerContentScrollView, DrawerItem  } from '@react-navigation/drawer'

import { MaterialIcons } from '@expo/vector-icons'

import VirusImg from './assets/virus.png'

const AppDrawer = createDrawerNavigator()

import Cases from './pages/Cases'
import About from './pages/About'

const CustomDrawer = (props) => {
    return (
        <DrawerContentScrollView style={styles.menu} {...props}>
            <View style={styles.logo}>
                <Image source={VirusImg}/>
                <Text style={styles.title}>Corona Tracker</Text>
            </View>            
            <DrawerItemList  labelStyle={styles.itemStyle}  {...props} />
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
                    activeTintColor: '#6272a4',
                    itemStyle: {height: 50, flex: 1, justifyContent: 'center'},
                }}    
            >
                <AppDrawer.Screen 
                    name="Home" 
                    options={{ drawerLabel: 'Home', drawerIcon: ({  }) => (
                        <MaterialIcons
                          name = 'home'
                          size={50}
                          style={{ color: "#bd93f9" }}
                        />
                      ) }}
                    component={Cases} />

                    <AppDrawer.Screen 
                        name="Sobre" 
                        options={{ drawerLabel: 'Home', drawerIcon: ({ }) => (
                            <MaterialIcons
                            name = 'help'
                            size={50}
                            style={{ color: "#bd93f9" }}
                            />
                        ) }}
                        component={About} />

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
    },

    itemStyle: {     
        fontSize: 20,
        color: "#FFF",
        width: "100%",        
    }

})

