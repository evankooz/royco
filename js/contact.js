// Contact page form handling
function validateForm(formData) {
    const errors = {};
    
    if (!formData.name.trim()) {
        errors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
        errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        errors.email = 'Please enter a valid email';
    }
    
    if (formData.phone && !/^[\d\s\-\+\(\)]*$/.test(formData.phone)) {
        errors.phone = 'Please enter a valid phone number';
    }
    
    if (!formData.message.trim()) {
        errors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
        errors.message = 'Message must be at least 10 characters';
    }
    
    return errors;
}

function displayErrors(errors) {
    // Clear all errors first
    document.querySelectorAll('.error-message').forEach(el => {
        el.textContent = '';
    });

    // Display new errors
    Object.keys(errors).forEach(field => {
        const errorElement = document.getElementById(`${field}Error`);
        if (errorElement) {
            errorElement.textContent = errors[field];
        }
    });
}

function clearErrors() {
    document.querySelectorAll('.error-message').forEach(el => {
        el.textContent = '';
    });
}

async function submitForm(event) {
    event.preventDefault();

    const form = document.getElementById('contactForm');
    if (!form) return;

    // Get form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        company: document.getElementById('company').value,
        message: document.getElementById('message').value,
    };

    // Validate
    const errors = validateForm(formData);
    if (Object.keys(errors).length > 0) {
        displayErrors(errors);
        return;
    }

    clearErrors();

    const statusMessage = document.getElementById('statusMessage');
    const submitBtn = form.querySelector('button[type="submit"]');

    try {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';

        // Send to FormSubmit
        const response = await fetch('https://formsubmit.co/evan.kuczer@kuczer.com', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (!response.ok) {
            throw new Error('Failed to submit form');
        }

        // Success
        statusMessage.textContent = 'Thank you! Your message has been sent successfully.';
        statusMessage.className = 'status-message success';
        form.reset();

        setTimeout(() => {
            statusMessage.textContent = '';
            statusMessage.className = 'status-message';
        }, 5000);

    } catch (error) {
        console.error('Form error:', error);
        statusMessage.textContent = 'Unable to send message. Please try again later or call (978) 632-8151.';
        statusMessage.className = 'status-message error';
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Message';
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', submitForm);

        // Clear errors on input
        form.querySelectorAll('input, textarea').forEach(field => {
            field.addEventListener('input', () => {
                const errorElement = document.getElementById(`${field.name}Error`);
                if (errorElement) {
                    errorElement.textContent = '';
                }
            });
        });
    }

    setupMobileMenu();
    setActiveNavLink();
});
