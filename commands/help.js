var reqdir = require('require-dir');
var conf   = require('../config.json');
var cmds   = reqdir('.');

module.exports = {
  help: 'Affiche la liste des commandes.'
, roles: ['*']
, callback: function (bot, msg, args){
    var help = Object.keys(cmds).map(function (key){
      return '`' + conf.commandPrefix + ' ' + key + '` *' + cmds[key].help + '*';
    });
    help.unshift('`' + conf.commandPrefix + ' help` *' + this.help + '*');
    return Promise.resolve(help.join("\n"));
  }
}
