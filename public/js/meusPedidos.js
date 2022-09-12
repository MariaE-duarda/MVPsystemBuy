var pedidos = JSON.parse(localStorage.getItem(`meusPedidos${useruid}`)) || []
var tipoDeUsuario = localStorage.getItem('tipo')
var qtdPedidos = pedidos.length
atualizarNumeroDePedidos(qtdPedidos)
pegarPedidos()
function pegarPedidos(){
    if(useruid && (tipoDeUsuario == 'cliente')){
        console.log('É cliente rapaz')
        firebase.firestore().collection('pedidos').where('idCliente', '==', useruid).orderBy('today', 'desc').get().then(snapshot => {
            pedidos = snapshot.docs.map(doc => doc.data())
            localStorage.setItem(`meusPedidos${useruid}`, JSON.stringify(pedidos))
            adicionarPedidosNaTela(pedidos)
            atualizarNumeroDePedidos(pedidos.length)
        });    
    }else if(useruid && (tipoDeUsuario == 'vendedor')){
        firebase.firestore().collection('pedidos').orderBy('today', 'desc').get().then(snapshot => {
            pedidos = snapshot.docs.map(doc => doc.data())
            localStorage.setItem(`meusPedidos${useruid}`, JSON.stringify(pedidos))
            adicionarPedidosNaTela(pedidos)
            atualizarNumeroDePedidos(pedidos.length)
        });
    }
}

function adicionarPedidosNaTela(meusPedidos){
    var divPedidos = document.getElementById('pedidos');

    meusPedidos.forEach((meuPedido)=>{

        var divCard = document.createElement('div');
        divCard.className = 'pedido'
        var divInfo = document.createElement('div')
        divInfo.style.display = 'flex'
        divInfo.style.flexDirection = 'column'
        var numeroPedido = document.createElement('p')
        numeroPedido.innerHTML = `<b>Nº do Pedido</b>: ${meuPedido['numeroPedido']}`
        numeroPedido.style.color = 'white'
        numeroPedido.style.float = 'left'
        numeroPedido.style.marginLeft = '7px'
        numeroPedido.style.marginTop = '5px'
        numeroPedido.className = 'texto'
        divInfo.appendChild(numeroPedido)
        if(tipoDeUsuario == 'vendedor'){
            var email = document.createElement('p')
            email.innerHTML = `<b>Email</b>: ${meuPedido['emailCliente']}`
            email.style.color = 'white'
            email.style.float = 'left'
            email.style.marginLeft = '7px'
            email.style.marginTop = '5px'
            email.className = 'texto'
            divInfo.appendChild(email)
        }
        var dataEHora = document.createElement('p')
        dataEHora.innerHTML = ` <b>Dia</b>: ${meuPedido['data']}<br> <b>Horas</b>: ${meuPedido['hora']}<br><br>`
        dataEHora.style.float = 'left'
        dataEHora.style.marginLeft = '5px'
        dataEHora.style.marginTop = '5px'
        dataEHora.className = 'texto'
        divInfo.appendChild(dataEHora)
        divCard.appendChild(divInfo)

        meuPedido['produtos'].forEach((produto)=>{
            var divProduto = document.createElement('div')
            divProduto.className = 'divProduto'
            var quantidadeEProduto = document.createElement('p')
            quantidadeEProduto.innerHTML = `  ${produto['nome']} - ${produto['quantidade']} unidade(s)`
            quantidadeEProduto.className = 'texto'
            quantidadeEProduto.style.width = 'max-content'
            quantidadeEProduto.style.marginLeft = ''
            divProduto.appendChild(quantidadeEProduto)
            var precoTotalProduto = document.createElement('p')
            precoTotalProduto.innerHTML = `R$ ${(produto['preco'] * produto['quantidade']).toFixed(2)}`
            precoTotalProduto.className = 'texto'
            precoTotalProduto.style.float = 'right'
            precoTotalProduto.style.marginRight = '5px'
            divProduto.appendChild(precoTotalProduto)
            divCard.appendChild(divProduto)
        })

        var barra = document.createElement('hr')
        barra.style.borderColor = 'black'
        divCard.appendChild(barra)

        var divTotal = document.createElement('div')
        divTotal.style.display = 'flex'
        divTotal.style.flexDirection = 'row'
        divTotal.style.justifyContent = 'space-between'
        var textoTotal = document.createElement('p')
        textoTotal.innerHTML = 'Total'
        textoTotal.style.fontWeight = '600'
        textoTotal.style.marginLeft = '5px'
        textoTotal.className = 'texto'
        divTotal.appendChild(textoTotal)
        var total = document.createElement('p')
        total.innerHTML = `R$${meuPedido['total']}`
        total.style.marginRight = '5px'
        total.className = 'texto'
        total.style.fontWeight = '600'
        divTotal.appendChild(total)
        divCard.appendChild(divTotal)
    
        divPedidos.appendChild(divCard)
    })

}

function atualizarNumeroDePedidos(numeroDePedidos){
    if(tipoDeUsuario == 'cliente'){
        document.getElementById('total-pedidos').innerHTML = `Você fez ${numeroDePedidos} pedidos`;
    }else if(tipoDeUsuario == 'vendedor'){
        document.getElementById('total-pedidos').innerHTML = `Foram feitos ${numeroDePedidos} pedidos`;
    }
}
editarPedido(28)
function editarPedido(numeroDoPedido){
    firebase.firestore().collection('pedidos').where('numeroPedido', '==', numeroDoPedido).get().then(snapshot =>{
        //console.log(snapshot.docs)
    })
}