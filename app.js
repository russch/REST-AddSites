var XMLWriter = require('xml-writer');
var pd = require("pretty-data").pd;
var request = require("request");
var connect = require("connect");
var parseString = require('xml2js').parseString;
var util = require("util");





	var reqLogin = new XMLWriter();
	reqLogin.startElement('tsRequest').startElement('credentials').writeAttribute('name', 'russch')
		.writeAttribute('password', 'xyzzy').startElement('site').writeAttribute('contentUrl', '');
	prettyText = pd.xml(reqLogin.toString());
    //console.log(prettyText);
	
    request.post(
		{
			url: 'http://10.211.55.4/api/2.0/auth/signin',
			body: reqLogin.toString(),
			headers: {'Content-Type': 'text/xml'}
		},
		function(err, response, body) {
			if(err) {
				console.log(err);
                process.exit(1);
			} else {
                parseString(body, function (err, result) {
                    tokencontainer = (result.tsResponse.credentials[0]);
                    token = tokencontainer.$.token;
                    console.log('Logged in, token is ', token);
                    //createSite(token);
                });
			}		    
        }
	);

function createSite(token) {
    var reqCreateSite = new XMLWriter();
    reqCreateSite.startElement('tsRequest').startElement('site')
        .writeAttribute('name', 'site5')
        .writeAttribute('contentUrl', 'foohaa')
        .writeAttribute('userQuota', '10')
        .writeAttribute('storageQuota','15')
        .writeAttribute('disableSubscriptions', 'false');

    prettyText = pd.xml(reqCreateSite.toString());
    console.log(prettyText);

    request.post(
		{
			url: 'http://10.211.55.4/api/2.0/auth/signin',
			body: reqCreateSite.toString(),
			headers: {'Content-Type': 'text/xml', 'X-Tableau-Auth': token}
		},
		function(err, response, body) {
			if(err) {
				console.log(err);
                process.exit(1);
			} 
            else {
                console.log(response);
                console.log(body);
                }
			}		    
    
	);

}

