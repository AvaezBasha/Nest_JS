import { DatabaseService } from 'src/database/database.service';
import { Users } from './users.interface';
export declare class UsersService {
    private readonly databaseService;
    constructor(databaseService: DatabaseService);
    findAll(): Promise<any>;
    create(user: Users): Promise<any>;
    findId(id: string): Promise<any>;
    update(id: string, user: {
        username: string;
        email: string;
        password: string;
        is_active: boolean;
    }): Promise<any>;
    delete(id: string): Promise<any>;
}
