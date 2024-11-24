// Ensure the DOM is fully loaded before adding event listeners
document.addEventListener("DOMContentLoaded", () => {
    // Generate Test Cases
    document.getElementById("generate-button").addEventListener("click", async () => {
        const ticketText = document.getElementById("ticket-text").value.trim();

        if (!ticketText) {
            alert("Please enter some text before generating test cases!");
            return;
        }

        const apiKey = "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"; // Replace with your OpenAI API key
        const apiUrl = "https://api.openai.com/v1/chat/completions";

        const requestBody = {
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: "You are a QA engineer. Generate concise, one-liner test cases from the following text." },
                { role: "user", content: ticketText }
            ],
            temperature: 0.7,
            max_tokens: 1000
        };

        try {
            // Make a POST request to GPT-4 API
            const response = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${apiKey}`
                },
                body: JSON.stringify(requestBody)
            });

            if (!response.ok) {
                throw new Error(`API Error: ${response.status}`);
            }

            const data = await response.json();

            // Display the generated test cases
            const testCases = data.choices[0].message.content;
            document.getElementById("test-cases").innerText = testCases;

        } catch (error) {
            console.error("Error:", error);
            alert("Failed to generate test cases. Please check your API key or internet connection.");
        }
    });

    // Copy Test Cases to Clipboard
    document.getElementById("copy-button").addEventListener("click", () => {
        const testCases = document.getElementById("test-cases").innerText;

        if (!testCases.trim()) {
            alert("No test cases to copy!");
            return;
        }

        navigator.clipboard.writeText(testCases).then(() => {
            alert("Test cases copied to clipboard!");
        }).catch((error) => {
            console.error("Copy failed:", error);
            alert("Failed to copy test cases. Please try again.");
        });
    });
});
