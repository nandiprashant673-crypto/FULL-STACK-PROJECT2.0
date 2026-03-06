
const API_URL = "https://full-stack-project2-0.onrender.com";

async function register() {
    // These IDs now match your HTML exactly: regName and regEmail
    const nameInput = document.getElementById('regName');
    const emailInput = document.getElementById('regEmail');

    if (!nameInput.value || !emailInput.value) {
        alert("Please fill in both Name and Email");
        return;
    }

    const formData = {
        name: nameInput.value,
        email: emailInput.value
    };

    try {
        // Sending data to your Render backend
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
            // Clear the inputs after success
            nameInput.value = "";
            emailInput.value = "";
        } else {
            alert("❌ Error: " + (result.error || "Something went wrong"));
        }
    } catch (error) {
        console.error("Connection Error:", error);
        alert("❌ Could not connect to the backend. Please check if Render is Live.");
    }
}


