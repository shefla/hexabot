# Hexabot

A modular discord bot.  
Add your own functionalities by putting commonjs modules in the appropriate folder:
- **events** Register event listeners onto the bot instance.
- **commands** Make the bot respond to certain text commands.
- **hooks** Make the bot react to specific text messages.

Commands have precedence over hooks.


## Installation

    git clone https://github.com/shefla/hexabot.git
    cd hexabot
    npm install


## Usage

Create a discord account for you bot then log in and join the server you want the bot active on.  
Modify the configuration to suit your needs, then run: `node /bot/folder/index.js`.  
You can now try the bot by typing `!hex help` in a text channel (assuming default command prefix).  
The bot needs appropriate permissions on the discord server to be able to send a response.


## Configuration

The configuration takes place in the file `config.json`.

- **botEmail** Bot account email address, not used if **botToken** is set.
- **botPassword** Bot account password, not used if **botToken** is set.
- **botToken** Bot identification token, get this in console after a successful bot login using email and password.
- **commandPrefix** Prefix used to trigger commands, default: `!hex`.
- **commandDeny** Message sent to a user who don't have the permission to run a command, `%s` is replaced by the command name.
- **errorMessage** Message sent when a command fail to execute, `%s` is replaced by the command name.


# Documentation

You need to read this section only if you plan on coding an extension to hexabot.


## Terminology

Describes the meaning of terms in _italic_ in the documentation below.

- **client** The running `discord.Client` instance.
- **config** Object defined in `config.json`.
- **message** Discord.js `Message` instance.
- **params** Trailing command parameters string, for example the command: `!hex test foo bar` runs the command `test` with params `foo bar`.


## Events

Each module must export a function taking two arguments: _client_ and _config_.
It must return a function or array of functions to register as event listener(s).

The file name without extension is used as the event name to register.


## Commands

Each module must export an object defining the help and callback properties.

- **help** A string explaining what the command does.
- **roles** An array of discord `Role` names allowed to run the command, a wildcard `*` means everyone is allowed.
- **callback** Function executed with arguments: _client_, _message_ and _params_. Must return a promise.

The file name without extension is used as the command trigger.


## Hooks

Each module must export an object with match and callback properties.
- **match** Function to test if an action triggers the hook. Take _client_ and _message_ as arguments. Must return a boolean.
- **callback** Function executed with arguments: _client_ and _message_. Must return a promise.

The file name is irrelevant.
