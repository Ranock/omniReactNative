import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, Alert, Text, TouchableOpacity, AsyncStorage, Platform, TextInput} from 'react-native';
import api from '../services/api';

export default function Book({navigation}) {
    const [date, setDate] = useState('');
    const id = navigation.getParam('id');

    async function handleSubmit(){
        const user_id = await AsyncStorage.getItem('user');
        api.post(`/spots/${id}/bookings`, {
            date
        }, {
            headers : {user_id}
        })
        Alert.alert('solicitação enviada');
        navigation.navigate('List');
    }
    function handleCancel(){
        navigation.navigate('List');        
    }
    return(<SafeAreaView style={styles.container} >
           <Text style={styles.label}>Data de reserva * </Text>
                    <TextInput
                    style={styles.input}
                    placeholder="Data da reserva"
                    placeholderTextColor="#999"
                    autoCapitalize="words"
                    autoCorrect={false}
                    value={date}
                    onChangeText={setDate}
                    />
            <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                <Text style={styles.buttonText}>Solicitar Reserva</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleCancel} style={styles.cancelButton}>
                <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
           </SafeAreaView>    
    )

}

const styles = StyleSheet.create({
    container : {
        margin: 30,
        flex: 1,
        paddingTop: Platform.OS === 'android' ? 25 : 0
    },
    label : {
        marginTop: 30,
        fontWeight : 'bold',
        color: '#444',
        marginBottom: 8,
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
    imputText: {
        color : '#fff',
        fontWeight: 'bold',
        fontSize: 16
    },
    button: {
        height:32,
        backgroundColor : '#f05a5b',
        justifyContent : 'center',
        alignItems : 'center',
        borderRadius : 2,
        marginTop : 15
    },
    cancelButton: {
        marginTop: 10,
        height:32,
        backgroundColor : '#ccc',
        justifyContent : 'center',
        alignItems : 'center',
        borderRadius : 2,
        marginTop : 15
    },
    buttonText: {
        color : '#fff',
        fontWeight: 'bold',
        fontSize: 15   
    }
});