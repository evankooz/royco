// Contact form validation and submission handler
function validateField(field) {
    const fieldName = field.name;
    const value = field.value.trim();
    const errorElement = document.getElementById(`${fieldName}Error`);
    
    if (!errorElement) return true;
    
    let isValid = true;
    let errorMessage = '';
    
    // Basic required field check
    if (!value) {
        isValid = false;
        errorMessage = `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`;
    }
    // Email validation
    else if (fieldName === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address';
        }
    }
    // Phone validation (optional - only validate if provided)
    else if (fieldName === 'tel' && value) {
        const phoneRegex = /^[\d\s\-\+\(\)]+$/;
        if (value.length < 10 || !phoneRegex.test(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid phone number';
        }
    }
    
    errorElement.textContent = isValid ? '' : errorMessage;
    field.classList.toggle('error', !isValid);
    
    return isValid;
}

function submitForm(e) {
    e.preventDefault();
    
    const form = e.target;
    const fields = form.querySelectorAll('input, textarea');
    let isFormValid = true;
    
    // Validate all fields
    fields.forEach(field => {
        if (!validateField(field)) {
            isFormValid = false;
        }
    });
    
    if (!isFormValid) {
        return;
    }
    
    // Show success feedback
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = '✓ Message Sent!';
    submitBtn.style.backgroundColor = '#10b981';
    submitBtn.disabled = true;
    
    // Reset form
    form.reset();
    
    // Clear error displays
    document.querySelectorAll('.error-message').forEach(el => {
        el.textContent = '';
    });
    
    // Restore button after 3 seconds
    setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.style.backgroundColor = '';
        submitBtn.disabled = false;
    }, 3000);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.contact-form');
    if (form) {
        form.addEventListener('submit', submitForm);

        // Clear errors on input
        form.querySelectorAll('input, textarea').forEach(field => {
            field.addEventListener('blur', () => validateField(field));
            field.addEventListener('input', () => {
                const errorElement = document.getElementById(`${field.name}Error`);
                if (errorElement && field.classList.contains('error')) {
                    validateField(field);
                }
            });
        });
    }

    setupMobileMenu();
    setActiveNavLink();
});
