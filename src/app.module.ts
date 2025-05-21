import { Module } from '@nestjs/common';
import { DatabaseService } from './database/database.service';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [DatabaseModule, UsersModule],
  providers: [DatabaseService],
})
export class AppModule {}
