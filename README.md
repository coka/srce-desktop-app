# srce-desktop-app

## Setup

Make sure you have the latest version of [Node.js](https://nodejs.org/en/)
installed (with npm). Then, run `npm install`. You will need to do this after
cloning this repository, and every time `package.json` changes. After that you 
need to rebuild native modules like sqlite3. Run `bash windows_rebuild_script` 
if you use Windows, or `bash rebuild_script` for Linux. 

## Scripts

`npm start` will run the app as a desktop application.

`npm build` will create an `public/App.js` file, which is currently used by
`index.html` for loading JavaScript.

`npm dev` will track live changes for CSS and JS files
