var utils = require('../utils');

module.exports = function (bot, conf){
  return function (){
    console.log('Disconnected from discord.');
    utils.retry(5, 500, utils.login, [bot, conf])
      .then(function (token){ console.log('Successfully reconnected.'); })
      .catch(function (err){  console.log('Unable to reconnect:', err); })
    );
  };
};
