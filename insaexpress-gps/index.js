var request = require("request");

var POSITIONS = {};

function getSessID() {
    return new Promise(function (resolve, reject) {
        var options = {
            method: 'POST',
            url: 'https://sw3.solustop.com/Commun/login.php',
            headers:
                {
                    'Cache-Control': 'no-cache',
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
            form:
                {
                    page: 'carto.php',
                    plateforme: 'soluweb3',
                    login: process.env['SW3_LOGIN'] || '',
                    password: process.env['SW3_PASSWORD'] || ''
                }
        };

        request(options, function (error, response, body) {
            if (error) return reject(error);
            var cookies = response.headers['set-cookie'];
            var PHPSESSID = cookies[cookies.length - 1].split(";")[0].split("=")[1];
            resolve(PHPSESSID);
        });
    });
}

var auth = "";

function getData(retrying) {
    return new Promise(function (resolve, reject) {
        var j = request.jar();
        var cookie = request.cookie('PHPSESSID_SW3=' + auth);
        var url = 'https://sw3.solustop.com/Commun/getDonneesMobiles.php';
        j.setCookie(cookie, url);
        request({url: url, jar: j}, function (err, response, body) {
            if (err) return reject(err);
            if (response.statusCode > 300) {
                if (retrying) reject(response);
                else {
                    getSessID().then(function (n_auth) {
                        auth = n_auth;
                        return getData(true);
                    }, reject).then(resolve, reject)
                }
            } else {
                var data = JSON.parse(body);
                Promise.all(data.map(function (geoData) {
                    return {
                        name: geoData['nom'],
                        sid: geoData['numserie'],
                        dh: geoData['dh'],
                        latitude: geoData['lat'],
                        speed: -42, // Backend requires an int
                        longitude: geoData['lon']
                    }
                }).map(function (geoData) {
                    return new Promise(function (resolve, reject) {
                        if (POSITIONS.hasOwnProperty(geoData.sid) && POSITIONS[geoData.sid].dh >= geoData.dh) {
                            console.log('Already done '+geoData.sid);
                            console.log(geoData);
                            resolve(POSITIONS[geoData.sid]);
                        } else {
                            request.post(process.env['INSAEXPRESS_API'] + '/update/', {
                                json: {
                                    token: process.env['INSAEXPRESS_TOKEN'],
                                    position: geoData
                                }
                            }, function (err, response) {
                                if (err) return reject(err);
                                if (response.statusCode === 200) {
                                    POSITIONS[geoData.sid] = geoData;
                                }
                                resolve(geoData);
                            })
                        }
                    })
                })).then(resolve, reject)
            }
        })
    })
}

function fetch() {
    getData().then(function (value) {
        console.log("Fetched " + value.length + " positions");
        setTimeout(fetch, 20000)
    }, function (error) {
        console.error(error);
        setTimeout(fetch, 80000)
    });
}

fetch();