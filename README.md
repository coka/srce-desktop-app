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

## Windows installer on windows

`npm run build` will create build folder with react
`npm run build-electron` will copy index.js (electron amin file) to build folder
`npm run build-src` will copy src/database folder contents to build/src/database folder
`npm run package` will create dist folder with .exe file

After running every script in the order specified above there should be an exe file 
inside dist folder, after running it a desktop shortcut will appear.
