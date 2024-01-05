// // дэлгэцтэй ажиллах контроллер
// var uiController = (function () {
//   var DOMStrings = {
//     inputType: ".add__type",
//     inputDescription: ".add__description",
//     inputValue: ".add__value",
//     addBtn: ".add__btn",
//   };

//   return {
//     getInput: function () {
//       //public servic нь өгөгдөл үр дүнг далдлалтаас гадагшаа хуваалцах гаралт
//       return {
//         type: document.querySelector(DOMStrings.inputType).value,
//         description: document.querySelector(DOMStrings.inputDescription).value,
//         dun: document.querySelector(DOMStrings.inputValue).value,
//       };
//     },
//     getDOMStrings: function () {
//       // Энэ нь бас нэг uiControlleriin Public serviсe
//       return DOMStrings; // дотоод обектийг буцааж байна
//     },
//   };
// })();
// // санхүүтэй холбоотой контроллер
// var financeController = (function () {
//   var Income = function (id, description, value) {
//     this.id = id;
//     this.description = description;
//     this.value = value;
//   };
//   var Expense = function (id, description, value) {
//     this.id = id;
//     this.description = description;
//     this.value = value;
//   };

//   var data = {
//     items: {
//       inc: [],
//       exp: [],
//     },
//     total: {
//       inc: 0,
//       exp: 0,
//     },
//   };
//   return {
//
//     addItem: function (type, desc, val) {
//       var item, id;

//       if (data.items[type].lenght === 0) id = 1;
//       else {
//         id = data.items[type][data.items[type].lenght - 1].id + 1;
//       }

//       if (type === "inc") {
//         item = new Income(id, desc, val);
//       } else {
//         item = new Expense(id, desc, val);
//       }
//       data.items[type].push(item);
//     },
//     seeData: function () {
//       return data;
//     },
//   };
// })();
// // closure нь гадагшаа хандах гарц болдог ба IIFE тэй хамт data encapsulation ийг гүйцэтгэнэ.
// // Программын холбогч контроллер
// var appController = (function (uiController, financeController) {
//   var ctrlAddItem = function () {
//     // 1. Оруулах өгөгдлийг дэлгэцээс олж авна.
//     var input = uiController.getInput();
//     financeController.addItem(input.type, input.dun, input.description);
//     // 2. Олж авсан өгөгдлүүдээ санхүүгийн конт- руу дамжуулж тэнд хадгална.
//     // 3. Олж авсан өгөгдлүүдээ вебийн тохирох хэсэгт гаргана.
//     // 4. Төсөвийг тооцно
//     // 5. Эцэсийн үлдэгдэл тооцоог дэлгэцэнд гаргана.
//   };

//   var setupEventListeners = function () {
//     // ф ийг бичиж байгаа ба доор дуудаж байж энэ нь ажиллана. init дээр дуудаж байж ажиллана.
//     var DOM = uiController.getDOMStrings(); // энд яагаад ийм зүйл хийсэн гэвэл арай динамик болгож байна.
//     document.querySelector(DOM.addBtn).addEventListener("click", function () {
//       ctrlAddItem();
//     });
//     document.addEventListener("keypress", function (event) {
//       if (event.keyCode === 13 || event.which === 13) {
//         ctrlAddItem();
//       }
//     });
//   };
//   return {
//     init: function () {
//       // пр эхлэхийн тулд return хийгдэх ба энд товч бусад дэлгэцтэй ажиллах ф-уудыг холбож өгч байна
//       console.log("Application started ...");
//       setupEventListeners();
//     },
//   };
// })(uiController, financeController);

// appController.init();

var uiController = (function () {
  var DOMstrings = {
    inputType: ".add__type",
    inputDescription: ".add__description",
    inputValue: ".add__value",
    addBtn: ".add__btn",
  };

  return {
    getInput: function () {
      return {
        type: document.querySelector(DOMstrings.inputType).value, // exp, inc
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: document.querySelector(DOMstrings.inputValue).value,
      };
    },

    getDOMstrings: function () {
      return DOMstrings;
    },
    addListItem: function (item, type) {
      var html, list;
      // 1. орлого зарлагын элментийг агуулсан html бэлдэнэ.
      if (type === "inc") {
        list = ".income__list";
        html =
          '<div class="item clearfix" id="income-%id%"><div class="item__description">##DESC$</div><div class="right clearfix"><div class="item__value">+ $%$value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      } else {
        list = ".expenses__list";
        html =
          '<div class="item clearfix" id="expense-%id%"><div class="item__description">##DESC$</div><div class="right clearfix"><div class="item__value">- $%$value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      }
      // 2. орлого зарлагын утгуудыг replace ашиглан өөрчилж өгнө.
      html = html.replace("%id%", item.id);
      html = html.replace("##DESC$", item.description);
      html = html.replace("$%$value%", item.value);

      // бэлтгэсэн html ээ дом-руу хийж өгнө
      document.querySelector(list).insertAdjacentHTML("beforeend", html);
    },
  };
})();

var financeController = (function () {
  // private data
  var Income = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  // private data
  var Expense = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  // private data
  var data = {
    items: {
      inc: [],
      exp: [],
    },

    totals: {
      inc: 0,
      exp: 0,
    },
  };

  return {
    // public service ээр return хийгдэж байгаач доор дуудагдахад доторхи үйлдлүүд гүйцэтгэгдэж массивт утга орно return нь зөвхөн утга буцаах биш IIFE-руу хандаж үйлдэл гүйцэтгэх орц гарц болно.
    addItem: function (type, desc, val) {
      var item, id;

      if (data.items[type].length === 0) id = 1;
      else {
        id = data.items[type][data.items[type].length - 1].id + 1;
      }

      if (type === "inc") {
        item = new Income(id, desc, val);
      } else {
        item = new Expense(id, desc, val);
      }

      data.items[type].push(item); // орлого уу зарлага уу ялгаад массив руу обектийг нэмнэ
      return item;
    },

    seeData: function () {
      return data;
    },
  };
})();

var appController = (function (uiController, financeController) {
  var ctrlAddItem = function () {
    var input = uiController.getInput();

    var item = financeController.addItem(
      input.type,
      input.description,
      input.value
    );
    // 2. Олж авсан өгөгдлүүдээ санхүүгийн конт- руу дамжуулж тэнд хадгална.
    //     // 3. Олж авсан өгөгдлүүдээ вебийн тохирох хэсэгт гаргана.
    uiController.addListItem(item, input.type);
  };

  //     // 4. Төсөвийг тооцно
  //     // 5. Эцэсийн үлдэгдэл тооцоог дэлгэцэнд гаргана.
  var setupEventListeners = function () {
    var DOM = uiController.getDOMstrings();

    document.querySelector(DOM.addBtn).addEventListener("click", function () {
      ctrlAddItem();
    });

    document.addEventListener("keypress", function (event) {
      if (event.keyCode === 13 || event.which === 13) {
        ctrlAddItem();
      }
    });
  };

  return {
    init: function () {
      console.log("Application started...");
      setupEventListeners();
    },
  };
})(uiController, financeController);

appController.init(); // appController- оос эхлэх функцийг дуудаж байна
// өөрийн код ажиллахгүй шууд хуулж тавьсан...
