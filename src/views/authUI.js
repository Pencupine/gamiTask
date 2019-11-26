// Loading Screen function
function setLoadingScreen() {
	document.getElementById('firebaseui-auth-container').style.display = 'none';
	document.getElementById('loader').style.display = 'inline';
	document.getElementById('signingin').style.display = 'none';
}

// Show Firebase UI
function showFirebaseUI() {
	document.getElementById('firebaseui-auth-container').style.display = 'inline';
	document.getElementById('loader').style.display = 'none';
	document.getElementById('signingin').style.display = 'none';
}

// Show Signingin Page
function showSigningIn() {
	document.getElementById('firebaseui-auth-container').style.display = 'none';
	document.getElementById('loader').style.display = 'none';
	document.getElementById('signingin').style.display = 'inline';
}

exports.setLoadingScreen = setLoadingScreen;
exports.showFirebaseUI = showFirebaseUI;
exports.showSigningIn = showSigningIn;
