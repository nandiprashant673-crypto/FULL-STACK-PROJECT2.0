
const API_URL = "https://full-stack-project2-0.onrender.com";

async function register() {
    console.log("Register button clicked!");

    const nameInput = document.getElementById('regName');
    const emailInput = document.getElementById('regEmail');

    if (!nameInput || !emailInput) {
        console.error("HTML IDs regName or regEmail not found!");
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
        console.error("Connection Error:", error);
        alert("❌ Could not connect to the backend. Is Render Live?");
    }
}



