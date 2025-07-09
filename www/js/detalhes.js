//  RECUPERAR O ID DETALHE DO LOCALSTORAGE
var id = parseInt(localStorage.getItem('detalhe'))

// PEGAR OS PRODUTOS DO LOCALSTORAGE
var produtos = JSON.parse(localStorage.getItem('produtos'))

var item = produtos.find(produto => produto.id === id)

if(item){
    //item encontrado
    console.log('produto encontrado: ', item)

    //alimentar os campos
    $('#imagem-detalhe').attr('src', item.imagem)
    $('#nome-detalhe').html(item.nome)
    $('#rating-detalhe').html(item.rating)
    $('#like-detalhe').html(item.likes)
    $('#reviews-detalhe').html(item.reviews + ' Reviews')
    $('#descricao-detalhe').html(item.descricao)
    $('#preco-detalhe').html(item.preco.toLocaleString('pt-Br',{style:'currency',currency:'BRL'}))
    $('#precopromo-detalhe').html(item.preco_promocional.toLocaleString('pt-Br',{style:'currency',currency:'BRL'}))

    var tabelaDetalhes = $('#tab-detalhes')

    item.detalhes.forEach(detalhe => {
        var linha = `<tr>
                        <td>${detalhe.caracteristica}</td>
                        <td>${detalhe.detalhes}</td>
                     </tr>`
        tabelaDetalhes.append(linha)
    });
}
else{
    console.log('produto nao encontrado')
}

var carrinho =JSON.parse(localStorage.getItem('carrinho')) || []

//funcao para adicionar ao carrinho
function adicionarAoCarrinho(item, quantidade){
    var itemNoCarrinho = carrinho.find(c=> c.item.id === id)
    if(itemNoCarrinho){
        // ja tem o item no carrinho
        // adicionar quantidade
        itemNoCarrinho.quantidade += quantidade
        itemNoCarrinho.total_item = itemNoCarrinho.quantidade * item.preco_promocional

    }
    else{
        carrinho.push({
            item:item,
            quantidade:quantidade,
            total_item: quantidade * item.preco_promocional
        })
    }

    //atualizar o localstorage do carrinho
    localStorage.setItem('carrinho', JSON.stringify(carrinho))

}


$('.add-cart').on('click',function(){
    adicionarAoCarrinho(item,1)
    var toastCenter = app.toast.create({
          text: `${item.nome} adicionado ao carrinho`,
          position: 'center',
          closeTimeout: 2000,
    });
        
    toastCenter.open()
})
