#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Read the source data
const sourceFile = path.join(__dirname, '../src/data/pf2e-monsters.json');
const sourceData = JSON.parse(fs.readFileSync(sourceFile, 'utf8'));

console.log(`Loaded ${sourceData.length} monsters from pf2e-monsters.json`);

// Base URL for Archives of Nethys
const BASE_URL = 'https://2e.aonprd.com';

// Group monsters by source book
const monstersBySource = {};

sourceData.forEach(monster => {
  // Extract the source book name (everything before " pg.")
  const sourceMatch = monster.source.match(/^([^p]+?)(?:\s+pg\.|\s*<sup>)/);
  const sourceName = sourceMatch ? sourceMatch[1].trim() : 'Unknown';

  if (!monstersBySource[sourceName]) {
    monstersBySource[sourceName] = [];
  }

  // Extract HP value - take only the numeric part
  const hpMatch = monster.hp.match(/^(\d+)/);
  const hp = hpMatch ? parseInt(hpMatch[1], 10) : 1;

  // Create monster entry with HP and URL
  monstersBySource[sourceName].push({
    name: monster.name,
    hp: hp,
    url: BASE_URL + monster.url
  });
});

// Sort sources by number of monsters (descending)
const sortedSources = Object.entries(monstersBySource)
  .sort((a, b) => b[1].length - a[1].length);

console.log('\nMonsters grouped by source:');
sortedSources.forEach(([source, monsters]) => {
  console.log(`  ${source}: ${monsters.length} monsters`);
});

// Generate output files for major sources
const OUTPUT_DIR = path.join(__dirname, '../src/data/pathfinder');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Helper to create a safe filename
function createSafeFilename(sourceName) {
  return sourceName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

// Helper to create a safe ID
function createSafeId(sourceName) {
  return sourceName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .replace(/-+/g, '-');
}

// Generate files for all sources (changed from 10 to 1)
const MIN_MONSTERS = 1;
let filesCreated = 0;

sortedSources.forEach(([sourceName, monsters]) => {
  if (monsters.length >= MIN_MONSTERS) {
    const filename = createSafeFilename(sourceName) + '.json';
    const filepath = path.join(OUTPUT_DIR, filename);
    const id = createSafeId(sourceName);

    // Sort monsters alphabetically
    monsters.sort((a, b) => a.name.localeCompare(b.name));

    const output = {
      id: id,
      name: sourceName,
      system: 'pathfinder',
      enabledByDefault: false,
      monsters: monsters
    };

    fs.writeFileSync(filepath, JSON.stringify(output, null, 2));
    console.log(`Created: ${filename} (${monsters.length} monsters)`);
    filesCreated++;
  }
});

console.log(`\n✓ Created ${filesCreated} JSON files in ${OUTPUT_DIR}`);
console.log(`\nSkipped ${sortedSources.length - filesCreated} sources with fewer than ${MIN_MONSTERS} monsters`);

// List skipped sources
console.log('\nSkipped sources:');
sortedSources
  .filter(([_, monsters]) => monsters.length < MIN_MONSTERS)
  .forEach(([source, monsters]) => {
    console.log(`  ${source}: ${monsters.length} monsters`);
  });
