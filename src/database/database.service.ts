import { Injectable, OnModuleInit } from '@nestjs/common';
import { Pool } from 'pg';
import * as dotenv from 'dotenv';

dotenv.config();
@Injectable()
export class DatabaseService{
  private pool: Pool;
  constructor() {
    this.pool = new Pool({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
    });
  }

  async query(text: string, params: any[]=[]): Promise<any> {
    try{
        const result = await this.pool.query(text,params);
        return result.rows;
    }catch(error){
        console.log('Query error:', error)
        return error;
    }
  }
}
