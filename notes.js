"use strict"

const fs = require("fs");

const getConfig = () => {
    return JSON.parse(
        fs.readFileSync("config.json")
    );
}

const addNote = (title, body) => {
    if (!title || !body) {
        return;
    }

    const existingNotes = getAllNotes();
    const saveFileName = getConfig().saveFile;

    const isNoteUnique = !existingNotes.filter(note => note.title === title).length;

    if(!isNoteUnique) {
        return console.log("Duplicate note title, please choose a different one!");
    }

    const newNote = { title, body };
    existingNotes.push(newNote);
    
    fs.writeFileSync(
        saveFileName,
        JSON.stringify(existingNotes)
    );

    console.log("New note added!");
}

const getNote = title => {
    console.log(`Getting node with title ${title}`);
}

const getAllNotes = () => {
    const saveFileName = getConfig().saveFile;
    const fileContents = fs.readFileSync(saveFileName);
    
    if (!fileContents.length) {
        return [];
    }

    return JSON.parse(fileContents);
}

const removeNote = title => {
    const existingNotes = getAllNotes();
    const saveFileName = getConfig().saveFile;
    const newNotes = existingNotes.filter(note => note.title !== title);

    if(newNotes.length === existingNotes.length) {
        return console.log(`Cannot remove note. Title "${title}" not found!`)
    }

    fs.writeFileSync(
        saveFileName,
        JSON.stringify(newNotes)
    );

    console.log(`Removing note with title "${title}".`);
}

module.exports = {
    addNote,
    getAllNotes,
    getNote,
    removeNote
}