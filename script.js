/* Proyecto Final - Diseño Web Adaptable - Período III
Estudiantes:
1. Magaña Urrutia, Juan Sebastian - 2019MU601   
2. Santamaría Calderón, René Francisco - 2018SC606
3. Palma Flores, Bryan Mauricio - 2018PF601 */

var shoppingBasket = (function() {
  basket = [];
  
  function Item(name, price, count) {
    this.name = name;
    this.price = price;
    this.count = count;
  }
  
  function saveBasketState() {
    sessionStorage.setItem('shoppingBasket', JSON.stringify(basket));
  }
  
  function loadBasketState() {
    basket = JSON.parse(sessionStorage.getItem('shoppingBasket'));
  }
  if (sessionStorage.getItem("shoppingBasket") != null) {
    loadBasketState();
  }
  
  var obj = {};
  obj.addItemToBasket = function(name, price, count) {
    for(var item in basket) {
      if(basket[item].name === name) {
        basket[item].count ++;
        saveBasketState();
        return;
      }
    }
    var item = new Item(name, price, count);
    basket.push(item);
    saveBasketState();
  }

  obj.substractFromOrder = function(name) {
    for(var item in basket) {
      if(basket[item].name === name) {
        basket[item].count --;
        if(basket[item].count === 0) {
          basket.splice(item, 1);
        }
        break;
      }
    }
    saveBasketState();
  }

  obj.removeFromBasket = function(name) {
    for(var item in basket) {
      if(basket[item].name === name) {
        basket.splice(item, 1);
        break;
      }
    }
    saveBasketState();
  }

  obj.totalCount = function() {
    var totalCount = 0;
    for(var item in basket) {
      totalCount += basket[item].count;
    }
    return totalCount;
  }

  obj.getBasketTotal = function() {
    var basket_total = 0;
    for(var item in basket) {
      basket_total += basket[item].price * basket[item].count;
    }
    return Number(basket_total.toFixed(2));
  }

  obj.getBasketTotalFinal = function() {
    var basket_total = 0;
    for(var item in basket) {
      basket_total += basket[item].price * basket[item].count;
    }

    if (Number(basket_total)>0) {
      return Number(basket_total+5);
    } else {
      return Number(basket_total);
    }    
  }

  obj.listBasket = function() {
    var temp_basket = [];
    for(i in basket) {
      item = basket[i];
      temp_item = {};
      
      for(p in item) {
        temp_item[p] = item[p];
      }
      temp_item.total = Number(item.price * item.count).toFixed(2);
      temp_basket.push(temp_item)
    }
    return temp_basket;
  }
  return obj;
})();

// Get-Display Basket Data
function displayBasket() {
  var lbasket = shoppingBasket.listBasket();
  var output = "";
  for(var i in lbasket) {
    output += "<tr style='font-size:14px;'>"
      + "<td><a class='delete-item' style='cursor: pointer; color:#ED344E;' data-name=" + lbasket[i].name + "><b>X</b></a></td>"
      + "<td>" + lbasket[i].name + "</td>" 
      + "<td><p class='d-none d-lg-block'>P/U: $" + lbasket[i].price.toFixed(2) +"</p></td>"
      + "<td><div class='input-group'><button class='minus-item btn btn-light' style='font-size:14px; border-color: #B7BCBB;' data-name=" + lbasket[i].name + ">-</button>"
      + "<input type='text' class='item-count form-control' style='box-shadow:none; text-align:center; font-size:14px;' data-name='" + lbasket[i].name + "' value='" + lbasket[i].count + "'readonly>"
      + "<button class='plus-item btn btn-light' style='border-color: #B7BCBB; font-size:14px;' data-name=" + lbasket[i].name + ">+</button></div></td>" 
      + "<td><p class='float-right'>= $" + lbasket[i].total + "</p></td>" 
      + "</tr>";
  }
  $('.show-basket').html(output);
  $('.total-cart').html(shoppingBasket.getBasketTotal().toFixed(2));
  $('.total-count').html(shoppingBasket.totalCount());
  $('.total-final').html(shoppingBasket.getBasketTotalFinal().toFixed(2));
}

// 1. Basket - Add Product
$('.add-to-basket').click(function(event) {
  event.preventDefault();
  var name = $(this).data('name');
  var price = Number($(this).data('price'));
  shoppingBasket.addItemToBasket(name, price, 1);
  displayBasket();
});

// 2. Basket - Remove Product
$('.show-basket').on("click", ".delete-item", function(event) {
  var name = $(this).data('name')
  shoppingBasket.removeFromBasket(name);
  displayBasket();
})

// 3. Basket Product Amount - Sub 1
$('.show-basket').on("click", ".minus-item", function(event) {
  var name = $(this).data('name')
  shoppingBasket.substractFromOrder(name);
  displayBasket();
})

// 4. Basket Product Amount - Add 1
$('.show-basket').on("click", ".plus-item", function(event) {
  var name = $(this).data('name')
  shoppingBasket.addItemToBasket(name);
  displayBasket();
})

// Display on load
displayBasket();
