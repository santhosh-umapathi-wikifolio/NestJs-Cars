import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users.service';
import { User } from '../users.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';


describe('AuthService', () => {
  let service: AuthService;

  const mockUserService: Partial<UsersService> = {
    find: () => Promise.resolve([]),
    createUser: (email: string, password: string) => Promise.resolve({ id: 1, email, password } as User),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, { provide: UsersService, useValue: mockUserService }],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new user with hashed password', async () => {
    const user = await service.signup('test@test.com', 'password123');
    expect(user.password).not.toEqual('password123');
    const [salt, hash] = user.password.split('.');
    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
  });

  it('should throw an error if email is already in use', async () => {
    jest.spyOn(mockUserService, 'find').mockResolvedValueOnce([{ id: 1, email: 'test@test.com', password: 'hashedpassword' } as User]);
    await expect(service.signup('test@test.com', 'password123')).rejects.toThrow(BadRequestException);
  });

  it('should throw an error if signin with unused email', async () => {
    await expect(service.signin('unused@test.com', 'password123')).rejects.toThrow(NotFoundException);
  });

  it('should throw an error if signin with invalid password', async () => {
    jest.spyOn(mockUserService, 'find').mockResolvedValueOnce([{ id: 1, email: 'test@test.com', password: 'hashedpassword' } as User]);
    await expect(service.signin('test@test.com', 'wrongpassword')).rejects.toThrow(BadRequestException);
  });

  it('should signin successfully with correct credentials', async () => {
    const password = 'password123';
    const user = await service.signup('valid@test.com', password);
    jest.spyOn(mockUserService, 'find').mockResolvedValueOnce([user]);
    const signedInUser = await service.signin('valid@test.com', password);
    expect(signedInUser).toBeDefined();
    expect(signedInUser.email).toEqual('valid@test.com');
    expect(signedInUser.password).toEqual(user.password);
  });

  it('should throw an error if email is already in use', async () => {
    jest.spyOn(mockUserService, 'find').mockResolvedValueOnce([{ id: 1, email: 'test@test.com', password: 'hashedpassword' } as User]);
    await expect(service.signup('test@test.com', 'password123')).rejects.toThrow(BadRequestException);
  });
});