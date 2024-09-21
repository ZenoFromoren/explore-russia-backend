import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { FindManyOptions, FindOneOptions, Not, Repository } from 'typeorm';
import { CreateUserDTO } from './dto/createUser.dto';
import { UpdateUserDTO } from './dto/updateUser.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAll() {
    const users = this.userRepository.find();

    if (!users) {
      throw new NotFoundException('Пользователь не найден');
    }

    return users;
  }

  async create(createUserDTO: CreateUserDTO) {
    const { username, email, password } = createUserDTO;

    const isUserExist = await this.userRepository
      .findOne({
        where: [{ username }, { email }],
      })
      .then((res) => res);

    if (isUserExist) {
      throw new ConflictException(
        'Данный адрес электронной почты уже зарегистрирован',
      );
    }

    const hash = await bcrypt.hash(password, 10);

    const user = this.userRepository.create({
      ...createUserDTO,
      password: hash,
    });

    return this.userRepository.save(user);
  }

  async findOne(query: FindOneOptions) {
    const user = await this.userRepository.findOne(query);

    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }

    return user;
  }

  async findMany(query: FindManyOptions) {
    const users = await this.userRepository.find(query);

    if (!users.length) {
      throw new NotFoundException('Пользователи не найдены');
    }

    return users;
  }

  async findUserById(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }

    return user;
  }

  async updateProfileData(id: number, updateUserDTO: UpdateUserDTO) {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new UnauthorizedException('Пользователь не авторизован');
    }

    if (updateUserDTO.password) {
      updateUserDTO.password = await bcrypt.hash(updateUserDTO.password, 10);
    }

    return await this.userRepository.update({ id }, updateUserDTO);
  }

  async checkUserExist(email: string) {
    const user = await this.userRepository.findOne({
      where: { email },
    });

    if (user) {
      throw new ConflictException(
        'Данный адрес электронной почты уже зарегистрирован',
      );
    }

    return !!user;
  }
}
