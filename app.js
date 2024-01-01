// дэлгэцтэй ажиллах контроллер
var uiController = (function(){
 
  })();
// санхүүтэй холбоотой контроллер
var financeController = (function(){
  
})();
// closure нь гадагшаа хандах гарц болдог ба IIFE тэй хамт data encapsulation ийг гүйцэтгэнэ. 
// Программын холбогч контроллер 
var appController = (function(uiController, financeController){

  var ctrlAddItem = function (){
    // 1. Оруулах өгөгдлийг дэлгэцээс олж авна.
  console.log("Дэлгэцээс өгөгдлөө авах хэсэг.");
  // 2. Олж авсан өгөгдлүүдээ санхүүгийн конт- руу дамжуулж тэнд хадгална.
  // 3. Олж авсан өгөгдлүүдээ вебийн тохирох хэсэгт гаргана.
  // 4. Төсөвийг тооцно 
  // 5. Эцэсийн үлдэгдэл тооцоог дэлгэцэнд гаргана. 

  }
  document.querySelector(".add__btn").addEventListener("click",function(){
    
    ctrlAddItem();
    
  })
  document.addEventListener("keypress",function(event){
    if(event.keyCode ===13 || event.which ===13){
      ctrlAddItem();
    }   
  })

})(uiController, financeController);