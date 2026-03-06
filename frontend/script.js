// Use your actual Render URL here
const API_URL = "https://full-stack-project2-0.onrender.com";

async function register() {
    console.log("Register function triggered");

    // Matching your HTML IDs: regName and regEmail
    const nameInput = document.getElementById('regName');
    const emailInput = document.getElementById('regEmail');

    if (!nameInput.value || !emailInput.value) {
        alert("Please enter both Name and Email");
        return;
    }

    const formData = {
        name: nameInput.value,
        email: emailInput.value
    };

    try {
        const response = await fetch(`${API_URL}/submit`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const result = await response.json();

        if (response.ok) {
            alert("✅ Student data saved successfully!");
            nameInput.value = "";
            emailInput.value = "";
        } else {
            alert("❌ Server Error: " + (result.error || "Unknown error"));
        }
    } catch (error) {
        console.error("Fetch Error:", error);
        alert("❌ Connection failed. Make sure your Render backend is 'Live'.");
    }
}




