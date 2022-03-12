// вся эта вещь должна быть через ajax
//по примеру ниже
// ajax работает, надо сделать саму корзину
// function addToCart() {
//     // let name = document.querySelector("#name").innerHTML;

// }


// function getData() {
//     // URL на который будем отправлять GET запрос
//     const requestURL = '/result';
//     const xhr = new XMLHttpRequest();
//     xhr.open('GET', requestURL);
//     xhr.onload = () => {
//       if (xhr.status !== 200) {
//         return;
//       }
//       document.querySelector('#result').innerHTML = xhr.response;
//     }
//     xhr.send();
//   }
//   // при нажатию на кнопку
//   document.querySelector('#get').addEventListener('click', () => {
//     getData();
//   });

// function addToCart() {
//     let arr = FileReader


//     const data = (__dirname+'/json/TovarTypes.json');
//     for (let i = 0, l = data.TovarList.length; i < l; i++) {
//         var obj = data.TovarList[i];
//     }
//     console.log(obj);

//     let miniCart = document.getElementById("MiniCart");
//     miniCart.style.transition = "1.2s"
//     miniCart.style.height = "390px"
//     miniCart.style.visibility = "visible"



//     function Cart() {

//     }
//     Cart.prototype.add = function (item) {
//         if (!this.goods) {
//             this.goods = [];
//         }
//         this.goods.push(item); //добавляет товар в корзину
//         console.log('В корзине %s товаров', this.goods.length)
//     };


//     //редактируемый код
//     function UserCart() {

//     }


//     function Item(idNum, item, sum) {
//         this.idNum = idNum;
//         this.item = item;
//         this.sum = sum;
//     }

//     UserCart.prototype = Object.create(Cart.prototype);


//     const cart = new UserCart();
//     const item = new Item("1", 'Сhair', "20$");

//     cart.add();
//     console.log(cart.goods);
//     let timer = setTimeout(MiniCartFclose, 1800);
//     clearTimeout(a)



// }





