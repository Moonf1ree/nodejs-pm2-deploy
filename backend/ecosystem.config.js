const fs = require('fs');
const path = require('path');

const loadDeployEnv = () => {
  const envPath = path.resolve(__dirname, '.env.deploy');

  if (!fs.existsSync(envPath)) {
    return;
  }

  const file = fs.readFileSync(envPath, 'utf8');
  file
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith('#'))
    .forEach((line) => {
      const separatorIndex = line.indexOf('=');

      if (separatorIndex === -1) {
        return;
      }

      const key = line.slice(0, separatorIndex).trim();
      const value = line.slice(separatorIndex + 1).trim();

      if (!process.env[key]) {
        process.env[key] = value;
      }
    });
};

loadDeployEnv();

const {
  DEPLOY_REPOSITORY,
  DEPLOY_HOST,
  DEPLOY_USER,
  DEPLOY_PATH,
  DEPLOY_REF = 'origin/main',
  SSH_KEY_PATH,
} = process.env;

module.exports = {
  apps: [
    {
      name: 'mesto-backend',
      script: 'dist/app.js',
      autorestart: true,
      watch: false,
      max_memory_restart: '300M',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
  deploy: {
    production: {
      user: DEPLOY_USER,
      host: DEPLOY_HOST,
      ref: DEPLOY_REF,
      repo: DEPLOY_REPOSITORY,
      path: DEPLOY_PATH,
      key: SSH_KEY_PATH,
      'pre-deploy-local': 'bash ./scripts/deployEnv.sh "${DEPLOY_USER}@${DEPLOY_HOST}" "${DEPLOY_PATH}"',
      'post-deploy': 'npm ci && npm run build && cp ../../shared/.env .env && pm2 startOrRestart ecosystem.config.js --env production --only mesto-backend',
    },
  },
};
