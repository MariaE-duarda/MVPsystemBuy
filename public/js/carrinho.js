var itens = JSON.parse(localStorage.getItem(useruid)) || {};
var itensDoCarrinho = []
var valor = 0


function adicionarAoCarrinho(idProduto, quantidade){
    itens[idProduto] = parseInt(itens[idProduto] || 0) + parseInt(quantidade)
    localStorage.setItem(useruid, JSON.stringify(itens));
}

function addProdutosToScreenCart(produtos){
    var lista = document.getElementsByClassName("produto");
    for(var i = lista.length - 1; i >= 0; i--)
    {
        lista[i].remove()
    }
    var lista = document.getElementsByClassName("nenhum-produto");
    for(var i = lista.length - 1; i >= 0; i--){
        lista[i].remove()
    }
    const orderedList = document.getElementById('produtos-carrinho')
    if(produtos.length == 0){
        var img = document.createElement('img')
        img.src = '../assets/ecommerce-campaign-animate.svg'
        img.style.marginLeft = '90%'
        img.style.height = '100%'
        img.style.width = '100%'
        orderedList.appendChild(img)
    }
        produtos.forEach(produto =>{ 
            const li = document.createElement('div')
            li.style.width = '80%';
            li.style.height = '160px';
            li.style.maxBlockSize = '500px'
            li.style.borderRadius = '10px';
            li.style.marginLeft = 'auto';
            li.style.marginRight = 'auto';
            li.style.marginBottom = '15px';
            li.style.marginTop = '0px';
            li.className = 'divProduto';
            li.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.5)';

            const divInfoProduto = document.createElement('div');
            divInfoProduto.style.height = '143px';
            
            const divInfo = document.createElement('div')
            divInfo.style.display = 'flex';
            divInfo.style.flexDirection = 'Column';
            
            

            const nome = document.createElement('h3')
            nome.innerHTML = '<b>Nome do produto: </b>' + produto['nome'];
            nome.style.float = 'left';
            nome.style.fontWeight = '500';
            nome.style.marginTop = '15px';
            nome.style.textAlign = 'left';
            nome.style.marginLeft = '20px';
            nome.style.fontSize = '14px';
            divInfo.appendChild(nome)
            

            const marca = document.createElement('h4') 
            marca.innerHTML = '<b>Marca: </b> ' + produto['marca']
            marca.style.float = 'left';
            marca.style.fontWeight = '500';
            marca.style.textAlign = 'left';
            marca.style.fontSize = '14px';
            marca.style.marginLeft = '20px';
            divInfo.appendChild(marca)

            const preco = document.createElement('h4') 
            preco.innerHTML = '<b>Valor: </b> R$' + produto['preco'].toFixed(2);
            preco.style.fontWeight = '500';
            preco.style.textAlign = 'left';
            preco.style.fontSize = '14px';
            preco.style.marginLeft = '20px';
            divInfo.appendChild(preco)
            li.appendChild(divInfo)
            li.style.backgroundColor = '#dedede';
            li.style.marginTop = '20px';

            const descricao = document.createElement('h4');
            descricao.innerHTML = '<b>Descrição: </b>' + produto['descricao'];
            descricao.style.fontWeight = '500';
            descricao.style.textAlign = 'left';
            descricao.style.fontSize = '12px';
            descricao.style.marginLeft = '20px';
            divInfo.appendChild(descricao)
            divInfoProduto.appendChild(divInfo)

            const divBotao = document.createElement('div');

            const divInput = document.createElement('div')
            divInput.style.alignSelf = 'center';

            const inputQuantidade = document.createElement('input');
            inputQuantidade.value = itens[produto.id]
            inputQuantidade.onchange = function (){
                itens[produto.id] = inputQuantidade.value
                atualizarValorTotal()
            }
            inputQuantidade.type = 'number'
            inputQuantidade.style.width = '50px'
            inputQuantidade.style.marginRight = '10px'
            inputQuantidade.style.height = '30px'
            inputQuantidade.style.borderRadius = '5px'
            inputQuantidade.className = 'numerador'
            divInput.appendChild(inputQuantidade)
            divBotao.appendChild(divInput);
            divBotao.style.display = 'flex';
            divBotao.style.float = 'right';
            divBotao.style.marginTop = '-45px';


            const botao = document.createElement('img');
            botao.src = '../public/assets/delete.png';
            botao.style.height = '45px';
            botao.style.width = '45px';
            botao.style.background = '#D21D1D';
            botao.style.borderRadius = '5px';
            botao.style.borderColor = 'white';
            botao.style.marginRight = '12px';
            botao.className = 'button';
            botao.style.cursor = 'pointer';
            botao.onclick = function (){
                confirmarExclusao(produto['id'])
            }
            botao.style.border = '4px solid white';
        
            divBotao.appendChild(botao)
            li.appendChild(divInfoProduto);
            li.appendChild(divBotao);

            orderedList.appendChild(li)
            
        })
    
}


pegarItensDoCarrinho(itensDoCarrinho)

function pegarItensDoCarrinho(itensDoCarrinho){
    var valorTotal = 0
    firebase.firestore().collection('produtos').get().then(snapshot => {
        var todosProdutos = snapshot.docs.map(doc => doc.data())
        Object.keys(itens).forEach(key =>{
            todosProdutos.forEach(produto =>{
                if(produto['id'] == key){
                    itensDoCarrinho.push(produto)
                    valorTotal += (produto['preco'] * parseInt(itens[key]))
                }
            })
        })
        addProdutosToScreenCart(itensDoCarrinho)
        atualizarValorTotal()
    })
}
function atualizarValorTotal(){
    valor = 0
    itensDoCarrinho.forEach(item => {
        var precoTotalProduto = item.preco
        precoTotalProduto *= itens[item.id]
        valor += precoTotalProduto
    })
    var total = `R$ ${valor.toFixed(2)}`  
    document.querySelector('#total-carrinho h3').innerHTML = total;
}

function confirmarExclusao(id){
    Swal.fire({
        title: 'Tem certeza disso?',
        showDenyButton: true,
        confirmButtonText: 'Excluir',
        denyButtonText: 'Não Excluir',       
        }).then((result) => {
            if (result.isConfirmed) {
                console.log(itensDoCarrinho)
                delete itens[id]
                itensDoCarrinho = itensDoCarrinho.filter(item =>{
                    item.id !== id
                })
                localStorage.setItem(useruid, JSON.stringify(itens));
                pegarItensDoCarrinho(itensDoCarrinho)
                atualizarValorTotal()
                Swal.fire('Produto Excluído!', '', 'success')
                pegarItensDoCarrinho()
            }
    })
}

var button = document.getElementById('finalizar-compra')


async function finalizarCompra(){
    if(itensDoCarrinho.length < 1) return;
    var mensagem = 'Olá, Ravel!\nGostaria de fazer o seguinte pedido:\n'
    var pedido = {}
    var total = 0
    const timeElapsed = Date.now('pt-br');
    var today = new Date(timeElapsed);
    pedido['today'] = today.toISOString('pt-br')
    hoje = today.toLocaleDateString('pt-br')
    var hora = today.toLocaleTimeString()
    pedido['data'] = hoje
    pedido['hora'] = hora
    var userIdToken = firebase.auth().currentUser;
    pedido['idCliente'] = userIdToken.uid;
    
   await firebase.firestore().collection('numeroPedido').get().then(snapshot => {
       
        numero = snapshot.docs.map(doc => doc.data())
        numero = parseInt(numero[0]['numero'])
        pedido['numeroPedido'] = numero
        firebase.firestore().collection('numeroPedido').doc('numeroAtual').set({'numero': numero + 1})
    })

    pedido['total'] = valor.toFixed(2)

    var produtosDoCarrinho = []
    itensDoCarrinho.forEach(item => {
        mensagem += `${itens[item['id']]}x ${item['nome']} (R$ ${(item['preco'] * itens[item['id']]).toFixed(2)})\n`
        var produtoAtual = {}
        produtoAtual['nome'] = item['nome']
        produtoAtual['preco'] = item['preco']
        produtoAtual['quantidade'] = itens[item['id']]
        total += item['preço'] * itens[item['id']]
        produtosDoCarrinho.push(produtoAtual)
    })
    pedido['produtos'] = produtosDoCarrinho
    
    firebase.firestore().collection('pedidos').add(pedido).then(()=>{
        Swal.fire({
            title: 'Pedido feito com sucesso!',
            icon: 'success',
        });
        itensDoCarrinho = []
        itens = {}
        localStorage.setItem(useruid, JSON.stringify(itens));
        atualizarValorTotal()
        addProdutosToScreenCart(itensDoCarrinho)
        mensagem += `TOTAL: R$ ${pedido['total']}\n`
        mensagem += `Pedido: nº ${pedido['numeroPedido']}`
        console.log(mensagem)
        mensagem = window.encodeURIComponent(mensagem)
        window.open(`https://api.whatsapp.com/send?phone=5584999391233&text=${mensagem}`, '_blank')
    })
}

