import { JwtAuthGuard } from './jwt-guard.guard';
import { JwtService } from '@nestjs/jwt';

describe('JwtAuthGuard', () => {
  let jwtService: JwtService;
  let guard: JwtAuthGuard;

  beforeEach(() => {
    jwtService = new JwtService({});
    guard = new JwtAuthGuard(jwtService);
  });

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });
});
