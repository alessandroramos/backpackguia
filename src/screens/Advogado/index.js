import React, { useState, useEffect} from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Modal } from "react-native";
import { 
    Container,
    ContainerPerfil,
    InputArea,
    CustomButton,
    CustomButtonText,
    LoadingIcon,
    ScrollView,
    BackButtom,
    Titulo,
    AtuacaoCheckBoxText,
    AtuacaoCheckBoxInd,
    AtuacaoCheckBox,
    AtuacaoCheck,
    AtuacaoCheckBoxView,
    AtuacaoCheckBoxTextTituloVire,
    AtuacaoCheckBoxTextTitulo,
    InputAreaLoc,
    HeaderTitleLoc,
    LocationArea,
    LocationFinder
} from '../Styles/styles';
import AsyncStorage from  '@react-native-community/async-storage';
import CheckBox from '@react-native-community/checkbox';
import EmailIcon from '../../assets/email.svg';
import PersonIcom from '../../assets/person.svg';
import CelularIcom from '../../assets/whatsappP.svg';
import CadInput from '../../components/CadInput';
import BackIcon from '../../assets/back.svg';
import CameraIcon from '../../assets/camera.svg';
import CasaIcon from '../../assets/placeholder.svg';
import SiteIcon from '../../assets/site.svg';
import TelefoneIcon from '../../assets/telefone.svg';
import OlhoIcon from '../../assets/olho.svg';
import FacebookIcon from '../../assets/facebookP.svg';
import InstagramIcon from '../../assets/instagramP.svg';
import LinkedinIcon from '../../assets/linkedinP.svg';
import WyLocationIcon from '../../assets/my_location.svg';
import OabIcon from "../../assets/oab.svg";
import Api from '../../Api';
import LocationInput from '../../components/LocationInput';
import SignInput from '../../components/SignInput';
import LockIcom from '../../assets/lock.svg';



export default () => {
    const [ refre, setRefre ] = useState(false);
    const navigation = useNavigation();
    const [ loading, setLoading ] = useState(false);
    const [ nomeField, setNomeField ] = useState('');
    const [ oabField, setOabField ] = useState('');
    const [ cpfField, setCpfField ] = useState('');
    const [ logradoroField, setLogradoroField ] = useState('');
    const [ numeroField, setNumeroField ] = useState('');
    const [ complementoField, setComplementoField ] = useState('');
    const [ cidade, setCidade ] = useState('');
    const [ uf, setUf ] = useState('');
    const [ pais, setPais ] = useState('');
    const [ telefoneField, setTelefoneField ] = useState('');
    const [ celularField, setCelularField ] = useState('');
    const [ emailField, setEmailField ] = useState('');
    const [ siteField, setSiteField ] = useState('');
    const [ avatar, setAvatar ] = useState('https://firebasestorage.googleapis.com/v0/b/backpack-f5a42.appspot.com/o/logo%2Fpessoa.png?alt=media&token=f6c9c8e5-0a90-41e3-b0e9-ef173b1f636c');
    const [ foto, setFoto ] = useState(['https://firebasestorage.googleapis.com/v0/b/guiaadvogados-e9f21.appspot.com/o/logos%2FLogo-wep-advogado.jpeg?alt=media&token=8344a8c7-8d72-4405-8858-1b25727eab65']);
    const [ depoimento, setDepoimento ] = useState([]);
    const [ obsField, setObsField ] = useState('');
    const [ faceField, setFaceField ] = useState('');
    const [ instaField, setInstaField ] = useState('');
    const [ linkedinField, setLinkedinField ] = useState('');
    const [ estrelasField, setEstrelasField ] = useState('');
    const [ situacao, setSituacao ] = useState(true);
    const [ descricao, setDescricao ] =useState("Click para setar sua localização.")


    const [ atuacao, setAtuacao ] = useState([]);

    const [ agroturismo, setAgroturismo ] = useState(false);
    const [ aventura, setAventura ] = useState(false);
    const [ consumo, setConsumo ] = useState(false);
    const [ cultural, setCultural ] = useState(false);
    const [ ecoturismo, setEcoturismo ] = useState(false);
    const [ esporte, setEsporte ] = useState(false);
    const [ eventos, setEventos ] = useState(false);
    const [ gastronomico, setGastronomico ] = useState(false);
    const [ incentivo, setIncentivo ] = useState(false);
    const [ massa, setMassa ] = useState(false);
    const [ nautico, setNautico ] = useState(false);
    const [ negocios, setNegocios ] = useState(false);    
    const [ pedagogico, setPedagogico ] = useState(false);
    const [ saude, setSaude ] = useState(false);
    const [ sustentavel, setSustentavel ] = useState(false);
    const [ religioso, setReligioso ] = useState(false);
    const [ rural, setRural ] = useState(false);
    const [ modalVisible, setModalVisible ] = useState(false);



    const [ coords, setCoords ] = useState('');
    const getAdvogados = async () => {
        setLoading(true);

        setAgroturismo(false);
        setAventura(false);
        setConsumo(false);
        setCultural(false);
        setEcoturismo(false);
        setEsporte(false);
        setEventos(false);
        setGastronomico(false);
        setIncentivo(false);
        setMassa(false);
        setNautico(false);
        setNegocios(false);
        setPedagogico(false);
        setSaude(false);
        setSustentavel(false);	
        setReligioso(false);
        setRural(false);
        const token = await AsyncStorage.getItem('tokenUser');
        const user = JSON.parse(token);
        const uid = user.uid;
        await Api.getAdvogado(uid).then((snapshot)=>{
            if(snapshot.val()){
                setNomeField(snapshot.val().nome),
                setOabField(snapshot.val().oab),
                setCpfField(snapshot.val().cpf),
                setLogradoroField(snapshot.val().logradoro),
                setNumeroField(snapshot.val().numero),
                setComplementoField(snapshot.val().complemento),
                setCidade(snapshot.val().cidade),
                setUf(snapshot.val().uf),
                setPais(snapshot.val().pais),
                setDescricao(snapshot.val().descricao),
                setCoords(snapshot.val().coords)
                setTelefoneField(snapshot.val().telefone),
                setCelularField(snapshot.val().celular),
                setEmailField(snapshot.val().email),
                setObsField(snapshot.val().obs)
                setSiteField(snapshot.val().site), 
                setAvatar(snapshot.val().avatar),
                setFoto(snapshot.val().foto),
                setDepoimento(snapshot.val().depoimento)
                setFaceField(snapshot.val().face);
                setInstaField(snapshot.val().insta);
                setLinkedinField(snapshot.val().linkedin);
                setEstrelasField(snapshot.val().estrelas); 
                setAtuacao(snapshot.val().atuacao)
                snapshot.val().atuacao.forEach((childItem)=>{
                    if(childItem ==='Agroturismo' ){
                        setAgroturismo(true);
                    }
                    if(childItem ==='Aventura' ){
                        setAventura(true);
                    }
                    if(childItem ==='Consumo' ){
                        setConsumo(true);
                    }
                    if(childItem ==='Cultural' ){
                        setCultural(true);
                    }
                    if(childItem ==='Ecoturismo' ){
                        setEcoturismo(true);
                    }
                    if(childItem ==='Esporte' ){
                        setEsporte(true);
                    }
                    if(childItem ==='Eventos' ){
                        setEventos(true);
                    }
                    if(childItem ==='Gastronomico' ){
                        setGastronomico(true);
                    }
                    if(childItem ==='Incentivo' ){
                        setIncentivo(true);
                    }
                    if(childItem ==='Massa' ){
                        setMassa(true);
                    }
                    if(childItem ==='Nautico' ){
                        setNautico(true);
                    }
                    if(childItem ==='Negocios' ){
                        setNegocios(true);
                    }
                    if(childItem ==='Pedagogico' ){
                        setPedagogico(true);
                    }
                    if(childItem ==='Saude' ){
                        setSaude(true);
                    }
                    if(childItem ==='Sustentavel' ){
                        setSustentavel(true);	
                    }
                    if(childItem ==='Religioso' ){
                        setReligioso(true);
                    }
                    if(childItem ==='Rural' ){
                        setRural(true);
                    }
                })
            }
        }).catch((error)=>{ 
                alert(error);
            setLoading(false);
        });
        setLoading(false);
    }

    useEffect(()=>{
        getAdvogados();        
    }, [refre])


    const carregaAtuacao = () =>{
        let addAtuacao = [];
        if(agroturismo === true) {
            addAtuacao.push('Agroturismo')
        }
        if(aventura === true) {
            addAtuacao.push('Aventura')
        }                    
        if(consumo === true) {
            addAtuacao.push('Consumo')
        }                    
        if(cultural===true){
            addAtuacao.push('Cultural' )
        }
        if(ecoturismo === true){
            addAtuacao.push('Ecoturismo')
        }                     
        if(esporte === true) {
            addAtuacao.push('Esporte')
        } 
        if(eventos === true) {
            addAtuacao.push('Eventos')
        } 
        if(gastronomico === true) {
            addAtuacao.push('Gastronomico')
        } 
        if(incentivo === true) {
            addAtuacao.push('Incentivo')
        } 
        if(massa === true) {
            addAtuacao.push('Massa')
        } 
        if(nautico === true) {
            addAtuacao.push('Nautico')
        } 
        if(negocios === true) {
            addAtuacao.push('Negocios')
        } 
        if(pedagogico === true) {
            addAtuacao.push('Pedagogico')
        } 
        if(saude === true) {
            addAtuacao.push('Saude')
        } 
        if(sustentavel === true) {
            addAtuacao.push('Sustentavel')
        } 
        if(religioso === true) {
            addAtuacao.push('Religioso')
        } 
        if(rural === true) {
            addAtuacao.push('Rural')
        } 
        return addAtuacao;
    }
    


    const handleSignClick = async () => {
        setLoading(true)
        const token = await AsyncStorage.getItem('tokenUser');
        const user = JSON.parse(token);
        const uid = user.uid;
        const aAtuacao = await carregaAtuacao()
        if (uid){ 
            if(nomeField){ 
                if(oabField) { 
                    if(celularField){
                        await Api.setAdvogados( uid, nomeField, oabField, cpfField, logradoroField, numeroField, complementoField,
                            cidade, uf, pais, descricao, coords, telefoneField, celularField, emailField, siteField, avatar, 
                            obsField, situacao, aAtuacao, foto, depoimento, faceField, instaField, linkedinField, estrelasField)
                            .then(function() {
                                navigation.navigate('Imagens');
                                setLoading(false)
                            })
                            .catch((error)=>{
                                setLoading(false)
                                alert("Erro ao cadastrar Advogado!");
                            });
                        }else{
                            setLoading(false)
                            alert("Informe o Celular!");
                            
                        }
                    }else{
                        setLoading(false)
                        alert("Informe a OAB do Avogado!");
                    }
                }else{
                    setLoading(false)
                    alert("Informe o Nome do Advogado!");
                }
            }else{ 
                setLoading(false)               
                Api.logout();
                navigation.reset({
                    routes:[{name:'SignIn'}]
                })
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
    const hendleBackButtom = () => {
        navigation.goBack();
    };
    const HandleLocationFinder = () => {
        console.log('localização');
        setModalVisible(true);
    }
    const onLocationSelecte = async ( data, details ) => {
        let cid = '';
        let est = '';
        setDescricao(data.description)
        await details.address_components.forEach((item)=>{
            if(item.types[0] == 'administrative_area_level_2'){
                setCidade(item.long_name);
                cid = item.long_name;
            }else{if(item.types[0] == 'administrative_area_level_1'){
                    setUf(item.short_name);
                    est = item.short_name;
                }else{if(item.types[0] == 'country'){
                        setPais(item.long_name);
                    }   
                }   
            }
        });
        setCoords(details.geometry.location);  
        setModalVisible(false);
    }


    return (  
        <Container>
            <Modal
                visible = {modalVisible}
                animationType = "slide"                     
            >
            <LocationArea>
                <LocationInput 
                    onPress={ onLocationSelecte } 
                    value={descricao} 
                    onChangeText={t=>setDescricao(t)}     
                />
            </LocationArea>
            </Modal>      
            <ScrollView>
                {loading && true ?
                    <LoadingIcon size="large" color="#FFFFFF" />
                :
                    <ContainerPerfil>
                        <BackButtom onPress={hendleBackButtom}>
                            <BackIcon width="44" height="44" fill="#000000" />
                        </BackButtom>
                        <InputArea>
                            <Titulo>Cadastro de Guia</Titulo>
                            <CadInput 
                                IconSvg={PersonIcom} 
                                placeholder="Nome"
                                value={nomeField}
                                onChangeText={t=>setNomeField(t)}
                            />
                            <CadInput 
                                IconSvg={CameraIcon} 
                                placeholder="Informe Nº Entidade Reguladora ou  RG"
                                value={oabField}
                                onChangeText={t=>setOabField(t)}
                            />
                            <CadInput 
                                IconSvg={OabIcon} 
                                placeholder="Informe seu CPF ou CNPJ"
                                value={cpfField}
                                onChangeText={t=>setCpfField(t)}
                            />
                            <CadInput 
                                IconSvg={CasaIcon} 
                                placeholder="Logradoro"
                                value={logradoroField}
                                onChangeText={t=>setLogradoroField(t)}
                            />
                            <CadInput 
                                IconSvg={CasaIcon} 
                                placeholder="Numero"
                                value={numeroField}
                                onChangeText={t=>setNumeroField(t)}
                            />
                            <CadInput 
                                IconSvg={CasaIcon} 
                                placeholder="Complemento & Bairro"
                                value={complementoField}
                                onChangeText={t=>setComplementoField(t)}
                            />


                            <InputAreaLoc onPress={HandleLocationFinder}>
                                <WyLocationIcon width="25" height="25" fill="#FF9B29" />
                                <HeaderTitleLoc>{descricao}</HeaderTitleLoc>                        
                            </InputAreaLoc> 


                            <CadInput 
                                IconSvg={FacebookIcon} 
                                placeholder="Informe o link de seu Facebook"
                                value={faceField}
                                onChangeText={t=>setFaceField(t)}
                            />
                            <CadInput 
                                IconSvg={InstagramIcon} 
                                placeholder="Informe o link de seu Instagran"
                                value={instaField}
                                onChangeText={t=>setInstaField(t)}
                            />
                            <CadInput 
                                IconSvg={LinkedinIcon} 
                                placeholder="Informe o link de seu Linkedin"
                                value={linkedinField}
                                onChangeText={t=>setLinkedinField(t)}
                            />
                            <CadInput 
                                IconSvg={CelularIcom} 
                                placeholder="Whatsapp"
                                value={maskTele(celularField)}
                                onChangeText={t=>setCelularField(t)}
                            />
                            <CadInput 
                                IconSvg={TelefoneIcon} 
                                placeholder="Telefone Fixo"
                                value={maskTele(telefoneField)}
                                onChangeText={t=>setTelefoneField(t)}
                            />
                            <CadInput 
                                IconSvg={SiteIcon} 
                                placeholder="Site"
                                value={siteField}
                                onChangeText={t=>setSiteField(t)}
                            />
                            <CadInput 
                                IconSvg={EmailIcon} 
                                placeholder="Digite seu e-mail"
                                value={emailField}
                                onChangeText={t=>setEmailField(t)}
                            />
                            <CadInput 
                                IconSvg={OlhoIcon} 
                                placeholder="Observação"
                                value={obsField}
                                onChangeText={t=>setObsField(t)}
                            />
                            <AtuacaoCheckBoxView>
                                <AtuacaoCheckBoxTextTituloVire>
                                    <AtuacaoCheckBoxTextTitulo>Tipo de Turismo</AtuacaoCheckBoxTextTitulo>
                                </AtuacaoCheckBoxTextTituloVire>
                                <AtuacaoCheck>
                                    <AtuacaoCheckBox>
                                    <AtuacaoCheckBoxInd>
                                            <CheckBox
                                                value={agroturismo}
                                                onValueChange={setAgroturismo}
                                                style={styles.checkbox}
                                            />
                                            <AtuacaoCheckBoxText>Agroturismo</AtuacaoCheckBoxText>
                                        </AtuacaoCheckBoxInd>
                                        <AtuacaoCheckBoxInd>
                                            <CheckBox
                                                value={aventura}
                                                onValueChange={setAventura}
                                                style={styles.checkbox}
                                                />
                                            <AtuacaoCheckBoxText>Aventura</AtuacaoCheckBoxText> 
                                        </AtuacaoCheckBoxInd>
                                    </AtuacaoCheckBox> 
                                    <AtuacaoCheckBox>  
                                        <AtuacaoCheckBoxInd>                       
                                            <CheckBox
                                                value={consumo}
                                                onValueChange={setConsumo}
                                                style={styles.checkbox}
                                                />
                                            <AtuacaoCheckBoxText>Consumo</AtuacaoCheckBoxText>   
                                        </AtuacaoCheckBoxInd> 
                                        <AtuacaoCheckBoxInd>                    
                                            <CheckBox
                                                value={cultural}
                                                onValueChange={setCultural}
                                                style={styles.checkbox}
                                                />
                                            <AtuacaoCheckBoxText>Cultural</AtuacaoCheckBoxText>
                                        </AtuacaoCheckBoxInd>                       
                                    </AtuacaoCheckBox>
                                    <AtuacaoCheckBox>  
                                        <AtuacaoCheckBoxInd>                       
                                            <CheckBox
                                                value={ecoturismo}
                                                onValueChange={setEcoturismo}
                                                style={styles.checkbox}
                                                />
                                            <AtuacaoCheckBoxText>Ecoturismo</AtuacaoCheckBoxText>   
                                        </AtuacaoCheckBoxInd> 
                                        <AtuacaoCheckBoxInd>                       
                                            <CheckBox
                                                value={esporte}
                                                onValueChange={setEsporte}
                                                style={styles.checkbox}
                                                />
                                            <AtuacaoCheckBoxText>Esporte</AtuacaoCheckBoxText>   
                                        </AtuacaoCheckBoxInd> 
                                    </AtuacaoCheckBox>

                                    <AtuacaoCheckBox>  
                                        <AtuacaoCheckBoxInd>                       
                                            <CheckBox
                                                value={eventos}
                                                onValueChange={setEventos}
                                                style={styles.checkbox}
                                                />
                                            <AtuacaoCheckBoxText>Eventos</AtuacaoCheckBoxText>   
                                        </AtuacaoCheckBoxInd> 
                                        <AtuacaoCheckBoxInd>                       
                                            <CheckBox
                                                value={gastronomico}
                                                onValueChange={setGastronomico}
                                                style={styles.checkbox}
                                                />
                                            <AtuacaoCheckBoxText>Gastronomico</AtuacaoCheckBoxText>   
                                        </AtuacaoCheckBoxInd> 
                                    </AtuacaoCheckBox>
                                    <AtuacaoCheckBox>  
                                        <AtuacaoCheckBoxInd>                       
                                            <CheckBox
                                                value={incentivo}
                                                onValueChange={setIncentivo}
                                                style={styles.checkbox}
                                                />
                                            <AtuacaoCheckBoxText>Incentivo</AtuacaoCheckBoxText>   
                                        </AtuacaoCheckBoxInd> 
                                        <AtuacaoCheckBoxInd>                       
                                            <CheckBox
                                                value={massa}
                                                onValueChange={setMassa}
                                                style={styles.checkbox}
                                                />
                                            <AtuacaoCheckBoxText>Massa</AtuacaoCheckBoxText>   
                                        </AtuacaoCheckBoxInd> 
                                    </AtuacaoCheckBox>
                                    <AtuacaoCheckBox>  
                                        <AtuacaoCheckBoxInd>                       
                                            <CheckBox
                                                value={nautico}
                                                onValueChange={setNautico}
                                                style={styles.checkbox}
                                                />
                                            <AtuacaoCheckBoxText>Nautico</AtuacaoCheckBoxText>   
                                        </AtuacaoCheckBoxInd> 
                                        <AtuacaoCheckBoxInd>                       
                                            <CheckBox
                                                value={negocios}
                                                onValueChange={setNegocios}
                                                style={styles.checkbox}
                                                />
                                            <AtuacaoCheckBoxText>Negocios</AtuacaoCheckBoxText>   
                                        </AtuacaoCheckBoxInd> 
                                    </AtuacaoCheckBox>
                                    <AtuacaoCheckBox>  
                                        <AtuacaoCheckBoxInd>                       
                                            <CheckBox
                                                value={pedagogico}
                                                onValueChange={setPedagogico}
                                                style={styles.checkbox}
                                                />
                                            <AtuacaoCheckBoxText>Pedagogico</AtuacaoCheckBoxText>   
                                        </AtuacaoCheckBoxInd> 
                                        <AtuacaoCheckBoxInd>                       
                                            <CheckBox
                                                value={saude}
                                                onValueChange={setSaude}
                                                style={styles.checkbox}
                                                />
                                            <AtuacaoCheckBoxText>Saude</AtuacaoCheckBoxText>   
                                        </AtuacaoCheckBoxInd> 
                                    </AtuacaoCheckBox>                                
                                    <AtuacaoCheckBox>  
                                        <AtuacaoCheckBoxInd>                       
                                            <CheckBox
                                                value={sustentavel}
                                                onValueChange={setSustentavel}
                                                style={styles.checkbox}
                                                />
                                            <AtuacaoCheckBoxText>Sustentavel</AtuacaoCheckBoxText>   
                                        </AtuacaoCheckBoxInd> 
                                        <AtuacaoCheckBoxInd>                       
                                            <CheckBox
                                                value={religioso}
                                                onValueChange={setReligioso}
                                                style={styles.checkbox}
                                                />
                                            <AtuacaoCheckBoxText>Religioso</AtuacaoCheckBoxText>   
                                        </AtuacaoCheckBoxInd> 
                                </AtuacaoCheckBox> 
                                </AtuacaoCheck>
                            </AtuacaoCheckBoxView>





                            {loading && true ?
                                <LoadingIcon size="large" color="#FFFFFF" />
                            :
                                <CustomButton onPress={handleSignClick}>
                                    <CustomButtonText>PROXIMA</CustomButtonText>
                                </CustomButton> 
                            }
                        </InputArea>
                    </ContainerPerfil>
                }
            </ScrollView>
        </Container>
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
      alignSelf: "center",
    },
    label: {
      margin: 8,
    },
});