import React, {useState, useEffect} from 'react';
import {View,Image, StyleSheet, AsyncStorage, Text, TextInput, TouchableOpacity, KeyboardAvoidingView} from 'react-native';
import logo from '../assets/logo.png'


import api from '../services/api';



export default function Login({navigation}) {
    const [email, setEmail] = useState('');
    const [techs, setTechs] = useState('');
    useEffect( () =>{
       const resource = async () =>{
        const user =   await AsyncStorage.getItem('user');
        if (user)
            navigation.navigate('List')
       }
       resource();
    },[])
    async function handleSubmit(){
        
       const response=  await api.post('/users', {email});
       const {_id} = response.data;
       await AsyncStorage.setItem('user', _id); 
       await AsyncStorage.setItem('techs', techs);
       navigation.navigate('List');
    }
    return (
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <Image source={logo}/>
                <View style={styles.form}>
                    <Text style={styles.label}>Seu Email * </Text>
                    <TextInput
                    style={styles.input}
                    placeholder="seu E-mail"
                    placeholderTextColor="#999"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={email}
                    onChangeText={setEmail}
                    />

                    <Text style={styles.label}>Tecnologias * </Text>
                    <TextInput
                    style={styles.input}
                    placeholder="Digite as tecnologias"
                    placeholderTextColor="#999"
                    autoCapitalize="words"
                    autoCorrect={false}
                    value={techs}
                    onChangeText={setTechs}
                    />

                    <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                        <Text style={styles.text}>Enviar</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
            )    
}

const styles = StyleSheet.create({
    container: {
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center',
    },
    label : {
        fontWeight : 'bold',
        color: '#444',
        marginBottom: 8,
    },
    form: {
        paddingHorizontal : 30, 
        alignSelf : 'stretch',
        marginTop : 30,

    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        paddingHorizontal : 20,
        fontSize: 16, 
        color : '#444',
        height: 44,
        marginBottom: 20,
        borderRadius : 2,
    },
    button: {
        height:42,
        backgroundColor : '#f05a5b',
        justifyContent : 'center',
        alignItems : 'center',
        borderRadius : 2

    },
    text: {
        color : '#fff',
        fontWeight: 'bold',
        fontSize: 16
    }
}  )
