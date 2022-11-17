npm install sqlite3 --build-from-source --target_arch=arm64 --fallback-to-build
npm rebuildnpm inst

curl -X POST http://localhost:3001/ -H 'Accept: application/json' -d '{"email": "sally@email.com", "password": "sillypassword"}'
