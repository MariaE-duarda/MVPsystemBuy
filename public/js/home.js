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




function findProdutos(value){
    firebase.firestore().collection('produtos').orderBy(value).get().then(snapshot => {
       
            produtos = snapshot.docs.map(doc => doc.data())
            addProdutosToScreen(produtos, '#317B78', 'https://static.vecteezy.com/system/resources/previews/000/487/765/original/shopping-cart-icon-design-vector.jpg')
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
        li.style.height = '130px';
        li.style.borderRadius = '10px';
        li.style.marginLeft = 'auto';
        li.style.marginRight = 'auto';
        li.style.marginBottom = '15px';
        li.style.marginTop = '0px';
        li.className = 'produto';
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


       const botao = document.createElement('img');
       botao.src = imagemDoBotao
       botao.className = 'button-compra';
       botao.id = 'button-compra';
       botao.style.height = '50px';
       botao.style.backgroundImage = 'url("../assets/shopping\ cart.png")';
       botao.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.5)';
       botao.style.width = '50px';
       botao.style.background = corDoBotao;
       botao.style.borderRadius = '10px';
       botao.style.marginTop = '-85px';
       botao.style.marginRight = '3%';
       botao.style.marginBottom = '100px';
       botao.style.float = 'right';
       botao.style.cursor = 'pointer';
       botao.style.position = 'relative!important';
       botao.onclick = function (){
        selecionarQuantidadeDeItens(produto)
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

            let newCarrinho = document.getElementById('img-info');
            newCarrinho.style.display = 'flex';

        }
    });
}