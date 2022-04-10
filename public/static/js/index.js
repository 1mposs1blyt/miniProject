
function get_data() {
  // let name = document.getElementsByTagName("h5");
  
  const reqUrl = "/catalog/GoodCard"
  const xhr = new XMLHttpRequest();
  xhr.open("GET",reqUrl)
  xhr.onload = () =>{
      if (xhr.status !== 200) {
          return;
      }
      document.querySelector("#putcard").innerHTML = xhr.response;
  }
  xhr.send()
  console.log("put date to cart")
}
function searchajax() {
  const reqUrl = "/catalog/search"
  const xhr = new XMLHttpRequest();
  xhr.open("GET",reqUrl);
  xhr.onload() = function() {
    if(xhr.status !== 200) {
      return;
    }
    document.querySelector("#CardsRow").innerHTML = xhr.response;
    console.log("READY!!!")= xhr.response;
  }
  xhr.send()
}
const axios = require('axios').default;







let detect = new MobileDetect(window.navigator.userAgent)

function CartClean() {
  let cart = [];
  alert("Wil be Cleaned!",cart)
}
function delFromMiniBin() {
  alert("Will be deleted!")
}
function MiniCartF() {
  let miniCart = document.getElementById("MiniCart");
  miniCart.style.transition = "0.5s"
  // miniCart.style.width = "450px"
  miniCart.style.height = "390px"
  miniCart.style.visibility = "visible"
}

function MiniCartFclose() {
  let miniCart = document.getElementById("MiniCart");
  miniCart.style.transition = "0.5s"
  // miniCart.style.width = "450px"
  miniCart.style.height = "0px"
  miniCart.style.visibility = "hidden"

}
function addToCart() { 

  let miniCart = document.getElementById("MiniCart");
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
    miniCart.style.transition = "0.5s"
    miniCart.style.height = "390px"
    miniCart.style.visibility = "hidden"
    //на телефоне скрыта
  } else {
    miniCart.style.transition = "0.5s"
    miniCart.style.height = "390px"
    miniCart.style.visibility = "visible"
    //на пк есть
  }

  // miniCart.style.transition = "1.2s"
  // // miniCart.style.width = "450px"
  // miniCart.style.height = "390px"
  // miniCart.style.visibility = "visible"
  setTimeout(MiniCartFclose, 1800);
  clearTimeout(c)
}

// let obj = {
//   CartItems: {}
// };
// obj.cart.push({
//   CartItem: {
//     "TovarName": "i9-11099900k",
//     "TovarPrice": "450000",
//     "CardText": "lorem 1...",
//     "btnText": "buy",
//     "page": "processor",
//     "currency": "рублей",
//     "productId": "1235fas"
//   }
// })
// let json = JSON.stringify(obj);
// var fs = require('fs');
// function TestFunction() {
//   // alert("Hi i will delete this or put in favorites");
//   fs.writeFile('json/TestCart.json', json, 'utf8', callback);
//   fs.readFile('json/TestCart.json', 'utf8', function readFileCallback(err, data) {
//     if (err) {
//       console.log(err);
//     } else {
//       obj = JSON.parse(data); //now it an object
//       obj.table.push({ id: 2, square: 3 }); //add some data
//       json = JSON.stringify(obj); //convert it back to json
//       fs.writeFile('json/TestCart.json', json, 'utf8', callback); // write it back 
//     }
//   });
// }
// let data = {
//     "tovar": "templates/tovar.html"
// }
// var dataJson = "http://www.reneinla.com/kris/scripts/print.json";
// //var dataArr = $.parseJSON(dataJson);
//   $.getJSON(dataJson, function (data) {
//     $.each(data, function (k, v) {
//       var i = 0;
//       for (i; i < v.length; i++){
//         console.log( v[i] );
//       }
//     });
//   });




// CartFormSub.onclick = function () {
//   let email = document.getElementById("EmailCart").value
//   let promo = document.getElementById("CartPromo").value
//   document.cookie = email, promo;
//   if (email == email) {//как то сравнить с данными из json если true то что то сдлеать
//     alert(this.value)
//   }

// }
// CartPromoBTN.onclick = function () {
// }


// const btnminus = document.querySelector('[data-action="minus"]')
// const btnplus = document.querySelector('[data-action="plus"]')
// const counter = document.querySelector('[data-counter]')
// btnminus.addEventListener('click', function () {

//   if (parseInt(counter.innerText) > 1) {//проверяет если значение цифры больше 1( не может быть меньше 1)
//     counter.innerText = --counter.innerText;
//   }
// })
// btnplus.addEventListener('click', function () {
//   counter.innerText = ++counter.innerText;

// })

// window.addEventListener('click', function () {
//   let counter;
//   if (event.target.dataset.action === 'plus') {
//     const CountWraper = event.target.closest('.items__current')
//     const counter = CountWraper.querySelectorAll('[data-counter]')
//     counter.innerText = ++counter.innerText;
//   }
// })
// window.addEventListener('click', function () {
//   let counter;
//   if (event.target.dataset.action === 'plus' || event.target.dataset.action === 'minus') {
//     const countwrapper = event.target.closest('.CurrentCount')
//     counter = countwrapper.querySelector('[data-counter]')

//   }
//   // if () {
//   //   const countwrapper = event.target.closest('.CurrentCount')
//   //   console.log(countwrapper);
//   //   const counter = countwrapper.querySelectorAll('[data-counter]')
//   //   console.log(counter);
//   //   counter.innerText = --counter.innerText;

//   // }
// })

// addToCart.innerHTML = ""
// console.log(addToCart)
// let CardName = document.getElementsByClassName("cardTitleName").innerHTML;
// let CardPrice = document.getElementsByClassName("cardTitlePrice").innerHTML;
// alert(CardPriceT)
// let cookie = { "CardName": randomId, "CardPrice": CardPrice }
// // document.cookie
// // alert(cookie)
// console.log(cookie)

// let ids = '';
// for (let i = 0; i < CardName.length; i++) {
//   ids += CardName[i].id;
// }
// console.log(ids.innerHTML)
// for (let i = 0; i < CardPrice.length; i++) {
//   ids += CardPrice[i].id;
// }
// console.log(idsinnerHTML)
// console.log(cookie)


// function Cart() {

// }
// Cart.prototype.add = function (item) {
//   if (!this.goods) {
//     this.goods = [];
//   }
//   this.goods.push(item); //добавляет товар в корзину
//   console.log('В корзине %s товаров', this.goods.length)
// };


//редактируемый код
// function UserCart() {

// }
// UserCart.prototype.add = function (item) {
//   if (!this.goods) {
//     this.goods = [];
//   }
//   this.goods.push(item); //добавляет товар в корзину
// };



// UserCart.prototype = Object.create(UserCart.prototype);
// // UserCart.prototype = localStorage.setItem(UserCart.prototype)


// function Item(CardId, CardName, CardPrice, quantity) {
//   this.CardId = CardId;
//   this.CardName = CardName;
//   this.CardPrice = CardPrice;
//   this.quantity = quantity;
// }

// const cart = new UserCart();
// // const item = new Item("99", 'Сhair', "20$");
// // let CardId = Math.floor(Math.random() * 101);
// function randomId() {
//   let CardId = Math.floor(Math.random() * 100);     // returns a random integer from 0 to 99
// }
// // const val = document. querySelector('input'). value;


// // let cname = document.querySelectorAll('#cname').innerText

// // console.log(cname.closest('a'))
// let cname = document.getElementById('cname').innerText;
// let price = document.getElementById('price').innerText;
// console.log(cname, price)
// // let CardName = document.getElementById("cardTitleName").innerHTML
// // let CardPrice = document.getElementById("cardTitlePrice").innerHTML
// let item = { "name": cname, "price": price, quantity: 1 }


// // cart.add(item);//нужно чтобы функция считала значения товара(имя цена и тд)
// cart.add(item);
// myStorage = window.localStorage;
// localStorage.setItem('name', cname);
// localStorage.setItem('price', price);
// quantity = 1
// localStorage.setItem('quantity', quantity);

// let n = localStorage.getItem('name');
// let p = localStorage.getItem('price');
// let q = localStorage.getItem('quantity')
// let arr ={
//   'name':n,
//   'price': p,
//   'quantity':q
// }


// console.log(JSON.stringify(arr))
// // localStorage.setItem(cname:cname,)
// function addToCart() {
//   // document.cookie = "email=aaa@ggg.ccc"
//   // document.cookie = "password=qewrty"
//   // alert(document.cookie);
//   cart.add(item);
//   let a = cart.goods
//   console.log(JSON.stringify(arr))
//   // console.log(JSON.stringify({a}));
//   // alert(cart.goods)
//   // Значение кнопки "Купить должно меняться после нажатия на "В корзине" или галочку(Типа тоже в корзине)
// }

