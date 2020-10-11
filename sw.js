const version = '0.1.3';

self.addEventListener('install', (event) => {
	event.waitUntil(
		caches.open(version).then((cache) => {
			return cache.addAll([
				'./',
				'./index.html',
				'./add.html',
				'./offline.html',
				'./favicon.ico',
				'./favicon.ico/android-chrome-192x192.png',
				'./favicon.ico/android-chrome-512x512.png',
				'./favicon.ico/apple-touch-icon.png',
				'./static/',
				'./static/js/',
				'./static/js/formhandler.js',
				'./static/js/main.js',
				'./static/js/localforage.min.js',
				'./static/style/',
				'./static/style/main.css',
				'./static/style/_fonts.css',
				'./static/style/_variables.css',
			]);
		})
	);
});

self.addEventListener('fetch', function (event) {
	event.respondWith(caches.match(event.request).then(function (response) {
		// caches.match() always resolves
		// but in case of success response will have value
		if (response !== undefined) {
			return response;
		} else {
			return fetch(event.request).then(function (response) {
				// response may be used only once
				// we need to save clone to put one copy in cache
				// and serve second one
				let responseClone = response.clone();

				caches.open(version).then(function (cache) {
					cache.put(event.request, responseClone);
				});
				return response;
			}).catch(function () {
				// return caches.match('/sw-test/gallery/myLittleVader.jpg');
			});
		}
	}));
});

// self.addEventListener('activate', function (evt) {
// 	evt.waitUntil(
// 		caches.keys().then((keyList) => {
// 			return Promise.all(keyList.map((key) => {
// 				if (key !== CACHE_NAME) {
// 					console.log('[ServiceWorker] Removing old cache', key);
// 					return caches.delete(key);
// 				}
// 			}));
// 		})
// 	);
// 	if (evt.request.mode !== 'navigate') {
// 		// Not a page navigation, bail.
// 		return;
// 	}
// 	evt.respondWith(
// 		fetch(evt.request)
// 			.catch(() => {
// 				return caches.open(CACHE_NAME)
// 					.then((cache) => {
// 						return cache.match('offline.html');
// 					});
// 			})
// 	);
// });



// self.addEventListener("install", function (event) {
// 	event.waitUntil(preLoad());
// });

// const preLoad = async function () {
// 	console.log("Installing web app");
// 	const cache = await caches.open("offline");
// 	console.log("caching index and important routes");
// 	return cache.addAll([
// 		'./',
// 		'./index.html',
// 		'./add.html',
// 		'./offline.html',
// 		'./favicon.ico/',
// 		'./static/',
// 		'./static/js/',
// 		'./static/js/formhandler.js',
// 		'./static/js/main.js',
// 		'./static/js/localforage.min.js',
// 		'./static/style/',
// 		'./static/style/main.css',
// 		'./static/style/_fonts.css',
// 		'./static/style/_variables.css',
// 	]);
// };

// self.addEventListener("fetch", function (event) {
// 	event.respondWith(checkResponse(event.request).catch(function () {
// 		return returnFromCache(event.request);
// 	}));
// 	event.waitUntil(addToCache(event.request));
// });

// const checkResponse = function (request) {
// 	return new Promise(function (fulfill, reject) {
// 		fetch(request).then(function (response) {
// 			if (response.status !== 404) {
// 				fulfill(response);
// 			} else {
// 				reject();
// 			}
// 		}, reject);
// 	});
// };

// const addToCache = async function (request) {
// 	const cache = await caches.open("offline");
// 	const response = await fetch(request);
// 	console.log(response.url + " was cached");
// 	return cache.put(request, response);
// };

// const returnFromCache = async function (request) {
// 	const cache = await caches.open("offline");
// 	const matching = await cache.match(request);
// 	if (!matching || matching.status == 404) {
// 		return cache.match("offline.html");
// 	} else {
// 		return matching;
// 	}
// };
