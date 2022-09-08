var uid = ''
firebase.auth().onAuthStateChanged(function(user){
    if(user){
        //window.location.href = 'home.html';
    }else{
        uid = firebase.auth().currentUser.uid
    }
})

  function registrar(){
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('usuario').value;
    const whatsapp = document.getElementById('whatsapp').value;
    const password = document.getElementById('senha').value;
    const confirmPassword = document.getElementById('confirm-senha').value;
    if(password == confirmPassword){
        firebase.auth().createUserWithEmailAndPassword(email, password).then(function(){
            
            const usuario = {
                'nome': nome,
                'email': email,
                'whatsapp': whatsapp,
            }
            firebase.firestore().collection('usuarios').doc(firebase.auth().currentUser.uid).set(usuario).then(()=>{
                console.log('registrado')
                console.log(firebase.auth().currentUser.uid)
                window.location.href ='home.html';
            });
        }).catch((error) => {
            swal('Não foi possível registrar usuário', getMessageError(error), 'error');
        })
    }else{
        swal('Não foi possível registrar usuário', 'Confirme sua senha corretamente', 'error');
    }
}

function getMessageError(error){
    if(error.code == 'auth/user-not-found'){
        return 'Usuário não encontrado!';
    }else if(error.code == 'auth/invalid-email'){
        return 'E-mail inválido!';
    }else if(error.code == 'auth/wrong-password'){
        return 'Senha inválida!';
    }else if(error.code == 'auth/email-already-in-use'){
        return 'E-mail já cadastrado. Tente fazer Login!';
    }else if(error.code == 'auth/weak-password'){
        return 'A senha deve ter no minímo 6 caracteres!';
    }else{
        return error.code;
    }
}
