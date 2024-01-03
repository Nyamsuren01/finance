// дэлгэцтэй ажиллах контроллер
var uiController = (function () {
  var DOMStrings = {
    inputType: ".add__type",
    inputDescription: ".add__description",
    inputValue: ".add__value",
    addBtn: ".add__btn",
  };

  return {
    getInput: function () {
      //public servic нь өгөгдөл үр дүнг далдлалтаас гадагшаа хуваалцах гаралт
      return {
        type: document.querySelector(DOMStrings.inputType).value,
        description: document.querySelector(DOMStrings.inputDescription).value,
        dun: document.querySelector(DOMStrings.inputValue).value,
      };
    },
    getDOMStrings: function () {
      // Энэ нь бас нэг uiControlleriin Public serviсe
      return DOMStrings; // дотоод обектийг буцааж байна
    },
  };
})();
// санхүүтэй холбоотой контроллер
var financeController = (function () {
  var Income = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };
  var Expense = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var data = {
    allItems: {
      inc: [],
      exp: [],
    },
    total: {
      inc: 0,
      exp: 0,
    },
  };
})();
// closure нь гадагшаа хандах гарц болдог ба IIFE тэй хамт data encapsulation ийг гүйцэтгэнэ.
// Программын холбогч контроллер
var appController = (function (uiController, financeController) {
  var ctrlAddItem = function () {
    // 1. Оруулах өгөгдлийг дэлгэцээс олж авна.
    console.log(uiController.getInput());
    // 2. Олж авсан өгөгдлүүдээ санхүүгийн конт- руу дамжуулж тэнд хадгална.
    // 3. Олж авсан өгөгдлүүдээ вебийн тохирох хэсэгт гаргана.
    // 4. Төсөвийг тооцно
    // 5. Эцэсийн үлдэгдэл тооцоог дэлгэцэнд гаргана.
  };

  var setupEventListeners = function () {
    // ф ийг бичиж байгаа ба доор дуудаж байж энэ нь ажиллана. init дээр дуудаж байж ажиллана.
    var DOM = uiController.getDOMStrings(); // энд яагаад ийм зүйл хийсэн гэвэл арай динамик болгож байна.
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
      // пр эхлэхийн тулд return хийгдэх ба энд товч бусад дэлгэцтэй ажиллах ф-уудыг холбож өгч байна
      console.log("Application started ...");
      setupEventListeners();
    },
  };
})(uiController, financeController);

appController.init(); // appController- оос эхлэх функцийг дуудаж байна
