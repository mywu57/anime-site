import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from '../repositories/user.repository';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all user`;
  }

  async findOne(id: number): Promise<User> {
    return await this.userRepository.findOne(id);
  }

  async findByUsername(username: string): Promise<User> {
    return await this.userRepository.findOne({ username: username })
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
