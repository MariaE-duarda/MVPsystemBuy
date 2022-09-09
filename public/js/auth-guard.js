var useruid = localStorage.getItem('uid') || null
firebase.auth().onAuthStateChanged(function(user){
    if(user == null){
        window.location.href = 'index.html';
    }else{
        useruid = firebase.auth().currentUser.uid
        localStorage.setItem('uid', useruid)
        
    }
})

function sair(){
    firebase.auth().signOut().then(() => {
        window.location.href = 'index.html';
    }).catch((error) => {
        console.log(error);
    })
}
