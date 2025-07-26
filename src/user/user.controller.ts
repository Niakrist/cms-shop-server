import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthDto } from 'src/auth/auth.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('id/:id')
  async getById(@Param('id') id: string) {
    return this.userService.getById(id);
  }
  @Get('email/:email')
  async getByEmail(@Param('email') email: string) {
    return this.userService.getByEmail(email);
  }
  @Get()
  async getAll() {
    return this.userService.getAll();
  }

  @Post()
  async create(@Body() dto: AuthDto) {
    return this.userService.create(dto);
  }
}
