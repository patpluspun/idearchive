window.fbAsyncInit = function() {
  FB.init({
    appId      : appId,
    xfbml      : true,
    version    : 'v2.1'
  });
  /*FB.getLoginStatus(function(response) {
    if (response.status === 'connected') {
      var user = FB.api(
        '/' + response.authResponse.userID  
      );
      console.log(response);
    }
    else {
      FB.login();
    }
  });*/
  FB.api(
    groupId + '/feed',
    {
      access_token : accessToken
    },
    function (response) {
      if (response && !response.error) {
        var data = response.data;
        var output = [];
        var div = document.getElementById('main');

        for (var key in data) {
          if (data.hasOwnProperty(key)) {
            output.push(parse_shit(data[key]));
          }
        }
        var string = output.join('');
        div.innerHTML = div.innerHTML + string;
      }
    }
  );

  function parse_shit(post) {
    //console.log(post);
    var output = [];
    output.push('<section class="thread">');
    output.push('<section class="post">');
    output.push('<h2>');
    /* TODO: Figure out how to get user icons, this shit ain't working. */
    /*if (post.hasOwnProperty('icon')) {
      console.log(post);
      output.push('<a href="https://www.facebook.com/app_scoped_user_id/' + post.from.id + '">');
      output.push('<img src="' + post.icon + '" alt="' + post.from.name + '"/>');
      output.push('</a>');
    }*/
    output.push('<a href="https://www.facebook.com/app_scoped_user_id/' + post.from.id + '">' + post.from.name + '</a>');
    output.push('</h2>');
    output.push('<p>' + post.message + '</p>');
    if (post.type === 'photo' && post.hasOwnProperty('picture')) {
      output.push('<img src="' + post.picture + '"/>');
    }
    if (post.hasOwnProperty('likes') && post.likes.data.length > 0) {
      output.push('<p class="likes">' + post.likes.data.length + ' approves!</p>');
    }
    if (post.hasOwnProperty('comments') && post.comments.data.length > 0) {
      output.push('<p class="comments">' + post.comments.data.length + ' comment(s).</p>');
    }
    output.push('</section><!-- /.post -->');
    if (post.hasOwnProperty('comments') && post.comments.data.length > 0) {
      for (var key in post.comments.data) {
        if (post.comments.data.hasOwnProperty(key)) {
          output.push(parse_meta_shit(post.comments.data[key]));
        }
      }
    }
    output.push('</section><!-- /.thread -->');
    output.push('<hr>');
    return output.join('');
  }

  function parse_meta_shit(comment) {
    //console.log(comment);
    var output = [];
    output.push('<section class="comment">');
    output.push('<h3><a href="https://www.facebook.com/app_scoped_user_id/' + comment.from.id + '">' + comment.from.name + '</a></h3>');
    output.push('<p>' + comment.message + '</p>');
    output.push('<p>' + comment.like_count + ' approve!</p>');
    output.push('</section><!-- /.comment -->');
    return output.join('');
  }
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

