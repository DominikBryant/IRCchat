function send(){
  var message = removeTagsFrom($('#message').val());
  if(/^(@.*)/.test(message)){
    sayPrivateTo(message)
  }else{
    sayToChanel(message)
  }
  $('#message').val("");
}
function sayToChanel(message){
  addToChat("<li>Me: " + message +"</li>");
  client.say(config.channel, message);
}
function sayPrivateTo(message){
  var user = getPrivateUser(message)
  client.say(user, message.substring(user.length+2))
  addToChat("<li>Me sends <span class='cursive'>"+user+"</span>: " + message.substring(user.length+2) +"</li>");
}
function getPrivateUser(message){
  return message.match(/(@\S*)/)[0].substring(1);
}
function addToChat(message){
  $('#chat ul').append(message);
  scrollDown();
}
function scrollDown(){
  $("#chat ul").animate({ scrollTop: $('#chat ul')[0].scrollHeight}, 1000);
}
function removeUser(nick){
  addToChat("<li class='cursive'>" + nick +": just left</li>");
  $('#nameslist').find('#'+nick).remove();
}
function removeTagsFrom(string){
  return string.replace(/(<([^>]+)>)/ig,"")
}
function init(){
  $('#nameslist').empty().append("<h4>User List</h4>");
  $('footer').append("<div class='input-group'><input type='text'class='form-control' id='message'><span class='input-group-btn'><button class='btn btn-primary' onclick='send()'>Send</button></span></div>");
  $('#message').on('click keyup', function (e) {
    if (e.keyCode == 13) {
      send();
    }
  });
}