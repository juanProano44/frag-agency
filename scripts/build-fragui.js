const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const rootDir = path.join(__dirname, '..');
const fraguiDir = path.join(rootDir, 'FragUI');
const tempDir = path.join(rootDir, '.fragui-temp');

console.log('--- Construyendo FragUI en directorio temporal para evitar modificar submódulo ---');

// 1. Limpiar directorio temporal si existe
if (fs.existsSync(tempDir)) {
  fs.rmSync(tempDir, { recursive: true, force: true });
}

// 2. Copiar FragUI a tempDir
console.log('Copiando archivos fuente a .fragui-temp...');
fs.cpSync(fraguiDir, tempDir, { 
  recursive: true, 
  filter: (src) => !src.includes('node_modules') && !src.includes('.git') && !src.includes('dist')
});

// 3. Corregir tsconfig.json en tempDir (eliminar ignoreDeprecations)
console.log('Corrigiendo tsconfig.json...');
const tsconfigPath = path.join(tempDir, 'tsconfig.json');
if (fs.existsSync(tsconfigPath)) {
  const tsconfigContent = fs.readFileSync(tsconfigPath, 'utf8');
  try {
    const tsconfig = JSON.parse(tsconfigContent);
    if (tsconfig.compilerOptions && tsconfig.compilerOptions.ignoreDeprecations) {
      delete tsconfig.compilerOptions.ignoreDeprecations;
      fs.writeFileSync(tsconfigPath, JSON.stringify(tsconfig, null, 2));
      console.log('ignoreDeprecations eliminado correctamente.');
    }
  } catch (e) {
    console.error('Error parseando tsconfig.json', e);
  }
}

// 4. Ejecutar tsup en el directorio temporal
console.log('Ejecutando tsup...');
try {
  execSync('npx tsup', { cwd: tempDir, stdio: 'inherit' });
} catch (error) {
  console.error('Error al ejecutar tsup en FragUI:', error);
  process.exit(1);
}

// 5. Mover dist compilado al FragUI original
console.log('Copiando dist generado de vuelta a FragUI/dist...');
const distSource = path.join(tempDir, 'dist');
const distTarget = path.join(fraguiDir, 'dist');
if (fs.existsSync(distTarget)) {
  fs.rmSync(distTarget, { recursive: true, force: true });
}
if (fs.existsSync(distSource)) {
  fs.cpSync(distSource, distTarget, { recursive: true });
}

// 6. Limpieza
console.log('Limpiando directorio temporal...');
fs.rmSync(tempDir, { recursive: true, force: true });

console.log('--- Compilación de FragUI completada exitosamente ---');
