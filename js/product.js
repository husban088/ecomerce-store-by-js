var productList = [];

let imagePreview = document.querySelector("#imagePreview");

let imageInput = document.querySelector("#imageInput");

imageInput.onchange = function() {
  var file = imageInput.files[0];
  var reader = new FileReader();
  
  reader.onload = function() {
    imagePreview.src = reader.result;
  }

  if (file) {
    reader.readAsDataURL(file);
  }
}

function addProduct(event) {
  event.preventDefault();

  var productName = document.getElementById('productName').value;
  var productPrice = document.getElementById('productPrice').value;
  // var productSize = document.getElementById('productSize').value;
  var imagePreview = document.getElementById('imagePreview').src;

  var product = {
    name: productName,
    price: productPrice,
    // size: productSize,
    image: imagePreview
  };

  productList.push(product);
  localStorage.setItem("productsList", JSON.stringify(productList));
  const productArr = JSON.parse(localStorage.getItem("productsList"));
  productArr.forEach((el) => console.log(el.name));

  displayProducts();
  resetForm();
}

function displayProducts() {
  var productListContainer = document.getElementById('productList');
  productListContainer.innerHTML = '';

  const productArr = JSON.parse(localStorage.getItem("productsList"));

  if (!productArr || productArr.length === 0) {
    var noProductMessage = document.createElement("p");
    noProductMessage.textContent = "No products added yet.";
    productListContainer.appendChild(noProductMessage);
    return; // Exit the function if there are no products
  }

  productArr.forEach((product) => {
    var productCard = document.createElement('div');
    productCard.classList.add('product-card');

    var productImage = document.createElement('img');
    productImage.src = product.image;
    productImage.alt = product.name;
    productCard.appendChild(productImage);

    // localStorage.setItem("productImage", product.image);

    productImage.style.width = "25rem";
    productImage.style.height = "25rem";
    productImage.style.objectFit = "contain";
    productImage.style.backgroundSize = "contain";
    productImage.style.borderRadius = "5px";
    productImage.style.backgroundPosition = "center";

    productImage.classList.add("product__pics");

    var productName = document.createElement('h3');
    productName.textContent = product.name;
    productCard.appendChild(productName);

    localStorage.setItem("productName", product.name);

    productName.classList.add("product__prizee");


    var productPrice = document.createElement('p');
    productPrice.textContent = product.price;
    productCard.appendChild(productPrice);

    // var productSize = document.createElement('p');
    // productSize.textContent = product.size;
    // productCard.appendChild(productSize);

    var productButton = document.createElement('button');
    productButton.textContent = 'Add to cart';
    productCard.appendChild(productButton);

    productButton.classList.add("prod__btnss");


    var deleteButton = document.createElement('icon');
    deleteButton.innerHTML = '<i class="fa-solid fa-xmark"></i>';



    deleteButton.style.backgroundColor = "#000";
    deleteButton.style.padding = "0.5rem 1.1rem"
    deleteButton.style.color = "#fff";
    deleteButton.style.borderRadius = "50%";
    deleteButton.style.border = "none";
    deleteButton.style.outline = "none";
    deleteButton.style.cursor = "pointer";
    deleteButton.classList.add("delete__btn");

    deleteButton.addEventListener('click', function() {
      deleteProduct(productArr.indexOf(product)); 
    });
    productCard.appendChild(deleteButton);

    productListContainer.appendChild(productCard);

  });
}

function resetForm() {
  document.getElementById('productForm').reset();
  document.getElementById('imagePreview').src = 'images/profileimg.webp';
}

function editProduct(product) {
  var newImage = document.getElementById("imagePreview").src;
  product.image = newImage;
}

function deleteProduct(index) {
  if (index > -1) {
    productList.splice(index, 1);
    localStorage.setItem("productsList", JSON.stringify(productList));
    displayProducts();
  }
}

displayProducts();



function prodSearc() {
  let filter = document.getElementById('searchBar').value.toUpperCase();
  let itemss = document.querySelectorAll('.product-card');
  let l = document.querySelectorAll('.product__prizee');
  for(var i = 0;i<=l.length;i++){
  let a=itemss[i].querySelectorAll('.product__prizee')[0];
  let value=a.innerHTML || a.innerText || a.textContent;
  if(value.toUpperCase().indexOf(filter) > -1) {
      itemss[i].style.display="";
  }
  else
  {
      itemss[i].style.display="none";
  }
  }
}






// Creating the Products Array
const products = [];


// Modify the event listener for the "Add to cart" button

//Selecting all the prod__btn as there are going to be alots of items card
document.querySelectorAll(".prod__btn").forEach(cartBtn => {
  // naming each .prod__btn as the cartBtn....  YOU SHOULD USE THE FOREACH METHOD INSTEAD OF FOR LOOP
  cartBtn.addEventListener("click", (event) => {
  // Taking the priceELement  
    let priceElement = event.target.parentElement.parentElement.querySelector(".prod__price");
  // Taking the priceText  
    let priceText = priceElement.textContent.trim();
  // and then parseFlaot it to convert it to a number from a string  
    let price = parseFloat(priceText);
  
  // Creating product object which we will pass in the products Array  
    let product = {
      image: event.target.parentElement.parentElement.querySelector(".prod__img").src,
      name: event.target.parentElement.parentElement.querySelector(".prod__name").textContent,
      price: price,
      totalPrice: price,
      quantity: 1,
    };

    //Calling the addItemToLocal function
    addItemToLocal(product);
  });
});

 // Passing product(the one we created above) in the addItemToLocal 
function addItemToLocal(product) {
  // this line of code says that there is something in array or there is an emtpy array
  let cartItem = JSON.parse(localStorage.getItem("prdInCart")) || [];
  let found = false;

  // HERE ALSO I USED FOREACH YOU SHOULD ALSO USE THIS
  cartItem.forEach((item) => {
    if (product.name === item.name) {
      // now check if the product name and the item name matche if it does then 
      // add the quantiity 
      // update the total price 
      // and set true the found
      item.quantity++;
      item.totalPrice += product.price;
      found = true;
    }
  });

  if (!found) {
    cartItem.push(product);
  }

  localStorage.setItem("prdInCart", JSON.stringify(cartItem));
  cartNumberDisplay();
  location.href = "#cart__side";
  window.location.reload();
}

function cartNumberDisplay() {
  let cartItem = JSON.parse(localStorage.getItem("prdInCart")) || [];
  let cartNumbers = cartItem.reduce((acc, item) => acc + item.quantity, 0);
  document.querySelector("#cart__count").textContent = cartNumbers;
  document.querySelector(".cart__counte").textContent = cartNumbers;
}

function dispCartItem() {
  let html = "";
  let cartItem = JSON.parse(localStorage.getItem("prdInCart")) || [];
  cartItem.forEach((item) => {
    html += `
      <div class="cartlist">
        <img src="${item.image}" alt="" id='cart__image'>
        <h3 class='cart__name'>${item.name}</h3>
        <h3 class='cart__price'>Rs, ${item.price}</h3>
        <div class="quan__boxes">
          <input type='button' name='quan' class="min__btn" value='-'>
          <input type="number" class='cart__quan' value="${item.quantity}" readonly>
          <input type='button' name='quan' class="pl__btn" value='+'>
        </div>
        <h3 class='cart__tot'>Rs, ${item.totalPrice}</h3>
        <div class="remove__icon">
          <i class="fa-solid fa-xmark reoveItem"></i>
        </div>
      </div>`;
  });
  document.querySelector(".cartdisp").innerHTML = html;
}
dispCartItem();


// HERE IS THE INCREMENT AND DECREMENT FUNCTIONALITY

// Selecting all the .pl__btn as there are alots of items card
// Keep remeber when we have more than one elements in our HTML we use querrySelectorAll to get them
// and then we use forEach method to get data from it.

document.querySelectorAll(".pl__btn").forEach(btn => {
  // now exactly in our previous addToCart btn here we are getting the btn (for each of the item card)
  btn.addEventListener('click', (event) => {
    // the input value is the one that gets added after clicking the plus btn
    let input = event.target.parentElement.querySelector(".cart__quan");
    // converted the input value to numerice value..
    input.value = parseInt(input.value) + 1;
    // Function for updating the quantity 
    updateQuantity(input);
  });
});


// NOW HERE IS THE DECREMENT FUNCTIONLAITY

// Exactly same here we are also selecting all the min__btn as there are alot of item cards
document.querySelectorAll(".min__btn").forEach(btn => {
  btn.addEventListener('click', (event) => {
    let input = event.target.parentElement.querySelector(".cart__quan");
    // Here we are saying that if the input value is greater then one then decrement otherwise don't
    if (parseInt(input.value) > 1) {
      input.value = parseInt(input.value) - 1;
      updateQuantity(input);
    }
  });
});


// NOW THIS IS THE FUNCTINO TO UPDATES THE QUANTITY WE ARE DOING IT ONLY FOR TOTAL

function updateQuantity(input) {
  // 1) first getting the cartItem from the locastorage
  let cartItem = JSON.parse(localStorage.getItem("prdInCart")) || [];
  // 2) second getting the name of the item from the HTML 
  let itemName = input.parentElement.parentElement.querySelector('.cart__name').textContent;
  // 3) than we are using find method that if there is the item.name(from the localstorage) and the itemName(from the HTML) are same
  let item = cartItem.find(item => item.name === itemName);
  // 4) then take the item.quantity
  item.quantity = parseInt(input.value);
  // 5) and update the totlPrice by multiplying the item.price with the quantity number
  item.totalPrice = item.price * item.quantity;
  // 6) lasting updating the cartItme in the locastorage
  localStorage.setItem("prdInCart", JSON.stringify(cartItem));
  cartNumberDisplay();
  cartPrice();
}

function cartPrice() {
  let cartItem = JSON.parse(localStorage.getItem("prdInCart")) || [];
  let subTotal = cartItem.reduce((acc, item) => acc + item.totalPrice, 0);
  document.querySelector(".priceView h3").textContent = subTotal;
}

document.querySelectorAll(".reoveItem").forEach(removeBtn => {
  removeBtn.addEventListener("click", () => {
    let cartItem = JSON.parse(localStorage.getItem("prdInCart")) || [];
    let itemName = removeBtn.parentElement.parentElement.querySelector('.cart__name').textContent;
    let updatedCart = cartItem.filter(item => item.name !== itemName);
    localStorage.setItem("prdInCart", JSON.stringify(updatedCart));
    dispCartItem();
    cartNumberDisplay();
    cartPrice();
  });
});

cartNumberDisplay();
cartPrice();