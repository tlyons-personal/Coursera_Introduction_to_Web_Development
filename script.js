document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('nav-toggle');
    const nav = document.querySelector('nav');
    const navLinks = document.querySelectorAll('nav ul li a');
    const projectImages = document.querySelectorAll('.projects-container img');
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.querySelector('.lightbox-image');
    const lightboxCaption = document.querySelector('.lightbox-caption');
    const lightboxClose = document.querySelector('.lightbox-close');

    // Form validation elements
    const contactForm = document.querySelector('#contact form');
    const nameField = document.getElementById('name');
    const emailField = document.getElementById('email');
    const messageField = document.getElementById('message');
    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const messageError = document.getElementById('message-error');

    function updateMenuState() {
        if (navToggle && nav) {
            nav.classList.toggle('menu-open', navToggle.checked);
        }
    }

    if (navToggle && nav) {
        navToggle.addEventListener('change', updateMenuState);
        updateMenuState();
    }

    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768 && navToggle) {
                navToggle.checked = false;
                updateMenuState();
            }
        });
    });

    function openLightbox(image) {
        if (!lightbox || !lightboxImage || !lightboxCaption) {
            return;
        }

        lightboxImage.src = image.src;
        lightboxImage.alt = image.alt || 'Project image';
        lightboxCaption.textContent = image.alt || 'Project preview';
        lightbox.classList.add('active');
        lightbox.setAttribute('aria-hidden', 'false');
    }

    function closeLightbox() {
        if (!lightbox) {
            return;
        }

        lightbox.classList.remove('active');
        lightbox.setAttribute('aria-hidden', 'true');
        lightboxImage.src = '';
        lightboxCaption.textContent = '';
    }

    projectImages.forEach(image => {
        image.addEventListener('click', function() {
            openLightbox(image);
        });

        image.addEventListener('keyup', function(event) {
            if (event.key === 'Enter' || event.key === ' ') {
                openLightbox(image);
            }
        });
    });

    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }

    if (lightbox) {
        lightbox.addEventListener('click', event => {
            if (event.target === lightbox) {
                closeLightbox();
            }
        });
    }

    document.addEventListener('keydown', event => {
        if (event.key === 'Escape') {
            closeLightbox();
        }
    });

    // Form validation functions
    function validateName() {
        if (!nameField || !nameError) return true;
        if (nameField.value.trim() === '') {
            nameError.textContent = 'Name is required.';
            nameError.style.display = 'block';
            return false;
        } else {
            nameError.style.display = 'none';
            return true;
        }
    }

    function validateEmail() {
        if (!emailField || !emailError) return true;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailField.value.trim() === '') {
            emailError.textContent = 'Email is required.';
            emailError.style.display = 'block';
            return false;
        } else if (!emailRegex.test(emailField.value.trim())) {
            emailError.textContent = 'Please enter a valid email address.';
            emailError.style.display = 'block';
            return false;
        } else {
            emailError.style.display = 'none';
            return true;
        }
    }

    function validateMessage() {
        if (!messageField || !messageError) return true;
        if (messageField.value.trim() === '') {
            messageError.textContent = 'Message is required.';
            messageError.style.display = 'block';
            return false;
        } else {
            messageError.style.display = 'none';
            return true;
        }
    }

    // Real-time validation
    if (nameField) {
        nameField.addEventListener('blur', validateName);
        nameField.addEventListener('input', validateName);
    }

    if (emailField) {
        emailField.addEventListener('blur', validateEmail);
        emailField.addEventListener('input', validateEmail);
    }

    if (messageField) {
        messageField.addEventListener('blur', validateMessage);
        messageField.addEventListener('input', validateMessage);
    }

    // Form submit validation
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            const isNameValid = validateName();
            const isEmailValid = validateEmail();
            const isMessageValid = validateMessage();

            if (!isNameValid || !isEmailValid || !isMessageValid) {
                event.preventDefault();
                alert('Please correct the errors in the form before submitting.');
            } else {
                // Here you could add code to actually send the form, e.g., via fetch or AJAX
                alert('Form submitted successfully!');
                // For demo, prevent default to avoid page reload
                event.preventDefault();
            }
        });
    }
});
