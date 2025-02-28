# AI Meet Summarizer

**AI Meet Summarizer** is a Node.js web application that allows users to upload audio files (such as meeting recordings) and then processes them using Google’s Generative AI to generate a concise summary. This forward-thinking project leverages modern AI technologies to help users quickly extract key information from their meetings.

## Features

- **Audio File Upload:** Upload audio files directly via a user-friendly web interface.
- **AI-Powered Summarization:** Uses Google’s AI services to analyze and summarize the audio content.
- **Real-Time Feedback:** Displays a summary of the meeting on the same page after processing.
- **Clean and Modern Interface:** Built with Express and EJS for dynamic content rendering.
- **File Management:** Utilizes Multer for file uploads and ensures temporary files are cleaned up post-processing.

## Prerequisites

- [Node.js](https://nodejs.org/) (version 12 or above)
- [npm](https://www.npmjs.com/) (Node package manager)
- A Google API key with access to the required Google Generative AI services

## Installation

1. **Clone the Repository:**
   git clone https://github.com/your-username/ai-meet-summarizer.git
   cd ai-meet-summarizer

2. **Install Dependencies:**
   npm install

3. **Configure API Key:**

   - Open `app.js` and locate the line with the API key.
   - Replace the placeholder API key with your own Google API key:

     const apiKey = "YOUR_GOOGLE_API_KEY_HERE";

4. **Prepare the Environment:**

   - Ensure that the file `prompts_full.json` is in the project root as it contains the prompts for the AI processing.
   - The project uses an `uploads` folder to temporarily store files. This folder will be created automatically if it does not exist.

## Usage

1. **Start the Server:**

   node app.js

2. **Open the Application:**

   - Open your browser and go to: [http://localhost:8080/index](http://localhost:8080/index)

3. **Upload and Summarize:**

   - Use the provided form to upload your audio file.
   - After the file is uploaded, the application will process it using Google’s AI, generate a summary, and display it on the page.

## Directory Structure

ai-meet-summarizer/
├── app.js              # Main server application
├── prompts_full.json   # JSON file containing AI prompts
├── package.json        # Node.js dependencies and scripts
├── views/              # EJS templates for rendering the frontend
│   └── index.ejs
├── public/             # Static assets (CSS, JavaScript, images)
└── uploads/            # Temporary folder for storing uploaded files

## Contributing

Contributions are welcome! If you have ideas for new features, improvements, or bug fixes, please fork the repository and submit a pull request. For major changes, please open an issue first to discuss what you would like to change.
