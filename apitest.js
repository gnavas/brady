$( document ).ready( function(){
var x = function(){$.getJSON("http://api.yelp.com/v2/search?term=food&location=San+Francisco&oauth_consumer_key=OeMC9uJnKChQ4Vqz7kW4jQ&oauth_token=cPyTFWBrMwTrIp2rrUIz8l5lDNDrza5g&oauth_signature_method=hmac-sha1",function(data){
 console.log(data);
});
};
x();	
});

// Consumer Key	OeMC9uJnKChQ4Vqz7kW4jQ
// Consumer Secret	EerFBnhIlCJB3UZgF6IS_WfL6tk
// Token	cPyTFWBrMwTrIp2rrUIz8l5lDNDrza5g
// Token Secret	RK5dv-4Inlq-e5KQ6oaPUOiiIKg

// oauth_consumer_key	Your OAuth consumer key (from Manage API Access).
// oauth_token	The access token obtained (from Manage API Access).
// oauth_signature_method	hmac-sha1
// oauth_signature	The generated request signature, signed with the oauth_token_secret obtained (from Manage API Access).
// &oauth_signature=EerFBnhIlCJB3UZgF6IS_WfL6tk
//&oauth_timestamp=RK5dv-4Inlq-e5KQ6oaPUOiiIKg