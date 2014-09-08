/*var s, FBWidget = {
  settings: {
    appId: '1474862486120246',
    groupId: '528721930593416', 
  }
  
  init: window.fbAsyncInit = function() {
    FB.init({
      appId: this.settings.appId,   
    });
  };
};*/

/**
 * Global vars are bad, mmk?
 */
var groupId = '528721930593416'; 
var appId = '1474862486120246';
var accessToken = 'CAACEdEose0cBAEpQv6Vy4A4hkgW499KjmJB3SMj8T6fb4fduuYgI5JtCwFl5dUEOgOgrUbg73IC6KNNZB5qcdVJT2E8eoD1ZA9pvHIaVZCRMqYr6HtxnA5HulpnZBNJ3BkwP6P2BBd1qYf92sYol83QZAFejqa6bgxQtzgUur3DlSZAZB18IF2ZC1fonVXmZBztjZBxNj8mJLcMebV1Ldwt0AL';

window.fbAsyncInit = function() {
  FB.init({
    appId      : appId,
    xfbml      : true,
    version    : 'v2.1'
  });
  FB.getLoginStatus(function(response) {
    if (response.status === 'connected') {
      var user = FB.api(
        '/' + response.authResponse.userID  
      );
      console.log(response);
    }
    else {
      FB.login();
    }
  });
  /*FB.ui({
    method: 'share',
    href: 'https://developers.facebook.com/docs/'
  }, function(response){});*/
  FB.api(
    groupId + '/feed',
    {
      access_token : accessToken
    },
    function (response) {
      console.log(response);
      if (response && !response.error) {
        console.log(response);
      }
    }
  );
};

(function(d, s, id){
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) {return;}
  js = d.createElement(s); js.id = id;
  /* Minified SDK */
  //js.src = "//connect.facebook.net/en_US/sdk.js";
  /* Debug SDK */
  js.src = "//connect.facebook.net/en_US/sdk/debug.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

