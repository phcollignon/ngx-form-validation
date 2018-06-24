import { ValidationModule } from './validation.module';

describe('ValidationModule', () => {
  let validationModule: ValidationModule;

  beforeEach(() => {
    validationModule = new ValidationModule();
  });

  it('should create an instance', () => {
    expect(validationModule).toBeTruthy();
  });
});
