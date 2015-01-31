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

var request_data = {
  url: "http://api.yelp.com/v2/search",
  method: "GET",
  data: {
    callback: "cb",
    term: "cream puffs",
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
  }
});
