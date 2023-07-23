import { Controller, Get, Post,Put, Body, ParseIntPipe, Delete , Param} from '@nestjs/common';
import { CreateUserDto } from 'src/dto/CreateUser.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from 'src/dto/UpdateUse.dto';
import { CreateUserProfileDto } from 'src/dto/CreateUserProfile.dto';
import { CreateUserPostDto } from 'src/dto/CreateUserPost.dto';

@Controller('users')
export class UsersController {

    constructor(private userService: UsersService) {}

    @Get()
    async getUsers() {
        /*
        const users = await this.userService.findUsers();
        return users
        */
       return this.userService.findUsers();
    }

    @Post('create')
    createUser(@Body() createUser: CreateUserDto) {
        return this.userService.createUser(createUser)
    }

    @Put(':id')
    async updateUserById(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateUser: UpdateUserDto){
        return await this.userService.updateUser(id , updateUser);
    };

    @Delete(':id')
    async deleteUserById(@Param('id', ParseIntPipe) id:number){
        return await this.userService.deleteUser(id)
    };

    @Post(':id/profile')
    createUserProfileById(
        @Param('id',ParseIntPipe) id:number,
        @Body() createUserProfileDto: CreateUserProfileDto) {
        return this.userService.createUserProfile(id, createUserProfileDto);
    }

    @Post(':id/posts')
    createUserPost(
        @Param('id', ParseIntPipe) id: number,
        @Body() createUserPostDto: CreateUserPostDto,){
        return this.userService.createUserPost(id, createUserPostDto);
    }

}
