import React, {  useContext } from 'react';
import styled from 'styled-components/native';


import HomeIcon from '../assets/home.svg'
import SearchIcon from '../assets/search.svg'
import TodayIcon from '../assets/today.svg'
import FavoriteIcon from '../assets/favorite.svg'
import AccountIcon from '../assets/account.svg'
import { UseContext, UserContext } from '../contexts/UserContext';

const TabArea = styled.View`
    width: 100%;
    height: 60px;
    background-color: #363636;
    flex-direction: row;
`;
const TabItem = styled.TouchableOpacity`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

const AvatarIcon = styled.Image`
    width: 24px;
    height: 24px;
    border-Radius: 12px;
`;

const TabItemCenter = styled.TouchableOpacity`
    width: 70px;
    height: 70px;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    border-Radius: 35px;
    border: 3px solid #ffffff;
    margin-top: -20px
`;



export default ({state, navigation }) => {
    const  { state:user } = useContext(UserContext);
    if(user.avatar=== null){
        user.avatar = '';
    }
    const goTo = (screenName) => {
        navigation.navigate(screenName);
    }

    return(
        <TabArea>
            <TabItem onPress={()=>goTo('Home')}> 
                <HomeIcon style={{opacity: state.index===0? 1 : 0.5}} width="24" height="24" fill= "#FFFFFF" />
            </TabItem>
            <TabItem onPress={()=>goTo('Search')}>
                <SearchIcon style={{opacity: state.index===1? 1 : 0.5}} width="24" height="24" fill= "#FFFFFF" />
            </TabItem>
            <TabItemCenter onPress={()=>goTo('Home')}>
                <HomeIcon  width="32" height="32" fill= "#363636" />
            </TabItemCenter>
            <TabItem onPress={()=>goTo('Favorites')}>
                <FavoriteIcon style={{opacity: state.index===3? 1 : 0.5}} width="24" height="24" fill= "#FFFFFF" />
            </TabItem>
            <TabItem onPress={()=>goTo('Profile')}>
                {user.avatar != ''  ?
                    <AvatarIcon source={{ uri: user.avatar }}  /> 
                :
                    <AccountIcon style={{opacity: state.index===4? 1 : 0.5}} width="24" height="24" fill= "#FFFFFF" />
           
                 }
            </TabItem>
        </TabArea>
    );
}
