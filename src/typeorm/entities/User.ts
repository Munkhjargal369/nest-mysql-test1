import { Column, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { Profile } from './Profile';
import { Post } from './Post';
@Entity({name : 'users'})
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username:string;
    
    @Column()
    password: string;

    @Column()
    createdAt: Date;

    @Column({nullable : true})
    authStrategy: string

    
    @OneToOne(() => Profile)
    @JoinColumn()
    profile: Profile;

   @OneToMany(() => Post, (post) => post.user)
   posts: Post[];
}