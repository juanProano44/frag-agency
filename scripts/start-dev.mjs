import { spawn } from 'node:child_process';

console.log('Frontend: http://localhost:5173');
console.log('Backend: http://localhost:8080/api');
console.log('Swagger: http://localhost:8080/frag-api-mailing');

const tasks = [
  { name: 'api', command: 'npm', args: ['run', 'dev:api'] },
  { name: 'web', command: 'npm', args: ['run', 'dev:web'] },
];

for (const task of tasks) {
  const child = spawn(task.command, task.args, {
    stdio: 'inherit',
    shell: true,
    env: process.env,
  });

  child.on('exit', (code) => {
    if (code && code !== 0) {
      console.error(`${task.name} exited with code ${code}`);
      process.exitCode = code;
    }
  });
}