import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { AuthService } from './auth/auth.service';
import { UsersService } from './users.service';
import { User } from './users.entity';



describe('UsersController', () => {
  let controller: UsersController;

  const AuthServiceMock: Partial<AuthService> = {
    signup: jest.fn().mockResolvedValue({ id: 1, email: 'test@test.com' }),
    signin: jest.fn().mockResolvedValue({ id: 1, email: 'test@test.com' }),
  };

  const UsersServiceMock: Partial<UsersService> = {
    find: jest.fn().mockResolvedValue([]),
    findOne: jest.fn().mockResolvedValue({ id: 1, email: 'test@test.com' } as User),
    createUser: jest.fn().mockResolvedValue({ id: 1, email: 'test@test.com' }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        { provide: AuthService, useValue: AuthServiceMock },
        { provide: UsersService, useValue: UsersServiceMock },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('findAllUsers returns an array of users', async () => {
    jest.spyOn(UsersServiceMock, 'find').mockResolvedValueOnce([{ id: 1, email: 'test@test.com' } as User]);
    const users = await controller.findAllUsers('test@test.com');
    expect(users).toEqual([{ id: 1, email: 'test@test.com' } as User]);
  });

  it('findUser returns a single user', async () => {
    jest.spyOn(UsersServiceMock, 'findOne').mockResolvedValueOnce({ id: 1, email: 'test@test.com' } as User);
    const user = await controller.findUser('1');
    expect(user).toEqual({ id: 1, email: 'test@test.com' } as User);
  });

  it('signinUser sets session userId', async () => {
    const session = { userId: null };
    const user = await controller.signinUser({ email: 'test@test.com', password: 'password' }, session);
    expect(user).toEqual({ id: 1, email: 'test@test.com' });
    expect(session.userId).toEqual(1);
  });
});