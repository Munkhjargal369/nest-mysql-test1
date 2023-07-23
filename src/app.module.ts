import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './typeorm/entities/User';
import { UsersModule } from './users/users.module';
import { Profile } from './typeorm/entities/Profile';
import { Post } from './typeorm/entities/Post';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306, // Replace with your MySQL port if different
      username: 'root',
      password: '80354204',
      database: 'test2',
      entities: [User, Profile, Post],

      //autoLoadEntities: true, // Set this to true if you have entities to load automatically
      synchronize: true, // Set this to true for development (auto-creates tables), but false for production
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
