## Project Approach 
- Provides Frontend for performing questionnaires.

### How to instructions:
#### Project Setup
Setting up Front end
- Using Terminal 
   - Clone/extract project files in your local drive
   - To install project dependencies run ```npm install ```
   - Update base url <project_dir>/src/shared/networklayer.jsx 
      ```javascript const BASE_URL = "http://127.0.0.1:8000"; ```
   - `npm start` Runs the app in the development mode.<br>
   - Open [//http://127.0.0.1:3000](http://127.0.0.1:3000) to view it in the browser.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### Assumptions 
- Node: latest
- Backend server is up and running
