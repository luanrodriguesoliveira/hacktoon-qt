import {
  Body,
  Controller,
  Inject,
  Param,
  Post,
  Get,
  Put,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CreateUserDto } from 'src/dto/user/create-user-dto';
import { UserService } from 'src/service/user.service';

@Controller('users')
export class UserController {
  constructor(@Inject(UserService) private userService: UserService) {}

  @Post()
  async createUser(@Body() body: CreateUserDto): Promise<string> {
    try {
      const user = this.userService.createUser(body);
      return JSON.stringify(user);
    } catch (error) {
      throw new HttpException(
        'Error creating the user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  @Get(':id')
  async getUser(@Param('id') id: string): Promise<string> {
    try {
      const user = await this.userService.getUserById(id);
      return JSON.stringify(user);
    } catch (error) {
      throw new HttpException(
        'Error getting the user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() body: CreateUserDto,
  ): Promise<string> {
    try {
      const user = await this.userService.updateUser(body, id);
      return JSON.stringify(user);
    } catch (error) {
      throw new HttpException(
        'Error updating the user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<string> {
    try {
      await this.userService.deleteUser(id);
      return `User with ID ${id} has been deleted`;
    } catch (error) {
      throw new HttpException(
        'Error deleting the user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
