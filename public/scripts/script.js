document.addEventListener("DOMContentLoaded", () => {
    // Elements
    const orb = document.getElementById("orb");
    const mainPrompt = document.getElementById("main-prompt");
    const uploadBtn = document.getElementById("uploadBtn");
    const fileInput = document.getElementById("fileInput");
    const fileName = document.getElementById("fileName");
    const generateSummary = document.getElementById("generateSummary");
    const extractKey = document.getElementById("extractKey");
    const translateSummary = document.getElementById("translateSummary");
    const summaryContainer = document.getElementById("summaryContainer");
    const summaryText = document.getElementById("summaryText");
    const questionInput = document.getElementById("questionInput");
    const showMore = document.getElementById("showMore");
    const additionalButtons = document.getElementById("additionalButtons");
    const closeBtn = document.querySelector(".close-btn");

    // Make orb pulse to draw attention
    orb.classList.add("pulsing");

    // Trigger file input when upload button is clicked
    uploadBtn.addEventListener("click", () => {
        fileInput.click();
    });

    // Handle file selection
    fileInput.addEventListener("change", (e) => {
        if (e.target.files.length > 0) {
            const file = e.target.files[0];

            // Display file name
            fileName.textContent = file.name;
            fileName.style.display = "block";

            // Change prompt text
            mainPrompt.innerHTML =
                "Audio file uploaded.<br>Choose an action below:";

            // Stop pulsing animation
            orb.classList.remove("pulsing");

            // Add click event to generate summary button
            generateSummary.addEventListener("click", () =>
                processAudio("summary", file)
            );
            extractKey.addEventListener("click", () =>
                processAudio("key_points", file)
            );
            translateSummary.addEventListener("click", () =>
                processAudio("translate", file)
            );
        }
    });

    // Simulate processing audio file
    function processAudio(type, file) {
        // Show processing state
        orb.classList.add("processing");
        mainPrompt.innerHTML = "Processing audio...<br>This may take a moment";

        // Simulate processing delay
        setTimeout(() => {
            // Remove processing state
            orb.classList.remove("processing");

            // Update prompt
            mainPrompt.innerHTML = "Audio processed successfully!";

            // Show summary based on type
            let summaryContent = "";

            if (type === "summary") {
                summaryContent =
                    "This is a complete summary of the audio file. The meeting began with a discussion about Q3 sales targets. The team reported a 15% increase in revenue compared to the previous quarter. Key challenges were identified in the Southeast region where new competitors have entered the market. The team agreed to develop a new marketing strategy for this region by the end of the month.";
            } else if (type === "key_points") {
                summaryContent =
                    "• Q3 sales increased by 15%\n• Southeast region facing competitive pressure\n• New marketing strategy needed\n• Implementation deadline: end of month\n• Budget approval pending from finance";
            } else if (type === "translate") {
                summaryContent =
                    "This is the translated summary of the audio content. It contains the main points discussed in the meeting, translated into English for your convenience.";
            }

            // Display summary
            summaryText.textContent = summaryContent;
            summaryContainer.style.display = "block";
        }, 2000);
    }

    // Show/hide additional buttons
    showMore.addEventListener("click", () => {
        additionalButtons.classList.toggle("show");
        showMore.textContent = additionalButtons.classList.contains("show")
            ? "Show less"
            : "Show more";
    });

    // Handle question input
    questionInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            const question = questionInput.value.trim();
            if (question) {
                // Simulate response
                summaryText.textContent = `Here's the answer to your question: "${question}"\n\nBased on the audio content, this topic was discussed briefly during the second half of the meeting. The team mentioned they would need further analysis before making a decision.`;
                summaryContainer.style.display = "block";
                questionInput.value = "";
            }
        }
    });

    // Handle close button
    closeBtn.addEventListener("click", () => {
        // In a real application, this would close the modal
        // For this demo, we'll just reset the state
        mainPrompt.innerHTML =
            "Upload an audio file<br>for instant summarization";
        orb.classList.add("pulsing");
        orb.classList.remove("processing");
        fileName.style.display = "none";
        summaryContainer.style.display = "none";
        fileInput.value = "";
    });

    // Make orb interactive
    orb.addEventListener("click", () => {
        if (!orb.classList.contains("processing")) {
            orb.classList.toggle("pulsing");
        }
    });
});
