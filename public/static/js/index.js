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




function addFunc() {
  document.cookie = "email=aaa@ggg.ccc"
  document.cookie = "password=qewrty"
  alert(document.cookie);

}
function delFunc() {
}

CartFormSub.onclick = function () {

  // var val = document.getElementById('elem1').value;
  // document.getElementById('str').innerHTML = "Вы ввели: " + val;
  // let email = document.getElementById("#EmailCart");
  // let email1 = document.value(email)
  // alert(document.getElementById("EmailCart").value);
  let email = document.getElementById("EmailCart").value
  let promo = document.getElementById("CartPromo").value

  document.cookie = email, promo;
  if (email == email) {//как то сравнить с данными из json если true то что то сдлеать
    alert(document.cookie)
  }

}
CartPromoBTN.onclick = function () {

  // let promo = document.getElementById("CartPromo").value
  // if (promo == "2022") {//как то сравнить с данными из json если true то что то сдлеать
  //   alert("скидка 0% =)")
  // }

  // // console.log('got result from server!')
  // fs.writeFileSync('/json/data.json', JSON.stringify(data));

  // // берём старые данные
  // const dbData = JSON.parse(fs.readFileSync('/json/data.json', (err, data) => (data)))

  // // сливает данные
  // fs.writeFileSync('/json/data.json', JSON.stringify([...dbData, ...data]));

  // // читаем файл
  // const text = fs.readFileSync('/json/data.json', 'utf8');
  // console.log(JSON.parse(text));

}


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
