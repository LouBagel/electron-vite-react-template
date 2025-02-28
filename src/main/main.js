import { app, BrowserWindow, ipcMain, session } from 'electron';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
// example import from modules folder; can remove
import test_function from './modules/test-module.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const isDev = process.env.NODE_ENV === 'development';
 
// Function to create the main application window
const createWindow = () => {
    // Create a new BrowserWindow instance with specified dimensions
    const win = new BrowserWindow({
        width: 1200,
        height: 900,
        webPreferences: {
          preload: path.resolve(__dirname, 'preload.js')
        }
      })
  
    if (isDev) {
      // Use Vite dev server url
      console.log("Dev Mode: Point to localhost:5173");
      win.loadURL('http://localhost:5173');
    } else {
      win.loadFile(path.join(__dirname, '..', 'renderer', 'index.html'));
    }
}

// When Electron has finished initializing, create the window
app.whenReady().then(async () => {

  // sets content-security; in dev mode, vite may use inline
    session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
      const cspHeader = isDev
        ? "default-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self' ws://localhost:5173;"
        : "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; connect-src 'self';";
  
      callback({
        responseHeaders: {
          ...details.responseHeaders,
          "Content-Security-Policy": [cspHeader]
        }
      });
    });

    // creates the window
    createWindow();

    // example listener from preload
    ipcMain.handle('message', async (event, message_data) => {
        console.log(`Message received on backend. Data: `, message_data);
        // test_function(10);  // example call from module
    })
})

// Quit the app when all windows are closed, except on macOS
// (On macOS, it's common for applications to stay active even without open windows)
app.on('window-all-closed', () => {
    // Check if the platform is not macOS
    if (process.platform !== 'darwin') app.quit() // Quit the app on other platforms
})

// Optional: Re-open the app on macOS if no windows are open and the app is clicked on in the dock
app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
})
