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


const btnminus = document.querySelector('[data-action="minus"]')
const btnplus = document.querySelector('[data-action="plus"]')
const counter = document.querySelector('[data-counter]')
btnminus.addEventListener('click', function () {

  if (parseInt(counter.innerText) > 1) {//проверяет если значение цифры больше 1( не может быть меньше 1)
    counter.innerText = --counter.innerText;
  }
})
btnplus.addEventListener('click', function () {
  counter.innerText = ++counter.innerText;

})

window.addEventListener('click', function () {
  let counter;
  if (event.target.dataset.action === 'plus') {
    const CountWraper = event.target.closest('.items__current')
    const counter = CountWraper.querySelectorAll('[data-counter]')
    counter.innerText = ++counter.innerText;
  }
})
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


function CartClean() {
  alert("Wil be Cleaned!")
}
function delFromMiniBin() {
  alert("Will be deleted!")
}
function MiniCartF() {
  let miniCart = document.getElementById("MiniCart");
  miniCart.style.transition = "0.4s"
  miniCart.style.width = "450px"
  miniCart.style.height = "390px"
  miniCart.style.visibility = "visible"
}

function MiniCartFclose() {
  let miniCart = document.getElementById("MiniCart");
  miniCart.style.transition = "0.4s"
  miniCart.style.width = "450px"
  miniCart.style.height = "0px"
  miniCart.style.visibility = "hidden"
}
function addToCart() {
  // let CardBTN = document.querySelectorAll("#CardBTN")
  let miniCart = document.getElementById("MiniCart");
  miniCart.style.transition = "1.2s"
  miniCart.style.width = "450px"
  miniCart.style.height = "390px"
  miniCart.style.visibility = "visible"
  setTimeout(MiniCartFclose, 1800);
  clearTimeout(a)
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
}

// function Cart() {

// }
// Cart.prototype.add = function (item) {
//   if (!this.goods) {
//     this.goods = [];
//   }
//   this.goods.push(item); //добавляет товар в корзину
//   console.log('В корзине %s товаров', this.goods.length)
// };


// //редактируемый код
// function UserCart() {

// }


// function Item(CardId, CardName, CardPrice) {
//   this.CardId = CardId;
//   this.CardName = CardName;
//   this.CardPrice = CardPrice;
// }

// UserCart.prototype = Object.create(Cart.prototype);


// const cart = new UserCart();
// // const item = new Item("99", 'Сhair', "20$");
// // let CardId = Math.floor(Math.random() * 101);
// function randomId() {
//   let CardId = Math.floor(Math.random() * 100);     // returns a random integer from 0 to 99
// }
// // const val = document. querySelector('input'). value;

// let CardName = document.getElementsByClassName('card-title').innerHTML;
// let CardPrice = document.querySelector('a').innerHTML;

// // let CardName = document.getElementById("cardTitleName").innerHTML
// // let CardPrice = document.getElementById("cardTitlePrice").innerHTML
// let item = { "CardName": CardName, "CardPrice": CardPrice }


// cart.add(item);//нужно чтобы функция считала значения товара(имя цена и тд)

// function addToCart() {
//   // document.cookie = "email=aaa@ggg.ccc"
//   // document.cookie = "password=qewrty"
//   // alert(document.cookie);
//   cart.add(item);
//   console.log(cart.goods);
//   alert(cart.goods)
//   // Значение кнопки "Купить должно меняться после нажатия на "В корзине" или галочку(Типа тоже в корзине)
// }




// создаём файл

// let json = '[0,1,2,3,4]';
// let json2 = '{"name":"alexandr","surname":chey-to,"age":13}'


  // let list = ['one','two','three'];
  // let json3 = JSON.stringify(list);
  // console.log(typeof(json3));

  // let zapros = ['login', {'login':'Chelovecha','password':'12345123'}];
  // post = JSON.stringify(zapros);

  // getComputedStyle.JSON.parse(post);
  // func = get[0];
  // login(get[1])


//COOKIE

// cookie - это небольшая ячейка информации,которая хранится в браузере пользователя
// document.cookie = '{"user":"My Name =)"}';
// console.log(document.cookie)
// let info = JSON.parse(document.cookie)
// let usname = info['user'];
// alert('Hello,'+usname);

// local storage
//cookie позволяют хранить всего 4096 символов, а кол-во на "кук"на один домен
// ограничен от 30 до 50 в зависимости от браузера
// локальное хранилище позволяет хранить от 5 жо 10 Мбайт и даже больше

// Сохранение значения
// localStorage.setItem('name','Imya');

// Получить значение
// let usname = localStorage.getItem('name');//указывается ключ
// alert('Hello,'+usname)
// удалить значения
// localStorage.removeItem('user');

// Очистить всё
// localStorage.clear()

// Базы данных (БД)

// БД -- НАбор некоторых сведений хранящихся некоторым упорядоченным способом

// Система управления базами данных (СУБД) - система,которая позволяет манипулировать
// информацией в БД с помощью языков и программных средств, Язык - SQL.СУБД - SQLite,MySQL,PostgreeSQL и т.д.

// SQL - (Structured Query Language) - язык структурированных запросов.Основная задача - предоставление простого способа считывания
// и записи информации в БД

// Плоская БД - EXEL - не имеет в своей структуре зависымых отношений (программные не в счет)
//
// Реляционные БД - это БД, которая состоит из множества таблиц. Основное свойство реляционных БД в том, что они
// связаны т зависимы между собой(relation-отношения)
// столбцы располагаются в определенном порядке, которые определяются при создании БД
// У каждого столбца есть уникальное имя  (в пределах таблицы),все значение в 1м
// столбце не имеют одинаковый тип (только строки,числа, даты и тд)
// На пересечении столбцов и строк(в ячейка) может находится только АТОМАРНОЕ(простое значение)
// Например,нельзя хранить хранить в ячейках объекты (типа массивов или словарей), или сложные конструкции
//
// Нормализация это пошаговый обратимый процесс замены исходной схемы  другой схемы с более логичной и оптимизированной  структурой
// Требуется для того, чтобы избавится от избыточных данных

// НФ(Нормальная форма) - это нормализованные данные в таблице по определённым правилам (1-5 НФ НБФК - нормальная форма Бойса Кодда)
// 1НФ - если все её поля имеют простые значения(атомарные)
// Первым делом, состовляя БД, проверьте,что в таблице нет массивов иИспользуют как правило яAUTOINCREMENT (авто прибавление по единицке)
// PRimary key является уникальным в пределах одной таблицы
// лучше использовать либо есстественные  числовые ключи(цело численные),либо исскуственные, по причине более быстрого считывания СУБД
// - остальные поля должны функционально завистеть от главного ключа
// - ключи таблицы,
