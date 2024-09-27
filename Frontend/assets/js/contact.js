// Function to send OTP
function sendOTP(phoneNumber) {
    fetch('http://localhost:3000/send-otp', {  // Backend URL to send OTP
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber: phoneNumber }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('OTP sent to your phone!');
            document.getElementById('otp-section').style.display = 'block'; // Show OTP input
        } else {
            alert('Failed to send OTP');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// Function to verify OTP
function verifyOTP(phoneNumber, otp) {
    fetch('http://localhost:3000/verify-otp', {  // Backend URL to verify OTP
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ otp: otp, phoneNumber: phoneNumber }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Phone number verified successfully!');
        } else {
            alert('Incorrect OTP. Please try again.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// Event listener for sending OTP
document.getElementById('phone-form').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent form submission from refreshing the page

    const phoneNumber = document.getElementById('phone-number').value;
    if (phoneNumber) {
        sendOTP(phoneNumber); // Call function to send OTP
    } else {
        alert('Please enter a valid phone number');
    }
});

// Event listener for verifying OTP
document.getElementById('otp-form').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent form submission from refreshing the page

    const phoneNumber = document.getElementById('phone-number').value;
    const otp = document.getElementById('otp-input').value;
    if (otp) {
        verifyOTP(phoneNumber, otp); // Call function to verify OTP
    } else {
        alert('Please enter the OTP sent to your phone');
    }
});
