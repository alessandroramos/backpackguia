import React, { useState, useEffect} from 'react';
import { Modal, Text } from "react-native";
import { 
    ContainerTab,
    BackButtom,
    InputArea,
    Titulo,
    AtuacaoCheckBoxView,
    AtuacaoCheckBoxTextTitulo,
    AtuacaoCheckBoxTextTituloVire,
    CustomButton,
    CustomButtonText,
    SwipeImage,
    ImagemViem,
    ImagemViemImage,
    ScrollView,
    LoadingIcon,
    ImagemViemImageButton,
    InputAreaCamera,
    CustomButtonCamaGale,
    CustomButtonTextProf,
    InputAreaSenha
} from '../Styles/styles';
import AsyncStorage from  '@react-native-community/async-storage';
import Api from '../../Api'
import { useNavigation } from '@react-navigation/native';
import BackIcon from '../../assets/back.svg'
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

import RNFFetchBlob from 'react-native-fetch-blob'
window.XMLHttpRequest = RNFFetchBlob.polyfill.XMLHttpRequest;
window.Blob = RNFFetchBlob.polyfill.Blob
export default () => {
    const navigation = useNavigation();
    const [ refre, setRefre ] = useState(false);
    const [ loading, setLoading ] = useState(false);
    const [ avatarSource, setAvatarSource ] = useState();
    const [ foto, setFoto ] = useState([]);
    const [ modalGaleria, setModalGaleria ] = useState(false);
    useEffect(()=>{
        getAdvogados();

    }, [refre])
    const getAdvogados = async () => {
        setLoading(true);
        const token = await AsyncStorage.getItem('tokenUser');
        const user = JSON.parse(token);
        const uid = user.uid;
        await Api.getAdvogadoFoto(uid).then((snapshot)=>{
            setFoto([]);
            if(snapshot.val().foto){
                const fotos = snapshot.val().foto;
                let addLista = [];
                fotos.forEach((childItem)=>{
                    if(childItem.url_imagem){
                        addLista.push(childItem.url_imagem);
                    }
                })
                setFoto(addLista);
            }
        }).catch((error)=>{ 
            alert(error);
        });
        setLoading(false);
    }
    const options = {
        title: 'Selecionar Imagem!',
        storageOptions: {
          skipBackup: true,
          path: 'images',
        },
    };
    const pegarImagem = async (galeria) => {
        const token = await AsyncStorage.getItem('tokenUser');
        const user = JSON.parse(token);
        const uid = user.uid;
        if(galeria ==true){
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
                Api.setImageStorage(nomeImage, blob, mime, uid).then(function() {
                    getAdvogados();
                }) 
            })
        }
    };

    const hendleBackButtom = () => {
        navigation.goBack();
    };

    const handleSignClick = async () => {
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

    const handleImagemClick = async (key) => {
        setLoading(true)
        foto.splice(key, 1);
        const token = await AsyncStorage.getItem('tokenUser');
        const user = JSON.parse(token);
        const uid = user.uid;
        Api.deleteImageStorage( foto, uid)
        .then(function() {
            getAdvogados();
            setLoading(false)
        }) 
        .catch((error)=>{ 
            alert(error);
            setLoading(false)
        });
    }
    return (
        <ScrollView>
            <ContainerTab>
                <BackButtom onPress={hendleBackButtom}>
                    <BackIcon width="44" height="44" fill="#000000" />
                </BackButtom>
                {loading && true ?
                    <LoadingIcon size="large" color="#000000" />
                :
                    <InputArea>
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
                        <Titulo>Cadastro de Guia </Titulo>                
                        <AtuacaoCheckBoxView>
                            <AtuacaoCheckBoxTextTituloVire>
                                <AtuacaoCheckBoxTextTitulo>Imagens</AtuacaoCheckBoxTextTitulo>
                            </AtuacaoCheckBoxTextTituloVire>
                            <ImagemViem>
                                {foto.map((item, k)=>(
                                    <ImagemViemImage key={k} data={item} >
                                        <ImagemViemImageButton onPress={()=>handleImagemClick(k)}>
                                            <SwipeImage source={{uri:item}} />
                                        </ImagemViemImageButton>
                                    </ImagemViemImage>
                                ))}
                            </ImagemViem>
                        </AtuacaoCheckBoxView>
                        <CustomButton onPress={handleSignClick}>
                            <CustomButtonText>Carrega Imagem</CustomButtonText>
                        </CustomButton> 
                    </InputArea>
                }
            </ContainerTab>
        </ScrollView>
    );
}

//                                 


