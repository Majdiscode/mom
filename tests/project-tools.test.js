const test = require('node:test');
const assert = require('node:assert/strict');

const {
    buildImageEntries,
    insertProjectBlock,
    naturalSort
} = require('../scripts/project-tools');

test('naturalSort orders numbered filenames like Finder', () => {
    assert.deepEqual(
        ['room10.jpg', 'room2.jpg', 'room1.jpg'].sort(naturalSort),
        ['room1.jpg', 'room2.jpg', 'room10.jpg']
    );
});

test('buildImageEntries encodes nested paths and writes useful alt text', () => {
    const entries = buildImageEntries(
        'Oakland Hills',
        'Projects/Oakland House',
        ['02-bedroom.jpg', '01-living-room.jpg']
    );

    assert.deepEqual(entries, [
        {
            src: 'https://raw.githubusercontent.com/Majdiscode/mom/main/Projects/Oakland%20House/01-living-room.jpg',
            alt: 'Oakland Hills staged living room'
        },
        {
            src: 'https://raw.githubusercontent.com/Majdiscode/mom/main/Projects/Oakland%20House/02-bedroom.jpg',
            alt: 'Oakland Hills staged bedroom'
        }
    ]);
});

test('buildImageEntries rejects empty projects', () => {
    assert.throws(
        () => buildImageEntries('Empty Project', 'Empty', []),
        /no supported images/i
    );
});

test('insertProjectBlock inserts at the managed marker and prevents duplicates', () => {
    const source = [
        'const images = [',
        '    // AUTO-INSERT:START',
        '    // AUTO-INSERT:END',
        '];'
    ].join('\n');
    const entries = [{ src: 'one.jpg', alt: 'Oakland Hills staged living room' }];
    const updated = insertProjectBlock(source, 'Oakland Hills', entries);

    assert.match(updated, /PROJECT: Oakland Hills/);
    assert.match(updated, /src: 'one\.jpg'/);
    assert.throws(
        () => insertProjectBlock(updated, 'Oakland Hills', entries),
        /already exists/i
    );
});
