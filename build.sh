#!/usr/bin/env bash

# Installing Packages
npm install

# Format and lint
echo '🏗️👷 Styling, testing and building your project'
if [[ -z "${CI}" ]]; then
  echo "Formatting using Prettier"
  npm run format
fi

# Check Prettier standards
npm run check-format
if [ $? -ne 0 ]; then
  echo '🤢🤮🤢🤮 Your styling looks disgusting. 🤢🤮🤢🤮' 
  echo 'Prettier Check Failed. Run npm run format, add changes and try commit again.'
  exit 1
fi

# Check ESLint Standards
npm run check-lint
if [ $? -ne 0 ]; then
  echo '😤🏀👋😤 Get that linting out of here! 😤🏀👋😤' 
  echo 'ESLint Check Failed. Make the required changes listed above, add changes and try to commit again.'
  exit 1
fi

# Run Tests
# TODO: Run tests 

# Check ESLint Standards
npm run build
if [ $? -ne 0 ]; then
  echo '❌👷🔨❌ Build failed ❌👷🔨❌' 
  echo 'Next build failed: View the errors above to see why.'
  exit 1
fi

echo '✅✅✅✅'

