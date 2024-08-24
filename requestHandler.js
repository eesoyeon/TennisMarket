const fs = require('fs'); // html 파일 가져오기
const main_view = fs.readFileSync('./main.html');
const orderlist_view = fs.readFileSync('./orderlist.html');

const mariadb = require('./database/connect/mariadb');

/* main page */
function main(response) {
    console.log('main');

    mariadb.query('SELECT * FROM product', function (err, rows) {
        console.log(rows);
    }); // sql 던지기

    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.write(main_view); // 화면에 표시
    response.end();
}

function favicon() {
    console.log('favicon');
}

/* racket image */
function redRacket(response) {
    fs.readFile('./img/redRacket.png', function (err, data) {
        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.write(data); // 화면에 표시
        response.end();
    });
}

function blueRacket(response) {
    fs.readFile('./img/blueRacket.png', function (err, data) {
        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.write(data); // 화면에 표시
        response.end();
    });
}

function blackRacket(response) {
    fs.readFile('./img/blackRacket.png', function (err, data) {
        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.write(data); // 화면에 표시
        response.end();
    });
}

/* order button */
function order(response, productId) {
    response.writeHead(200, { 'Content-Type': 'text/html' });

    mariadb.query(
        'INSERT INTO orderlist VALUES (' +
            productId +
            ", '" +
            new Date().toLocaleDateString() +
            "');",
        function (err, rows) {
            console.log(rows);
        }
    );

    response.write('order page'); // 화면에 표시
    response.end();
}

/* orderlist page */
function orderList(response) {
    console.log('orderlist');
    response.writeHead(200, { 'Content-Type': 'text/html' });

    mariadb.query('SELECT * FROM orderlist', function (err, rows) {
        response.write(orderlist_view); // 화면에 표시

        rows.forEach((e) => {
            response.write(
                '<tr>' +
                    '<td>' +
                    e.product_id +
                    '</td>' +
                    '<td>' +
                    e.order_date +
                    '</td>' +
                    '</tr>'
            );
        });

        response.write('</table>');
        response.end();
    });
}

let handle = {}; // key:value

handle['/'] = main;
handle['/order'] = order;
handle['/orderlist'] = orderList;

/* image directory */
handle['/img/redRacket.png'] = redRacket;
handle['/img/blueRacket.png'] = blueRacket;
handle['/img/blackRacket.png'] = blackRacket;

handle['/favicon.ico'] = favicon;

exports.handle = handle;
