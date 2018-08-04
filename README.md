# Note list
Note list is a simple node command line appication to store and retrieve notes.

## Installation
1. clone or download repo
1. run `npm install` inside the downloaded folder
1. you should be good to go

## Usage
inside the folder with the downloaded app:
- `node app --help` for a list of available commands
- `node app list` lists all saved notes
- `node app add -t "A title" -b "A body"` adds a new note
- `node app remove -t "A title"` adds a new note

## Additional notes
- the app enforces unique note titles as a way of managing notes
- you can also use `--title` instead of `-t` and `--body` instead of `-b` if you so choose

## Requirements
- NodeJS - https://nodejs.org
