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

    const saveFileName = getConfig().saveFile;
    const fileContent = [{ title, body }];
    
    fs.appendFileSync(
        saveFileName,
        JSON.stringify(fileContent)
    );
}

const getNote = title => {
    console.log(`Getting node with title ${title}`);
}

const getAllNotes = () => {
    console.log("really long list");
}

const removeNote = title => {
    console.log(`removing note ${title}`);
}




module.exports = {
    addNote,
    getAllNotes,
    getNote,
    removeNote
}