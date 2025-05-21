import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Users } from './users.interface'; 

@Injectable()
export class UsersService {
  constructor(private readonly databaseService: DatabaseService) {}

  async findAll() {
    const result = await this.databaseService.query('SELECT * FROM users');
    return result.map(({ password, ...rest }) => rest);
  }

  async create(user: Users) {
    if (!user.username || !user.email || !user.password) {
      throw new BadRequestException(
        'Username, email, and password are required',
      );
    }
    const query = `INSERT INTO users (id,username,email,password,created_at,updated_at,is_active) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *`;
    const result = await this.databaseService.query(query, [
      crypto.randomUUID(),
      user.username,
      user.email,
      user.password,
      new Date().toISOString(),
      new Date().toISOString(),
      true,
    ]);
    return result.map(({ password, ...rest }) => rest);
  }

  async findId(id: string) {
    const result = await this.databaseService.query(
      'SELET * FROM users WHERE id = $1',
      [id],
    );
    return result.map(({ password, ...rest }) => rest);
  }

  async update(
    id: string,
    user: {
      username: string;
      email: string;
      password: string;
      is_active: boolean;
    },
  ) {
    console.log(user);
    if (
      !user.username ||
      !user.email ||
      !user.password ||
      typeof user.is_active !== 'boolean'
    ) {
      throw new BadRequestException(
        'Username, email, password and is_active are required',
      );
    }
    const query =
      'UPDATE users SET username = $1, email = $2, password = $3, updated_at = $4, is_active = $5 WHERE id = $6 RETURNING id, username, email, created_at, updated_at, is_active';

    const result = await this.databaseService.query(query, [
      user.username,
      user.email,
      user.password,
      new Date().toISOString(),
      user.is_active,
      id,
    ]);

    if (result.length === 0) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return result;
  }

  async delete(id: string) {
    const result = await this.databaseService.query(
      'DELETE FROM users WHERE id = $1 returning *',
      [id],
    );
    if (result.length === 0) {
      throw new NotFoundException(`Username is already deleted ${id}`);
    }
    return result;
  }
}
