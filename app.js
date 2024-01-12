var uiController = (function () {
  var DOMstrings = {
    // html болон дизайны нэршил өөрчлөгдвөл засахад амар байлгахын тулд үүсгэсэн
    inputType: ".add__type",
    inputDescription: ".add__description",
    inputValue: ".add__value",
    addBtn: ".add__btn",
    incomeList: ".income__list",
    expenseList: ".expenses__list",
    tusuvLabel: ".budget__value",
    incomeLabel: ".budget__income--value",
    expenseLabel: ".budget__expenses--value",
    persentageLabel: ".budget__expenses--percentage",
    containerDiv: ".container",
    expensePrecentageLabel: ".item__percentage",
    dateLabel: ".budget__title--month",
  };

  var nodeListForeach = function (list, callback) {
    for (var i = 0; i < list.length; i++) callback(list[i], i);
  };
  var formatMoney = function (too, type) {
    too = " " + too;
    var x = too.split("").reverse().join("");
    var y = "";
    var count = 1;
    for (var i = 0; i < x.length; i++) {
      y = y + x[i];
      if (count % 3 === 0) {
        y = y + ",";
        count++;
      }
      var z = y.split("").reverse().join("");
      if (z[0] === ",") {
        z = z.substring(1, z.length - 1);
      }
    }
    return z;
  };
  return {
    getInput: function () {
      return {
        type: document.querySelector(DOMstrings.inputType).value, // exp, inc орлого уу зарлагуу гэдгийг
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: parseInt(document.querySelector(DOMstrings.inputValue).value),
      };
    },
    displayDate: function () {
      var unuudur = new Date();
      document.querySelector(DOMstrings.dateLabel).textContent =
        unuudur.getFullYear() +
        " оны " +
        unuudur.getMonth() +
        1 +
        " сарын өрхийн санхүү";
      //console.log(unuudur.getMonth() + 1);
    },

    displayPrecentages: function (allPersentages) {
      // Зарлагын node листийг олох
      var elements = document.querySelectorAll(
        DOMstrings.expensePrecentageLabel
      );
      // элмент бүрийн хувьд хувийг массиваас авч шивж оруулах
      nodeListForeach(elements, function (el, index) {
        el.textContent = allPersentages[index];
      });
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
          '<div class="item clearfix" id="inc-%id%"><div class="item__description">##DESC$</div><div class="right clearfix"><div class="item__value">+ $%$value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      } else {
        list = DOMstrings.expenseList;
        html =
          '<div class="item clearfix" id="exp-%id%"><div class="item__description">##DESC$</div><div class="right clearfix"><div class="item__value">- $%$value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      }
      // 2. орлого зарлагын утгуудыг replace ашиглан өөрчилж өгнө.
      html = html.replace("%id%", item.id);
      html = html.replace("##DESC$", item.description);
      html = html.replace("$%$value%", formatMoney(item.value, type));

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
    tusuviigUzuuleh: function (tusuv) {
      var type;
      if (tusuv.tusuv > 0) type = "inc";
      else type = "exp";
      document.querySelector(DOMstrings.tusuvLabel).textContent = formatMoney(
        tusuv.tusuv,
        type
      );
      document.querySelector(DOMstrings.incomeLabel).textContent = formatMoney(
        tusuv.totalInc,
        "inc"
      );
      document.querySelector(DOMstrings.expenseLabel).textContent =
        tusuv.totalExp;
      if (tusuv.huvi !== 0) {
        document.querySelector(DOMstrings.persentageLabel).textContent =
          tusuv.huvi + "%";
      } else {
        document.querySelector(DOMstrings.persentageLabel).textContent =
          tusuv.huvi;
      }
    },
    deleteListItem: function (id) {
      // ustgadag service ni ...ugugdliin sangui tul dom oos bas delgetsees bas ustgaj ugnu uuniigee door duudna
      var el = document.getElementById(id);
      el.parentNode.removeChild(el);
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
    this.presentage = -1;
  };
  Expense.prototype.calcPrecentage = function (totalInc) {
    if (totalInc > 0)
      this.presentage = Math.round((this.value / totalInc) * 100);
    else this.presentage = 0;
  };
  Expense.prototype.getPersentage = function () {
    return this.presentage;
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
      if (data.totals.inc > 0)
        data.huvi = Math.round((data.totals.exp / data.totals.inc) * 100);
      // орлого зарлагын хувыг тооцоолно.
      else data.huvi = 0;
    },
    calculatePersentages: function () {
      data.items.exp.forEach(function (el) {
        el.calcPrecentage(data.totals.inc);
      });
    },
    getPersentages: function () {
      var allPersentages = data.items.exp.map(function (el) {
        return el.getPersentage();
      });
      return allPersentages;
    },
    tusuviigAvah: function () {
      return {
        tusuv: data.tusuv,
        huvi: data.huvi,
        totalInc: data.totals.inc,
        totalExp: data.totals.exp,
      };
    },
    deleteItem: function (type, id) {
      var ids = data.items[type].map(function (el) {
        return el.id;
      });
      var index = ids.indexOf(id);
      if (index !== -1) {
        data.items[type].splice(index, 1);
      }
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

    if (input.description !== "" && input.value !== "" && !isNaN(input.value)) {
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
    // Tusuviig tootsoolood delgetsend shineer uzuulne.
    updateTusuv();
  };

  var updateTusuv = function () {
    //     // 4. Төсөвийг тооцно
    financeController.tusuvTootsooloh();
    //     // 5. Эцэсийн үлдэгдэл
    var tusuv = financeController.tusuviigAvah();
    // 6.Төсөвийн тооцоог дэлгэцэнд гаргана.
    uiController.tusuviigUzuuleh(tusuv);
    // 7. элментүүдийн хувийг тооцоолно.
    financeController.calculatePersentages();
    // 8. Элментүүдийн хувийг хүлээж авна.
    var allPersentages = financeController.getPersentages();
    // 9. Эдгээр хувийг дэлгэцэнд гаргана.
    uiController.displayPrecentages(allPersentages);
    //console.log(allPersentages);
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
    document
      .querySelector(DOM.containerDiv)
      .addEventListener("click", function (event) {
        var id = event.target.parentNode.parentNode.parentNode.parentNode.id;
        //console.log(id);
        //
        if (id) {
          var arr = id.split("-");
          var type = arr[0];
          var itemId = parseInt(arr[1]);
          //console.log(type + " " + itemId);
          // 1. sanhuugiin modulaas type, id ashgilaad ustganga
          financeController.deleteItem(type, itemId);
          // 2. Delgets deerees elmentiig ustgana
          uiController.deleteListItem(id);
          // 3. Uldegdel tootsoog shinechilj haruulna
          // Tusuviig tootsoolood delgetsend shineer uzuulne.
          updateTusuv();
        }
      });
  };

  return {
    init: function () {
      console.log("Application started...");
      uiController.displayDate();
      uiController.tusuviigUzuuleh({
        tusuv: 0,
        huvi: 0,
        totalInc: 0,
        totalExp: 0,
      });
      setupEventListeners();
    },
  };
})(uiController, financeController);

appController.init(); // appController- оос эхлэх функцийг дуудаж байна
