    // Form submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const formData = {
                name: this.querySelector('input[placeholder="Your Name"]').value,
                email: this.querySelector('input[placeholder="Your Email"]').value,
                department: this.querySelector('input[placeholder="Department Name"]').value,
                message: this.querySelector('textarea[placeholder="Message"]').value
            };

            // Log form data (in a real app, this would be sent to a server)
            console.log('Form Submitted:', formData);

            // Show success message
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = '✓ Message Sent!';
            submitBtn.style.backgroundColor = '#10b981';

            // Reset form
            this.reset();

            // Restore button after 3 seconds
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.style.backgroundColor = '';
            }, 3000);
        });
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
