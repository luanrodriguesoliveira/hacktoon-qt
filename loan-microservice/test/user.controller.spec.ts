import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from 'src/service/user.service';
import { CreateUserDto } from 'src/dto/user/create-user-dto';
import { UserController } from 'src/controller/user.controller';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            createUser: jest.fn().mockResolvedValue({}),
            getUserById: jest.fn().mockResolvedValue({}),
            updateUser: jest.fn().mockResolvedValue({}),
            deleteUser: jest.fn().mockResolvedValue({}),
          },
        },
      ],
    }).compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
  });

  it('should create a user', async () => {
    const dto: CreateUserDto = new CreateUserDto();
    expect(await userController.createUser(dto)).toEqual(JSON.stringify({}));
  });

  it('should return a user by id', async () => {
    const id = '1';
    expect(await userController.getUser(id)).toEqual(JSON.stringify({}));
  });

  it('should update a user', async () => {
    const id = '1';
    const dto: CreateUserDto = new CreateUserDto();
    expect(await userController.updateUser(id, dto)).toEqual(
      JSON.stringify({}),
    );
  });

  it('should delete a user', async () => {
    const id = '1';
    expect(await userController.deleteUser(id)).toEqual(
      `User with ID ${id} has been deleted`,
    );
  });
});
