//Función para borrar productos dentro del carrito y actualizar el precio
//El input de cantidad debe tener el id updates_{{ item.product.id }}
//@param int {{ item.variant.id }} id de la variante del producto
//@param int {{ item.product.id }} id del producto
//onclick="Shopify.removeItem({{ item.variant.id }}, {{ item.product.id }})"

Shopify.removeItem = async function(id, selector){
	let element = document.querySelector("#updates_"+selector)
    let min = parseInt(element.getAttribute('min'))
    let val = parseInt(element.value)
    console.log(val)
    if(val-1 >= min){
    $("#updates_"+selector).get(0).value-- 
    let qty = $("#updates_"+selector).val() 
  await $.ajax({
    method:'POST',
    url:'/cart/change.js',
    data:{ id:id, quantity:qty },
    dataType: 'json'
  }).done( () => {
        jQuery.getJSON('/cart.js', function(cart) {
   // now have access to Shopify cart object
      items = cart.items
   items.forEach(function( value ) {
       //console.log("price_"+value.id +' '+ value.final_price)
        //console.log("subtotal_"+value.id +' '+ value.final_line_price)
        
      $("#subtotal_"+value.id).html(Shopify.formatMoney(value.final_line_price))
    //  $("#price_")
      //condicion si value.quantity >= qty
      console.log(value.quantity)
      console.log(qty)
  });
        $("#cart_total_price").html(Shopify.formatMoney(cart.items_subtotal_price) )
   console.log(cart)
} );
     })
}
}


//Función para agregar productos dentro del carrito y actualizar el precio
//El input de cantidad debe tener el id updates_{{ item.product.id }}
//@param int {{ item.variant.id }} id de la variante del producto
//@param int {{ item.product.id }} id del producto
//onclick="Shopify.addItem({{ item.variant.id }}, {{ item.product.id }})"

Shopify.addItem = async function(id, selector){
    
    $("#updates_"+selector).get(0).value++
    let qty = $("#updates_"+selector).val() 
  await $.ajax({
    method:'POST',
    url:'/cart/change.js',
    data:{ id:id, quantity:qty },
    dataType: 'json'
  }).done( () => {
          jQuery.getJSON('/cart.js', function(cart) {
   // now have access to Shopify cart object
   items = cart.items
   items.forEach(function( value ) {
        console.log("price_"+value.id +' '+ value.final_price)
        console.log("subtotal_"+value.id +' '+ value.final_line_price)
        

      $("#subtotal_"+value.id).html(Shopify.formatMoney(value.final_line_price))
      
  });
    $("#cart_total_price").html(Shopify.formatMoney(cart.items_subtotal_price ))
   console.log(cart)
} );
     })
}



var Shopify = Shopify || {};
// ---------------------------------------------------------------------------
// Money format handler
// ---------------------------------------------------------------------------
Shopify.money_format = "${{amount}}";
Shopify.formatMoney = function(cents, format) {
  if (typeof cents == 'string') { cents = cents.replace('.',''); }
  var value = '';
  var placeholderRegex = /\{\{\s*(\w+)\s*\}\}/;
  var formatString = (format || this.money_format);

  function defaultOption(opt, def) {
     return (typeof opt == 'undefined' ? def : opt);
  }

  function formatWithDelimiters(number, precision, thousands, decimal) {
    precision = defaultOption(precision, 2);
    thousands = defaultOption(thousands, ',');
    decimal   = defaultOption(decimal, '.');

    if (isNaN(number) || number == null) { return 0; }

    number = (number/100.0).toFixed(precision);

    var parts   = number.split('.'),
        dollars = parts[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1' + thousands),
        cents   = parts[1] ? (decimal + parts[1]) : '';

    return dollars + cents;
  }

  switch(formatString.match(placeholderRegex)[1]) {
    case 'amount':
      value = formatWithDelimiters(cents, 2);
      break;
    case 'amount_no_decimals':
      value = formatWithDelimiters(cents, 0);
      break;
    case 'amount_with_comma_separator':
      value = formatWithDelimiters(cents, 2, '.', ',');
      break;
    case 'amount_no_decimals_with_comma_separator':
      value = formatWithDelimiters(cents, 0, '.', ',');
      break;
  }

  return formatString.replace(placeholderRegex, value);
};

function addToCart(id,qty){
  console.log(id)
  formData = {
    'items': [
      {
        'id': id,
        'quantity': qty
      }
    ]
  };
  var ser = 'id=' + id + '&quantity=' + qty
  console.log(ser)
  $.ajax({
    url: "/cart/add.js",
    dataType: 'json',
    type: 'POST',
    data: ser,
    success: function(itemData) {
      console.log('bien')
      tata.success("", "Producto añadido.", {
        duration: 2000,
        animate: "slide",
      });
      jQuery.getJSON('/cart.js', function(cart) {
        $('#cart_count').text(cart.item_count)
      } );
    },
    error: function(XMLHttpRequest) {
      console.log('mal')
    }
  });
}
