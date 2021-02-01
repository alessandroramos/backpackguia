import firebase from 'firebase';
import AsyncStorage from  '@react-native-community/async-storage';

//-------------------------------Conectar-----------------------------------------------
// Base de desenvolvimento 
let config = {
    apiKey: "AIzaSyBGncCVLvGR29wbc2H-i17RZ4kmptLUNKI",
    authDomain: "backpack-f5a42.firebaseapp.com",
    databaseURL: "https://backpack-f5a42.firebaseio.com",
    projectId: "backpack-f5a42",
    storageBucket: "backpack-f5a42.appspot.com",
    messagingSenderId: "768773942400",
    appId: "1:768773942400:web:bba59879e2fbaac6db4a65"
};
firebase.initializeApp(config);
//-------------------------------Fim Conectar-------------------------------------------

class Api{
//-------------------------------Usuario------------------------------------------------
    logout (){
        console.log("Api.logout")
        AsyncStorage.removeItem('tokenUser');
        firebase.auth().signOut();
        
    }

    login(email, password){
        console.log("Api.login")
        return firebase.auth().signInWithEmailAndPassword(email, password)
    }

    addAuthListener(callback){
        console.log("Api.addAuthListener")
        firebase.auth().onAuthStateChanged(callback); 
    } 
    
    CadastrarAut(email, password){
        console.log("Api.CadastrarAut")
        return firebase.auth().createUserWithEmailAndPassword(email, password)
    }

    getUsuarioInfo(uid){
        console.log("Api.getUsuarioInfo")
        return firebase.database().ref('usuarios')
            .child(uid)
            .once('value');
    }

    getUsuario(uid){
        console.log("Api.getUsuario")
        return firebase.database().ref('usuarios')
        .child(uid)
        .once('value', (snapshot)=>{
        });
    }

    setUsuarioInfo(uid, nome, mail, telefone, advogado, avatar, favoritos){
        console.log("Api.setUsuarioInfo")
        return firebase.database().ref('usuarios').child(uid).set({
            nome:nome,
            mail: mail,
            telefone: telefone,
            advogado: advogado,
            avatar: avatar,
            favoritos: favoritos,
        });
    }

    setAlterarSenha(passwordFieldNova){
        console.log("Api.setAlterarSenha")
       return firebase.auth().currentUser.updatePassword(passwordFieldNova);
    }
    
    setUserAtu(telefone, nome, advogado, uid){
        console.log("Api.setUserAtu")
        firebase.database().ref('usuarios').child(uid).child('telefone').set(telefone).catch((error)=>{ 
            alert(error);
        });
        firebase.database().ref('usuarios').child(uid).child('nome').set(nome).catch((error)=>{ 
            alert(error);
        });;        
        firebase.database().ref('usuarios').child(uid).child('advogado').set(advogado).catch((error)=>{ 
            alert(error);
        });;        
    }

    setUserFav(uid, favoritos){
        console.log("Api.setUserFav")
        firebase.database().ref('usuarios').child(uid).child('favoritos').set(favoritos)
        .catch((error)=>{ 
            alert(error);
        });;        
    }
//-------------------------------Fim Usuario--------------------------------------------
    getAdvogados (lat, lng, cidade, uf)  {        
        console.log("Api.getAdvogados")
        console.log(lat, lng, cidade, uf)
        return firebase.database().ref('advogados')
            .orderByChild('cidade').equalTo(cidade)
            .once('value', (snapshot)=>{
            });
    }

    setAdvogados (uid, nome, oab, cpf, logradoro, numero, complemento, cidade, uf, pais, descricao, coords,telefone, 
                    celular, email, site, avatar, obs, situacao, atuacao, foto, depoimento, 
                    face, insta, linkedin, estrelas)  {
            console.log("Api.setAdvogados")
            return firebase.database().ref('advogados').child(uid).set({
            nome:nome,
            oab: oab, 
            cpf: cpf || "",
            logradoro: logradoro || '', 
            numero: numero || '', 
            complemento: complemento || '', 
            cidade: cidade || '', 
            uf: uf || '',
            pais: pais || '',
            descricao: descricao || '', 
            coords: coords || '', 
            telefone: telefone || '',
            celular: celular, 
            email: email || '', 
            site: site || '', 
            avatar: avatar,
            situacao: situacao || true,
            atuacao: atuacao || [],
            foto: foto || [],
            obs: obs || '',
            depoimento: depoimento|| [],
            face: face || '', 
            insta: insta || '', 
            linkedin: linkedin || '', 
            estrelas: estrelas || ''
        });
    }

    setAdvogadosDepoimento (uid, depoimento )  {
        console.log('Api.setAdvogadosDepoimento');
        console.log(uid);
        console.log(depoimento);
        return firebase.database().ref('advogados').child(uid).child('depoimento').set(depoimento);
    }

    getAdvogado(uid){
        console.log('Api.getAdvogado')
        return firebase.database().ref('advogados')
            .child(uid)
            .once('value', (snapshot)=>{
        });
    }

    getAdvogadoFoto(uid){
        console.log('Api.getAdvogadoFoto')
        return firebase.database().ref('advogados')
            .child(uid)
            .once('value', (snapshot)=>{
        });
    }

    getAdvogadoSearch(nome){
        console.log('Api.getAdvogadoSearch '+nome)
        return firebase.database().ref('advogados')
        .orderByChild('nome').startAt(nome)
        .once('value', (snapshot)=>{
        })

    }

    getAdvogadoFavorito(uid){
        console.log('Api.getAdvogadoFavorito')
        return firebase.database().ref('advogados').child(uid);
    }
//------------------------------------------------------------------------------------
    setImageStorage(nomeImage, blob, mime, uid){
        console.log("Api.setImageStorage")
        let pct = 0;
        let url_imagem = '';
        let imagem = firebase.storage().ref().child(nomeImage);
        let foto = []; 
        uploadBlob = blob;
        return imagem.put(blob, {contentType: mime})
       .then(() => {
            uploadBlob.close()
            return imagem.getDownloadURL()
            .then(function(url) {
                url_imagem = url;
                return url_imagem;
            })
           .then(function() {
                return firebase.database().ref('advogados').child(uid).once('value')
                .then((snapshot)=>{
                    if(snapshot.val().foto){
                        foto = snapshot.val().foto;
                    }
                    return foto;
                })
                .then(function() {
                    foto.push({
                        url_imagem
                    });
                    firebase.database().ref('advogados').child(uid).child('foto').set(foto);
                })
            })
        })        
    }

    deleteImageStorage( fotos, uid){
        console.log("Api.deleteImageStorage")
        let foto = ['https://firebasestorage.googleapis.com/v0/b/backpack-f5a42.appspot.com/o/logo%2FLogoBackPack3.jpeg?alt=media&token=0cf3d848-90c8-426a-bae3-08b894ab2f8e']; 
        fotos.forEach((url_imagem)=>{
            foto.push({
                url_imagem
            });
        })
        return firebase.database().ref('advogados').child(uid).child('foto').set(foto);
    }

    setAvatar(nomeImage, blob, mime, uid){
        console.log("Api.deleteImageStorage")
        let pct = 0;
        let avatar = '';
        let imagem = firebase.storage().ref().child(nomeImage);
        let foto = []; 
        uploadBlob = blob;
        return imagem.put(blob, {contentType: mime})
       .then(() => {
            uploadBlob.close()
            return imagem.getDownloadURL()
            .then(function(url) {
                avatar = url;
                return avatar;
            })
            .then(function() {
                firebase.database().ref('usuarios').child(uid).child('avatar').set(avatar);            
                firebase.database().ref('advogados').child(uid).child('avatar').set(avatar);            
            })
        })        
    }
}

export default new Api();
