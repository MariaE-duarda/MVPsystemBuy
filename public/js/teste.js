/*function separaLinhas(txt){
    var separado = txt.replace(/\r\n/g, '</td></tr><tr><td>')
    separado = separado.replace(/,/g, '</td><td>')
    separado = "<tr><td>" + separado
    separado = "<table>" + separado + "</table>"
    return separado
}*/

function adicionarProdutos(produtos){
    produtos.forEach(produto =>{
        firebase.firestore().collection('produtos').add(produto);
    })
}

function separaLinhas(txt){
    var separado = txt.replace(/\r\n/g, ';')
    separado = separado.split(';')
    console.log(separado)
    var produtos = []
    separado.forEach((item)=>{
        var itens = item.split(',')
        var produto = {}
        produto['nome'] = itens[0]
        produto['marca'] = itens[1]
        produto['preco'] = parseFloat(itens[2])
        produto['unidade'] = itens[3]
        produto['descricao'] = itens[4]
        produto['linkImagem'] = itens[5]
        produtos.push(produto)
        console.log(item)
    })
    produtos.shift()
    console.log(produtos)
    adicionarProdutos(produtos)
    return separado
}


function pegarArquivo(){
    var arquivoSelecionado = document.getElementById('arq')
    var fileReader = new FileReader()
    var s = ''
    var rel = null
    fileReader.onload = function(){
        s = s + separaLinhas(fileReader.result)
        rel.innerHTML = s
    }
    if(arquivoSelecionado){
        console.log('entrei')
        arquivoSelecionado.addEventListener('change', function(e){
            rel = document.getElementById('conteudo')
            s = "<h1>Teste</h1>"
            var arquivo = arquivoSelecionado.files[0]
            fileReader.readAsText(arquivo)
            console.log(arquivo)
            var div = document.getElementById('conteudo')
    
        })
    }
 
    
}