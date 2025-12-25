const fs = require('fs');
const path = require('path');

// --- CONFIG ---
const bundlePath = 'content/bundle.json';
const previewOutput = 'preview.md';

// --- HELPER FUNCTIONS ---
function fileExists(filePath) {
    return fs.existsSync(filePath);
}

// --- LOAD BUNDLE ---
if (!fileExists(bundlePath)) {
    console.error(`❌ bundle.json not found at ${bundlePath}`);
    process.exit(1);
}

const bundle = JSON.parse(fs.readFileSync(bundlePath));

// --- VALIDATE INSTRUMENTS ---
console.log('--- Validating Instruments ---');
let valid = true;

bundle.instruments.forEach(instPath => {
    if (!fileExists(instPath)) {
        console.error(`❌ Missing instrument file: ${instPath}`);
        valid = false;
        return;
    }
    const instrument = JSON.parse(fs.readFileSync(instPath));
    if (!instrument.id || !instrument.display_name || !instrument.items) {
        console.error(`❌ Invalid instrument structure: ${instPath}`);
        valid = false;
    }
});

if (valid) console.log('✅ All instruments exist and look valid');

// --- VALIDATE SCREEN FLOW ---
console.log('\n--- Validating Screen Flow ---');

if (!fileExists(bundle.screen_flow_path)) {
    console.error(`❌ screen_flow file not found: ${bundle.screen_flow_path}`);
    process.exit(1);
}

const flow = JSON.parse(fs.readFileSync(bundle.screen_flow_path));
const instrumentIds = bundle.instruments.map(p => JSON.parse(fs.readFileSync(p)).id);

flow.screens.forEach(screen => {
    if (screen.type === 'instrument' && !instrumentIds.includes(screen.instrument_id)) {
        console.error(`❌ Screen '${screen.id}' references missing instrument: ${screen.instrument_id}`);
        valid = false;
    }
});

if (valid) console.log('✅ Screen flow references are valid');

// --- GENERATE MARKDOWN PREVIEW ---
console.log('\n--- Generating Markdown Preview ---');
let md = '# Frank Content Preview\n\n';

flow.screens.forEach(screen => {
    if (screen.type === 'message') {
        md += `**Message**: ${screen.text}\n\n`;
    }
    if (screen.type === 'instrument') {
        const instr = JSON.parse(fs.readFileSync(`content/instruments/${screen.instrument_id}.json`));
        md += `### ${instr.display_name} (${instr.timeframe})\n`;
        instr.items.forEach((q, i) => {
            md += `${i + 1}. ${q.text}\n`;
        });
        md += '\n';
    }
});

fs.writeFileSync(previewOutput, md);
console.log(`✅ Markdown preview generated: ${previewOutput}`);
