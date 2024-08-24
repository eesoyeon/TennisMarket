function route(pathname, handle, response, productId) {
    console.log('pathname: ' + pathname);

    if (typeof handle[pathname] == 'function') {
        handle[pathname](response, productId);
    } else {
        response.writeHead(404, { 'Content-Type': 'text/html' });
        response.write('Not Found'); // 화면에 표시
        response.end();
    }
}

exports.route = route;
