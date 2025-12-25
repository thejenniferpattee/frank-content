{
  "title": "Scripts",
  "description": "This folder contains developer tools for validating and previewing Frank content JSON files.",
  "script": {
    "name": "validate_and_preview.js",
    "description": "This script performs two main tasks:\n\n1. Validation – Checks that all instruments, screens, and references exist and are correctly formatted.\n2. Markdown Preview – Generates a human-readable preview of all messages and questions in order."
  },
  "how_to_use": [
    "Make sure Node.js is installed.",
    "From the repo root, run:",
    "node scripts/validate_and_preview.js",
    "The script will check all JSON files listed in bundle.json.",
    "Any missing or invalid files will be logged in the console."
  ],
  "what_you_get": [
    "Validation output: Console messages indicating any missing instruments, broken references, or JSON structure issues.",
    "Preview output: A file called preview.md showing all messages and instrument questions in order. This makes it easier to review the content without opening the app."
  ],
  "notes": "You can extend this script to include cluster/topic mapping from taxonomy.json to make the preview closer to the real app flow."
}
