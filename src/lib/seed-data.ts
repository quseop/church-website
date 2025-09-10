// No-op seed helper for local development. This previously referenced a local DataStore
// outside the repository, which breaks builds in CI/preview. Keeping the export to avoid
// import errors if referenced elsewhere.
export function seedInitialData() {
  // intentionally empty
}
