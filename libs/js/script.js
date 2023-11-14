const products =[
    {
        id:'coat-01',
        title: 'coat-01',
        image:'libs/img/coat/coat-1.jpg',
        category: {
            name:'Coats',
            id:'coats'
        },
        price: 200
    },
    {
        id:'coat-02',
        title: 'coat-02',
        image: 'libs/img/coat/th-1.jpg',
        category: {
            name:'Coats',
            id:'coats'
        },
        price: 150
    },
    {
        id:'coat-03',
        title: 'coat-03',
        image: 'libs/img/coat/th-2.jpg',
        category: {
            name:'Coats',
            id:'coats'
        },
        price: 100
    },
    {
        id:'coat-04',
        title: 'coat-04',
        image: 'libs/img/coat/th-3.jpg',
        category: {
            name:'Coats',
            id:'coats'
        },
        price: 120
    },
    {
        id:'coat-05',
        title: 'coat-05',
        image: 'libs/img/coat/th-4.jpg',
        category: {
            name:'Coats',
            id:'coats'
        },
        price: 190
    },
    {
        id:'shirt-01',
        title: 'shirt-01',
        image: 'libs/img/shirts/th.jpg',
        category: {
            name:'Shirts',
            id:'shirts'
        },
        price: 80
    },
    {
        id:'shirt-02',
        title: 'shirt-02',
        image: 'libs/img/shirts/th-1.jpg',
        category: {
            name:'Shirts',
            id:'shirts'
        },
        price: 50
    },
    {
        id:'shirt-03',
        title: 'shirt-03',
        image: 'libs/img/shirts/th-2.jpg',
        category: {
            name:'Shirts',
            id:'shirts'
        },
        price: 60
    },
    {
        id:'shirt-04',
        title: 'shirt-04',
        image: 'libs/img/shirts/th-3.jpg',
        category: {
            name:'Shirts',
            id:'shirts'
        },
        price: 50
    },
    {
        id:'shirt-05',
        title: 'shirt-05',
        image: 'libs/img/shirts/th-4.jpg',
        category: {
            name:'Shirts',
            id:'shirts'
        },
        price: 40
    },
    {
        id:'trousers-01',
        title: 'trousers-01',
        image: 'libs/img/trousers/th.jpg',
        category: {
            name:'Trousers',
            id:'trousers'
        },
        price: 100
    },
    {
        id:'trousers-02',
        title: 'trousers-02',
        image: 'libs/img/trousers/th-1.jpg',
        category: {
            name:'Trousers',
            id:'trousers'
        },
        price: 90
    },
    {
        id:'trousers-03',
        title: 'trousers-03',
        image: 'libs/img/trousers/th-2.jpg',
        category: {
            name:'Trousers',
            id:'trousers'
        },
        price: 80
    },
    {
        id:'trousers-04',
        title: 'trousers-04',
        image: 'libs/img/trousers/th-3.jpg',
        category: {
            name:'Trousers',
            id:'trousers'
        },
        price: 70
    },
    {
        id:'trousers-05',
        title: 'trousers-05',
        image: 'libs/img/trousers/th-4.jpg',
        category: {
            name:'Trousers',
            id:'trousers'
        },
        price: 100
    },

]

const productContainer = document.querySelector("#products-container");
const bottonCategories = document.querySelectorAll(".category-btn");
const mainTitle = document.querySelector("#main-title");
let number = document.querySelector(".number");
let addBtn= document.querySelectorAll(".product-add");
 

 function loadProducts(chooseProduct){
    productContainer.innerHTML= "";

    chooseProduct.forEach(product =>{
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `
    <img class="product-img" src="${product.image}" alt="${product.title}">
    <div class="product-details">
        <h3 class="product-title">${product.title}</h3>
        <p class="product-price">${product.price}</p>
        <button class="product-add" id="${product.id}">Add</button>
    </div>
    `;
    productContainer.append(div);
 })
 updateAddBtn()

 }


loadProducts(products);

bottonCategories.forEach(boton => {
  boton.addEventListener('click', (e)=>{

    bottonCategories.forEach(boton => boton.classList.remove('active'));
    e.currentTarget.classList.add('active');
 

    if(e.currentTarget.id != "all"){
       const productCategory = products.find(product => product.category.id === e.currentTarget.id);
        mainTitle.innerText = productCategory.category.name;
    const productBtn = products.filter(product => product.category.id === e.currentTarget.id)
    loadProducts(productBtn);
}else{
    mainTitle.innerText =" All Products";
    loadProducts(products);
}
  })
})

function updateAddBtn(){
    addBtn= document.querySelectorAll(".product-add");

    addBtn.forEach(botton => {
        botton.addEventListener('click', addToCart);
    })
}
let productInCart;
let productInCartStore = localStorage.
getItem("all-product-cart");


if(productInCartStore ){
    productInCart= JSON.parse(productInCartStore);
    cartNumber();

}else{
    productInCart= [];
}

function addToCart(e){
 const idBtn= e.currentTarget.id;
 const productsAdded = products.find(product =>product.id===idBtn);
 if(productInCart.some(product => product.id === idBtn)){
    const index = productInCart.findIndex(product => product.id === idBtn);
    productInCart[index].quantity++;
 }else{
    productsAdded.quantity = 1;
     productInCart.push(productsAdded);
 }
 cartNumber();
 localStorage.setItem("all-product-cart", JSON.stringify(productInCart));
 
}

function cartNumber(){
    let newNumber = productInCart.reduce((acc, product)=> acc + product.quantity, 0);
   number.innerText = newNumber;
}