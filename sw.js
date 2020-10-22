const appName = 'one-thing-to-do'
const version = appName + '-v0.1.11';

self.addEventListener('install', (event) => {
	event.waitUntil(
		precache()
	);
});

self.addEventListener('fetch', function (event) {
	event.respondWith(
		fromCache(event.request)
	);

	event.waitUntil(
		update(event.request).then(refresh)
	)

});

self.addEventListener('activate', function (evt) {
	evt.waitUntil(
		caches.keys().then((keyList) => {
			return Promise.all(keyList.map((key) => {
				if (key !== version) {
					console.log('[ServiceWorker] Removing old cache', key);
					return caches.delete(key);
				}
			}));
		})
	);
	// if (evt.request.mode !== 'navigate') {
	// 	// Not a page navigation, bail.
	// 	return;
	// }
	// evt.respondWith(
	// 	fetch(evt.request)
	// 		.catch(() => {
	// 			return caches.open(version)
	// 				.then((cache) => {
	// 					return cache.match('offline.html');
	// 				});
	// 		})
	// );
});


function precache() {
	return caches.open(version).then((cache) => {
		return cache.addAll([
			'./index.html',
			'./add.html',
			'./offline.html',
			'./site.webmanifest',
			'./favicon.ico/favicon-16x16.png',
			'./favicon.ico/favicon-32x32.png',
			'./favicon.ico/android-chrome-192x192.png',
			'./favicon.ico/android-chrome-512x512.png',
			'./favicon.ico/apple-touch-icon.png',
			'./static/js/formhandler.js',
			'./static/js/main.js',
			'./static/js/refresh-page.js',
			'./static/js/localforage.min.js',
			'./static/style/main.css',
			'./static/style/minireset.css',
			'./static/style/_fonts.css',
			'./static/style/_variables.css',
			'./static/style/fonts/HanziPenSC-W3-Proportional.woff',
			'./static/style/fonts/signika-v10-latin-300.woff',
			'./static/style/fonts/signika-v10-latin-700.woff',
		]);
	}).catch(function (err) {
		console.log(err)
	})
}

// function fromCache(request) {
// 	return caches.match(request).then(function (response) {
// 		// caches.match() always resolves
// 		// but in case of success response will have value
// 		if (response !== undefined) {
// 			return response;
// 		} else {
// 			return fetch(request).then(function (response) {
// 				// response may be used only once
// 				// we need to save clone to put one copy in cache
// 				// and serve second one
// 				let responseClone = response.clone();

// 				caches.open(version).then(function (cache) {
// 					cache.put(request, responseClone);
// 				});
// 				return response;
// 			}).catch(function (err) {
// 				console.log(err)
// 				// return caches.match('/sw-test/gallery/myLittleVader.jpg');
// 			});
// 		}
// 	})
// }

function fromCache(request) {
	return caches.open(version).then(function (cache) {
		return cache.match(request).then(function (matching) {
			return matching || Promise.reject('no-match');
		});
	});
}

function update(request) {
	return caches.open(version).then(function (cache) {
		return fetch(request).then(function (response) {
			return cache.put(request, response);
		});
	});
}

function refresh(response) {
	return self.clients.matchAll().then(function (clients) {
		clients.forEach(function (client) {
			var message = {
				type: 'refresh',
				url: response.url,
				eTag: response.headers.get('ETag')
			};
			client.postMessage(JSON.stringify(message));
		});
	});
}
