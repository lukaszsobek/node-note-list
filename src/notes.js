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
        return console.error(`
            Error: Duplicate note title, please choose a different title!
        `);
    }

    const newNote = { title, body };
    existingNotes.push(newNote);
    
    fs.writeFileSync(
        saveFileName,
        JSON.stringify(existingNotes)
    );

    console.log(`
        New note added!
        ------------
        Title: ${title}
        Body: ${body}
        ------------
        Note count: ${existingNotes.length}
    `);
}

const displayNote = title => {
    const existingNotes = getAllNotes();
    const note = existingNotes.find(note => note.title === title)

    if(!note) {
        return console.log(`
            Could not find note with title "${title}"!
        `);
    }

    console.log(`
        Title: ${note.title}
        Body: ${note.body}
        `);
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
    console.log(`
        Note count: ${existingNotes.length}
        ------------`);
    existingNotes.forEach(({title, body}, i) => {
        console.log(`
        (${i+1}) Title: ${title}
        Body: ${body}`);
    });
    console.log(``);
}

const removeNote = title => {
    const existingNotes = getAllNotes();
    const saveFileName = getConfig().saveFile;
    const newNotes = existingNotes.filter(note => note.title !== title);

    if(newNotes.length === existingNotes.length) {
        return console.log(`
            Cannot remove note. Title "${title}" not found!
        `)
    }

    fs.writeFileSync(
        saveFileName,
        JSON.stringify(newNotes)
    );

    console.log(`
        Removing note with title "${title}".
        ------------
        Note count ${newNotes.length}
    `);
}

module.exports = {
    addNote,
    getAllNotes,
    displayNote,
    listAllNotes,
    removeNote
}