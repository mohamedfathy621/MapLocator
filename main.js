import { BrowserWindow ,app} from 'electron';
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
function createWindow () {
  const win = new BrowserWindow({
    width: 1440,
    height: 1024,
   
  })
  console.log(path.join(__dirname, "dist", "index.html"))
  win.loadFile("./dist/index.html")
}

app.whenReady().then(createWindow)