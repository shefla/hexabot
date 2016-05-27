
module.exports.login = function (bot, conf){
  if (conf.botToken){
    console.log('Logging in using token identifier...');
    return bot.loginWithToken(conf.botToken);
  }
  else {
    console.log('Logging in using email and password...');
    return bot.login(conf.botEmail, conf.botPassword);
  }
};

module.exports.retry = function (count, wait, func, args){
  return new Promise(function (resolve, reject){
    var attempt = function (){
      func.apply(null, args || [])
        .then(function (done){ resolve(done); })
        .catch(function (err){
          if (--count === 0){ reject(err); }
          else {
            console.log('Error logging in:', err);
            setTimeout(attempt, wait);
          }
        })
      ;
    };
    attempt();
  });
};
