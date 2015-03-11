var irc = require('irc');
var config = require('./config.js');

addToChat("<li>WELCOME TO AWESOME IRC CHAT</li>");

var client = new irc.Client(config.url, config.nickname, {
  channels: [config.channel]
});

client.addListener('join', function (channel, nick, message) {
  addToChat("<li class='cursive'>" + nick +": just joined</li>");
  $('#nameslist').append("<li id="+nick+">"+nick+"<span class='green'></span></li>");
});

client.addListener('message', function (nick, to, message) {
  if(to == config.channel) {
    addToChat("<li>" + nick + ': ' + removeTagsFrom(message) + "</li>");
  }else{
    addToChat("<li>" + nick + ' sends private message: ' + removeTagsFrom(message) + "</li>");
  }
});

client.addListener('quit', function (name,reason,message) {
  removeUser(name)
});

client.addListener('part'+config.channel, function(nick,reason,message){
  removeUser(name)
})

client.addListener('names'+config.channel, function (names) {
  init();
  for (var key in names) {
       $('#nameslist').append("<li id="+key+">"+key+"<span class='green'></span></li>")
  }
});