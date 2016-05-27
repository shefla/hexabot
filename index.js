var printf  = require('util').format;
var reqdir  = require('require-dir');
var discord = require('discord.js');

var conf   = require('./config.json');
var utils  = require('./utils');
var events = reqdir('./events');
var cmds   = reqdir('./commands');
var hooks  = reqdir('./hooks');

var bot = new discord.Client();
var re  = new RegExp('^' + conf.commandPrefix + '\\s(\\w+)\\s?(.+)?$');


// id du role HEX membre: 128952885781331969

// register events
Object.keys(events).forEach(function (name){
  var event = events[name](bot, conf);
  Array.isArray(event)
    ? event.forEach(function (listener){ bot.on(name, listener); })
    : bot.on(name, event)
  ;
});

bot.on('message', function (msg){
  // commands
  var tokens = msg.content.match(re);
  if (tokens && cmds[tokens[1]]){
    var cmd   = cmds[tokens[1]];
    var allow = cmd.roles.indexOf('*') === -1
      ? msg.channel.server.rolesOfUser(msg.author).some(function (role){
        return cmd.roles.indexOf(role.name) > -1;
      })
      : true
    ;
    if (!allow){
      console.log('Denying command:', tokens[1], 'to user:', msg.author.username);
      bot.sendMessage(msg.channel, printf(conf.commandDeny, tokens[1]));
    }
    else {
      cmd.callback(bot, msg, tokens[2])
        .then(function (done){
          console.log('Executed command:', tokens[1], tokens[2]);
          done && bot.sendMessage(msg.channel, done);
        })
        .catch(function (err){
          console.log('Error with command:', tokens[1]);
          err && console.log(err);
          bot.sendMessage(msg.channel, printf(conf.errorMessage, tokens[1]));
        })
      ;
    }
  }
  // hooks
  else {
    for (var key in hooks){
      if (!hooks.hasOwnProperty(key)){ continue; }
      if (hooks[key].match(bot, msg)){
        hooks[key].callback(bot, msg)
          .then(function (done){ console.log('Executed hook:',   key, done); })
          .catch(function (err){ console.log('Error with hook:', key, err);  })
        ;
        break;
      }
    }
  }
});

utils.retry(3, 5000, utils.login, [bot, conf])
  .then(function (token){ console.log('Logged in with token:', token); })
  .catch(function (err){   console.log('Unable to log in:', err); })
;
