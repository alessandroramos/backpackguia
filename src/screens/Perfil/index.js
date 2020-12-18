import React, { useState, useEffect } from 'react';
import { 
    Textv, 
    Linking 
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Swiper from 'react-native-swiper';
import { 
    ContainerPerfil, 
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
    UserAvatar,
    UserInfo,
    UserInfoNome,
    UserFavButton,
    UserInfoLogra,
    InfoContato,
    UserInfoObs,
    BackButtom,
    LoadingIcon,
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
    UserInfoAreaDepoimento
} from '../Styles/styles';
import Stars from  '../../components/Stars';
import FavoriteIcom from '../../assets/favorite.svg'
import FavoriteFullIcom from '../../assets/favorite_full.svg'
import BackIcon from '../../assets/back.svg'
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
import Api from '../../Api'
import AsyncStorage from  '@react-native-community/async-storage';

export default () => {
    const navigation = useNavigation();
    const route = useRoute();
    const [ userInfo, setUseInfo ] = useState({
        key:route.params.key,
        nome: 'route.params.nome',
        estrela: route.params.estrela,
        avatar: route.params.avatar
    });
    const [ estrela, setEstrela ] = useState(route.params.estrela)
    const [ key, setKey ] = useState(route.params.key);
    const [ loading, setLoading ] = useState(false);
    const [ favor, setFavor ] = useState(false);
    const [ atuacao, setAtuacao ] = useState([]);
    const [ depoimento, setDepoimento ] = useState([]);
    const [ foto, setFoto ] = useState([]);
    useEffect(()=>{
        const getPerfil = async () => {
            setLoading(true);
            const token = await AsyncStorage.getItem('tokenUser');
            const user = JSON.parse(token);
            const uid = user.uid;        
            await Api.getAdvogado(key).then((snapshot)=>{
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
                Api.getUsuario(uid).then((snapsho)=>{
                    setFavor(false);
                    if(snapsho.val().favoritos){
                        snapsho.val().favoritos.forEach((childItem)=>{
                            if(childItem.key == key){
                                setFavor(true);
                            };
                        })
                    }
                })
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
            })
            .catch((error)=>{ 
                alert("Nenhum Advogado encontrado!");
            });
            setLoading(false);
        }
        getPerfil();
        
    }, [])
    const hendleBackButtom = () => {
        navigation.goBack();
    };
    const hendleFavButtom = async () => {
        const token = await AsyncStorage.getItem('tokenUser');
        const user = JSON.parse(token);
        const uid = user.uid;
        const favoritos = [];
        await Api.getUsuario(uid).then((snapshot)=>{
            let existe = false;
            if(snapshot.val().favoritos){
                snapshot.val().favoritos.forEach((childItem)=>{
                    if(childItem.key == key){
                        existe = true;
                    }else{
                        favoritos.push({key:childItem.key})
                    };
                })
            }
            if(existe){
                setFavor(false)
            }else{
                favoritos.push({key})
                setFavor(true)
            }

        })
        Api.setUserFav(uid, favoritos)


    }

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
        <ContainerPerfil>
            {loading && true ?
                <LoadingIcon size="large" color="#000000" />
            :
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
                            <UserAvatar source={{uri:userInfo.avatar}} />
                            <UserInfo>
                                <UserInfoNome>{userInfo.nome}</UserInfoNome>
                                <UserInfoLogra>{"CADASTUR: "+userInfo.oab}</UserInfoLogra>
                                <Stars stars={estrela} showNuber={true} />
                            </UserInfo>
                            <UserFavButton onPress={hendleFavButtom}>
                                {favor == false ?
                                    <FavoriteIcom width="24" height="24" fill="#ff0000" />
                                :
                                    <FavoriteFullIcom width="24" height="24" fill="#ff0000" />
                                }
                            </UserFavButton>
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
                        <UserInfoAreaDepoimento>
                            <CustomButtonDepoimento onPress={hendleBackButtomDepoimento}>
                                        <DepoimentoIcon width="30" height="30" fill="#FF9B29" />
                                <UserInfoDepoimento>Deixe seu Depoimento</UserInfoDepoimento>
                            </CustomButtonDepoimento>
                        </UserInfoAreaDepoimento>

                    </PageBody>
                </ScrollPerfil>
            }
        </ContainerPerfil>
    );
}