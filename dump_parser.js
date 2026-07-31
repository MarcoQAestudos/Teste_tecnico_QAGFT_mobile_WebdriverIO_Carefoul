const fs = require('fs');
const path = require('path');
const files = ['window_dump.xml', 'window_dump_login.xml', 'window_dump_dropdown.xml', 'window_dump_active.xml'];
const terms = [
  'input-email', 'input-password', 'input-repeat-password',
  'button-LOGIN', 'button-SIGN UP', 'button-Active', 'button-Inactive',
  'Dropdown', 'WEBDRIVER', 'Login-screen', 'Forms-screen', 'alertTitle',
  'android:id/button1', 'Swipe-screen', 'card', 'You found me', 'Select an item...'
];
for (const file of files) {
  const text = fs.readFileSync(path.join(__dirname, file), 'utf8');
  const out = [];
  terms.forEach(term => {
    let idx = text.indexOf(term);
    while (idx !== -1) {
      const start = Math.max(0, idx - 120);
      const end = Math.min(text.length, idx + 120);
      out.push(`${term} @ ${idx}: ${text.slice(start, end).replace(/\r?\n/g, '\\n')}`);
      idx = text.indexOf(term, idx + term.length);
    }
  });
  fs.writeFileSync(path.join(__dirname, `${file}.matches.txt`), out.join('\n\n'), 'utf8');
}
console.log('done');
