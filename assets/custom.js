//Función para alternar entre el formulario de Log In y el formulario de Recovery Password
$(document).ready(function(){
  $('#recovery_password').on('click', function(){
        $('#recovery_password_section').toggleClass('d-none')
        $('#login_section').toggleClass('d-none')
    })
    $('#login_button').on('click', function(){
        $('#recovery_password_section').toggleClass('d-none')
        $('#login_section').toggleClass('d-none')
    })
})

//Funciones para aumentar/disminuir la cantidad de un producto en product card o product page. Funciona con botones de + y -, y en un div debe mostrarse la cantidad (no en un input)
function plus(id){
  $('#qty_'+id).text(parseInt($('#qty_'+id).text()) + 1)
}
function minus(id){
  if($('#qty_'+id).text() > 1){
  $('#qty_'+id).text(parseInt($('#qty_'+id).text()) - 1)
  }
}
