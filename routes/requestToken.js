var request = require('request');

var requestToken = function(code){

    var url = 'https://matthieumarino.eu.auth0.com/oauth/token?' +
        'client_id=8pWC7g19yIA08vpw3wKYz1cDjpuvbrG2' +
        '&redirect_uri=http://localhost:3001/login' +
        '&client_secret=zXa4SOgEwK0IRf7O0XHJE_ZXYnKcIm-4i3KNKbM6Si1TmvEJdILATey62buIUT0k' +
        '&code=' +
        code +
        '&grant_type=authorization_code';

    var options = {
            method: 'post',
            url: url,
        port:'3000',
            headers: {
                'Content-type': 'application/x-www-form-urlencoded'
            }
        };

    request(options, function (err, res, body) {
        console.log("BOOP");
        if (err) {
            console.log('Error :', err);
            return
        }
        console.log(' Body :', body)
    });
};

module.exports = requestToken;