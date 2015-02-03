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
      var thisData = $(this).parent().parent().parent().html();
      // if ($(this).attr("checked") === "checked") {
      //   $(this).removeAttr("checked"); //setting attribute to keep track of checked/unchechekd boxes//
      // }else{$(this).attr("checked","checked");

      // }
      me.rotate(thisData);
      me.toggleBoxChecker(boxCheck);
    });
   
  };
  SubmitListener.prototype.toggleBoxChecker=function(boxCheck){
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
      var pDiv = $(this).parent();
      var formEl = $(pDiv).children().last();
      var checkEl = $(formEl).children().last();
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

  SubmitListener.prototype.rotate = function(thisData){
    console.log("Made it to checkbox listener");
    var mainPic = $(thisData).find("img").first().attr("src");
    var ratingPic = $(thisData).find("p").find("img").attr("src");
    var title = $(thisData).find("h1").text();
    // $(".empty").first().html(thisData);
     var source = $("#replace-template").html();
      var template = Handlebars.compile(source);
      var html = template({
        mainPic:mainPic,
        ratingPic:ratingPic,
        title:title,
      });
      $(".empty").parent().html(html);

      $(".check-size").each(function(){
            if(($(this).text().length) > 25){
              $(this).css("fontSize","16px");
            }else{
              $(this).css("fontSize","20px");
            }});
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
            if(($(this).text().length) > 20){
              $(this).css("fontSize","16px");
            }else{
              $(this).css("fontSize","20px");
            }});
};
Brady();

});