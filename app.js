var uiController = (function () {
  var DOMstrings = {
    // html болон дизайны нэршил өөрчлөгдвөл засахад амар байлгахын тулд үүсгэсэн
    inputType: ".add__type",
    inputDescription: ".add__description",
    inputValue: ".add__value",
    addBtn: ".add__btn",
    incomeList: ".income__list",
    expenseList: ".expenses__list",
  };

  return {
    getInput: function () {
      return {
        type: document.querySelector(DOMstrings.inputType).value, // exp, inc орлого уу зарлагуу гэдгийг
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: parseInt(document.querySelector(DOMstrings.inputValue).value),
      };
    },

    getDOMstrings: function () {
      return DOMstrings;
    },
    addListItem: function (item, type) {
      var html, list; // html болон орлого эсвэл зарлага байхыг хадгалах хувьсагчууд
      // 1. орлого зарлагын элментийг агуулсан html бэлдэнэ.
      if (type === "inc") {
        list = DOMstrings.incomeList;
        html =
          '<div class="item clearfix" id="income-%id%"><div class="item__description">##DESC$</div><div class="right clearfix"><div class="item__value">+ $%$value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      } else {
        list = DOMstrings.expenseList;
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
    clearFields: function () {
      //талбаруудыг бөглөсний дараа цэвэрлэх функц
      var fields = document.querySelectorAll(
        // эндээс лист буцаасан ба доор масив болгон хувиргана.
        DOMstrings.inputDescription + "," + DOMstrings.inputValue
      );
      var fieldsArr = Array.prototype.slice.call(fields); // convert list to array
      fieldsArr.forEach(function (el, index, array) {
        el.value = "";
      });

      fieldsArr[0].focus();
      // for (var i = 0; i < fieldsArr.length; i++) {
      //   fieldsArr[i].value = "";
      // }
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
  var calculateTotal = function (type) {
    var sum = 0;
    data.items[type].forEach(function (el) {
      sum = sum + el.value;
    });
    data.totals[type] = sum;
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
    tusuv: 0,
    huvi: 0,
  };

  return {
    // public service ээр return хийгдэж байгаач доор дуудагдахад доторхи үйлдлүүд гүйцэтгэгдэж массивт утга орно return нь зөвхөн утга буцаах биш IIFE-руу хандаж үйлдэл гүйцэтгэх орц гарц болно.
    tusuvTootsooloh: function () {
      calculateTotal("inc"); // Нийт орлогын нийлбэрийг олно

      calculateTotal("exp"); // нийт зарлагыг олно

      data.tusuv = data.totals.inc - data.totals.exp; // Төсөвийг шинээр тооцоолно

      data.huvi = Math.round((data.totals.exp / data.totals.inc) * 100); // орлого зарлагын хувыг тооцоолно.
    },
    tusuviigAvah: function () {
      return {
        tusuv: data.tusuv,
        huvi: data.huvi,
        totalInc: data.totals.inc,
        totalExp: data.totals.exp,
      };
    },
    addItem: function (type, desc, val) {
      var item, id;

      if (data.items[type].length === 0) id = 1;
      else {
        id = data.items[type][data.items[type].length - 1].id + 1; //хамгийн сүүлчийн өгөгдлийн Id-г олох
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

    if (input.description !== "" && input.value !== "") {
      var item = financeController.addItem(
        input.type,
        input.description,
        input.value
      );
      // 2. Олж авсан өгөгдлүүдээ санхүүгийн конт- руу дамжуулж тэнд хадгална.
      //     // 3. Олж авсан өгөгдлүүдээ вебийн тохирох хэсэгт гаргана.
      uiController.addListItem(item, input.type);
      uiController.clearFields();
    }
    //     // 4. Төсөвийг тооцно
    financeController.tusuvTootsooloh();
    //     // 5. Эцэсийн үлдэгдэл
    var tusuv = financeController.tusuviigAvah();
    // Төсөвийн тооцоог дэлгэцэнд гаргана.
    console.log(tusuv);
  };

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
