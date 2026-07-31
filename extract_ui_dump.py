import xml.etree.ElementTree as ET
from pathlib import Path

files = [Path('window_dump.xml'), Path('window_dump_login.xml'), Path('window_dump_dropdown.xml'), Path('window_dump_active.xml')]
targets = [
    'input-email', 'input-password', 'input-repeat-password', 'button-LOGIN', 'button-SIGN UP',
    'button-Active', 'button-Inactive', 'Dropdown', 'WEBDRIVER', 'Login-screen', 'Forms-screen',
    'alertTitle', 'android:id/button1', 'Swipe-screen', 'card', 'You found me', 'Select an item...'
]

for f in files:
    out_file = f.with_suffix(f'.{f.stem}.matches.txt')
    with out_file.open('w', encoding='utf-8') as out:
        try:
            root = ET.parse(f).getroot()
        except Exception as e:
            out.write(f'PARSE ERROR: {e}\n')
            continue
        for elem in root.iter():
            attrs = elem.attrib
            hay = ' '.join([attrs.get('content-desc', ''), attrs.get('resource-id', ''), attrs.get('text', '')])
            if any(target in hay for target in targets):
                out.write(str(attrs) + '\n')
