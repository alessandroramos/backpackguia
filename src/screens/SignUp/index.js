import React, { useState, useEffect, useContext} from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet } from "react-native";
import { 
    Container,
    InputArea,
    CustomButton,
    CustomButtonText,
    SignMenssageBotton,
    SignMenssageBottonText,
    SignMenssageBottonTextBold,
    LoadingIcon,
    ScrollView,
} from '../Styles/styles';
import { UserContext } from '../../contexts/UserContext';
import Topo from '../../assets/topo.svg';
import EmailIcon from '../../assets/email.svg';
import LockIcom from '../../assets/lock.svg';
import PersonIcom from '../../assets/person.svg';
import CelularIcom from '../../assets/celular.svg';
import SignInput from '../../components/SignInput'
import AsyncStorage from  '@react-native-community/async-storage';

import Api from '../../Api'



export default () => {
    const { dispatch: userDispatch} = useContext(UserContext);
    const navigation = useNavigation();
    const [ nomeField, setNomeField ] = useState('');
    const [ emailField, setEmailField ] = useState('');
    const [ celularField, setCelularField ] = useState('');
    const [ advogadoField, setAdvogadoField ] = useState(false);
    const [ notAdvogadoField, setNotAdvogadoField ] = useState(true);
    const [ passwordField, setPasswordField ] = useState('');
    const [ loading, setLoading ] = useState(false);
    
    const handleMessageButtonClick = () => {
        navigation.reset({
            routes:[{name: 'Preload'}]
        });
    }
    const handleSignUPClick = async () => {
        await setLoading(true);
        await gravar();
    }
    gravar = async () => {
        if( nomeField != '' && emailField != '' && passwordField.length > 5 ){
            await Api.CadastrarAut(emailField, passwordField)
            .then((snapshot)=>{
                const uid = snapshot.user.uid;
                const avatar = 'https://firebasestorage.googleapis.com/v0/b/backpack-f5a42.appspot.com/o/logo%2Fpessoa.png?alt=media&token=5a6bb9fb-df65-4dcf-a1f4-d66ad16822ae';
                AsyncStorage.setItem('tokenUser', JSON.stringify(snapshot.user));
                userDispatch({
                    type: 'setAvatar',
                    payload:{
                        avatar: snapshot.user.photoURL                        
                        }
                });
                const favoritos = [];
                favoritos.push({key:"agr "+uid})
                Api.setUsuarioInfo(uid, nomeField, emailField, celularField, advogadoField, avatar, favoritos)
                .catch((error)=>{
                    alert(error)
                })
                return
            })
            .then(()=>{
                setLoading(false);
                navigation.reset({
                    routes:[{name: 'Preload'}]                })   
            }).catch((error)=>{
                setLoading(false);
                switch(error.code){
                    case 'auth/weak-password':
                        alert("Sua Senha deve conter pelo menos 6 caracteres!");
                    break;
                    case 'auth/email-already-in-use':
                        alert("Este e-mail ja esta cadastrado!");
                    break;
                    case 'auth/invalid-email':
                        alert("Este e-mail não e valido!");
                    break;
                    default:
                        alert("Error ao cadastrar usuario. Tente mais tarde! /n"+error );
                    break;    
                }
            })
        }else{
            alert('Senha ou E-mail invalida!')
            setLoading(false)
        } 
    }
    const maskTele = (telefone) => {
        if( telefone != null ){
            if(telefone == null){
                telefone = ''
            }
            if (telefone.length ==1){
                telefone = '('+telefone 
            }
            if (telefone.length ==3){
                telefone = telefone+') ' 
            }
            if (telefone.length ==9){
                telefone = telefone+'-' 
            }
            if (telefone.length ==15 && telefone.substring(4,5)==' '){
                telefone = telefone.substring (0,4)+ telefone.substring (5,9)+ telefone.substring(10,11)+'-'+ telefone.substring (11,16) 
            }
            if (telefone.length > 14){
                telefone = telefone.substring (0,14)
            }
        }
        return telefone
    }
    const setNotAdvogado = () => {
        setNotAdvogadoField(true);
        setAdvogadoField(false);

    }
    const setAdvogado =   () => {
        setAdvogadoField(true);
        setNotAdvogadoField(false);
    }

    return (
        <ScrollView>
            <Container>
                <Topo width="100%" height="232" /> 
                {loading && true ?
                        <LoadingIcon size= "large"  color/>
                    :
                        <InputArea>
                            <SignInput 
                                IconSvg={PersonIcom} 
                                placeholder="Informe seu nome"
                                value={nomeField}
                                onChangeText={t=>setNomeField(t)}
                            />
                            <SignInput 
                                IconSvg={CelularIcom} 
                                placeholder="Informe seu Celular"
                                value={maskTele(celularField)}
                                onChangeText={t=>setCelularField(t)}
                                mask="99/99/9999"
                            />
                            <SignInput 
                                IconSvg={EmailIcon} 
                                placeholder="Digite seu e-mail"
                                value={emailField}
                                onChangeText={t=>setEmailField(t)}
                            />
                            <SignInput 
                                IconSvg={LockIcom}
                                placeholder="Digite sua senha"
                                value={passwordField}
                                onChangeText={t=>setPasswordField(t)}
                                password={ true }
                            />
                            <CustomButton onPress={handleSignUPClick}>
                                <CustomButtonText>CADASTRAR</CustomButtonText>
                            </CustomButton> 
                        </InputArea>
                    }
                    <SignMenssageBotton onPress={handleMessageButtonClick}>
                        <SignMenssageBottonText>Já possui uma conta?</SignMenssageBottonText>
                        <SignMenssageBottonTextBold>Fazer Login!</SignMenssageBottonTextBold>
                    </SignMenssageBotton>
            </Container>
        </ScrollView>

    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    checkboxContainer: {
      flexDirection: "row",
      marginBottom: 20,
    },
    checkbox: {
      backgroundColor: "#ffffff",
      alignSelf: "center",
    },
    label: {
      margin: 8,
    },
  });