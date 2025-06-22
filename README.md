# Tamil Learning Adventure - M&Ms  Tamil கற்கும் பயணம்

An interactive web application designed to help secondary school children learn basic Tamil alphabets, words, sentences, and concepts in an engaging way. This app features lessons, drawing practice, and quizzes to reinforce learning.

## ✨ Features

*   **Interactive Lessons:** Learn Tamil alphabets (vowels, consonants, special characters), words (categorized), simple sentences, paragraphs, and short stories.
*   **Audio Pronunciation:** Click to listen to the pronunciation of alphabets and words (uses static audio files with a text-to-speech fallback).
*   **Alphabet Drawing Practice:** Interactive canvas to trace and practice writing Tamil alphabets.
*   **Quiz System:**
    *   Multiple Choice Questions (MCQ).
    *   Fill-in-the-Blank questions.
    *   Drawing-based answers for fill-in-the-blanks.
    *   Quizzes for each chapter and comprehensive final exams.
*   **Dynamic Quiz Generation:** Quizzes are dynamically assembled with a mix of image-derived and general questions for variety.
*   **Responsive Design:** Adapts to different screen sizes for a seamless experience on desktop and mobile.
*   **Offline Capabilities:** Uses a Service Worker to cache assets for offline access after the first visit. (Note: Full offline for all generated JS/CSS bundles requires a PWA plugin for Vite like `vite-plugin-pwa`).
*   **User-Friendly Interface:** Clean, intuitive, and aesthetically pleasing design using TailwindCSS.

## 🚀 Technologies Used

*   **React:** For building the user interface.
*   **TypeScript:** For static typing and improved code quality.
*   **Vite:** For fast local development and optimized production builds.
*   **TailwindCSS:** For styling the application (via CDN).
*   **HTML5 & CSS3:** Core web technologies.
*   **Service Worker:** For offline support.
*   **(@google/genai - Intended/Future):** The application is structured to potentially integrate with the Google Gemini API for advanced features.

## 📋 Prerequisites

*   **Node.js and npm (or yarn):** Required for local development, managing dependencies, and running scripts. You can download Node.js from [nodejs.org](https://nodejs.org/).

## 🔧 Setup & Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```

2.  **Install dependencies:**
    This command installs all the necessary libraries defined in `package.json`.
    ```bash
    npm install
    # or
    # yarn install
    ```

3.  **API Key (for future @google/genai integration):**
    If you plan to integrate the Google Gemini API, you'll need an API key.
    *   Obtain an API key from [Google AI Studio](https://aistudio.google.com/app/apikey).
    *   Create a `.env` file in the root of your project:
        ```env
        VITE_API_KEY=YOUR_GEMINI_API_KEY 
        ```
        *(Note: Vite exposes env variables prefixed with `VITE_` to client-side code)*
    *   **Important:** Add `.env` to your `.gitignore` file to prevent committing your API key. The application would access this via `import.meta.env.VITE_API_KEY`.

## 🏃‍♂️ Running Locally

1.  **Start the development server:**
    ```bash
    npm run dev
    # or
    # yarn dev
    ```
    This will start the Vite development server, typically at `http://localhost:5173`. Open this URL in your browser. The server provides Hot Module Replacement (HMR) for a fast development experience.

## 📁 Project Structure

```
.
├── public/                     # Static assets (copied to docs root by Vite)
│   ├── audio/                  # Audio files
│   ├── index.css               # Global CSS (linked from root index.html, copied by Vite)
│   ├── metadata.json
│   └── sw.js                   # Service Worker script
├── src/                        # Application source code
│   ├── components/             # React components
│   │   └── icons/
│   ├── App.tsx                 # Main application component
│   ├── constants.ts            # Core data
│   ├── index.tsx               # React entry point
│   └── types.ts                # TypeScript types
├── .gitignore
├── index.html                  # Main HTML template (Vite entry point)
├── package.json
├── README.md
├── tsconfig.json               # TypeScript configuration
└── vite.config.ts              # Vite configuration
```

## 📚 Content Management

All learning content (alphabets, words, sentences, etc.) is primarily managed in `src/constants.ts`. Audio files are in `public/audio/`.
Paths to audio files in `constants.ts` (e.g., `audioSrc: 'audio/alphabets/a.mp3'`) are relative to the `public` directory. Vite correctly handles these paths during the build process.

## ⚙️ Building for Production

1.  **Run the build script:**
    ```bash
    npm run build
    # or
    # yarn build
    ```
    This command will use Vite to compile and bundle your application. With the updated `vite.config.ts`, the output will be placed in the `docs/` directory. The `base` path in `vite.config.ts` is set to `/learn-tamil-app/` to ensure assets are loaded correctly when deployed to a subdirectory on GitHub Pages.

## 🌍 Deployment with GitHub Pages

You have two main methods:

**Method 1: Deploying the `docs` folder (Recommended for your current setup)**

1.  **Build your project:**
    ```bash
    npm run build
    ```
    This creates/updates the `docs/` folder with your production-ready application.
2.  **Commit and push:** Add the `docs/` folder (and any other changes) to your Git history and push to your GitHub repository's main branch.
    ```bash
    git add .
    git commit -m "Build application and update docs folder"
    git push origin main 
    ```
3.  **Configure GitHub Pages settings:**
    *   Go to your repository settings on GitHub -> Pages.
    *   Under "Build and deployment", for "Source", select **"Deploy from a branch"**.
    *   Under "Branch", select your `main` branch (or `master`, or whichever branch you are working on) and the **`/docs`** folder.
    *   Click "Save".
    *   Your site will be available at `https://<username>.github.io/learn-tamil-app/`. The `base: '/learn-tamil-app/'` in `vite.config.ts` ensures all assets are loaded correctly from this subpath.

**Method 2: Using the `gh-pages` branch (Alternative)**

This method uses a separate branch (commonly `gh-pages`) to host your built site.

1.  **Install `gh-pages` (if not already):**
    ```bash
    npm install gh-pages --save-dev
    ```
2.  **Add a `deploy` script to your `package.json`:**
    (Ensure your `vite.config.ts` `build.outDir` is `'dist'` for this method, or adjust the script)
    ```json
    "scripts": {
      // ... other scripts
      "predeploy": "npm run build", // Builds to 'dist' if outDir is 'dist'
      "deploy": "gh-pages -d dist"  // Pushes 'dist' contents to 'gh-pages' branch
    }
    ```
    *If you kept `outDir: 'docs'` in `vite.config.ts`, the script would be ` "deploy": "gh-pages -d docs" `.*
3.  **Run the deploy script:**
    ```bash
    npm run deploy
    ```
    This will build the project and then push the contents of the output folder (`dist` or `docs` as per your config and script) to the `gh-pages` branch.
4.  **Configure GitHub Pages settings:**
    *   Go to your repository settings on GitHub -> Pages.
    *   Under "Build and deployment", for "Source", select **"Deploy from a branch"**.
    *   Under "Branch", select the `gh-pages` branch and the **`/ (root)`** folder.
    *   Click "Save".

## 🌐 Offline Capabilities

The application includes a Service Worker (`public/sw.js`) for basic offline caching.
*   The `sw.js` provided caches known static assets from the `public` folder and the main `index.html` and `index.css` (which are copied to the root of your `docs` or `dist` folder).
*   **Important:** It does **not** automatically cache the JavaScript and CSS files generated by Vite (which have hashed filenames, e.g., `assets/index-a1b2c3d4.js`). For a robust Progressive Web App (PWA) experience where these generated assets are also cached, consider using a Vite PWA plugin like `vite-plugin-pwa`. This plugin can auto-generate a service worker that includes all necessary assets.

## 🤝 Contributing

Contributions are welcome!
1.  Fork the repository.
2.  Create a new branch.
3.  Make your changes.
4.  Commit and push your changes.
5.  Open a Pull Request.

## 📜 License

This project is open-source. (Consider adding a LICENSE file, e.g., MIT).

## 🙏 Acknowledgements

*   **M&Ms:** For the concept and inspiration.
*   **Google Gemini AI:** For assistance in development and guidance.
*   The creators of React, TypeScript, Vite, and TailwindCSS.
---

Happy Tamil Learning! மகிழ்ச்சியான தமிழ் கற்றல்! ✨