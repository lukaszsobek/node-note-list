"use strict"

const yargs = require("yargs");
const notes = require("./src/notes");

const argument = process.argv[2];
const argv = yargs
.command("list", "Lists all available notes")
.command("add", "Adds a note", {
    title: {
        describe: "Heading of the note",
        demand: true,
        alias: "t"
    },
    body: {
        describe: "Content of the note",
        demand: true,
        alias: "b"
    }
})
.command("read", "Returns the content of a selected note",{
    title: {
        describe: "Shows a single note",
        demand: true,
        alias: "t"
    }
})
.command("remove", "Permanently deletes a note",{
    title: {
        describe: "Removes a selected note",
        demand: true,
        alias: "t"
    }
})
.help()
.argv;

switch(argument) {
    case "add":
        notes.addNote(argv.title, argv.body);
        break;

    case "list":
        notes.listAllNotes();
        break;

    case "read":
        notes.displayNote(argv.title);
        break;

    case "remove":
        notes.removeNote(argv.title);
        break;

    
    default:
        console.log("Use 'node app --help' to see a list of available commands.")
}