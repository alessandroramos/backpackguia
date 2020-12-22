import React, { useState, useEffect } from 'react';
import { Platform, RefreshControl} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { request, PERMISSIONS } from 'react-native-permissions';
import Geolocation from 'react-native-geolocation-service';
import { 
    ContainerTab,
    Scroller,
    HeaderArea,
    HeaderTitle,
    SearchButton,
    LocationArea,
    LocationFinder,
    LoadingIcon, 
    ListArea,
    HeaderAreaFeke,
    HeaderTitleFeke
} from '../Styles/styles';
import ListItem from '../../components/ListItem';


import Api from '../../Api';
import SearchIcon from '../../assets/search.svg';
import WyLocationIcon from '../../assets/my_location.svg';
import LocationInput from '../../components/LocationInput';
export default () => {
    const navigation = useNavigation();
    const [ locationText, setLocationText ] =useState('');
    const [ coords, setCoords ] =useState([]);
    const [ loading, setLoading ] = useState(false);
    const [ list, setList ] = useState([]);
    const [ refreshing, setRefreshing ] = useState(false);
    const [ refreHome, setRefreHome ] = useState(false);
    const [ cidade, setCidade ] = useState('');
    const [ uf, setUf ] = useState('');
    const [ pais, setPais ] = useState('');
  //  const geocoder  = new google.maps.Geocoder();


    useEffect(()=>{
        HandleLocationFinder();
    }, [])

    const HandleLocationFinder = async () => {
        setCoords(null);
        setLoading(true);
        let result = await request(
            Platform.os === 'ios' ?
            PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
            :
            PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
        );
        if(result == 'granted') {
            setLoading(true);
            setLocationText('');
            setList([]);
            Geolocation.getCurrentPosition((info)=>{
                setCoords(info.coords);
//                console.log(info.coords);


                getAdvogados();
            },
            error => {
                alert.log(error);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
            )
        }else{
            console.log('Erro apermission');
            getAdvogados();
        }
    }
    const getAdvogados = async () => {
        setLoading(true);
        setList([]);

        let lat = null;
        let lng = null;
        if(coords){
            lat = coords.latitude;
            lng = coords.longitude;
        }
        await Api.getAdvogados(lat, lng, locationText).then((snapshot)=>{
            let addLista = list;
            addLista = [];
            snapshot.forEach((childItem)=>{
                let cont =0;
                let est = 0;
                let estrela = 0;
                if(childItem.val().depoimento){
                    childItem.val().depoimento.forEach((dep)=>{
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
                }
                addLista.push({
                    key: childItem.key,
                    nome: childItem.val().nome,
                    estrela: estrela,
                    avatar: childItem.val().avatar
                });
            })
            setList(addLista);

        }).catch((error)=>{ 
            alert("Nenhum Advogado encontrado!");
        });

        setLoading(false); 
    }
    const onRefresh = () => {
        setRefreshing(false)
        getAdvogados();
    }
    const onLocationSelected = async ( data, details ) => {
        await details.address_components.forEach((item)=>{
            if(item.types[0] == 'administrative_area_level_2'){
                setCidade(item.long_name)
            }else{if(item.types[0] == 'administrative_area_level_1'){
                    setUf(item.short_name)
                }else{if(item.types[0] == 'country'){
                        setPais(item.long_name)
                    }   
                }   
            }
        });
        setCoords(details.geometry.location);
        getAdvogados();
    }

    return (
        <ContainerTab>
            <HeaderArea>
                    <HeaderTitle numberOfLines={2}>Encontre seu guia!</HeaderTitle>
                    <SearchButton onPress={()=>navigation.navigate('Search')}>
                        <SearchIcon width="26" height="26" fill="#FF9B29" />
                    </SearchButton>
            </HeaderArea>
            <LocationArea>
                <LocationInput onPress={ onLocationSelected }    />
                <LocationFinder onPress={HandleLocationFinder}>
                    <WyLocationIcon width="30" height="30" fill="#FF9B29" />
                </LocationFinder>
            </LocationArea>


            <Scroller refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>

                <HeaderAreaFeke>
                    <HeaderTitleFeke 
                    />
                </HeaderAreaFeke>


                {loading && true ?
                    <LoadingIcon size="large" color="#000000" />
                :
                    <ListArea>
                        {list.map((item, k)=>(
                            <ListItem key={k} data={item} />
                        ))}
                    </ListArea>
                }
            </Scroller>
        </ContainerTab>
    );
}


/*


import RNFFetchBlob from 'react-native-fetch-blob'

window.XMLHttpRequest = RNFFetchBlob.polyfill.XMLHttpRequest;
window.Blob = RNFFetchBlob.polyfill.Blob

*/