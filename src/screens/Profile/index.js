import React, { useState, useEffect} from 'react';
import { Modal, Switch } from 'react-native';
import { 
    ContainerTab,
    LoadingIcon,
    InputArea,
    BackButtom,
    Titulo,
    InputAreaAvata,
    UserAvatar,
    CustomButton,
    CustomButtonText,
    InputAreaSenha,
    CustomButtonProf,
    CustomButtonTextProf,
    UserAvatarAlter,
    CustomButtonAlterAvata,
    CustomButtonProfSenha,
    AreaButtoms,
    InputAreaSwitch,
    InputAreaSwitchText,
    InputAreaCamera,
    CustomButtonCamaGale
} from '../Styles/styles';
import Api from '../../Api'
import { useNavigation } from '@react-navigation/native';
import BackIcon from '../../assets/back.svg'
import SignInput from '../../components/SignInput'
import LockIcom from '../../assets/lock.svg';
import PersonIcom from '../../assets/person.svg';
import CelularIcom from '../../assets/celular.svg';
import IconSvgAvatar from '../../assets/camera.svg'
import AsyncStorage from  '@react-native-community/async-storage';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import RNFFetchBlob from 'react-native-fetch-blob'
window.XMLHttpRequest = RNFFetchBlob.polyfill.XMLHttpRequest;
window.Blob = RNFFetchBlob.polyfill.Blob;

export default () => {
    const [ modalVisible, setModalVisible ] = useState(false);
    const [ refr, setRefr ] = useState(false);
    const navigation = useNavigation();
    const [ loading, setLoading ] = useState(false);
    const [ nomeField, setNomeField ] = useState('');
    const [ emailField, setEmailField ] = useState('');
    const [ telefoneField, setTelefoneField ] = useState('');
    const [ advogado, setAdvogado ] = useState(false);
    const [ avatar, setAvatar ] = useState('https://firebasestorage.googleapis.com/v0/b/backpack-f5a42.appspot.com/o/logo%2Fpessoa.png');
    const [ passwordField, setPasswordField ] = useState('');
    const [ passwordFieldNova, setPasswordFieldNova ] = useState('');
    const [ passwordFieldConfirma, setPasswordFieldConfirma ] = useState('');
    const [ modalGaleria, setModalGaleria ] = useState(false);
    const options = {
        title: 'Selecionar Imagem!',
        storageOptions: {
          skipBackup: true,
          path: 'images',
          saveToPhotos: true,
        },
    };
    useEffect(()=>{
        getUsuario();
    }, [refr]);

    useEffect(()=>{
        handleClick();
    }, [advogado]);

    const getUsuario = async () =>{
        setLoading(true);
        const token = await AsyncStorage.getItem('tokenUser');
        const user = JSON.parse(token);
        const uid = user.uid;
        await Api.getUsuario(uid).then((snapshot)=>{
            setNomeField(snapshot.val().nome);
            setEmailField(snapshot.val().mail);
            setTelefoneField(snapshot.val().telefone);
            setAdvogado(snapshot.val().advogado);
            setAvatar(snapshot.val().avatar);
        }).catch((error)=>{ 
            alert(error);
        });
        setLoading(false);
    }

    const handleLogoutClick = ()  => {
        Api.logout();
        navigation.reset({
            routes:[{name:'SignIn'}]
        }); 
    }
    const handleAdvogadoClick = ()  => {
        navigation.navigate('Advogado'); 
    }
    const hendleBackButtom = () => {
        navigation.goBack();
    };
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

    const handleClick = async () => {
    
        setLoading(true);
        if(telefoneField.length > 0 && nomeField.length > 0)
        {
            const token = await AsyncStorage.getItem('tokenUser');
            const user = JSON.parse(token);
            const uid = user.uid;
            await Api.setUserAtu(telefoneField, nomeField, advogado, uid)
        }
        setLoading(false);

    }
    const toggleSwitch =  () => {
        setAdvogado(previousState => !previousState)
    }


    const pegarImagem = async (galeria) => {
        const token = await AsyncStorage.getItem('tokenUser');
        const user = JSON.parse(token);
        const uid = user.uid;
        if(galeria == true){
            launchImageLibrary(options, (response) => {
                enviaImagem (response, uid);
            })
        }else{
            launchCamera(options, (response) => {
                enviaImagem (response, uid);
            })
        }
    }    

    const enviaImagem = (response, uid) => {
        if (response.didCancel) {
            console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        } else {
            setLoading(true);
            const source = { uri: response.uri  };       
            let uri = source.uri.replace('file://', '');
            let mime = 'image/jpeg';
            let nomeImage = 'imagem.jpg'
            let letras = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz';
            let aleatorio = '';
            for (var i = 0; i < 33; i++) {
                var rnum = Math.floor(Math.random() * letras.length);
                    aleatorio += letras.substring(rnum, rnum + 1);
            }
            nomeImage = aleatorio+'.jpg';
            RNFFetchBlob.fs.readFile(uri, 'base64')
            .then((data) =>{
                return RNFFetchBlob.polyfill.Blob.build(data, { type:mime+';BASE64'})
            })
            .then((blob) =>{
                uploadBlob = blob;
                Api.setAvatar(nomeImage, blob, mime, uid).then(function() {
                    getUsuario();
                })
            })
        }
    }
    const handleSenhaClick = () => {
        setModalVisible(true);
    }
    const handleSenhaSalvarClick = async () => {
        if(passwordFieldNova.length > 5 && passwordFieldNova == passwordFieldConfirma) {
            Api.login(emailField, passwordField)
            .then((snapshot)=>{
                Api.setAlterarSenha(passwordFieldNova)
                .then(function() {
                    alert ("Senha Alterada com Sucesso!");
                    setPasswordField('');
                    setPasswordFieldConfirma('');
                    setPasswordFieldNova('');
                    setModalVisible(false);
                }).catch((error)=>{
                    alert("Erro ao logar Alterar Senha.");
                });    
            }).catch((error)=>{
                alert("Erro ao logar. Por favor verifique seus dados!");
            });
        }else{
            if(passwordFieldNova.length < 6){
                alert("A Senha teve conter 6 ou mais caracteres. "+passwordFieldNova.length);
            }else{
                alert("A Senha diferente da confirmada.");
            }   

        }        
    }
    const handleAlterAvataClick = async () => {
        setModalGaleria(true)
    }
    const handleGaleriaClick = async () => {
        setModalGaleria(false)        
        setLoading(true)
        await pegarImagem(true);
        setLoading(false)
    }
    const handleCameraClick = async () => {
        setModalGaleria(false)
        setLoading(true)
        await pegarImagem(false);
        setLoading(false)
    }
    
    const handleLogoutClickCancelar = () => {
        setModalVisible(false);
    }
    return (
        <ContainerTab>
            {loading && true ?
                <LoadingIcon size="large" color="#000000" />
            :
                <InputArea>
                    <Modal
                        visible = {modalVisible}
                        animationType = "slide"                     
                    >
                        <InputArea>
                            <SignInput 
                                IconSvg={LockIcom}
                                placeholder="Digite a senha Atual"
                                value={passwordField}
                                onChangeText={t=>setPasswordField(t)}
                                password={ true }
                            />
                            <SignInput 
                                IconSvg={LockIcom}
                                placeholder="Digite a Nova senha"
                                value={passwordFieldNova}
                                onChangeText={t=>setPasswordFieldNova(t)}
                                password={ true }
                            />
                            <SignInput 
                                IconSvg={LockIcom}
                                placeholder="Repita a Nova senha"
                                value={passwordFieldConfirma}
                                onChangeText={t=>setPasswordFieldConfirma(t)}
                                password={ true }
                            />
                            <InputAreaSenha>
                                <CustomButtonProfSenha onPress={handleSenhaSalvarClick}>
                                    <CustomButtonTextProf>Alterar Senha</CustomButtonTextProf>
                                </CustomButtonProfSenha>
                                <CustomButtonProfSenha onPress={handleLogoutClickCancelar} >
                                    <CustomButtonTextProf>Cancelar</CustomButtonTextProf>
                                </CustomButtonProfSenha>                
                            </InputAreaSenha>
                        </InputArea>
                    </Modal>
                    <Modal
                        visible = {modalGaleria}
                        animationType = "slide"                     
                    >
                        <InputArea>
                            <InputAreaCamera>
                                <CustomButtonTextProf>Escolha Galeria ou Foto</CustomButtonTextProf>
                                <InputAreaSenha>
                                    <CustomButtonCamaGale onPress={handleGaleriaClick}>
                                        <CustomButtonTextProf>Galeria</CustomButtonTextProf>    
                                    </CustomButtonCamaGale>
                                    <CustomButtonCamaGale onPress={handleCameraClick}>
                                        <CustomButtonTextProf>Foto</CustomButtonTextProf>    
                                    </CustomButtonCamaGale>
                                </InputAreaSenha>
                            </InputAreaCamera>
                        </InputArea>
                    </Modal>
                    <BackButtom onPress={hendleBackButtom}>
                        <BackIcon width="44" height="44" fill="#000000" />
                    </BackButtom>
                    <Titulo>Cadastro de Usuario</Titulo>
                    <InputAreaAvata>
                        <UserAvatar source={{uri:avatar}} />
                        <UserAvatarAlter>
                            <CustomButtonAlterAvata onPress={handleAlterAvataClick}>
                                <IconSvgAvatar width="20" height="20" fill="#000" />
                            </CustomButtonAlterAvata>
                        </UserAvatarAlter>
                    </InputAreaAvata>
                    <SignInput 
                        IconSvg={PersonIcom} 
                        placeholder="Informe seu nome"
                        value={nomeField}
                        onChangeText={t=>setNomeField(t)}
                    />
                    <SignInput 
                        IconSvg={CelularIcom} 
                        placeholder="Informe seu Celular"
                        value={maskTele(telefoneField)}
                        onChangeText={t=>setTelefoneField(t)}
                        mask="99/99/9999"
                    />
                    <InputAreaSwitch>
                        <InputAreaSwitchText>Você Guia Turistico?</InputAreaSwitchText>
                        <Switch
                            trackColor={{ false: "#767577", true: "#FF9B29" }}
                            thumbColor={advogado ? "#f4f3f4" : "#3D4140" }
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleSwitch}
                            value={advogado}
                        />
                    </InputAreaSwitch>
                    <CustomButton onPress={handleClick}>
                        <CustomButtonText>Atualizar</CustomButtonText>
                    </CustomButton> 
                    <AreaButtoms>

                        <InputAreaSenha>
                            <CustomButtonProf onPress={handleSenhaClick}>
                                <CustomButtonTextProf>Altera Senha</CustomButtonTextProf>
                            </CustomButtonProf>
                            <CustomButtonProf onPress={handleLogoutClick} >
                                <CustomButtonTextProf>Desconectar</CustomButtonTextProf>
                            </CustomButtonProf>                
                        </InputAreaSenha>
                        {advogado &&
                            <InputAreaSenha>
                                <CustomButtonProf  onPress={handleAdvogadoClick}>
                                    <CustomButtonTextProf>Editar Guia</CustomButtonTextProf>
                                </CustomButtonProf>                
                            </InputAreaSenha>
                        }
                    </AreaButtoms>

                </InputArea>
            }




        </ContainerTab>
    );
}