import fs from 'node:fs';
import path from 'node:path';
import { glob } from 'glob';

async function main() {
  // Create the raw directory if it doesn't exist
  const rawDir = path.resolve(process.cwd(), 'coverage/raw');
  if (!fs.existsSync(rawDir)) {
    fs.mkdirSync(rawDir, { recursive: true });
  }

  // Find all coverage.json files in the workspace
  const files = await glob('../../**/coverage.json', {
    ignore: ['**/node_modules/**', '**/dist/**'],
  });

  // Copy each file to the raw directory with a unique name
  for (const file of files) {
    const packageName = file.split('/').slice(-2)[0];
    const destPath = path.join(rawDir, `${packageName}-coverage.json`);
    fs.copyFileSync(file, destPath);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
