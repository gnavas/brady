(function (){

$( document ).ready( function(){

  var Brady = function(searchCounter){
    var me = Brady;
    me.SearchDropDownMenu = new SearchDropDownMenu();
    if (searchCounter >5) {
      searchCounter = 0;
    }
     $("form").submit(function(e){
      e.preventDefault();
      var searchTerm = $("#rest").val();
      console.log("searchTerm",searchTerm);
      var currentAddress = $("#addr").val();
      console.log("currentAddress",currentAddress);
      searchCounter ++;
      me.callyelp = new CallYelp(searchTerm,currentAddress);
      me.StoreData = new StoreData(searchTerm,currentAddress,me,searchCounter);

    }); //initialize yelp call//
    // this.submitlistener = new SubmitListener();//initializes event listeners//
  };

  var SearchDropDownMenu = function(){
    var showDrop = function() {
    $("#previousSearchMenu").fadeIn(10);
    };
    var hideDrop = function(){
    $("#previousSearchMenu").fadeOut(500);
    };
    $(".dropdown").hover(showDrop,hideDrop);

  };

 var StoreData = function(searchTerm,currentAddress,me,searchCounter){

  var local = function(searchTerm,currentAddress){
  searchArr =[];
  searchArr.push([searchTerm,currentAddress]);
  console.log("searchArr",searchArr);
  searchArrMaster = JSON.parse(localStorage.getItem("searchHistory"));
  if(searchArrMaster.length === 5){
  searchArrMaster.shift();
  }
  searchArrMaster.push(searchArr);
  localStorage.setItem("searchHistory", JSON.stringify(searchArrMaster));
  console.log("searchArrMaster",searchArrMaster);
  var searchOneResults = searchArrMaster[0];
  var searchOneTerms = searchOneResults[0];
  $("#search1").text(searchOneTerms[0]+" + "+searchOneTerms[1]);
  var searchTwoResults = searchArrMaster[1];
  var searchTwoTerms = searchTwoResults[0];
  $("#search2").text(searchTwoTerms[0]+" + "+searchTwoTerms[1]);
  var searchThreeResults = searchArrMaster[2];
  var searchThreeTerms = searchThreeResults[0];
  $("#search3").text(searchThreeTerms[0]+" + "+searchThreeTerms[1]);
  var searchFourResults = searchArrMaster[3];
  var searchFourTerms = searchFourResults[0];
  $("#search4").text(searchFourTerms[0]+" + "+searchFourTerms[1]);
  var searchFiveResults = searchArrMaster[4];
  var searchFiveTerms = searchFiveResults[0];
  $("#search5").text(searchFiveTerms[0]+" + "+searchFiveTerms[1]);

};
  if (localStorage.getItem("searchHistory") === null) {
    console.log("I like dogs");
  var searchArrMaster = [];
  localStorage.setItem("searchHistory", JSON.stringify(searchArrMaster));
  local(searchTerm,currentAddress);
}  else{ {
  local(searchTerm,currentAddress);
}
}

  this.backToSearch(searchTerm,currentAddress,me);

};

StoreData.prototype.backToSearch = function(searchTerm,currentAddress,me){
$("body").delegate("#back","click",function(e){
      console.log("Made it to click back");
      me.callyelp = new CallYelp(searchTerm,currentAddress);

    });
};

  var SubmitListener = function(thisData,masterArr){
    var me = this; //enables me to reference SubmitListener below//
    function alpha(e){ //set click listener on remove button//

      var removeBut = this;
      me.removeComparator(removeBut);
      me.removeBoxStateChecker(removeBut,thisData);
    }
    function beta(e){ //set listener on check boxes//
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
   }
    $("body").delegate(".removeButton","click",alpha);
    $("body").delegate(".compareButton","click",function(e){ //set click listener on compare button//
      me.compareWhat(thisData,masterArr,me,alpha,beta);
    });
    $("body").delegate(".check","click",beta);
  };

  SubmitListener.prototype.compareWhat = function(thisData,masterArr,me,alpha,beta){
    var topLeft = $(".size_check").first().text();
    var topRight = $(".size_check").last().text();
    var topMiddle = $(".size_check").eq(1).text();
    var counter = 0;
    var compareArr = [];

    masterArr.forEach(function(x){
      if((x[0] === topLeft) || (x[0]=== topRight) || (x[0]===topMiddle)){
        var id = x[1];
        counter++; 
        me.callyelpbiz = new CallYelpBiz(id,me,compareArr,counter,alpha,beta);
      }
    });

  };
  SubmitListener.prototype.compareFirst = function(data,compareArr){
    var source = $("#showone-template").html();
    var template = Handlebars.compile(source);
    var html = template({compareArr:compareArr});
    $("#searchPage").html(html);

  };

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
};

var CallYelp = function(searchTerm,currentAddress){
  var me = this;
  function press(){
    // $("form").submit(function(e){
    //   e.preventDefault();
    //   var searchTerm = $("#rest").val();
    //   var currentAdress = $("#addr").val();
      var request_data = {
        // url:"http://api.yelp.com/v2/business/cinco-de-mayo-taqueria-san-francisco",
        url: "http://api.yelp.com/v2/search",
        method: "GET",
        data: {
          callback: "cb",
          term: searchTerm ,
          offset:20,
          sort:2,
          location:currentAddress,
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
// }); 
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

press(searchTerm,currentAddress);  
};//end of Call Yelp 1//
var CallYelpBiz = function(id,me,compareArr,counter,alpha,beta){
 function press(id,me, compareArr,counter,alpha,beta){
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

      compareArr.push(data);
      if (compareArr.length ===3) {
        compareArr[0].isNotThree = true;
        compareArr[1].isNotThree = true;
        compareArr[2].isThree = true;
        me.compareFirst(data,compareArr);
      $("body").off("click",".removeButton",alpha);
      $("body").off("click",".check",beta);

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

press(id,me,compareArr,counter,alpha,beta);  
};//end of yelpbiz call//

CallYelp.prototype.pushIds = function(data,me){
  var masterArr = [];
  data.businesses.forEach(function(x){
    var arr=[x.name,x.id];
    masterArr.push(arr);
  });

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
var searchCounter = 0;
Brady(searchCounter);

});
})();