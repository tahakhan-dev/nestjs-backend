import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'users' })
export class UserEntity {
    @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true }) // unsigned option set to true, which ensures that the generated values are always positive
    id: number;

    @Column({ name: 'name', nullable: false })
    name: string;

    @Column({ name: 'email', unique: true, nullable: false })
    email: string;

    @Column({ name: 'age', nullable: false })
    age: number;
}
