const test = require('node:test');
const assert = require('node:assert/strict');

const {
    createContactRequest,
    sendContact,
    validateContactFields
} = require('../js/contact-form');

test('createContactRequest only accepts the configured Formspree endpoint', () => {
    const formData = { name: 'Test User' };
    const request = createContactRequest(
        'https://formspree.io/f/mpwlprla',
        formData
    );

    assert.equal(request.url, 'https://formspree.io/f/mpwlprla');
    assert.equal(request.options.method, 'POST');
    assert.equal(request.options.body, formData);
    assert.equal(request.options.headers.Accept, 'application/json');
    assert.throws(
        () => createContactRequest('https://example.com/collect', formData),
        /invalid contact endpoint/i
    );
});

test('sendContact returns success for a successful Formspree response', async () => {
    const result = await sendContact({
        endpoint: 'https://formspree.io/f/mpwlprla',
        formData: {},
        fetchImpl: async () => ({ ok: true })
    });

    assert.deepEqual(result, { ok: true });
});

test('sendContact returns a safe message for HTTP and network failures', async () => {
    const serverFailure = await sendContact({
        endpoint: 'https://formspree.io/f/mpwlprla',
        formData: {},
        fetchImpl: async () => ({ ok: false })
    });
    const networkFailure = await sendContact({
        endpoint: 'https://formspree.io/f/mpwlprla',
        formData: {},
        fetchImpl: async () => {
            throw new Error('private network detail');
        }
    });

    assert.equal(serverFailure.ok, false);
    assert.equal(networkFailure.ok, false);
    assert.doesNotMatch(networkFailure.message, /private network detail/);
});

test('validateContactFields accepts Unicode names and formatted phone numbers', () => {
    assert.deepEqual(validateContactFields({
        name: 'Peña Müller',
        email: 'hello@example.com',
        phone: '+44 20 7946 0958',
        message: 'I would like help staging my home.'
    }), {});
});

test('validateContactFields rejects whitespace, malformed email, short phone, and short messages', () => {
    assert.deepEqual(validateContactFields({
        name: '   ',
        email: 'missing@@domain',
        phone: '123',
        message: 'Too short'
    }), {
        name: 'Please enter at least two characters for your name.',
        email: 'Please enter a valid email address.',
        phone: 'Please enter a valid phone number or leave it blank.',
        message: 'Please include at least ten characters in your message.'
    });
});

test('validateContactFields accepts a blank optional phone number', () => {
    assert.deepEqual(validateContactFields({
        name: '田中',
        email: 'tanaka@example.jp',
        phone: '',
        message: 'Please contact me about staging.'
    }), {});
});

test('validateContactFields enforces maximum field lengths and international phone limits', () => {
    const errors = validateContactFields({
        name: 'N'.repeat(101),
        email: `${'e'.repeat(245)}@example.com`,
        phone: '+1 234 567 890 123 456',
        message: 'M'.repeat(2001)
    });

    assert.deepEqual(errors, {
        name: 'Please keep your name under 100 characters.',
        email: 'Please enter a valid email address.',
        phone: 'Please enter a valid phone number or leave it blank.',
        message: 'Please keep your message under 2,000 characters.'
    });
});

test('validateContactFields rejects letters in a phone number', () => {
    const errors = validateContactFields({
        name: 'Valid Name',
        email: 'valid@example.com',
        phone: 'CALL-NOW-123',
        message: 'A sufficiently detailed message.'
    });

    assert.equal(
        errors.phone,
        'Please enter a valid phone number or leave it blank.'
    );
});
