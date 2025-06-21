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
├── public/                     # Static assets (copied to dist root)
│   ├── audio/                  # Audio files
│   ├── index.css               # Global CSS (if not bundled through JS)
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
├── index.html                  # Main HTML template (Vite entry)
├── package.json
├── README.md
├── tsconfig.json               # (Vite will use a default or you can add one)
└── vite.config.ts              # Vite configuration
```

## 📚 Content Management

All learning content (alphabets, words, sentences, etc.) is primarily managed in `src/constants.ts`. Audio files are in `public/audio/`.
Paths to audio files in `constants.ts` (e.g., `audioSrc: 'audio/alphabets/a.mp3'`) are relative to the `public` directory, which Vite serves as the root.

## ⚙️ Building for Production

1.  **Run the build script:**
    ```bash
    npm run build
    # or
    # yarn build
    ```
    This command will use Vite to compile and bundle your application into the `dist/` directory. The `base` path in `vite.config.ts` is set to `/learn-tamil-app/` to ensure assets are loaded correctly when deployed to a subdirectory on GitHub Pages.

## 🌍 Deployment with GitHub Pages

1.  **Ensure your repository is on GitHub.**
2.  **Build your project:** Run `npm run build`. This creates the `dist/` folder.
3.  **Deploy the `dist/` folder:**
    *   **Option A (Manual):**
        1.  Commit the contents of the `dist/` folder to your `gh-pages` branch (or `main` branch if deploying from there). You might need to force push if rewriting history or use a tool like `gh-pages` npm package.
    *   **Option B (Using `gh-pages` package - Recommended for simplicity):**
        1.  Install `gh-pages`: `npm install gh-pages --save-dev`
        2.  Add a deploy script to your `package.json`:
            ```json
            "scripts": {
              // ... other scripts
              "deploy": "vite build && gh-pages -d dist"
            }
            ```
        3.  Run `npm run deploy`. This will build the project and push the `dist` folder contents to the `gh-pages` branch.
    *   **Option C (GitHub Actions):** Set up a GitHub Action to automatically build and deploy on pushes to your main branch.
4.  **Configure GitHub Pages settings:**
    *   Go to your repository settings on GitHub -> Pages.
    *   Set the source to deploy from the `gh-pages` branch (and `/ (root)` folder).
    *   Your site will be available at `https://<username>.github.io/learn-tamil-app/`. The `base: '/learn-tamil-app/'` in `vite.config.ts` ensures all assets are loaded correctly from this subpath.

## 🌐 Offline Capabilities

The application includes a Service Worker (`public/sw.js`) for basic offline caching.
*   The `sw.js` provided caches known static assets from the `public` folder and the main `index.html` and `index.css`.
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
