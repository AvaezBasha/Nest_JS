import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { Users } from './users.interface';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post('create')
  async create(@Body() user: Users) {
    return this.userService.create(user);
  }

  @Get('findAll')
  async findAll() {
    return this.userService.findAll();
  }

  @Get('findId/:id')
  async findId(@Param('id') id: string) {
    return this.userService.findId(id);
  }

  @Post('update/:id')
  async update(
    @Param('id') id: string,
    @Body()
    user: {
      username: string;
      email: string;
      password: string;
      is_active: boolean;
    },
  ) {
    return this.userService.update(id, user);
  }

  @Post('delete/:id')
  async delete(@Param('id') id: string) {
    return this.userService.delete(id);
  }
}
