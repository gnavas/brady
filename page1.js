$( document ).ready( function(){

  var Brady = function(){
    this.callyelp = new CallYelp();//initialize yelp call//
    // this.submitlistener = new SubmitListener();//initializes event listeners//
  };

  var SubmitListener = function(thisData,masterArr){
    console.log("Made it to SubmitListener");
    console.log(masterArr);
    var me = this; //enables me to reference SubmitListener below//
    $("body").delegate(".removeButton","click",function(e){ //set click listener on remove button//
    var removeBut = this;
    me.removeComparator(removeBut);
    me.removeBoxStateChecker(removeBut,thisData);
    });
    $("body").delegate(".compareButton","click",function(e){ //set click listener on compare button//
    // var submitClick = this;
    me.compareWhat(thisData,masterArr,me);
    // me.callyelpbiz = new CallYelpBiz();
    // me.compare(thisData,submitClick);
    });
    $("body").delegate(".check","click",function(e){ //set listener on check boxes//
      var boxCheck = this;
      var checkData = $(this).parent().parent().parent().parent().html();
      var crazy = $(checkData).find(".check").attr("checked");
     var clickName = $(checkData).find("h1").text();
     var topRow = $(".size_check").eq(1).text();
     me.toggleBoxChecker(boxCheck,me);
    if(crazy === "checked"){
       me.removeCompare(clickName);
    }else{me.rotate(checkData,me,thisData);
    }
    });
  };

  SubmitListener.prototype.compareWhat = function(thisData,masterArr,me){
  var topLeft = $(".size_check").first().text();
  var topRight = $(".size_check").last().text();
  var topMiddle = $(".size_check").eq(1).text();
  var counter = 0;
  var compareArr = [];
  // console.log(topLeft);
  // console.log(topRight);
  // console.log(topMiddle);
// console.log(masterArr[0][0]);
// console.log(masterArr[0][1]);
masterArr.forEach(function(x){
if((x[0] === topLeft) || (x[0]=== topRight) || (x[0]===topMiddle)){
  var id = x[1];
  counter++; 
  // console.log("id",id);
  me.callyelpbiz = new CallYelpBiz(id,me,compareArr,counter);
}
});
// masterArr.forEach(function(){
//   var re = /apples/gi;
// var str = 'Apples are round, and apples are juicy.';
// var newstr = str.replace(re, 'oranges');
// console.log(newstr);  // oranges are round, and oranges are juicy

// });
  };
  SubmitListener.prototype.compareFirst = function(data,compareArr){
    console.log("comparearr Harboug",compareArr);
    // console.log("name0",compareArr[0].name);
    // console.log("name1",compareArr[1].name);
    // console.log("name2",compareArr[2].name);

  var source = $("#showone-template").html();
  var template = Handlebars.compile(source);
  var html = template({compareArr:compareArr});
    $("#searchPage").html(html);

  };
  //   SubmitListener.prototype.compareSecond = function(data,compareArr){
  // var source = $("#showone-template").html();
  // var template = Handlebars.compile(source);
  // var html = template({bizData:data});
  //   $("#compareSecond").html(html);

  // };
  //   SubmitListener.prototype.compareThird = function(data,compareArr){
  // var source = $("#showone-template").html();
  // var template = Handlebars.compile(source);
  // var html = template({bizData:data});
  //   $("#compareThird").html(html);

  // };
  SubmitListener.prototype.toggleBoxChecker=function(boxCheck,me){
if ($(boxCheck).attr("checked") === "checked") {
        $(boxCheck).removeAttr("checked"); //setting attribute to keep track of checked/unchechekd boxes//
      }else{$(boxCheck).attr("checked","checked");
      }
  };
  SubmitListener.prototype.removeBoxStateChecker=function(removeBut,thisData){
    var parentDiv = $(removeBut).parent();
    var title = $(parentDiv).find(">:first-child").text();
     $(".check-size").each(function(){
      var pDiv = $(this).parent().next();
      var formEl = $(pDiv).children().last();
      var checkEl = $(formEl).children().last();
      if(($(this).text())===title){
        $(checkEl).removeAttr("checked");
      }
          });
  };
  SubmitListener.prototype.removeComparator= function(removeBut){
  $(removeBut).parent().parent().attr("class","empty");
  $(removeBut).parent().parent().html("<div class='col-md-3'></div>");
  };
  SubmitListener.prototype.removeCompare= function (clickName){
  var topLeft = $(".size_check").first().text();
  var topRight = $(".size_check").last().text();
  var topMiddle = $(".size_check").eq(1).text();
  if(clickName === topLeft) {
 $(".size_check").first().parent().parent().attr("class","empty");
 $(".size_check").first().parent().parent().html("<div class='col-md-3'></div>");
 
}
if(clickName === topRight) {
 $(".size_check").last().parent().parent().attr("class","empty");
 $(".size_check").last().parent().parent().html("<div class='col-md-3'></div>");
 
}
  if(clickName === topMiddle) {
 $(".size_check").eq(1).parent().parent().attr("class","empty");
 $(".size_check").eq(1).parent().parent().html("<div class='col-md-3'></div>");
 
}

};

  SubmitListener.prototype.rotate = function(checkData,me,thisData){
    var changeFirst = $("#first");
    var changeSecond = $("#second");
    var changeThird = $("#third");
    var first = $("#first").html();
    var second = $("#second").html();
    var third = $("#third").html();
    var uncheckThird = $(".check").last();
    var mainPic = $(checkData).find("img").first().attr("src");
    var ratingPic = $(checkData).find("p").find("img").attr("src");
    var title = $(checkData).find("h1").text();
    var source = $("#replace-template").html();
    var template = Handlebars.compile(source);
    var html = template({
        mainPic:mainPic,
        ratingPic:ratingPic,
        title:title,
      });
      if($(".empty")[0]){
      $(".empty").first().parent().html(html);

      $(".size_check").each(function(){
            if(($(this).text().length) < 23){
              $(this).css("fontSize","16px");
            }if(($(this).text().length)<15){
              $(this).css("fontSize","18px");
            }else{
              $(this).css("fontSize","14px");
            }});
    }else{
    $(changeFirst).html(html);
    $(changeSecond).html(first);
    me.removeThird(checkData,thisData);
    $(changeThird).html(second);
    }
  };

SubmitListener.prototype.removeThird = function(checkData,thisData){

var topRight = $(".size_check").last().text();
var clickName = $('p');

 $(".check-size").each(function(){
      var pDiv = $(this).parent().next();
      var formEl = $(pDiv).children().last();
      var checkEl = $(formEl).children().last();
      if(($(this).text())===topRight){
        $(checkEl).removeAttr("checked");
      }
          });
// // clickName.forEach(function(x){
// if(($(x).text()) === topRight){
// console.log("Holy Fucking Shit this sucks");
// }
// });
  };

  var CallYelp = function(){
    var me = this;
   function press(){
    $("form").submit(function(e){
      e.preventDefault();
      var searchTerm = $("#rest").val();
      var currentAdress = $("#addr").val();
      var request_data = {
        // url:"http://api.yelp.com/v2/business/cinco-de-mayo-taqueria-san-francisco",
        url: "http://api.yelp.com/v2/search",
        method: "GET",
        data: {
          callback: "cb",
          term: searchTerm ,
          offset:20,
          sort:2,
          location:"San Francisco,CA" + currentAdress,
        }
      };
      $.ajax({
        url: request_data.url,
        type: request_data.method,
        cache: true,
        data: oauth.authorize(request_data, token),
        dataType: "jsonp",
        jsonpCallback: "cb",
        success: function (data) {
          var counter = -1 ;
         data.businesses.forEach(function(x){
            counter= counter+1;
            console.log(counter);
            if (counter%3===0){
              x.isFourth = true;
            }else{
              x.isFourth = false;
            }

          });

          var source = $("#search-template").html();
          var template = Handlebars.compile(source);
          var html = template({yelpData:data});
          $("#searchPage").html(html);
          $(".check:eq(0)").attr("checked","true");
          $(".check:eq(1)").attr("checked","true");
          $(".check:eq(2)").attr("checked","true");
          me.checkText();
          me.pushIds(data,me);
          // me.submitlistener = new SubmitListener(data);
        }
    }); //end ajax call
}); 
}

var oauth = OAuth({
  consumer: {
    public: "OeMC9uJnKChQ4Vqz7kW4jQ",
    secret: "EerFBnhIlCJB3UZgF6IS_WfL6tk"
  },
  signature_method: "HMAC-SHA1"
});

var token = {
  public: "cPyTFWBrMwTrIp2rrUIz8l5lDNDrza5g",
  secret: "RK5dv-4Inlq-e5KQ6oaPUOiiIKg"
};

press();  
};//end of Call Yelp 1//
 var CallYelpBiz = function(id,me,compareArr,counter){
  // console.log("made it to yelpbiz");
  // console.log(id);

//   var re = /apples/gi;
// var str = 'Apples are round, and apples are juicy.';
// var newstr = str.replace(re, 'oranges');
// console.log(newstr);  // oranges are round, and oranges are juicy
    // var me = this;
   function press(id, compareArr,counter){
    console.log("idcheck",id);
    var callName = id.replace(/[^A-z]/gi,"");
      var request_data = {
        url:"http://api.yelp.com/v2/business/"+id,
        method: "GET",
        data: {
          callback: callName,
        }
      };
      $.ajax({
        url: request_data.url,
        type: request_data.method,
        cache: true,
        data: oauth.authorize(request_data, token),
        dataType: "jsonp",
        jsonpCallback: callName,
        success: function (data) {
         // console.log(data);
         // if (counter ===1) {
        //   me.compareFirst(data,compareArr);
        // }
        // if (counter ===2) {
        //   me.compareSecond(data,compareArr);
        // }
        // if (counter ===3) {
        //   me.compareThird(data,compareArr);
        // }
          console.log(data);
          compareArr.push(data);
          if (compareArr.length ===3) {
            compareArr[0].isNotThree = true;
            compareArr[1].isNotThree = true;
            compareArr[2].isThree = true;
         me.compareFirst(data,compareArr);
         // console.log("compareArr",compareArr);
         // console.log("compareArr0",compareArr[0]);
         // console.log("compareArr0",compareArr[0].name);
         // console.log("name1",compareArr[1].name);
         // console.log("name2",compareArr[2].name);
        }}
    }); //end ajax call to yelpbiz 
}

var oauth = OAuth({
  consumer: {
    public: "OeMC9uJnKChQ4Vqz7kW4jQ",
    secret: "EerFBnhIlCJB3UZgF6IS_WfL6tk"
  },
  signature_method: "HMAC-SHA1"
});

var token = {
  public: "cPyTFWBrMwTrIp2rrUIz8l5lDNDrza5g",
  secret: "RK5dv-4Inlq-e5KQ6oaPUOiiIKg"
};

press(id,compareArr,counter);  
};//end of yelpbiz call//

CallYelp.prototype.pushIds = function(data,me){
console.log(data);
console.log(data.businesses);
var masterArr = [];
data.businesses.forEach(function(x){
var arr=[x.name,x.id];
console.log(arr);
masterArr.push(arr);
});
console.log("Master Master",masterArr);
console.log(masterArr[0]);
console.log(masterArr[1]);
console.log(masterArr[0][0]);
me.submitlistener = new SubmitListener(data,masterArr);
};
CallYelp.prototype.checkText = function(){
 $(".check-size").each(function(){
            if(($(this).text().length)<23){
              $(this).css("fontSize","16px");
            }if(($(this).text().length)<15){
              $(this).css("fontSize","18px");
            }else{
              $(this).css("fontSize","14px");
            }});
 $(".size_check").each(function(){
            if(($(this).text().length) < 23){
              $(this).css("fontSize","16px");
            }if(($(this).text().length)<15){
              $(this).css("fontSize","18px");
            }else{
              $(this).css("fontSize","14px");
            }});
};
Brady();

});