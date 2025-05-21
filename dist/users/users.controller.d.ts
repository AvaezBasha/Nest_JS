import { UsersService } from './users.service';
import { Users } from './users.interface';
export declare class UsersController {
    private readonly userService;
    constructor(userService: UsersService);
    create(user: Users): Promise<any>;
    findAll(): Promise<any>;
    findId(id: string): Promise<any>;
    update(id: string, user: {
        username: string;
        email: string;
        password: string;
        is_active: boolean;
    }): Promise<any>;
    delete(id: string): Promise<any>;
}
