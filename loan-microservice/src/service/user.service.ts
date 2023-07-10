import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { Repository } from 'typeorm';
import { User } from 'src/entity/user.entity';
import { CreateUserDto } from 'src/dto/user/create-user-dto';
import { UpdateUserDto } from 'src/dto/user/update-user-dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async createUser(data: CreateUserDto): Promise<User> {
    const userToBeSaved = { ...data };

    const user = await this.userRepository.save(
      plainToInstance(User, userToBeSaved),
    );

    return user;
  }

  async getUserById(id: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }

  async updateUser(data: UpdateUserDto, id: string): Promise<User> {
    const oldUser = await this.userRepository.findOne({
      where: { id },
    });

    if (!oldUser) {
      throw new Error('User not found');
    }

    await this.userRepository.update({ id }, data);

    const user = await this.userRepository.findOne({
      where: { id },
    });

    return user;
  }

  async deleteUser(id: string): Promise<void> {
    const person = await this.userRepository.findOne({ where: { id } });
    if (!person) {
      throw new Error('User not found');
    }

    await this.userRepository.delete(id);
  }
}
