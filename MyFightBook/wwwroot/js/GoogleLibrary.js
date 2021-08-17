
// Sign out the user
function signOutGoogle() {
    gapi.load('auth2', function () {
        gapi.auth2.init();
    });
    gapi.auth2.init();
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
    });
    auth2.disconnect();
}

function onLoad() {
    gapi.load('auth2', function () {
        gapi.auth2.init();
    });
}

var auth2;
var googleUser; // The current user

function GooglSignIn() {
    gapi.load('auth2', function () {
        auth2 = gapi.auth2.init({
            client_id: '155884539571-7po9obk0gr2ennhvj4v0nkencf3oborg.apps.googleusercontent.com'
        });
        auth2.attachClickHandler('signin-button', {}, onSuccess, onFailure);

        auth2.isSignedIn.listen(signinChanged);
        auth2.currentUser.listen(userChanged); // This is what you use to listen for user changes
    });

}
var signinChanged = function (val) {
    console.log('Signin state changed to ', val);
};

var onSuccess = function (user) {
    console.log('Signed in as ' + user.getBasicProfile().getName());
    // Redirect somewhere
};

var onFailure = function (error) {
    //console.log(error);
};

var userChanged = function (user) {
    $(".loading-img").show();
    var profile = user.getBasicProfile();
    $("#UserEmail").val(profile.cu);
    $("#FirstName").val(profile.fV);
    $("#LastName").val(profile.iT);
    $("#GoogleId").val(profile.BT);

    const externalUserLoginBtn = $("#ExternalUserLoginBtn");
    externalUserLoginBtn.click();
};