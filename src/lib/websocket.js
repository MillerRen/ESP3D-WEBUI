if (process.env.NODE_ENV != 'production ') {
    require('../../mocks/websocket')
} 

// inspired from socktte
function noop(e) {
    console.log(e)
}

export default function (url, protocols) {
	$ = $ || {};

	var ws, num=0, timer=1, $={};
	var max = $.maxAttempts || Infinity;

	$.open = function () {

		ws = new WebSocket(url, protocols || []);

		ws.onmessage = $.onmessage || noop;

		ws.onopen = function (e) {
			($.onopen || noop)(e);
			num = 0;
		};

		ws.onclose = function (e) {
			e.code === 1e3 || e.code === 1001 || e.code === 1005 || $.reconnect(e);
			($.onclose || noop)(e);
		};

		ws.onerror = function (e) {
			(e && e.code==='ECONNREFUSED') ? $.reconnect(e) : ($.onerror || noop)(e);
		};
	};

	$.reconnect = function (e) {
		if (timer && num++ < max) {
			timer = setTimeout(function () {
				($.onreconnect || noop)(e);
				$.open();
			}, $.timeout || 1e3);
		} else {
			($.onmaximum || noop)(e);
		}
	};

	$.json = function (x) {
		ws.send(JSON.stringify(x));
	};

	$.send = function (x) {
		ws.send(x);
	};

	$.close = function (x, y) {
		timer = clearTimeout(timer);
		ws.close(x || 1e3, y);
	};

	$.open(); // init

	return $;
}
