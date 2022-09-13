var select = document.getElementById('input-select');
var value = select.options[select.selectedIndex].value || nome;

var produtos = []
findProdutos(value)

function mudarFiltro(){
    value = select.options[select.selectedIndex].value;
    findProdutos(value)
}

function inverterFiltro(){
    produtos.reverse();
}
function pesquisarProduto(){
    var texto = document.getElementById('input-pesquisa').value
    var textoPuro = texto.toLowerCase()
    firebase.firestore().collection('produtos').orderBy(value).get().then(snapshot => {
       var produtosFiltrados = []
        produtosPesquisado = snapshot.docs.map(doc => doc.data())
        produtosPesquisado.forEach((produto)=>{
            var nome = produto['nome'].toLowerCase()
            var marca = produto['marca'].toLowerCase()
            if(nome.includes(textoPuro) || marca.includes(textoPuro)){
                produtosFiltrados.push(produto)
            }
        })
        addProdutosToScreen(produtosFiltrados, '#317B78', 'https://github.com/MariaE-duarda/Imagens/blob/main/shopping%20cart.png?raw=true')
})
}


function findProdutos(value){
    firebase.firestore().collection('produtos').orderBy(value).get().then(snapshot => {
       
            produtos = snapshot.docs.map(doc => doc.data())
            addProdutosToScreen(produtos, '#317B78', 'https://github.com/MariaE-duarda/Imagens/blob/main/shopping%20cart.png?raw=true')
    })
}

function addProdutosToScreen(produtos, corDoBotao, imagemDoBotao){
    var lista = document.getElementsByClassName("produto");
    for(var i = lista.length - 1; i >= 0; i--)
    {
        lista[i].remove()
    }

    const orderedList = document.getElementById('produtos')

    produtos.forEach(produto =>{ 
        const li = document.createElement('div')
        li.style.width = '95%';
        li.style.height = '170px';
        li.style.borderRadius = '10px';
        li.style.marginLeft = 'auto';
        li.style.marginRight = 'auto';
        li.style.marginBottom = '15px';
        li.style.marginTop = '0px';
        li.className = "produto";
        li.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.5)';
 
        const divInfoProduto = document.createElement('div');
        divInfoProduto.style.height = '110px'; 

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
        inputQuantidade.value = 0
        inputQuantidade.type = 'number'
        inputQuantidade.style.width = '50px'
        inputQuantidade.style.marginRight = '10px'
        inputQuantidade.style.height = '30px'
        inputQuantidade.style.position = 'absolute !important'
        inputQuantidade.style.borderRadius = '5px'
        inputQuantidade.style.marginTop = '-200px'
        inputQuantidade.className = 'numerador'
        inputQuantidade.value = itens[produto.id]
        inputQuantidade.onchange = function (){
            if(inputQuantidade.value < 0){
                inputQuantidade.value = 0
            }
        }
        inputQuantidade.type = 'number';
        inputQuantidade.style.width = '50px';
        inputQuantidade.style.marginRight = '10px';
        inputQuantidade.style.height = '30px';
        inputQuantidade.style.borderRadius = '5px';
        inputQuantidade.className = 'numerador';
        inputQuantidade.value = 0;
        divInput.appendChild(inputQuantidade)
        divBotao.appendChild(divInput);
        divBotao.style.display = 'flex';
        divBotao.style.float = 'right';
        

       const botao = document.createElement('img');
       botao.src = imagemDoBotao
       botao.className = 'button-compra';
       botao.id = 'button-compra';
       botao.style.height = '45px';
       botao.style.width = '45px';
       botao.style.background = 'white';
       botao.style.borderRadius = '5px';
       botao.style.borderColor = 'white';
       botao.style.marginRight = '12px';
       botao.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.5)';
       botao.className = 'button';
       botao.style.backgroundColor = '#317B78'
       botao.style.cursor = 'pointer';
       botao.onclick = function (){
        //selecionarQuantidadeDeItens(produto)
        if(inputQuantidade.value > 0){
            adicionarAoCarrinho(produto['id'], inputQuantidade.value)
            inputQuantidade.value = 0
            let newCarrinho = document.getElementById('img-info');
            newCarrinho.style.display = 'flex';
        }
       }
       
       divBotao.appendChild(botao)
       li.appendChild(divInfoProduto);
       li.appendChild(divBotao);

        orderedList.appendChild(li)
    })
}

function selecionarQuantidadeDeItens(produto){
    Swal.fire({
        title: "Adicionar "+ produto['nome'] +" ao carrinho?",
        text: "Digite a quantidade:",
        input: 'number',
        confirmButtonText: 'Adicionar',
        confirmButtonColor: "#317B78",
        confirmButtonText: "Por no carrinho!",
        showCancelButton: false,
        inputValidator: (result) => {
           if(!(result %1 == 0) | result == 0 | result == ''){
            return 'Digite um número ou algo maior que 0.'
           }
          },      
    }).then((result) => {
        if (result.value) {
            adicionarAoCarrinho(produto.id, result.value)
            alert('Produtos adicionados no carrinho!')

            

        }
    });
}