var localCarrinho = localStorage.getItem('carrinho')

if(localCarrinho){
    var carrinho = JSON.parse(localCarrinho)
    if(carrinho.length >0){
        // TEM ITENS NO CARRINHO
        // RENDERIZAR O CARRINHO
            rendeizarCarrinho()
        // SOMAR TOTAIS DOS PRODUTOS
        calcularTotal()
    }
    else{
        //MOSTRAR CARRINHO VAZIO
        carrinhoVazio()
    }
}
else{
    // MOSTRAR O CARRINHO VAZIO
    carrinhoVazio()
}

function rendeizarCarrinho(){
    // ESVAZIAR  A AREA DOS ITENS
    $('#lista-carrinho').empty()
    // PERCORRER O NOSSO CARRINHO E ALIMENTAR A AREA
    $.each(carrinho, function(index, itemCarrinho){
        var itemDiv = `
            <div class="item-carrinho" "  >
                <div class="area-img">
                    <img src="${itemCarrinho.item.imagem}" alt="">
                </div>
                <div class="area-details">
                    <div class="sup">
                        <span class="nome-prod">${itemCarrinho.item.nome}</span>
                        <a data-index="${index}" id="delete" class="delete-item" href="#">
                            <i style="color: red;" class="mdi mdi-close"></i>
                        </a>
                    </div>
                    <div class="middle">
                        <span>${itemCarrinho.item.principal_caracteristica}</span>
                    </div>
                    <div class="preco-quantidade">
                        <span>${itemCarrinho.item.preco_promocional.toLocaleString('pt-Br',{style:'currency',currency:'BRL'})}</span>
                        <div class="count">
                            <a  data-index='${index}'  class="minus" href="#"><i class="mdi mdi-minus"></i></a>
                            <input readonly class="qtd-item" type="text" value="${itemCarrinho.quantidade}">
                            <a  data-index='${index}' class="plus" href="#"><i class="mdi mdi-plus"></i></a>
                        </div>
                    </div>
                </div>
            </div>
        `

        $('#lista-carrinho').append(itemDiv)
    })
    // ESVAZIAR CARRINHO AO CLICAR NO ICONE
    $("#esvaziar").on('click', function(){
        app.dialog.confirm('Deseja Esvaziar o Carrinho?', "ESVAZIAR CARRINHO", function(){
            // APAGAR LOCALSTORAGE DO CARRINHO
            localStorage.removeItem('carrinho')
            app.views.main.router.refreshPage()
        })
    })
    // DELETAR ITEM AO CLICAR NO ICONE
    $('.delete-item').on('click', function(){
        var index = $(this).data('index')
        console.log(index)
        // CONFIRMAR
        app.dialog.confirm('Deseja remover este item?', 'Remover', function(){
            // REMOVER DO CARRINHO
            carrinho.splice(index, 1)
            // ATUALIZAR O CARRINHO COM O ITEM REMOVIDO
            localStorage.setItem('carrinho',JSON.stringify(carrinho))
            // ATUALIZAR A PAGINA
            rendeizarCarrinho()    

        })
    })
    // REDUZIR QUANTIDADE OU EXCLUIR ITEM AO CLICAR NO ICONE
    $('.minus').on('click',function(){
        var index = $(this).attr('data-index')
        console.log(carrinho.quantidade)
        // SE TEM MAIS DE UM ITEM NA QUANTIDADE
        if(carrinho[index].quantidade > 1){
            carrinho[index].quantidade --
            carrinho[index].total_item = carrinho[index].quantidade * carrinho[index].item.preco_promocional
            localStorage.setItem('carrinho', JSON.stringify(carrinho))
            rendeizarCarrinho()    
            calcularTotal()
        }
        else{
            app.dialog.confirm(`Deseja remover o item ${carrinho[index].item.nome} ?`, 'Remover', function(){
                    // REMOVER DO CARRINHO
                    carrinho.splice(index, 1)
                    // ATUALIZAR O CARRINHO COM O ITEM REMOVIDO
                    localStorage.setItem('carrinho',JSON.stringify(carrinho))
                    // ATUALIZAR A PAGINA
                    calcularTotal()
            })
        }
    })
    // ADICIONAR QUANTIDADE AO CLICAR NO ICONE
    $('.plus').on('click',function(){
        var index = $(this).attr('data-index')
        console.log(index)
        // SE TEM MAIS DE UM ITEM NA QUANTIDADE
        
        carrinho[index].quantidade ++
        carrinho[index].total_item = carrinho[index].quantidade * carrinho[index].item.preco_promocional
        localStorage.setItem('carrinho', JSON.stringify(carrinho))
        rendeizarCarrinho()    
        calcularTotal()
        
            
        
    })
        
}

function calcularTotal(){
    var totalCarrinho = 0
    $.each(carrinho, function(index, itemCarrinho){
        totalCarrinho += itemCarrinho.total_item
    })
    // MOSTRAR O TOTAL
    $("#subtotal").html(totalCarrinho.toLocaleString('pt-Br',{style:'currency',currency:'BRL'}))
}

function carrinhoVazio(){

    // ESVAZIAR LISTA DO CARRINHO
    $('#lista-carrinho').empty()
    // SUMIR OS ITENS DE BAIXO BOTOES TOTAIS
    $('.toolbar').addClass('display-none')
    // MOSTRAR SACOLINHA VAZIA
    $('#lista-carrinho').html(`
        <div class="text-align-center">
            <img width='300px' src="img/empty.gif" alt="" srcset="">
            <p style='color:gray;'>Nada por Enquanto ...</p>
        </div>    
    `)

}



