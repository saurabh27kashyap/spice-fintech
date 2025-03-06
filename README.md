 Use --legacy-peer-deps (Recommended)
This flag allows npm to bypass strict dependency resolution.

Downgrade date-fns to a Compatible Version
Since react-day-picker@8.10.1 supports date-fns@^2.28.0 || ^3.0.0, downgrade date-fns to 3.0.0 or 2.28.0:


->npm install --legacy-peer-deps
->npm install date-fns@3.0.0

->npm install
->npm run dev
