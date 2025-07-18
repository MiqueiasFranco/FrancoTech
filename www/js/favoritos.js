var localFavoritos = localStorage.getItem('favoritos')

if(localFavoritos){
    var favoritos = JSON.parse(localFavoritos)
    if(favoritos.length > 0){
        renderizarFavoritos()
    }
    else{
        $('#lista-favoritos').empty()
        $('#lista-favoritos').html('nao tem nada')
    }

}

function renderizarFavoritos(){

    $('#lista-favoritos').empty()
    $.each(favoritos, function(index, itemFavorito){
        var itemDiv =  `
            <div class="item-favorito"  >
                <div class="area-img">
                    <img src="${itemFavorito.item.imagem}" alt="">
                </div>
                <div class="area-details">
                    <div class="sup">
                        <span class="nome-prod">${itemFavorito.item.nome}</span>
                        <a data-index="${index}" id="delete" class="delete-item" href="#">
                            <i style="color: red;" class="mdi mdi-close"></i>
                        </a>
                    </div>
                    <div class="middle">
                        <span>${itemFavorito.item.principal_caracteristica}</span>
                    </div>
                    
                </div>
            </div>
        `
        $('#lista-favoritos').append(itemDiv)

    })
    $('.delete-item').on('click', function( ){
        var index = $(this).data('index')
        console.log(index)
        
    
        // CONFIRMAR
        app.dialog.confirm('Deseja remover este item?', 'Remover', function(){
            
            
            if(favoritos.quantidade == 1){

                // APAGAR LOCALSTORAGE DO FAVORITOS
                localStorage.removeItem('favoritos')
                app.views.main.router.refreshPage()
                console.log('entrei')
                
            }
            else{
                favoritos.splice(index, 1)
                localStorage.setItem('favoritos',JSON.stringify(favoritos))
                renderizarFavoritos() 
            }

        })
        
        

    })
}


