$( document ).ready( function(){

  var Brady = function(){
    this.callyelp = new CallYelp();//initialize yelp call//
    // this.submitlistener = new SubmitListener();//initializes event listeners//
  };

  var SubmitListener = function(thisData){
    console.log("Made it to Submit Listener");
    console.log(thisData);
    var me = this; //enables me to reference SubmitListener below//
    $("body").delegate(".removeButton","click",function(e){ //set click listener on remove button//
    var removeBut = this;
    me.removeComparator(removeBut);
    me.removeBoxStateChecker(removeBut,thisData);
    });
    $("body").delegate(".check","click",function(e){ //set listener on check boxes//
      var boxCheck = this;
      var checkData = $(this).parent().parent().parent().parent().html();
      console.log("Hello There"+thisData);
      var crazy = $(checkData).find(".check").attr("checked");
    console.log("thiscrazzzy",crazy);
    if(crazy === "checked"){
      console.log(true);
    }else{console.log(false);
    }
     var clickName = $(checkData).find("h1").text();
     var topRow = $(".size_check").eq(1).text();
     console.log(topRow);
     console.log("Naezzzzz");
    me.toggleBoxChecker(boxCheck,me);

    if(crazy === "checked"){
       me.removeCompare(clickName);
      console.log(true);
    }else{console.log(false);
       me.rotate(checkData,me,thisData);
    }
    // me.removeCompare(clickName);
    // me.rotate(thisData);
      // me.removeComparator(boxCheck);
    });
    // me.rotate(thisData);
    //   console.log("hiiiii");
    //   console.log(thisData);
  };
  SubmitListener.prototype.toggleBoxChecker=function(boxCheck,me){
if ($(boxCheck).attr("checked") === "checked") {
        $(boxCheck).removeAttr("checked"); //setting attribute to keep track of checked/unchechekd boxes//
      }else{$(boxCheck).attr("checked","checked");
      }
  };
  SubmitListener.prototype.removeBoxStateChecker=function(removeBut,thisData){
    console.log("Made it to removeBOxStateChecker");
    console.log(thisData);
    var parentDiv = $(removeBut).parent();
    var title = $(parentDiv).find(">:first-child").text();
     $(".check-size").each(function(){
      var pDiv = $(this).parent().next();
      var formEl = $(pDiv).children().last();
      var checkEl = $(formEl).children().last();
      console.log("checkEl",checkEl);
      if(($(this).text())===title){
        console.log("Brady");
        $(checkEl).removeAttr("checked");
      }
          });
  };
  SubmitListener.prototype.removeComparator= function(removeBut){
  $(removeBut).parent().parent().attr("class","empty");
  $(removeBut).parent().parent().html("<div class='col-md-3'></div>");
  };
  SubmitListener.prototype.removeCompare= function (clickName){
    console.log("Made it to remove compare");
    console.log(topLeft);
    console.log(clickName);
    console.log("End of made it to remvoe compare");
  var topLeft = $(".size_check").first().text();
  var topRight = $(".size_check").last().text();
  var topMiddle = $(".size_check").eq(1).text();
    console.log(topLeft);
    console.log(clickName);
    console.log("End of made it to remvoe compare");
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
    console.log("Brady Flakes",uncheckThird);
    console.log("Made it to ROTATE THIS DATA");
    console.log(checkData);
    var mainPic = $(checkData).find("img").first().attr("src");
    console.log(mainPic);
    var ratingPic = $(checkData).find("p").find("img").attr("src");
    console.log(ratingPic);
    var title = $(checkData).find("h1").text();
    // $(".empty").first().html(thisData);
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
      console.log("lalalalalallalalalalalalalalallalalalal - George");
      console.log(first);
      console.log(second);
      console.log(third);
    $(changeFirst).html(html);
    $(changeSecond).html(first);
    me.removeThird(checkData,thisData);
    $(changeThird).html(second);
    }
  };

  SubmitListener.prototype.removeThird = function(checkData,thisData){
console.log("I made it to fucking removeThird");
console.log(thisData);
var topRight = $(".size_check").last().text();
console.log(topRight);
var clickName = $('p');
console.log(clickName);

 $(".check-size").each(function(){
      var pDiv = $(this).parent().next();
      var formEl = $(pDiv).children().last();
      var checkEl = $(formEl).children().last();
      console.log("checkEl",checkEl);
      if(($(this).text())===topRight){
        console.log("Brady");
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
      
          // add a property called isFourth, this is true or false
          // loop over the data.businesses array 
          // if the index
          // data.businesses.forEach(function(val,index){
              // if index % 4 === 0 
              // data.businesses[index].isFourth = true
          // })
          console.log(data);
          var source = $("#search-template").html();
          var template = Handlebars.compile(source);
          var html = template({yelpData:data});
          $("#searchPage").html(html);
          $(".check:eq(0)").attr("checked","true");
          $(".check:eq(1)").attr("checked","true");
          $(".check:eq(2)").attr("checked","true");
          me.checkText();
          me.submitlistener = new SubmitListener(data);
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