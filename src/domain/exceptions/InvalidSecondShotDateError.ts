export class InvalidSecondShotDateError extends Error {
  constructor() {
    super(`date must be prior to today [${new Date().toLocaleDateString()}]`);
  }
}
