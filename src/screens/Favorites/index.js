import React, { useState, useEffect } from 'react';
import { Platform, RefreshControl} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { request, PERMISSIONS } from 'react-native-permissions';
import Geolocation from  '@react-native-community/geolocation';
import { 
    ContainerTab,
    Scroller,
    HeaderArea,
    HeaderTitle,
    SearchButton,
    LocationArea,
    LocationInput,
    LocationFinder,
    LoadingIcon, 
    ListArea
} from '../Styles/styles';
import ListItem from '../../components/ListItem'


import Api from '../../Api'
import AsyncStorage from  '@react-native-community/async-storage';


export default () => {
    const [ loading, setLoading ] = useState(false);
    const [ list, setList ] = useState([]);
    const [ refreshing, setRefreshing ] = useState(false);
    

    useEffect(()=>{
        HandleLocationFinder();
    }, [])

    const HandleLocationFinder = async () => {
        setLoading(true);
        await getAdvogados();
    }
    const getAdvogados = async () => {
        setLoading(true);
        setList([]);
        const token = await AsyncStorage.getItem('tokenUser');
        const user = JSON.parse(token);
        const uid = user.uid;
        await Api.getUsuario(uid).then((snapshot)=>{
            const registro = (snapshot.val().favoritos.length);
            let cont = 0;
            let addLista = list;
            addLista = [];
            const addList = snapshot.val().favoritos.forEach((childItem)=>{
                const uid = childItem.key;
                Api.getAdvogado(uid).then((snapshot)=>{                    
                    let con =0;
                    let est = 0;
                    let estrela = 0;
                    if(snapshot.val().depoimento){
                        snapshot.val().depoimento.forEach((dep)=>{
                            con ++
                            est = est+dep.estrela
                        });
                        estrela = (Math.trunc(est/con));
                        let resto = ((est%cont)/con)
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
                        key: snapshot.key,
                        nome: snapshot.val().nome,
                        estrela: estrela,
                        avatar: snapshot.val().avatar,
                    })
                    cont ++
                    if(cont == registro){
                        setList(addLista);
                        setLoading(false);
                    }
                })
            })
        })
    }

    const onRefresh =  () => {
        setRefreshing(false)
        getAdvogados();
    }

    return (
        <ContainerTab>
            <Scroller refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
                <HeaderArea>
                    <HeaderTitle>Favoritos</HeaderTitle>
                </HeaderArea>
                {loading && true ?
                    <LoadingIcon size="large" color="#000000" />
                :
                    <ListArea>
                        {list.map((item, k)=>(
                            <ListItem key={k} data={item} />
                        ))
                        }
                    </ListArea>
                }
            </Scroller>
        </ContainerTab>
    );
}

