import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

const users: User[] = [];

@Injectable()
export class UsersService {
  create(newUser: CreateUserDto) {
    const user: User = { id: uuidv4(), ...newUser };
    users.push(user);
    return user;
  }

  findAll() {
    return users;
  }

  findOne(id: string) {
    const user = users.find((user) => user.id === id);
    if (!user) throw new NotFoundException(`User with id ${id} not found`);
    return user;
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    const index = users.findIndex((user) => user.id === id);
    if (index === -1)
      throw new NotFoundException(`User with id ${id} not found`);

    users[index] = { ...users[index], ...updateUserDto };
    return users[index];
  }

  remove(id: string) {
    const index = users.findIndex((user) => user.id === id);
    if (index === -1)
      throw new NotFoundException(`User with id ${id} not found`);

    const deletedUser = users.splice(index, 1);
    return { message: 'User deleted successfully', user: deletedUser[0] };
  }
}
