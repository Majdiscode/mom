(function attachContactForm(root, factory) {
    const api = factory();

    if (typeof module === 'object' && module.exports) {
        module.exports = api;
        return;
    }

    root.ContactForm = api;
}(typeof globalThis !== 'undefined' ? globalThis : this, function createApi() {
    const allowedEndpoint = 'https://formspree.io/f/mpwlprla';
    const failureMessage = 'We could not send your message. Please try again or contact us by phone.';
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^[+()\d.\s-]+$/;

    function validateContactFields(fields) {
        const errors = {};
        const name = String(fields.name || '').trim();
        const email = String(fields.email || '').trim();
        const phone = String(fields.phone || '').trim();
        const message = String(fields.message || '').trim();
        const phoneDigits = phone.replace(/\D/g, '');

        if (name.length < 2) {
            errors.name = 'Please enter at least two characters for your name.';
        } else if (name.length > 100) {
            errors.name = 'Please keep your name under 100 characters.';
        }

        if (email.length > 254 || !emailPattern.test(email)) {
            errors.email = 'Please enter a valid email address.';
        }

        if (
            phone
            && (
                phone.length > 30
                || !phonePattern.test(phone)
                || phoneDigits.length < 7
                || phoneDigits.length > 15
            )
        ) {
            errors.phone = 'Please enter a valid phone number or leave it blank.';
        }

        if (message.length < 10) {
            errors.message = 'Please include at least ten characters in your message.';
        } else if (message.length > 2000) {
            errors.message = 'Please keep your message under 2,000 characters.';
        }

        return errors;
    }

    function createContactRequest(endpoint, formData) {
        if (endpoint !== allowedEndpoint) {
            throw new Error('Invalid contact endpoint.');
        }

        return {
            url: endpoint,
            options: {
                method: 'POST',
                body: formData,
                headers: {
                    Accept: 'application/json'
                }
            }
        };
    }

    async function sendContact({ endpoint, formData, fetchImpl = fetch }) {
        try {
            const request = createContactRequest(endpoint, formData);
            const response = await fetchImpl(request.url, request.options);

            if (!response.ok) {
                return { ok: false, message: failureMessage };
            }

            return { ok: true };
        } catch {
            return { ok: false, message: failureMessage };
        }
    }

    return {
        createContactRequest,
        sendContact,
        validateContactFields
    };
}));
