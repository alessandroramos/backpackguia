import React, { useState, useEffect } from 'react';
import { Text, alert } from 'react-native';
import { 
    ContainerPerfil, 
    ScrollPerfil,
    PageBodyDepoi,
    InfoPerfilDepoi,
    UserInfoDepoi,
    UserInfoNome,
    BackButtom,
    LoadingIcon,
    Titulo,
    InputAreaAvata,
    UserAvatar,
    CustomButton,
    CustomButtonText,
    StarArea,
    StarView,
    Startext,
    StarButton   
} from '../Styles/styles'
import { useNavigation, useRoute } from '@react-navigation/native'
import AsyncStorage from  '@react-native-community/async-storage'
import Api from '../../Api'
import BackIcon from '../../assets/back.svg'
import CasaIcon from '../../assets/placeholder.svg'
import DepoimentoIcon from '../../assets/depoimento.svg'
import CadInput from '../../components/CadInput'
import CadInputObs from '../../components/CadInputObs'
import StarFull from '../../assets/star.svg'
import StarHalf from '../../assets/star_half.svg'
import StarEmpty from '../../assets/star_empty.svg'


export default () => {
    const navigation = useNavigation();
    const [ loading, setLoading ] = useState(false);
    const route = useRoute();
    const [ key, setKey ] = useState(route.params.key)
    const [ advInfo, setAdvInfo ] = useState({});
    const [ depoimentoField, setDepoimentoField ] = useState('');
    const [ cidadeField, setCidadeField ] = useState('');
    const [ nomeUser, setNomeUser ] = useState('');
    const [ userUid, setUserUid ] = useState('');
    const [ estrela, setEstrela ] = useState(0);
    const [ estrelaStar, setEstrelaStar ] = useState([ 2, 2, 2, 2, 2]);
    const [ stars, setStars ] = useState(0);
    const showNuber = true;
    const dt = new Date()
    const dia = dt.getDate();
    const mes = (dt.getMonth()+1);
    const ano = dt.getFullYear();
    const hr  = dt.getHours();
    const minutos  = dt.getMinutes();
    const segundos  = dt.getSeconds();
    const data = dia+'/'+mes+'/'+ano;
    const hora = hr+':'+minutos+':'+segundos;


    useEffect(()=>{
        const caregaDados = async () => {
            const token = await AsyncStorage.getItem('tokenUser');
            const user = JSON.parse(token);
            setUserUid(user.uid);
            await Api.getUsuario(user.uid).then((snapshot)=>{
                setNomeUser(snapshot.val().nome);
                return 
            }).catch((error)=>{ 
                alert(error);
                setLoading(false);
            });
            await Api.getAdvogado(key).then((snapshot)=>{ 
                setAdvInfo(snapshot.val())
            }) .catch((error)=>{ 
                alert(error);
            });
        }
        caregaDados();
    }, [])
    const hendleBackButtom = () => {
        navigation.goBack();
    };
    const handleEnviaClick = async () => {
        const local = cidadeField;
        const desc = depoimentoField;
        let depoimento = []
        await Api.getAdvogado(key).then((snapshot)=>{            
            if (snapshot.val().depoimento){
                depoimento = snapshot.val().depoimento
                depoimento.push({
                    desc,
                    local,
                    nomeUser,
                    userUid,
                    estrela,
                    data,
                    hora
                });
            }else{
                depoimento.push({
                    desc,
                    local,
                    nomeUser,
                    userUid,
                    estrela,
                    data,
                    hora
                });
            }
        })
        await Api.setAdvogadosDepoimento( key, depoimento)
        .then(function() {
            navigation.navigate('Home');
            setLoading(false)
        })
        .catch((error)=>{
            setLoading(false)
            alert("Erro ao enviar Depoimento!");
        });
    }
    const handleEstrelasClick = (k) => {
        switch (k) {
            case 0:
                setEstrela(1);
                setEstrelaStar([ 2, 0, 0, 0, 0]);
                setStars(1);
                break;
            case 1:    
                setEstrela(2);
                setEstrelaStar([ 2, 2, 0, 0, 0]);
                setStars(2);
            break;
            case 2:
                setEstrela(3);
                setEstrelaStar([ 2, 2, 2, 0, 0]);
                setStars(3);
                break;
            case 3:
                setEstrela(4);
                setEstrelaStar([ 2, 2, 2, 2, 0]);
                setStars(4);
                break;
            case 4:
                setEstrela(5);
                setEstrelaStar([ 2, 2, 2, 2, 2]);
                setStars(5);
                break;
            default:    
                setEstrela(0);
                setEstrelaStar([ 0, 0, 0, 0, 0]);
                setStars(0);
        }
    } 


    return (
        <ContainerPerfil>
            <HeaderAreaFeke>
                <HeaderTitleFeke />
            </HeaderAreaFeke>
            {loading && true ?
                <LoadingIcon size="large" color="#000000" />
            :
                <ScrollPerfil>
                    <BackButtom onPress={hendleBackButtom}>
                    <BackIcon width="44" height="44" fill="#000000" />
                    </BackButtom>
                    <Titulo>Depoimento sobre o Guia</Titulo>
                    <InputAreaAvata>
                        <UserAvatar source={{uri:advInfo.avatar}} />
                    </InputAreaAvata>
                    <PageBodyDepoi>
                        <InfoPerfilDepoi>
                            <UserInfoDepoi>
                                <UserInfoNome>Nome do Guia:{advInfo.nome}</UserInfoNome>
                                <UserInfoNome>Registro/RG: {advInfo.oab}</UserInfoNome>
                                <UserInfoNome>Cidade do Guia:{advInfo.cidade}</UserInfoNome>
                            </UserInfoDepoi>
                        </InfoPerfilDepoi>
                    </PageBodyDepoi> 
                    <PageBodyDepoi> 
                        <StarArea>
                            {estrelaStar.map((i, k) => (
                                <StarView key ={k} onPress={()=>handleEstrelasClick(k)} > 
                                        {i === 0 && <StarEmpty width="30" height="30" fill="#ff9200" />} 
                                        {i === 1 && <StarHalf width="30" height="30" fill="#ff9200" />} 
                                        {i === 2 && <StarFull width="30" height="30" fill="#ff9200" />} 
                                </StarView>
                            ))}
                        </StarArea>
                        <UserInfoDepoi>
                            <CadInput
                                IconSvg={CasaIcon}
                                placeholder="Local do Passeio"
                                value={cidadeField}
                                onChangeText={t=>setCidadeField(t)}
                            />
                            <CadInputObs
                                IconSvg={DepoimentoIcon} 
                                placeholder="Depoimento"
                                value={depoimentoField}
                                onChangeText={t=>setDepoimentoField(t)}
                            />
                        </UserInfoDepoi>


                        <CustomButton onPress={handleEnviaClick}>
                                <CustomButtonText>Enviar</CustomButtonText>
                        </CustomButton> 



                    </PageBodyDepoi> 




                </ScrollPerfil>
            }
        </ContainerPerfil>
    );
}