# Dependencies
- `gsutil` (`4.49` or newer)
- `nvm` (`v0.35.2`)

# Development
## Dependencies
1. Configure the desired node version by running `nvm use`. (if first time, run `nvm install`)
2. Install all dependencies by running `npm install`. (note: not `yarn`)
3. Update translations by running `hack/update-translations.sh` (you might want to do this once in a while)

## Run application
```
# Storybook
npm run storybook

# Development build
npm run dev

# Production build
npm run build
npm run start
```

```
# Run all tests
npm run test:jest

# Run in watch mode
npm run test:jest -- --watch

# Run in watch mode + notifiy
npm run test:jest -- --watch --notify
```
