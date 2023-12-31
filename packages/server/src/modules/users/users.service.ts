import { Injectable } from '@nestjs/common';
import { CreateUserDataDTO } from './dtos/create-user.dto';
import { FindOneUserDataDTO } from './dtos/find-one-user.dto';
import { FindByEmailUserDataDTO } from './dtos/find-by-email-user.dto';
import { UserRepository } from './users.repository';
import { UpdateUserDataDTO } from './dtos/update-user.dto';
import { FindUserDataDTO } from './dtos/find-user.dto';
import { DeleteUserDataDTO } from './dtos/delete-user.dto';

@Injectable()
export class UsersService {
  constructor(private userRepository: UserRepository) {}

  async create(data: CreateUserDataDTO) {
    const { name, email, password } = data;
    return this.userRepository.create(name, email, password);
  }
  async findOne(data: FindOneUserDataDTO) {
    const { id } = data;
    return this.userRepository.findOne(id);
  }

  async findByEmail(data: FindByEmailUserDataDTO) {
    const { email } = data;
    return this.userRepository.findByEmail(email);
  }

  async findAll(data: FindUserDataDTO) {
    const { email, name } = data;
    return this.userRepository.findAll(email, name);
  }

  async update(data: UpdateUserDataDTO) {
    const { email, id, name } = data;
    return this.userRepository.update(id, name, email);
  }

  async delete(data: DeleteUserDataDTO) {
    const { id } = data;
    this.userRepository.delete(id);
  }
}
