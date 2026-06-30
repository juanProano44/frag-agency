const { execSync } = require('child_process');
const path = require('path');

try {
  console.log('Building fragui library...');
  execSync('npm run build --workspace fragui', {
    stdio: 'inherit',
    cwd: path.resolve(__dirname, '..'),
  });
  console.log('fragui library built successfully.');
} catch (error) {
  console.error('Error building fragui library:', error.message);
  process.exit(1);
}
