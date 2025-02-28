document.addEventListener("DOMContentLoaded", function () {
    let summaryEscaped = summaryData;

    if (summaryEscaped.startsWith("```html")) {
        summaryEscaped = summaryEscaped.slice(7);
    }
    if (summaryEscaped.endsWith("```")) {
        summaryEscaped = summaryEscaped.slice(0, -3);
    }
    const parser = new DOMParser();
    const doc = parser.parseFromString(summaryEscaped, "text/html");
    const formattedContent = doc.body.innerHTML;

    const downloadBtn = document.querySelector(".more-actions");
    const summaryDiv = document.getElementById("formattedSummary");
    console.log(downloadBtn);
    if (summaryDiv) {
        // Check if the element exists before setting innerHTML
        summaryDiv.style.display = "block";
        if (downloadBtn) {
            downloadBtn.style.display = "block";
        }
        summaryDiv.innerHTML =
            formattedContent || "<p>No summary available.</p>";
    }
});
