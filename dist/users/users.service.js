"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../database/database.service");
let UsersService = class UsersService {
    databaseService;
    constructor(databaseService) {
        this.databaseService = databaseService;
    }
    async findAll() {
        const result = await this.databaseService.query('SELECT * FROM users');
        return result.map(({ password, ...rest }) => rest);
    }
    async create(user) {
        if (!user.username || !user.email || !user.password) {
            throw new common_1.BadRequestException('Username, email, and password are required');
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
    async findId(id) {
        const result = await this.databaseService.query('SELET * FROM users WHERE id = $1', [id]);
        return result.map(({ password, ...rest }) => rest);
    }
    async update(id, user) {
        console.log(user);
        if (!user.username ||
            !user.email ||
            !user.password ||
            typeof user.is_active !== 'boolean') {
            throw new common_1.BadRequestException('Username, email, password and is_active are required');
        }
        const query = 'UPDATE users SET username = $1, email = $2, password = $3, updated_at = $4, is_active = $5 WHERE id = $6 RETURNING id, username, email, created_at, updated_at, is_active';
        const result = await this.databaseService.query(query, [
            user.username,
            user.email,
            user.password,
            new Date().toISOString(),
            user.is_active,
            id,
        ]);
        if (result.length === 0) {
            throw new common_1.NotFoundException(`User with ID ${id} not found`);
        }
        return result;
    }
    async delete(id) {
        const result = await this.databaseService.query('DELETE FROM users WHERE id = $1 returning *', [id]);
        if (result.length === 0) {
            throw new common_1.NotFoundException(`Username is already deleted ${id}`);
        }
        return result;
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], UsersService);
//# sourceMappingURL=users.service.js.map