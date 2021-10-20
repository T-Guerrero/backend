export class UnauthorizedError extends Error {
  constructor(roles: string[]) {
    super(`roles '${roles.join(', ')}' don't have enough permission`);
  }
}
