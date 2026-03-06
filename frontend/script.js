// REPLACE the URL below with your actual Render URL
const API_URL = "https://full-stack-project2-0.onrender.com";

const registrationForm = document.getElementById('registrationForm');

if (registrationForm) {
    registrationForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Get values from your input fields
        const nameInput = document.getElementById('fullName');
        const emailInput = document.getElementById('email');

        const formData = {
            name: nameInput.value,
            email: emailInput.value
        };

        try {
            // Sending data to the /submit route on your Render backend
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
                registrationForm.reset();
            } else {
                alert("❌ Error: " + (result.error || "Something went wrong"));
            }
        } catch (error) {
            console.error("Connection Error:", error);
            alert("❌ Could not connect to the backend. Please wait a moment and try again.");
        }
    });
}

