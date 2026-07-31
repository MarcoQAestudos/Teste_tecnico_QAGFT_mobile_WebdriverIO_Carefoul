const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, 'window_dump_login.xml');
const text = fs.readFileSync(file, 'utf8');
const terms = ['text="Login"', 'text="Sign up"', 'text="LOGIN"', 'text="Sign"', 'content-desc="button-LOGIN"', 'content-desc="button-SIGN UP"', 'content-desc="button-login-container"', 'content-desc="button-sign-up-container"', 'text="Email"', 'text="Password"'];
const out = [];
terms.forEach(term => {
  let idx = text.indexOf(term);
  while (idx !== -1) {
    const start = Math.max(0, idx - 200);
    const end = Math.min(text.length, idx + 200);
    out.push(`${term} @ ${idx}: ${text.slice(start,end).replace(/\r?\n/g,'\\n')}`);
    idx = text.indexOf(term, idx + term.length);
  }
});
fs.writeFileSync(path.join(__dirname,'dump_search_output.txt'), out.join('\n\n'));
