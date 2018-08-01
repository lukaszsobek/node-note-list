"use strict"

const yargs = require("yargs");
const notes = require("./notes");

const argument = process.argv[2];
const argv = yargs.argv;

console.log(argv)

switch(argument) {
    case "add":
        notes.addNote(argv.title, argv.body);
        break;

    case "list":
        notes.getAllNotes();
        break;

    case "read":
        notes.getNote(argv.title);
        break;

    case "remove":
        notes.removeNote(argv.title);
        break;

    
    default:
        console.log("Something else")
}

