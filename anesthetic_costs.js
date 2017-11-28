var view;
var cart;

$(document).ready(function() {
	view = $("#content");
	//cart = $("#cart");
	//TEST
	showLoginPage();
	//ENDTEST
});

var showLoginPage = function() {
	view.empty();
	view.append("<form id='login_form'><input type='text' name='username' placeholder='Username' required><br><input type='password' name='password' placeholder='Password' required><br><input type='submit' value='Login'></form>");

	$("#login_form").on("submit", function(e) {
		e.stopPropagation();
		e.preventDefault();

		$.ajax('login.php', {
				type:'GET',
				data:$('#login_form').serialize(),
				cache:false,
				success:function() {
					alert('Login Successful');
					showDrugs();
				},
				error:function() {
					alert('Login Failed');
				}
			});
	});
}

var addNonInhalableToShoppingCart = function(name, unitCost, id){
	cart = $("#cart");
	newCartItem = $("<div class='cartItem'></div>");
	newCartItem.append("<h1>"+name+"</h1>");
	newCartItem.append("Cost: " + unitCost + " per unit");
	itemForm = $("<form class='input_form'> Amount requested: </form>");
	itemFormBox = $("<input class='nonInhalableAmount' type='text' name ='amount' value=''>");
	item = new CartItem(itemFormBox, false, name, id, unitCost, 4,
		null, null, null, null, null, null, null, null);
	itemForm.data("cartItem", item);
	itemFormBox.data("cartItem", item);
	itemForm.append(itemFormBox);
	newCartItem.append(itemForm);
	cart.append(newCartItem);
}

$(document).on('change', '.nonInhalableAmount', function(e){
	myFormBox = $(this);
	myCartItem = myFormBox.data("cartItem");
	myCartItem.updateAmount(myCartItem);
	totalCost = myCartItem.calculateCost(myCartItem);
	newDiv = $("<div class=totalCostDiv></div>");
	newDiv.append("The total cost is " + totalCost);
	myFormBox.closest("div").children("div").remove();
	myFormBox.closest("div").append(newDiv);
});


var addInhalableToShoppingCart = function(name, costPerMl, constant, id){
	cart = $("#cart");
	newCartItem = $("<div class='cartItem'></div>");
	newCartItem.append("<h1>"+name+"</h1>");
	newCartItem.append("Cost: " + costPerMl + " per mL");
	itemForm = $("<form class='input_form'></form>");
	flowBox = $("<input class = 'inhalableAmount' type='text' name ='flow' value=''>");
	inBox = $("<input class = 'inhalableAmount' type='text' name ='inConcentration' value=''>");
	timeBox = $("<input class = 'inhalableAmount' type='text' name ='time' value=''>");
	item = new CartItem(null, true, name, id, null, null,
		costPerMl, constant, 0, 0, 0, flowBox, inBox, timeBox);
	itemForm.data("cartItem", item);
	flowBox.data("cartItem", item);
	inBox.data("cartItem", item);
	timeBox.data("cartItem", item);
	itemForm.append("Flow (L/min): ")
	itemForm.append(flowBox);
	itemForm.append("<br>");
	itemForm.append("Inspired Concentration (%): ");
	itemForm.append(inBox);
	itemForm.append("<br>");
	itemForm.append("Time (min): ")
	itemForm.append(timeBox);
	newCartItem.append(itemForm);
	cart.append(newCartItem);
}

$(document).on('change', '.inhalableAmount', function(e){
	myFormBox = $(this);
	myCartItem = myFormBox.data("cartItem");
	myCartItem.updateFlow(myCartItem);
	myCartItem.updateInConcentration(myCartItem);
	myCartItem.updateTime(myCartItem);
	totalCost = myCartItem.calculateCost(myCartItem);
	newDiv = $("<div class=totalCostDiv></div>");
	newDiv.append("The total cost is " + totalCost);
	myFormBox.closest("div").children("div").remove();
	myFormBox.closest("div").append(newDiv);
});

$(document).on('change', '.input_form', function(e){
	cart = $("#cart");
	//alert('hi');
	var cartCost = 0;
	$('.input_form').each(function(index, element){
		var item = $(element).data("cartItem");
		item.updateAmount(item);
		item.updateFlow(item);
		item.updateInConcentration(item);
		item.updateTime(item);
		cartCost += item.calculateCost(item);
	});

	cartCostDiv = $("<div class='cart_cost'></div>");
	cartCostDiv.append("Total cost of cart: " + cartCost);
	$('.cart_cost').remove();
	cart.append(cartCostDiv);
});


var showDrugs = function() {
	view.empty();
	$.ajax('drugs.php', {
			type:'GET',
			cache:false,
			dataType:'json',
			success:function(data, status, jqXHR) {
				addNonInhalableToShoppingCart("Isofluorane", "2", "123456");
				addInhalableToShoppingCart("Toluene", "4", "345678");
				view.append("woohoo!");
			},
			error:function(jqXHR, status, error) {
				view.append("<p>Could not retrieve dashboard.</p>");
				console.log(status);
				console.log(error);
			}
		});
}
