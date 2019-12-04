const electronStorage = require('electron-json-storage');

// GET TOKEN--------------------------------------------------
async function getData(key) {
	return new Promise(resolve => {
		electronStorage.get(key, (error, data) => {
			if (error) console.log(error);
			console.log(`\nFETCHING ${key} FROM STORAGE`);
			resolve(data);
		});
	});
}

// SAVE TOKEN--------------------------------------------------
async function saveData(key, value) {
	console.log(`\nSAVING ${key} TO STORAGE`);
	return new Promise(resolve => {
		electronStorage.set(key, value, error => {
			if (error) throw error;
		});
		resolve(true);
	});
}

// REMOVE TOKEN--------------------------------------------------
async function removeData(key) {
	console.log(`\nDELETING ${key} FROM STORAGE`);
	return new Promise(resolve => {
		electronStorage.remove(key, error => {
			if (error) throw error;
		});
		resolve(true);
	});
}

exports.getData = getData;
exports.saveData = saveData;
exports.removeData = removeData;
