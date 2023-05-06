const { Rcon } = require('rcon-client');
const argv = require('yargs/yargs')(process.argv.slice(2)).argv;
const packageJson = require('./package.json');

async function sendRconCommand(host, port, password, command) {
  const rcon = new Rcon({ host, port, password });

  try {
    await rcon.connect();
    const response = await rcon.send(command);
    console.log(`Server response: ${response}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
  } finally {
    rcon.end();
    setTimeout(() => process.exit(), 1000);
  }
}

if (argv.command) {
  const { host, port, password } = packageJson.config;
  sendRconCommand(host, parseInt(port, 10), password, argv.command);
} else {
  console.error('Please provide the required argument: --command');
}
