import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/User';
import { CreateUserParams, UpdateUserParams, CreateUserProfileParams } from 'src/utils/types';
import { Repository } from 'typeorm';
import { Profile } from 'src/typeorm/entities/Profile';
import { CreateUserPostDto } from 'src/dto/CreateUserPost.dto';
import { Post } from 'src/typeorm/entities/Post';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(Profile) private profileRepository: Repository<Profile>,
        @InjectRepository(Post) private postResposity: Repository<Post>,
    ) {}

    findUsers() {
        return this.userRepository.find();
    }

    createUser(createUser: CreateUserParams) {
        const newUser = this.userRepository.create({
            ...createUser,
            createdAt: new Date(),
        });
        return this.userRepository.save(newUser);
    }

    updateUser(id: number, updateUser: UpdateUserParams) {
        return this.userRepository.update({ id }, { ...updateUser });
    }

    deleteUser(id: number) {
        return this.userRepository.delete({ id });
    }

    async createUserProfile(
      id: number,
      createUserProfileDetails: CreateUserProfileParams,
    ) {
      const user = await this.userRepository.findOne({ where: { id } });
      console.log(user);
      if (!user) {
        throw new HttpException(
          'User not found. Cannot create Profile',
          HttpStatus.BAD_REQUEST,
        );
      }
    
      const newProfile = this.profileRepository.create(createUserProfileDetails);
      console.log(newProfile);
      const savedProfile = await this.profileRepository.save(newProfile);
      console.log(savedProfile);
      user.profile = savedProfile;
      
      return this.userRepository.save(user);
    }
    
    async createUserPost(
        id: number,
        createUserPostDto : CreateUserPostDto,
    ){
        const user = await this.userRepository.findOneBy({id});
        if (!user){
          throw new HttpException(
            'User not found. Cannot create Profile',
            HttpStatus.BAD_REQUEST,
          );
        }
        const newPost = this.postResposity.create({...createUserPostDto, user});
        return this.postResposity.save(newPost);
    }
}
