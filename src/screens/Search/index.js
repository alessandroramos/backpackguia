import React, { useState, useEffect } from 'react';
import { RefreshControl} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { 
    ContainerTab,
    Scroller,
    SearchArea,
    SearchImput,
    LoadingIcon, 
    ListArea,
    HeaderArea,
    HeaderTitleFeke,
    SearchButton
} from '../Styles/styles';
import ListItem from '../../components/ListItem'


import Api from '../../Api'
import SearchIcon from '../../assets/search.svg'
import WyLocationIcon from '../../assets/my_location.svg'
import { FlatList } from 'react-native-gesture-handler';
import PersonIcom from '../../assets/person.svg';

export default () => {
    const navigation = useNavigation();
    const [ nomeField, setNomeField ] = useState('');
    const [ coords, setCoords ] =useState(null);
    const [ loading, setLoading ] = useState(false);
    const [ list, setList ] = useState([]);
    const [ refreshing, setRefreshing ] = useState(false);

    const getAdvogadoSearch = async () => {
        setLoading(true);
        setList([]);
        await Api.getAdvogadoSearch(nomeField).then((snapshot)=>{
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

    return (
        <ContainerTab>
            <Scroller refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
                <HeaderArea>
                <HeaderTitleFeke></HeaderTitleFeke>
                </HeaderArea>
                <SearchArea>
                    <SearchImput
                        placeholder="Digite o nome do guia"
                        placeholderTextColor="#000000"
                        value={nomeField}
                        onChangeText={t=>setNomeField(t)}
                        onEndEditing={getAdvogadoSearch}
                        returnKeyType="search"
                        autoFocus
                        selectTextOnFocus
                    />
                </SearchArea>
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

