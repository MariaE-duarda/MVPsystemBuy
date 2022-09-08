firebase.auth().onAuthStateChanged(function(user){
    if(user){
        window.location.href = 'painelCliente.html';
    }
})


function entrar(){
    var inputName = document.getElementById('usuario');
    var inputSenha = document.getElementById('senha');
    firebase.auth().signInWithEmailAndPassword(inputName.value, inputSenha.value)
            .then((_) => {
                window.location.replace('painelCliente.html')
            })
            .catch((error) => {
                console.log('error', error.code)
                swal('Não foi possível fazer login', getMessageError(error), 'error')
            });
}

function getMessageError(error){
    if(error.code == 'auth/user-not-found'){
        return 'Usuário não encontrado!';
    }else if(error.code == 'auth/invalid-email'){
        return 'Email inválido!';
    }else if(error.code == 'auth/wrong-password'){
        return 'Senha inválida!';
    }else{
        return error.code;
    }
}


