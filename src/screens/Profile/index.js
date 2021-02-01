import React, { useState, useEffect} from 'react';
import { Modal, Linking } from 'react-native';
import Swiper from 'react-native-swiper';
import { 
    ContainerTab,
    LoadingIcon,
    InputArea,
    BackButtom,
    InputAreaAvata,
    UserAvatar,
    InputAreaSenha,
    CustomButtonProf,
    CustomButtonTextProf,
    UserAvatarAlter,
    CustomButtonAlterAvata,
    CustomButtonProfSenha,
    AreaButtoms,
    InputAreaCamera,
    CustomButtonCamaGale,
    ScrollPerfil,
    FekeSwiper,
    PageBody,
    InfoPerfil,
    UserInfoContato,
    AtuacaoArea,
    FekeArea,
    DeporimentosArea,
    SwiperDot,
    SwipeDotActive,
    SwipeItem,
    SwipeImage,
    UserInfo,
    UserInfoNome,
    InputAreaPerfil,
    UserInfoLogra,
    InfoContato,
    UserInfoObs,
    AtuacaoTitulo,
    AtuacaoItem,
    AtuacaoTituloArea,
    AtuacaoItemText,
    AtuacaoItems,
    DeporimentoItem,
    DeporimentoInfo,
    DeporimentoItemNome,
    DeporimentoItemTex,
    DepoimentoTitulo,
    UserInfoAreaRedeSocial,
    CustomButtonRedeSocial,
    UserInfoDepoimento,
    CustomButtonDepoimento,
    UserInfoAreaDepoimento,
    InputAreaAvataPerfil
} from '../Styles/styles';
import Api from '../../Api'
import { useNavigation, useRoute } from '@react-navigation/native';
import BackIcon from '../../assets/back.svg'
import SignInput from '../../components/SignInput'
import LockIcom from '../../assets/lock.svg';
import IconSvgAvatar from '../../assets/camera.svg'
import AsyncStorage from  '@react-native-community/async-storage';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import RNFFetchBlob from 'react-native-fetch-blob'
import Stars from  '../../components/Stars';
import NavPrevIcon from '../../assets/nav_prev.svg'
import NavNextIcon from '../../assets/nav_next.svg'
import WhatsappIcon from '../../assets/whatsapp.svg'
import LinkedinIcon from '../../assets/linkedin.svg'
import FaceIcon from '../../assets/face.svg'
import InstaIcon from '../../assets/insta.svg'
import TelefoneIcon from '../../assets/telefone.svg'
import EmailIcon from '../../assets/email.svg';
import SiteIcon from '../../assets/site.svg'
import DepoimentoIcon from '../../assets/depoimento.svg'
window.XMLHttpRequest = RNFFetchBlob.polyfill.XMLHttpRequest;
window.Blob = RNFFetchBlob.polyfill.Blob;


export default () => {
    const [ modalVisible, setModalVisible ] = useState(false);
    const [ refr, setRefr ] = useState(false);
    const navigation = useNavigation();
    const [ loading, setLoading ] = useState(true);
    const [ passwordField, setPasswordField ] = useState('');
    const [ passwordFieldNova, setPasswordFieldNova ] = useState('');
    const [ passwordFieldConfirma, setPasswordFieldConfirma ] = useState('');
    const [ modalGaleria, setModalGaleria ] = useState(false);

    const route = useRoute();
    const [ userInfo, setUseInfo ] = useState({ });
    const [ estrela, setEstrela ] = useState()
    const [ key, setKey ] = useState('');
    const [ atuacao, setAtuacao ] = useState([]);
    const [ depoimento, setDepoimento ] = useState([]);
    const [ foto, setFoto ] = useState([]);    
    const options = {
        title: 'Selecionar Imagem!',
        storageOptions: {
          skipBackup: true,
          path: 'images',
          saveToPhotos: true,
        },
    };
    useEffect(()=>{
        getPerfil();        
    }, [])

    const getPerfil = async () => {
        setLoading(true);
        const token = await AsyncStorage.getItem('tokenUser');
        const user = JSON.parse(token);
        setKey(user.uid);
        console.log(user.uid)        
        await Api.getAdvogado(user.uid).then((snapshot)=>{
            setUseInfo(snapshot.val())
            setAtuacao(snapshot.val().atuacao)
            setDepoimento(snapshot.val().depoimento)

            let cont =0;
            let est = 0;
            let estrela = 0;
            if(snapshot.val().depoimento){
                snapshot.val().depoimento.forEach((dep)=>{
                    cont ++
                    est = est+dep.estrela
                });
                estrela = (Math.trunc(est/cont));
                let resto = ((est%cont)/cont)
                if(resto < 0.25){
                    resto = 0;
                }else{
                    if(resto >0.24 && resto < 0.75 ){
                        resto = 0.5;
                    }else{
                        resto = 0;
                        estrela ++;
                    }
                }
                estrela = estrela + resto;
                setEstrela(estrela);
            }                
            let addLista = [];
            let addLista1 = [];
            snapshot.val().foto.forEach((childItem)=>{
                if(childItem.url_imagem){
                    addLista.push({url_imagem:childItem.url_imagem});
                }else{
                    addLista1.push({url_imagem:childItem});
                }
            })

            if(addLista.length > 0){
                setFoto(addLista);
            }else{
                setFoto(addLista1);
            }
            return
        })
        .then(()=>{
            console.log('fim') 
        })
        .catch((error)=>{ 
            alert("Nenhum Advogado encontrado!");
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
                    getPerfil();
                })
            })
        }
    }
    const handleSenhaClick = () => {
        setModalVisible(true);
    }
    const handleSenhaSalvarClick = async () => {
        if(passwordFieldNova.length > 5 && passwordFieldNova == passwordFieldConfirma) {
            Api.login(userInfo.email, passwordField)
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




    const hendleBackButtom = () => {
        navigation.goBack();
    };
    const hendleBackButtomFace = () =>{
        Linking.canOpenURL("fb://facewebmodal/f?"+userInfo.face).then (supported => { 
            if (supported) { 
              return Linking.openURL ("fb://facewebmodal/f?"+userInfo.face); 
            } else { 
              return Linking.openURL (userInfo.face); 
            } 
          }) 
        
    }
    const hendleBackButtomInsta = () =>{
        Linking.openURL (userInfo.insta); 
    }

    const hendleBackButtomWatsapp = () => {
        const what = userInfo.celular.replace(/([^\d])+/gim, '');
        Linking.canOpenURL ("whatsapp: // send? Text = oi") .then (supported => { 
            if (supported) { 
              return Linking.openURL ("whatsapp: // send? phone = 55"+what+" & text = Oi"); 
            } else { 
              return Linking.openURL ("https://api.whatsapp.com/send?phone=55"+what+"&text=Oi"); 
            } 
        }) 
    }
    const hendleBackButtomLinkedin = () => {
        Linking.openURL (userInfo.linkedin); 
    }
    const hendleBackButtomTelefone = () => {
        Linking.openURL('tel:'+userInfo.telefone);
    }
    const hendleBackButtomMail = () => {
        Linking.openURL('mailto:'+userInfo.email+'?subject=Contado Back Pack Guia=body');
    }
    const hendleBackButtomSite = () => {
        Linking.canOpenURL (userInfo.site) .then (supported => { 
            if (supported) { 
                Linking.openURL (userInfo.site); 
            }else{
                Linking.openURL ("https://"+userInfo.site);
            }
        })
    }
    const hendleBackButtomDepoimento = () => {
        navigation.navigate('Appointments', {key: key}); 
    }

    return (
        <ContainerTab>
            {loading && true ?
                <LoadingIcon size="large" color="#000000" />
            :
                <InputAreaPerfil>
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
                    <ScrollPerfil>
                        <BackButtom onPress={hendleBackButtom}>
                            <BackIcon width="44" height="44" fill="#000000" />
                        </BackButtom>
                        {foto && foto.length > 0 ?
                            <Swiper
                                style={{height: 240}}
                                dot={<SwiperDot />}
                                activeDot={< SwipeDotActive/>}
                                paginationStyle={{top:15, right:15, bottom: null, left: null}}
                                autoplay={true}
                            >
                                {foto.map((item, k)=>(
                                    <SwipeItem key={k} data={item} >
                                        {item.url_imagem &&
                                            <SwipeImage source={{uri:item.url_imagem}} />
                                        }
                                    </SwipeItem>
                                ))}
                            </Swiper>
                            :
                            <FekeSwiper></FekeSwiper>
                        }
                        <PageBody>
                            <InfoPerfil>
                                <InputAreaAvataPerfil>
                                    <UserAvatar source={{uri:userInfo.avatar}} />
                                    <UserAvatarAlter>
                                        <CustomButtonAlterAvata onPress={handleAlterAvataClick}>
                                            <IconSvgAvatar width="20" height="20" fill="#000" />
                                        </CustomButtonAlterAvata>
                                    </UserAvatarAlter>
                                 </InputAreaAvataPerfil>
                                <UserInfo>
                                    <UserInfoNome>{userInfo.nome}</UserInfoNome>
                                    <UserInfoLogra>{"CADASTUR: "+userInfo.oab}</UserInfoLogra>
                                    <Stars stars={estrela} showNuber={true} />
                                </UserInfo>

                            </InfoPerfil>
                            <InfoContato>   
                                <UserInfoContato>
                                    <UserInfoLogra>{userInfo.logradoro+' '+userInfo.numero}</UserInfoLogra>
                                    {userInfo.complemento ?
                                        <UserInfoLogra>{userInfo.complemento+"   "+userInfo.cidade+'/'+userInfo.uf}</UserInfoLogra>
                                        :
                                        <UserInfoLogra>{userInfo.cidade+'/'+userInfo.uf}</UserInfoLogra>
                                    }
                                    {userInfo.linkedin ?
                                        <UserInfoAreaRedeSocial>
                                            <CustomButtonRedeSocial  onPress={hendleBackButtomLinkedin}>
                                                <LinkedinIcon width="20" height="20" fill="#000000" />
                                                <UserInfoLogra>{userInfo.linkedin}</UserInfoLogra>
                                            </CustomButtonRedeSocial>
                                        </UserInfoAreaRedeSocial>
                                    :
                                        <FekeArea/>
                                    }
                                    {userInfo.face ?
                                        <UserInfoAreaRedeSocial>
                                            <CustomButtonRedeSocial  onPress={hendleBackButtomFace}>
                                                <FaceIcon width="20" height="20" fill="#000000" />
                                                <UserInfoLogra>{userInfo.face}</UserInfoLogra>
                                            </CustomButtonRedeSocial>
                                        </UserInfoAreaRedeSocial>
                                    :
                                        <FekeArea/>
                                    }
                                    {userInfo.insta ?
                                        <UserInfoAreaRedeSocial>
                                            <CustomButtonRedeSocial onPress={hendleBackButtomInsta}>
                                                <InstaIcon width="20" height="20" fill="#000000" />  
                                                <UserInfoLogra>{userInfo.insta}</UserInfoLogra>
                                            </CustomButtonRedeSocial>                                      
                                        </UserInfoAreaRedeSocial>
                                    :
                                        <FekeArea/>
                                    }
                                    <UserInfoAreaRedeSocial>
                                        <CustomButtonRedeSocial onPress={hendleBackButtomWatsapp}>
                                            <WhatsappIcon width="20" height="20" fill="#000000" />
                                            <UserInfoLogra>{userInfo.celular}</UserInfoLogra>
                                        </CustomButtonRedeSocial>
                                    </UserInfoAreaRedeSocial>
                                    <UserInfoAreaRedeSocial>
                                        <CustomButtonRedeSocial onPress={hendleBackButtomTelefone}>
                                            <TelefoneIcon width="20" height="20" fill="#000000" />
                                            <UserInfoLogra>{userInfo.telefone+"   "}</UserInfoLogra>
                                        </CustomButtonRedeSocial>
                                    </UserInfoAreaRedeSocial>
                                    {userInfo.email ?
                                        <UserInfoAreaRedeSocial>
                                            <CustomButtonRedeSocial onPress={hendleBackButtomMail}>
                                                <EmailIcon width="20" height="20" fill="#000000" />
                                                <UserInfoLogra>{userInfo.email}</UserInfoLogra>
                                            </CustomButtonRedeSocial>
                                        </UserInfoAreaRedeSocial>
                                        :
                                        <FekeArea/>
                                    }
                                    {userInfo.site ?
                                        <UserInfoAreaRedeSocial>
                                            <CustomButtonRedeSocial onPress={hendleBackButtomSite}>
                                                <SiteIcon width="20" height="20" fill="#000000" />
                                                <UserInfoLogra>{userInfo.site}</UserInfoLogra>
                                            </CustomButtonRedeSocial>
                                        </UserInfoAreaRedeSocial>
                                    :
                                        <FekeArea/>
                                    }
                                    {userInfo.obs ?
                                        <UserInfoObs>{"Observação: "+userInfo.obs}</UserInfoObs>
                                        :
                                        <FekeArea/>
                                    }
                                </UserInfoContato>
                            </InfoContato>
                            {atuacao && atuacao.length > 0 ?
                                <AtuacaoArea>
                                    <AtuacaoTituloArea>
                                        <AtuacaoTitulo>Tipo de Turismo</AtuacaoTitulo>
                                    </AtuacaoTituloArea>
                                    <AtuacaoItems>
                                        {atuacao.map((item, k)=>(
                                            <AtuacaoItem key={k} data={item} >
                                                <AtuacaoItemText>{item}</AtuacaoItemText>
                                            </AtuacaoItem>
                                        ))}
                                    </AtuacaoItems>

                                </AtuacaoArea>
                                :
                                <FekeArea></FekeArea>
                            }
                            {depoimento && depoimento.length > 0 ?
                                <DeporimentosArea>
                                    <Swiper
                                        style={{height: 170}}
                                        showsPagination={false}
                                        showsButtons={true}
                                        prevButton={<NavPrevIcon width="35" height="35" fill="#000000" />}
                                        nextButton={<NavNextIcon width="35" height="35" fill="#000000" />}
                                    >
                                        {depoimento.map((item, k)=>(
                                        <DeporimentoItem key={k} data={item} >
                                            <DepoimentoTitulo>Depoimentos de Clientes</DepoimentoTitulo>
                                            <DeporimentoInfo>
                                                <DeporimentoItemNome>{item.nomeUser}</DeporimentoItemNome>
                                                <Stars stars={item.estrela} showNuber={false} />
                                            </DeporimentoInfo>
                                            <DeporimentoItemTex>{item.desc}</DeporimentoItemTex>
                                        </DeporimentoItem>
                                        ))}                                
                                    </Swiper>
                                
                                </DeporimentosArea>
                                :
                                <FekeArea></FekeArea>
                            }
                        </PageBody>
                        <AreaButtoms>
                            <InputAreaSenha>
                                <CustomButtonProf onPress={handleSenhaClick}>
                                    <CustomButtonTextProf>Altera Senha</CustomButtonTextProf>
                                </CustomButtonProf>
                                <CustomButtonProf onPress={handleLogoutClick} >
                                    <CustomButtonTextProf>Desconectar</CustomButtonTextProf>
                                </CustomButtonProf>                
                            </InputAreaSenha>
                            <InputAreaSenha>
                                <CustomButtonProf  onPress={handleAdvogadoClick}>
                                    <CustomButtonTextProf>Editar Guia</CustomButtonTextProf>
                                </CustomButtonProf>                
                            </InputAreaSenha>
                        </AreaButtoms>
                    </ScrollPerfil>
                </InputAreaPerfil>
            }
        </ContainerTab>
    );
}