
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
*   **Offline Capabilities:** Uses a Service Worker to cache assets for offline access after the first visit.
*   **User-Friendly Interface:** Clean, intuitive, and aesthetically pleasing design using TailwindCSS.

## 🚀 Technologies Used

*   **React:** For building the user interface.
*   **TypeScript:** For static typing and improved code quality.
*   **TailwindCSS:** For styling the application.
*   **ESM Modules (via esm.sh):** For serving React and React-DOM.
*   **HTML5 & CSS3:** Core web technologies.
*   **Service Worker:** For offline support.
*   **(@google/genai - Intended/Future):** The application is structured to potentially integrate with the Google Gemini API for advanced features like AI-powered feedback, content generation, or conversational practice.

## 📋 Prerequisites

*   **Node.js and npm (or yarn):** Required for local development, managing dependencies, and running scripts. You can download Node.js from [nodejs.org](https://nodejs.org/).

## 🔧 Setup & Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```

2.  **Install dependencies:**
    This project uses ESM modules directly in the browser and doesn't have a traditional `package.json` with `npm install` for dependencies like React. The necessary scripts are loaded via `importmap` in `index.html`. For local development, you typically serve the `index.html` file.
    If you were to add development tools (like a bundler or dev server), you would then use:
    ```bash
    # npm install
    # or
    # yarn install
    ```

3.  **API Key (for future @google/genai integration):**
    If you plan to integrate the Google Gemini API, you'll need an API key.
    *   Obtain an API key from [Google AI Studio](https://aistudio.google.com/app/apikey).
    *   Create a `.env` file in the root of your project:
        ```env
        API_KEY=YOUR_GEMINI_API_KEY
        ```
    *   **Important:** Add `.env` to your `.gitignore` file to prevent committing your API key. The application is designed to load this key via `process.env.API_KEY`.

## 🏃‍♂️ Running Locally

Since this project is set up to run directly in the browser using ES modules and an `importmap`, you can run it by serving the `index.html` file with a simple local HTTP server.

1.  **Using a simple HTTP server (e.g., `http-server` via npx):**
    If you have Node.js, you can use `npx`:
    ```bash
    npx http-server .
    ```
    This will serve the current directory. Open your browser to the URL provided (usually `http://localhost:8080`).

2.  **Using VS Code Live Server extension:**
    If you use VS Code, the "Live Server" extension is a convenient way to serve the `index.html` file.

## 📁 Project Structure

```
.
├── public/                     # Static assets that are publicly accessible
│   ├── audio/                  # Audio files for alphabets and words
│   │   ├── alphabets/
│   │   └── words/
│   ├── sw.js                   # Service Worker script for offline caching
│   ├── index.html              # Main HTML entry point
│   ├── index.tsx               # Main React/TypeScript entry point
│   ├── metadata.json           # Application metadata
│   ├── constants.ts            # Core data: alphabets, words, chapters, quiz questions
│   ├── types.ts                # TypeScript type definitions
│   ├── App.tsx                 # Main application component
│   └── components/             # Reusable UI components
│       ├── icons/              # SVG icon components
│       ├── Header.tsx
│       ├── Navigation.tsx
│       ├── ChapterSelection.tsx
│       ├── ChapterLessonView.tsx
│       ├── AlphabetCard.tsx
│       ├── WordCard.tsx
│       ├── DrawingCanvas.tsx     # For alphabet drawing practice
│       ├── DrawingModal.tsx      # For quiz drawing input
│       ├── QuizView.tsx
│       └── QuizResults.tsx
└── README.md                   # This file
```

## 📚 Content Management

All learning content (alphabets, words, sentences, paragraphs, stories, chapters, and quiz questions) is primarily managed in `constants.ts`.

*   **Alphabets:** Defined in `UYIR_EZHUTHUKKAL`, `MEI_EZHUTHUKKAL`, `AAYUTHA_EZHUTHU`.
*   **Words:** Grouped by categories (e.g., `COLORS_WORDS`, `FRUITS_WORDS`).
*   **Sentences/Paragraphs/Stories:** Defined as `SentenceInfo`, `ParagraphInfo`, `StoryInfo`.
*   **Chapters:** `CHAPTERS_DATA` array defines the structure and content of each chapter.
*   **Quiz Questions:** `QUIZ_QUESTIONS_DATA` array holds all quiz questions. Ensure `chapterId` in questions matches a chapter `id` or an `exam.id` from the "Final Exams Hub" chapter.

To add or modify content:
1.  Open `constants.ts`.
2.  Follow the existing data structures (`AlphabetInfo`, `WordInfo`, `ChapterInfo`, `QuizQuestion`, etc., defined in `types.ts`).
3.  Add new data or modify existing entries.
4.  Ensure audio files referenced in `audioSrc` exist in the `public/audio/` directory.

## ⚙️ Building for Production

For a production build, you would typically use a bundler like Webpack, Vite, or Parcel to:
1.  Transpile TypeScript to JavaScript.
2.  Bundle all JavaScript modules into optimized files.
3.  Minify code.
4.  Optimize assets.

This project, as currently set up, does not have a build step configured with such tools. It relies on direct browser support for ES modules and `importmap`. For robust production deployment and wider browser compatibility, integrating a build tool is recommended.

## 🌍 Deployment with GitHub Pages

To deploy this app to GitHub Pages:

1.  **Ensure your repository is on GitHub.**
2.  **If you implement a build step:**
    *   Configure your build tool to output files to a `docs` folder or the root of a `gh-pages` branch.
    *   Run your build command (e.g., `npm run build`).
    *   Commit the built files.
3.  **If deploying without a build step (as is current setup):**
    *   Your `index.html` and all related assets (`index.tsx`, `constants.ts`, `components/`, `public/audio/` etc.) need to be in the branch you're deploying from (e.g., `main`).
    *   Ensure all paths in `index.html` (like `/index.tsx`, `/sw.js`) are relative and correct for GitHub Pages (often, paths starting with `/` work well if deploying to `username.github.io/repository-name/` and you set the base path correctly, or if deploying to a custom domain).
4.  **Configure GitHub Pages:**
    *   Go to your repository settings on GitHub.
    *   Navigate to the "Pages" section.
    *   Choose the branch to deploy from (e.g., `main` or `gh-pages`).
    *   Choose the folder (e.g., `/root` or `/docs`).
    *   Save. GitHub will build and deploy your site. It might take a few minutes.
    *   Your site will be available at `https://<username>.github.io/<repository-name>/`.

**Important for GitHub Pages:**
*   **Base Path:** If your site is deployed to a subpath (e.g., `/<repository-name>/`), you might need to adjust asset paths or use a `<base href="/<repository-name>/" />` tag in your `index.html`'s `<head>`. The current setup uses root-relative paths like `/index.tsx` which should work if the deployment is at the root of a domain or if GitHub Pages handles it correctly.
*   **Service Worker Path:** The path `navigator.serviceWorker.register('/sw.js')` assumes `sw.js` is at the root of the deployed site. Adjust if necessary.

## 🌐 Offline Capabilities

The application includes a Service Worker (`sw.js`) that provides basic offline capabilities. On the first visit (when online), critical assets (HTML, JS, CSS, some audio files) are cached. Subsequent visits, even if offline, can then serve these assets from the cache, allowing the app to load.

## 🤝 Contributing

Contributions are welcome! If you'd like to contribute:
1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/your-feature-name`).
3.  Make your changes.
4.  Commit your changes (`git commit -m 'Add some feature'`).
5.  Push to the branch (`git push origin feature/your-feature-name`).
6.  Open a Pull Request.

Please ensure your code follows the existing style and that any new features are well-documented.

## 📜 License

This project is open-source. Please refer to the `LICENSE` file if one is added, or assume a standard permissive license like MIT unless otherwise specified.

## 🙏 Acknowledgements

*   **M&Ms:** For the concept and inspiration.
*   **Google Gemini AI:** For assistance in development and guidance.
*   The creators of React, TypeScript, and TailwindCSS.
*   Providers of Tamil learning resources.

---

Happy Tamil Learning! மகிழ்ச்சியான தமிழ் கற்றல்! ✨
