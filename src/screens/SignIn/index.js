import React, { useState, useEffect, useContext} from 'react';
import { useNavigation } from '@react-navigation/native';
import { 
    Container,
    InputArea,
    CustomButton,
    CustomButtonText,
    SignMenssageBotton,
    SignMenssageBottonText,
    SignMenssageBottonTextBold,
    LoadingIcon,
    ScrollView

} from '../Styles/styles';
import { UserContext } from '../../contexts/UserContext';
import Topo from '../../assets/topo.svg';
import EmailIcon from '../../assets/email.svg';
import LockIcom from '../../assets/lock.svg';
import SignInput from '../../components/SignInput'
import Api from '../../Api'
import { Alert } from 'react-native';
import AsyncStorage from  '@react-native-community/async-storage';

export default () => {
    const { dispatch: userDispatch} = useContext(UserContext);    
    const navigation = useNavigation();
    const [ emailField, setEmailField ] = useState('');
    const [ passwordField, setPasswordField ] = useState('');
    const [ loading, setLoading ] = useState(false);
    const [ loadingNot, setLoadingNot ] = useState(true);



    const handleMessageButtonClick = () => {
        navigation.reset({
            routes:[{name: 'SignUp'}]
        });
    }
    const handleSignClick =  () => {
        setLoading(true)
        setLoadingNot(false)
        if(emailField != '' && passwordField.length > 5){
            Api.login(emailField, passwordField).then((snapshot)=>{
                Api.addAuthListener((user)=>{
                    if(user){
                        Api.getUsuario(JSON.stringify(user.uid)).then((snapshot)=>{ });
                        AsyncStorage.setItem('tokenUser', JSON.stringify(user));
                        userDispatch({
                            type: 'setAvatar',
                            payload:{
                                avatar: user.photoURL
                            }
                        });
                        setLoading(false)
                        setLoadingNot(true)
                        navigation.reset({
                            routes:[{name: 'MainTab'}]
                        }); 
                    }                        
                });        
            })
            .catch((error)=>{
                setLoading(false)
                setLoadingNot(true)
                alert("Erro ao logar. Por favor verifique seus dados!");
            });
        }else {
            setLoadingNot(true)
            setLoading(false)
            Alert('Senha ou E-mail invalida!')
        }
    }
    return (
        <Container>
            <ScrollView>
                <Topo width="100%" height="232" /> 
                {loading &&
                    <LoadingIcon size= "large"  color/>
                }
                {loadingNot &&
                    <InputArea>
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

                        <CustomButton onPress={handleSignClick}>
                            <CustomButtonText>LOGIN</CustomButtonText>
                        </CustomButton>
                    </InputArea>
                }
                {loadingNot &&
                    <SignMenssageBotton onPress={handleMessageButtonClick}>
                        <SignMenssageBottonText>Ainda não possui uma conta?</SignMenssageBottonText>
                        <SignMenssageBottonTextBold>Cadastre-se aqui!</SignMenssageBottonTextBold>
                    </SignMenssageBotton>
                }
                </ScrollView>
        </Container>
        );
    
}