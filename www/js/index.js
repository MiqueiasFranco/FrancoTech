fetch('js/backend.json')
.then(response => response.json())
.then(data =>{
    //salvar os dados do backend localmente (localstorage)
    localStorage.setItem('produtos',JSON.stringify(data))

    //ESVAZIAR A AREA DE PRODUTOS
    setTimeout(()=>{
        $('#produtos').empty()
        data.forEach(produto => {
        var produtoHTML = `
             <div class="item-card">
                <a data-id="${produto.id}{" href="#" class="item">
                    <div class="img-container">
                        <img  src="${produto.imagem}" alt="">
                    </div>
                    <div class="nome-rating">
                        <span class="color-gray">${produto.nome}</span>
                        <span class="bold margin-right"><i class="mdi mdi-star"></i> ${produto.rating}</span>
                    </div>
                    <div class="price bold">
                        ${produto.preco_promocional.toLocaleString('pt-Br',{style:'currency',currency:'BRL'})}
                    </div>
                </a>
            </div>
        `;

        $('#produtos').append(produtoHTML)
        });
        $('.item').on('click',function(){
            var id = $(this).attr('data-id')
            localStorage.setItem('detalhe', id)
            app.views.main.router.navigate('/detalhes/')
        })
    },1500)
    

})
.catch(error => console.error('Erro ao fazer o fetch dos dados:'+ error))

// ver quantos itens tem dentro do carrinho

setTimeout(() => {
    var carrinho = JSON.parse(localStorage.getItem('carrinho')) || []

    //alimentar o contador da sacola
    $('.btn-cart').attr('data-count', carrinho.length)
}, 300);



setTimeout(() => {
    var favoritos = JSON.parse(localStorage.getItem('favoritos')) || []

    //alimentar o contador da sacola
    $('.favoritos').attr('data-count', favoritos.length)
}, 300);