const fs = require("fs-extra");
const AsciiTable = require("ascii-table");
const chalk = require("chalk");

module.exports.commandsFilterer = (client, commandFolders) => {
  let commandCounter = 0;

  let commandsTable = new AsciiTable(chalk.black.bgYellowBright("Commands"));
  commandsTable.setHeading(
    chalk.blue("ID"),
    chalk.magenta("Commands"),
    chalk.green("Load status"),
    chalk.yellow("Description")
  );

  for (const folder of commandFolders) {
    if (folder === "exemple.js") continue;
    const commandFiles = fs
      .readdirSync(`./commands/${folder}`)
      .filter((file) => file.endsWith(".js"));
    for (const file of commandFiles) {
      const command = require(`./../commands/${folder}/${file}`);
      try {
        client.commands.set(command.name, command);
        commandsTable.addRow(
          chalk.white(commandCounter),
          chalk.white("." + command.name),
          chalk.green("✅ Load with success"),
          chalk.white(command.description)
        );
      } catch (error) {
        commandsTable.addRow(
          chalk.white(commandCounter),
          chalk.white("." + command.name),
          chalk.red(`❌ Error ${error}`),
          chalk.white(command.description)
        );
      }
      commandCounter++;
    }
  }
  console.log(commandsTable.toString());
};
