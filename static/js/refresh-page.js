const appName = 'one-thing-to-do'
const version = appName + '-v0.1.11';

const body = document.getElementsByTagName('body')[0];
const notification = document.createElement('div');
notification.classList.add('banner')

const message = document.createElement('span');
message.innerText = 'A new version of this app is available ';

const reloadLink = document.createElement('a');
reloadLink.innerText = 'Reload';
reloadLink.setAttribute('href', location.href)

notification.appendChild(message)
notification.appendChild(reloadLink)


if ('serviceWorker' in navigator) {
	navigator.serviceWorker.onmessage = function (event) {
		var message = JSON.parse(event.data);

		var isRefresh = message.type === 'refresh';
		var isAsset = message.url.includes('asset');
		var lastETag = localStorage.currentETag;
		var isNew = lastETag !== message.eTag;
		if (isRefresh && isAsset && isNew) {
			if (lastETag) {
				notice.hidden = false;
			}
			localStorage.currentETag = message.eTag;
			body.appendChild(notification)
		}
	};
}
