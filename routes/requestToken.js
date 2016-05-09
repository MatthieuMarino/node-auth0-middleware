var request = require('request');

var requestToken = function(code){

    var url = 'https://' + process.env.AUTH0_DOMAIN + '/oauth/token' +
        'client_id=' + process.env.AUTH0_CLIENT_ID +
        '&redirect_uri=' + process.env.AUTH0_CALLBACK_URL +
        '&client_secret=' + process.env.AUTH0_CLIENT_SECRET +
        '&code=' +
        code +
        '&grant_type=authorization_code';
    //console.log(url);
    var options = {
            //method: 'POST',
            url: url,
        port:'3000',
            headers: {
                'Content-type': 'application/x-www-form-urlencoded'
            }//,
        //body:JSON.stringify({client_id: process.env.AUTH0_CLIENT_ID,
        //    redirect_uri: process.env.AUTH0_CALLBACK_URL,
        //    client_secret: process.env.AUTH0_CLIENT_SECRET,
        //    code: code,
        //    grant_type: 'authorization_code'
        //})
        };

    request.post(options, function (err, res, body) {
        //console.log("BOOP");
        if (err) {
            console.log('Error :', err);
            return
        }
        console.log(' Body :', body)
    });
};

module.exports = requestToken;