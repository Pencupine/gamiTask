//--------- For Sending Updated Tasks List----------
function updateScores(alphaData, type, mainWindow) {
	var res = null;
	if (type == 0) mainWindow.webContents.send('progressCirclesScores', res);
	else if (type == 1) mainWindow.webContents.send('progressBarsScores', res);
}

//
//1. Dailies Score------------- N/P
//2. Todo---------------------- N
//4. Done---------------------- P
//
//
//
//
//
//
//
//
//
// -------------------- Exporting Functions-----------------------

exports.updateScores = updateScores;
