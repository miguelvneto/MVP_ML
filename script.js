document.getElementById('lungCancerForm').addEventListener('submit', function (e) {
    e.preventDefault();  // Prevent form from submitting the default way

    // Get the form data
    const formData = {
        age: document.getElementById('age').value,
        gender: document.getElementById('gender').value,
        smoking: document.getElementById('smoking').value,
        yellow_fingers: document.getElementById('yellow_fingers').value,
        anxiety: document.getElementById('anxiety').value,
        peer_pressure: document.getElementById('peer_pressure').value,
        chronic_disease: document.getElementById('chronic_disease').value,
        fatigue: document.getElementById('fatigue').value,
        allergy: document.getElementById('allergy').value,
        wheezing: document.getElementById('wheezing').value,
        alcohol_consumption: document.getElementById('alcohol_consumption').value,
        coughing: document.getElementById('coughing').value,
        shortness_of_breath: document.getElementById('shortness_of_breath').value,
        chest_pain: document.getElementById('chest_pain').value
    };

    // Simulate an API request to predict lung cancer (for testing purpose, since there's no actual API connected)
    // Replace this block with actual API call if needed

    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `<p>Loading...</p>`;  // Show loading message while processing

    // Simulate a delay to mimic an API call
    setTimeout(function () {
        // Simulate a random prediction result
        const prediction = Math.random() > 0.5 ? 'High Risk of Lung Cancer' : 'Low Risk of Lung Cancer';

        // Display the result back to the user
        resultDiv.innerHTML = `<p><strong>Prediction:</strong> ${prediction}</p>`;
    }, 2000);  // Simulate 2 second delay for "processing"

    /*
    // Uncomment the following section if you have a real API to send data to

    fetch('https://example.com/api/predict', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        // Display the prediction result in the result div
        resultDiv.innerHTML = `<p><strong>Prediction:</strong> ${data.prediction}</p>`;
    })
    .catch(error => {
        console.error('Error:', error);
        resultDiv.innerHTML = `<p style="color: red;">An error occurred. Please try again later.</p>`;
    });
    */
});