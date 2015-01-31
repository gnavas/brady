$( document ).ready( function(){

var Brady = function(){
  this.callyelp = new CallYelp();
};

var CallYelp = function(){
 function press(){
  $("form").submit(function(e){
    var searchTerm = $("#rest").val();
    var request_data = {
      url: "http://api.yelp.com/v2/search",
      method: "GET",
      data: {
        callback: "cb",
        term: searchTerm ,
        limit: 16,
        location: "San Francisco",
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
        var title = (data.businesses[0].name);
        console.log(title);
        var rating = (data.businesses[0].rating_img_url);
        console.log(rating);
        var pix = (data.businesses[0].image_url);
        console.log(pix);
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
Brady();
});