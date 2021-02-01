import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
    background-color: #ffffff;
    flex: 1;
    align_items: center;
`;
export const ContainerPerfil = styled.SafeAreaView`
    background-color: #ffffff;
    flex: 1;
    width: 100%;
    height: 100%;
`;
export const ContainerTab = styled.SafeAreaView`
    background-color: #ffffff;
    flex: 1;
    align_items: center;
`;

export const InputArea = styled.View`
    flex: 1;
    width: 100%;
    padding: 10px;
`;
export const InputAreaPerfil = styled.View`
    flex: 1;
    width: 100%;
`;
export const InputAreaCamera = styled.View`
    padding: 10px;
    width: 90%;
    height: 40%
    margin-right: 5%;
    margin-left: 5%;
    margin-top: 50%;
    background-color:  #fff;
    border: 2px solid #FF9B29;
`;
export const CustomButtonCamaGale = styled.TouchableOpacity`
    height: 90px;
    width: 90px;
    margin-right: 7%;
    margin-left: 7%;
    margin-top: 20px;
    background-color:  #FF9B29;
    border-radius: 5px;
    justify-content: center;
    align-items: center;
    border: 2px solid #3D4140;
`;


export const CustomButton = styled.TouchableOpacity`
    height: 50px;
    margin-right: 5%;
    margin-left: 5%;
    margin-bottom: 10px;
    background-color:  #FF9B29;
    border-radius: 25px;
    justify-content: center;
    align-items: center;
    border: 2px solid #3D4140;
`;

export const CustomButtonText = styled.Text`
    font-size: 18px;
    color: #000;
    font-weight: bold;
`;

export const SignMenssageBotton = styled.TouchableOpacity`
    flex-direction: row;
    justify_content: center;
    margin: 20px;
`;
export const SignMenssageBottonText = styled.Text`
    font-size: 16px;
    color: #000000;
`;
export const SignMenssageBottonTextBold = styled.Text`    
    font-size: 16px;
    color: #000000;
    font-weight: bold;
    margin-left: 5px;
`;
export const LoadingIcon = styled.ActivityIndicator`
    margin_top: 50px;

`;
export const  ScrollView = styled.ScrollView`
    width: 100%;
`;

export const Scroller = styled.ScrollView`
    flex: 1;
    padding: 10px;
`;
export const HeaderArea = styled.View`
    margin-right: 10px;
    margin-left: 10px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;
export const HeaderAreaFeke = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;
export const HeaderTitleFek = styled.Text`
    width: 80%;
`;

export const HeaderTitle = styled.Text`
    width: 80%;
    font-size: 24px;
    font-weight: bold;
    color: #000000;
`;
export const HeaderTitleFeke = styled.Text`
    width: 100%;
    font-size: 4px;
    font-weight: bold;
    color: #000000;
`;

export const SearchButton = styled.TouchableOpacity`
    width: 30px;
    height: 30px;
    margin-left: 10%;
    border-radius: 15PX;
    border: 2px solid #3D4140;
`; 
export const LocationArea = styled.View`
    background-color: #ffffff;
    border-radius: 30PX;
    flex-direction: row;
    align-items: center;
    padding: 7px;
    padding-right: 10px;
    margin-top: 20px;
    margin-right: 10px;
    margin-left: 10px;
    border: 1px solid #3D4140;
`;
export const LocationInput = styled.TextInput`
    flex: 1;
    font-size: 16px;
    color: #fff;
`;
export const LocationFinder = styled.TouchableOpacity`
    width: 30px;
    height: 30px;
    margin-right: 10px;
`;

export const ListArea = styled.View`
    margin-top: 10px;
    margin-bottom: 10px;
`;
export const  ScrollPerfil = styled.ScrollView`
    flex: 1;
`;
export const SwipeItem = styled.View`
    flex: 1;
    background-color: #FF9B29;
`;
export const SwipeImage = styled.Image`
    width: 100%;
    height: 100%;
`;
export const FekeSwiper = styled.View`
    height: 120px;

`;
export const PageBody = styled.View`
    background-color: #fff;
    border-top-left-radius: 50px;
    margin-top: -50px;
    min-height: 100px;
    padding-top: 5px;
`;
export const PageBodyDepoi = styled.View`
    background-color: #fff;
    border-radius: 20px;
    margin: 5px;
    border: 2px solid #FF9B29;
    min-height: 100px;
    padding-top: 5px;
`;
export const SwiperDot = styled.View`
    width: 10px;
    height: 10px;
    background-color: #fff;
    border-radius: 5px;
    margin: 3px;
`;
export const SwipeDotActive = styled.View`
    width: 10px;
    height: 10px;
    background-color: #000;
    border-radius: 5px;
    margin: 3px;
`;
export const InfoPerfil = styled.View`
    flex-direction: row;
    margin-top: -20px;
`; 
export const InfoPerfilDepoi = styled.View`
    flex-direction: row;
    margin: 5px;
`; 
export const InfoContato = styled.View`
    flex-direction: row;
    padding-left: 7px;
    padding-right: 7px;
`; 
export const UserAvatar  = styled.Image`
    width: 110px;
    height: 110px;
    border-radius: 20px;
    margin-left: 20px;
    margin-right: 10px;
    border-width: 4px;
    border-color: #FF9B29;
`;
export const UserAvatarDepoi  = styled.Image`
    width: 110px;
    height: 110px;
    border-radius: 20px;
    margin-left: 20px;
    margin-right: 10px;
    border-width: 4px;
    border-color: #FF9B29;
`;
export const InputAreaAvata = styled.View`
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
    padding: 10px;
`;
export const InputAreaAvataPerfil = styled.View`
    flex-direction: column;
    align-items: center;
`;
export const UserInfoNome = styled.Text`
    font-size: 17px;
    font-weight: bold;
    color: #000000;
    margin-bottom: 2px;
`;
export const UserInfoLogra = styled.Text`
    font-size: 14px;
    color: #000000;
    margin-left: 5px;
`;
export const UserInfoAreaRedeSocial = styled.View`
    flex-direction: row;
    margin: 1px;
`;
export const UserInfoObs = styled.Text`
    margin-top: 5px;
    font-size: 14px;
    color: #000000;
`;

export const UserFavButton = styled.TouchableOpacity`
    width: 40px;
    height: 40px;
    background-color: #FFFFFF;
    border: 2px solid #999999;
    border-radius: 20px;
    justify-content: center;
    align-items: center
    margin-top: 40px;
    margin-left: 5px;
    margin.right: 5px;
`;
export const UserInfo = styled.View`
    flex: 1;
    justify-content: flex-end;
    margin-top: 20px;
`;
export const UserInfoDepoi = styled.View`
    flex: 1;
    justify-content: flex-end;
    margin: 10px;
`;
export const UserInfoContato = styled.View`
    flex: 1;
    justify-content: flex-end;
`;
export const BackButtom = styled.TouchableOpacity`
    position: absolute;
    left: 0;
    top: 0;
    z-index: 9;
`;
export const AtuacaoArea = styled.View`
    background-color: #EFFBF5;
    flex-direction: column;
    margin-top:10px;
`;
export const AtuacaoTituloArea = styled.View`
`;
export const AtuacaoTitulo = styled.Text`
    width: 100%;
    height: 30px;
    font-size: 17px;
    font-weight: bold;
    margin-top: 10px;
    text-align: center;
`;
export const AtuacaoItem = styled.View`
    flex-direction: row;
    padding-left: 5%;
    margin-top: 10px;
    margin-bottom: 10px;
    width: 33.33%;
`;
export const AtuacaoItems = styled.View`
    flex-direction: row;
    flex-wrap: wrap;
    margin-bottom: 20px;
`;
export const AtuacaoItemText = styled.Text`
    font-size: 14px;
    color: #000000;
`;
export const FekeArea = styled.View``;

export const DeporimentosArea = styled.View`
    background-color: #EFFBF5;
    padding-bottom: 10px;
    min-height: 170px;

`;
export const DeporimentoItem = styled.View`
    background-color: #848484;
    padding: 10px;
    margin-left: 40px;
    margin-right: 40px;
    min-height: 170px;
    border-radius: 10px;
`;
export const DeporimentoInfo = styled.View`
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 1px;
`;
export const DeporimentoItemNome = styled.Text`
    color: #ffffff;
    font-size: 14px;
    font-weight bold;
    width: 70%;
`;
export const DeporimentoItemTex = styled.Text`
    color: #ffffff;
    font-size: 13px;
`;
export const AdvCheckBoxView = styled.View`
    flex-direction: column;
    width: 100%;
    height: 90px;
    background-color: #ffffff;
    border-radius: 45px;
    margin-bottom: 10px;
    border: 1px solid #3D4140;
`;
export const AdvCheckBox = styled.View`
    flex-direction: row;
    width: 100%;
    padding: 10px;
    margin-left: 40px;    
`;    
export const AdvCheckBoxText = styled.Text`
    color: #000000;
    margin-top: 5px;
    font-size: 15px;
    margin-right: 50px;
`;
export const AdvCheckBoxTextTitulo = styled.Text`
    color: #000000;
    margin-top: 10px;
    font-size: 15px;
    margin-left: 40px;
    font-weight bold;
`; 
export const DepoimentoTitulo = styled.Text`
    width: 100%;
    font-size: 17px;
    font-weight: bold;
    text-align: center;
`;
export const Titulo = styled.Text`
    width: 100%;
    font-size: 17px;
    font-weight: bold;
    text-align: center;
`;
//-------------------Atuacao
export const AtuacaoCheckBoxView = styled.View`
    flex-direction: column;
    width: 100%;
    background-color: #FFFFF0;
    padding: 10px;
    border: 1px solid #3D4140;
    border-radius: 10px;
    margin-bottom: 20px;
`;
export const AtuacaoCheckBoxTextTitulo = styled.Text`
    color: #000000;
    font-size: 15px;
    font-weight bold;
    text-align: center;
    width: 100%;
`; 
export const AtuacaoCheck = styled.View`
    flex-direction: column;
    width: 100%;
`;    
export const AtuacaoCheckBox = styled.View`
    flex-direction: row;
    width: 100%;
`;
export const AtuacaoCheckBoxText = styled.Text`
    color: #000000;
    font-size: 13px;
    margin-top: 7px;
`;
export const AtuacaoCheckBoxInd = styled.View`
    flex-direction: row;
    width: 50%;
    padding-top:5px
    padding-bottom:5px
`;
export const AtuacaoCheckBoxTextTituloVire = styled.View`
    flex-direction: row;
    width: 100%;
`;
export const ImagemViem = styled.View`
    flex-direction: row;
    flex-wrap: wrap;
`;
export const ImagemViemImage = styled.View`
    width: 50%;
    height: 120px;
    padding:10px
`;
export const IcoBackPackArea = styled.View`
    height: 17%;
`;
export const ImagemViemImageButton =styled.TouchableOpacity`
    width: 100%;
    height: 100%;
    border: 2px solid #3D4140;
`;
export const InputAreaSenha = styled.View`
    flex-direction: row;
    width: 100%;
    padding: 10px;
    justify-content: center;
    align-items: center;
`;
export const CustomButtonProf = styled.TouchableOpacity`
    height: 40px;
    width: 40%;
    margin-left: 5%;
    margin-right: 5%;
    background-color:  #FF9B29;
    border-radius: 20px;
    border: 2px solid #3D4140;
    justify-content: center;
    align-items: center;
`;

export const CustomButtonTextProf = styled.Text`
    font-size: 18px;
    color: #000;
    font-weight: bold;
    text-align: center;
`;
export const UserAvataProf  = styled.Image`
    width: 50px;
    height: 100%;
    border-radius: 20px;
    margin-left: 20px;
    margin-right: 10px;
    border-width: 4px;
    border-color: #FF9B29;
`;
export const UserAvatarAlter = styled.View`
    height: 30px;
    width:  30px;
    border-radius: 10px;
    margin-top: -31px;
    margin-left: 90px;
    justify-content: center;
    align-items: center;
    background-color:  #fff;
`;
export const CustomButtonAlterAvata = styled.TouchableOpacity`
    height: 30px;
    width:  30px;
    border-radius: 10px;
    border: 2px solid #3D4140;
    justify-content: center;
    align-items: center;
`;
export const CustomButtonProfSenha  = styled.TouchableOpacity`
    height: 30px;
    width: 40%;
    margin-left: 5%;
    margin-right: 5%;
    background-color:  #FF9B29;
    border-radius: 15px;
    border: 2px solid #3D4140;
    justify-content: center;
    align-items: center;
`;
export const AreaButtoms = styled.View`
`;

export const InputAreaSwitch = styled.View`
    flex-direction: row;
    height: 40px;
    width: 100%;
    align-items: center;
    background-color: #ffffff;
    border-radius: 20px;
    padding-left: 15px;
    margin-bottom: 10px;
    border: 1px solid #3D4140;
`;
export const InputAreaSwitchText = styled.Text`
    font-size: 18px;
    color: #000;
    margin-right: 20px;
    font-weight: bold;
    text-align: center;
`;
export const SearchArea = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background-color: #E8DEDE;
    height: 50PX;
    border-radius: 25PX;
    padding: 0 20px;
    border: 1px solid #FF9B29;

`;
export const SearchImput = styled.TextInput`
    flex: 1;
    font-size: 16px;
    color: #000000; 
`;
export const HeaderTitleFav = styled.Text`
    width: 100%;
    font-size: 24px;
    font-weight: bold;
    color: #000000;
    justify-content: center;
    align-items: center;
`;
export const CustomButtonRedeSocial = styled.TouchableOpacity`
    flex-direction: row;
    width: 100%;
`;
export const  UserInfoAreaDepoimento = styled.View`
    background-color: #EFFBF5;
    padding-bottom: 10px;
    min-height: 10px;
`;
export const CustomButtonDepoimento = styled.TouchableOpacity`
    flex-direction: row;
    width: 100%;
    margin-left: 50px;
`;
export const UserInfoDepoimento = styled.Text`
    font-size: 20px;
    font-weight: bold;
    color: #000000;
    margin-left: 5px;
`;
export const StarArea = styled.View`
    height: 60px;
    background-color: #ffffff;
    flex-direction: row;
    border-radius: 30px;
    padding-left: 20px;
    align-items: center;
    margin-top: 15px;
    margin-left: 10px;
    margin-right: 10px;
    border: 1px solid #3D4140;
`;
export const StarView = styled.TouchableOpacity`
`;
export const StarButton = styled.TouchableOpacity`
`;
export const Startext = styled.Text`
    font-size: 14px;
    font-weight: bold;
    margin-left: 5px;
    color: #000;
`;
export const InputAreaLoc = styled.TouchableOpacity`
    width: 100%;
    height: 40px;
    background-color: #ffffff;
    flex-direction: row;
    border-radius: 20px;
    padding-left: 5px;
    align-items: center;
    margin-bottom: 5px;
    border: 1px solid #3D4140;
`;
export const HeaderTitleLoc = styled.Text`
    width: 80%;
    font-size: 16px;
    margin-left: 10px;
    color: #000000;
`;




