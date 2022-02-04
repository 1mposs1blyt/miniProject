document.getElementById("submit").addEventListener("click", function (e) {
    e.preventDefault();
    // получаем данные формы
    let registerForm = document.forms["registerForm"];
    let userName = registerForm.elements["userName"].value;
    let userAge = registerForm.elements["userAge"].value;
    // сериализуем данные в json
    let user = JSON.stringify({
        userName: userName,
        userAge: userAge,
    });
    let request = new XMLHttpRequest();
    // посылаем запрос на адрес "/user"
    request.open("POST", "/user", true);
    request.setRequestHeader("Content-Type", "application/json");
    request.addEventListener("load", function () {
        // получаем и парсим ответ сервера
        request.open("POST", "/user", true);
        request.setRequestHeader("Content-Type", "application/json");
    });
    request.send(user);

});

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





