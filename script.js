document.addEventListener('DOMContentLoaded', function() {
    const ageVerification = document.getElementById('age-verification');
    const ageInput = document.getElementById('age-input');
    const verifyBtn = document.getElementById('verify-btn');
    const errorMessage = document.getElementById('error-message');
    const mainContent = document.getElementById('main-content');
    const correctAge = 55;
    const birthYear = new Date().getFullYear() - correctAge;

    // Age verification logic
    verifyBtn.addEventListener('click', function() {
        const enteredAge = parseInt(ageInput.value);
        
        if (isNaN(enteredAge)) {
            errorMessage.textContent = "Please enter a valid number";
            return;
        }
        
        if (enteredAge === correctAge) {
            // Correct age entered
            ageVerification.classList.remove('active');
            mainContent.style.display = 'block';
            
            // Trigger confetti
            triggerConfetti();
            
            // Set birthday background color
            document.body.style.backgroundColor = '#f8bbd0'; // Light pink for celebration
            
            
        } else {
            // Incorrect age
            errorMessage.textContent = `Oops, that's incorrect! Hint: You were born in ${birthYear}`;
            ageInput.value = '';
            ageInput.focus();
        }
    });

    // Allow Enter key to submit age
    ageInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            verifyBtn.click();
        }
    });

    // Confetti function
    function triggerConfetti() {
        const duration = 35 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
        
        function randomInRange(min, max) {
            return Math.random() * (max - min) + min;
        }
        
        const interval = setInterval(function() {
            const timeLeft = animationEnd - Date.now();
            
            if (timeLeft <= 0) {
                return clearInterval(interval);
            }
            
            const particleCount = 50 * (timeLeft / duration);
            
            // Since particles fall down, start a bit higher than random
            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
            });
            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
            });
        }, 250);
    }

    // Smooth scrolling for gallery link
    document.querySelector('.gallery-link').addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});