let http = require('http');
let url = require('url');

function start(route, handle) {
    function onRequest(request, response) {
        let pathname = url.parse(request.url).pathname;
        let queryData = url.parse(request.url, true).query; // 버튼이 클릭되면 넘겨주겠다

        route(pathname, handle, response, queryData.productId); // 서버가 루트에게 pathname 전달
    }

    http.createServer(onRequest).listen(8888); // localhost:8888
}

exports.start = start;
