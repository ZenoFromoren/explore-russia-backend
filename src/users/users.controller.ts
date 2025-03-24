import {
  Body,
  Controller,
  Get,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { UpdateUserDTO } from './dto/updateUser.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwtAuth.guard';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('all')
  async getAllUsers(): Promise<User[]> {
    return await this.usersService.findAll();
  }

  @Get('me')
  async getProfileData(@Req() req): Promise<User> {
    console.log(req)
    return await this.usersService.findUserById(req.user.id);
  }

  @Patch('me')
  async updateProfileData(@Req() req, @Body() updateUserDTO: UpdateUserDTO) {
    await this.usersService.updateProfileData(req.user.id, updateUserDTO);
    return await this.usersService.findUserById(req.user.id);
  }
}
