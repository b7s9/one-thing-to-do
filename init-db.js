const initData = {
	"db": {
		"todo-data": [],
		"nice-data": []
	}
};

const _initializeJSON = (location, data) => {
	try {
		// write initial file structure
		fs.writeFileSync(location, JSON.stringify(data, null, 2));
	} catch (err) {
		throw err;
	}
};

const _test = (str) => {
	console.log(str);
}

module.exports.initializeJSON = _initializeJSON;
module.exports.test = _test;
