"use strict"

const yargs = require("yargs");
const notes = require("./notes");

const argument = process.argv[2];
const argv = yargs
.command("list", "Lists all available notes")
.command("add", "Adds a note")
.command("read", "Returns the content of a selected note")
.command("remove", "Permanently deletes a note")
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
        console.log("Something else")
}

