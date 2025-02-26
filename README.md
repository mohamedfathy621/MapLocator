# GeoRoute Microservice

GeoRoute Microservice leverages the Here Maps API to geoencode addresses and determine the nearest route by vehicle from four fixed points. The application is built using React and Material-UI for the front-end, utilizes axios for HTTP requests, and comes with an Electron package and an NSI file to generate a desktop installer.

## Features

- **Address Geoencoding:** Converts a user-provided address into geographical coordinates using the Here Maps API.
- **Multiple Address Resolution:** Displays a list of possible address matches if the API returns more than one result, allowing the user to select the correct one.
- **Route Calculation:** Computes and displays the distance and estimated travel time from four fixed locations.
- **Desktop Packaging:** Includes an Electron package and an NSI file to build a desktop installer.

## Tech Stack

- **Frontend:** React, Material-UI
- **HTTP Client:** axios
- **Mapping Service:** Here Maps API
- **Desktop App:** Electron, NSI (Nullsoft Scriptable Install System)

## Prerequisites

- [Node.js](https://nodejs.org/) (v12 or later)
- npm or yarn
- A valid Here Maps API key (obtain one from the [Here Developer Portal](https://developer.here.com/))
- [NSIS](https://nsis.sourceforge.io/Main_Page) installed (for building the installer)

## Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/geo-route-microservice.git
    cd geo-route-microservice
    ```

2. **Install dependencies:**

    ```bash
    npm install
    # or
    yarn install
    ```

3. **Configure Environment Variables:**

    Create a `.env` file in the root directory and add your Here Maps API key:

    ```env
    REACT_APP_HERE_API_KEY=your_here_maps_api_key
    ```

## Running the Application

### Development Mode

To run the application in development mode, execute:

```bash
npm start
# or
yarn start
```
##production build
```bash
npm run build

```
##electron dev
```bash
npm run electron
```
## electron package
```bash
npx electron-packager . YourAppName --platform=win32 --arch=x64 --out=release-builds --overwrite
```

## desktop package
after generating the electron package modify the nsi script with your app name to genrate the installer 


