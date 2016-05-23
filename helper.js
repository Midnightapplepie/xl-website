var nodemailer = require('nodemailer');

var helper = function(){
	return {

		parseDirection:function(jsonString){
			var data = JSON.parse(jsonString)
			var legs = data["routes"][0]["legs"][0];
			var steps = legs["steps"];
			var array = [];

			for (i in steps){
				array.push({
					distance: steps[i]["distance"]["text"],
					time:steps[i]["duration"]["text"],
					instruction:steps[i]["html_instructions"]
				})
			}

			return{
				start: legs["start_address"],
				end: "250 West Portal Ave, San Francisco, CA 94127",
				distance: legs["distance"]["text"],
				duration: legs["duration"]["text"],
				directions: array 
				
			}
		},

		
		transporter: function(){
			return  nodemailer.createTransport({
							service: 'Gmail',
							auth:{
								user: "x@gmail.com",
								pass: "x"
							}
						})
			},

		mailOptions: function(user){
			return {
				from: user.name,
				// to: "jeff_louie@sbcglobal.net",
				// to: "management@xiaoloong.com",
				to: "kevx@email.com",
				subject: "Message to XiaoLoong management " +"<"+ user.subject +">",
				html: "<p>From: "+ user.email +"</p><br>" +
				      "<p>Message: " + user.message +"</p><br>" +
				      "<p>Phone: " + user.phone +"</p><br>" +
				      "<p>Name: " + user.name + "</p>"
			}
		}

	}
}()

module.exports = helper;
