function cadastrarProduto(){
    var nome = document.getElementById('nomeProduto').value;
    var preco = parseFloat(document.getElementById('precoProduto').value);
    var marca = document.getElementById('marca').value;
    var unidade = document.getElementById('unidade').value;
    var descricao = document.getElementById('descricao').value;
    var linkImagem = document.getElementById('linkImagem').value;
    const produto = {
        'nome': nome,
        'preco': preco,
        'marca': marca,
        'unidade': unidade,
        'descricao': descricao,
        'linkImagem': linkImagem,
        'id': Math.floor(Date.now() * Math.random()).toString(36),
    }
    firebase.firestore().collection('produtos').add(produto).then(() => {
        swal('Produto cadastrado com sucesso!', '', 'success');
        resetarFormulario();
    }).catch((_) =>{
        swal('Não foi possível cadastrar produto!','', 'error');
    })
}

function resetarFormulario(){
    document.getElementById('nomeProduto').value = '';
    document.getElementById('precoProduto').value = '';
    document.getElementById('marca').value = '';
    document.getElementById('unidade').value = '';
    document.getElementById('descricao').value = '';
    document.getElementById('linkImagem').value = '';
}

