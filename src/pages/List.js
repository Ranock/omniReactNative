import React, {useState, useEffect} from 'react';
import {SafeAreaView, View,ScrollView, Image, AsyncStorage, StyleSheet, Platform} from 'react-native';


import logo from '../assets/logo.png';
import SpotList from '../components/SpotList';

export default function List() {
    const [techs, setTechs] = useState([]);
    useEffect( () =>{
         AsyncStorage.getItem( 'techs' ).then( techs => {
            setTechs(techs.split(',').map(x => x.trim()));
         }).catch(err => setTechs([]))
    })
    return (
            <SafeAreaView style={styles.container}>
                <Image style={styles.logo} source={logo} />
                <ScrollView>
                    {techs.map((tech, index) => <SpotList key={index} tech={tech} />)}
                </ScrollView>
            </SafeAreaView>
        )
    
}
const styles = StyleSheet.create({
    container : {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? 25 : 0
    },
    logo : {
        height: 32,
        resizeMode : 'contain',
        alignSelf : 'center',
        marginTop : 10
    }
})