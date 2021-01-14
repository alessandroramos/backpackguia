import React, { useEffect, useContext, useState } from 'react';
import { Container, LoadingIcon, IcoBackPackArea } from '../Styles/styles';
import AsyncStorage from  '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';
import IcoBackPack from '../../assets/icoBackPack.svg';
import Api from '../../Api';
import { UserContext } from '../../contexts/UserContext';

export default () => {
    const { dispatch: userDispatch} = useContext(UserContext);
    const navigation = useNavigation();
    useEffect(()=>{
        checkToken();
    }, []);
    
    const checkToken = async () => {
        const token = await AsyncStorage.getItem('tokenUser');
        if(token) {
            const user = JSON.parse(token);                
            Api.addAuthListener((user)=>{
                if(user){
                    userDispatch({
                        type: 'setAvatar',
                        payload:{
                            avatar: user.photoURL
                        }
                    });
                    navigation.reset({
                        routes:[{name: 'MainTab'}]
                    })
                }else{
                    Api.logout();
                    navigation.navigate('SignIn');        
                }
            })                         
        }else{
            Api.logout();
            navigation.reset({
                routes:[{name: 'SignIn'}]
            })
        }
    }


    return (
        <Container>
            <LoadingIcon size= "large"  color/>
            <IcoBackPackArea></IcoBackPackArea>
            <IcoBackPack width="100%" height="232" />
        </Container>
    );
}


