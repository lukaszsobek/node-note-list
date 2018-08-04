"use strict"

const fs = require("fs");

const getConfig = () => {
    return JSON.parse(
        fs.readFileSync("./src/config.json")
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

const displayNote = title => {
    const existingNotes = getAllNotes();
    const note = existingNotes.find(note => note.title === title)

    if(!note) {
        return console.log(`Could not find note with title "${title}"!`)
    }

    console.log(`Title: ${note.title}\nBody: ${note.body}`);
}

const getAllNotes = () => {
    const saveFileName = getConfig().saveFile;
    const fileContents = fs.readFileSync(saveFileName);
    
    if (!fileContents.length) {
        return [];
    }

    return JSON.parse(fileContents);
}

const listAllNotes = () => {
    const existingNotes = getAllNotes();
    console.log(`Number of notes: ${existingNotes.length}`);
    console.log(`===================`);
    existingNotes.forEach(({title, body}, i) => {
        console.log(`Title: ${title}\nBody: ${body}\n---`);
    });
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
    displayNote,
    listAllNotes,
    removeNote
}