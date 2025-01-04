import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

/**
 * UserEntity
 *
 * This class represents the `users` table in the database. It is a TypeORM entity
 * that defines the schema and mappings for user data, including columns for `id`, `name`, `email`, and `age`.
 */
@Entity({ name: 'users' }) // Maps this class to the 'users' table in the database
export class UserEntity {
    /**
     * User ID
     *
     * Represents the primary key of the `users` table. It is an auto-generated column
     * of type `bigint` that ensures unique, positive values.
     */
    @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true }) // Ensures positive, unique IDs
    id: number;

    /**
     * User Name
     *
     * Represents the name of the user. This column is mandatory and cannot be null.
     *
     * @example "John Doe"
     */
    @Column({ name: 'name', nullable: false }) // Maps to 'name' column, ensures it cannot be null
    name: string;

    /**
     * User Email
     *
     * Represents the email address of the user. This column is mandatory, must be unique,
     * and cannot be null.
     *
     * @example "johndoe@example.com"
     */
    @Column({ name: 'email', unique: true, nullable: false }) // Maps to 'email', ensures uniqueness and non-null values
    email: string;

    /**
     * User Age
     *
     * Represents the age of the user. This column is mandatory and cannot be null.
     *
     * @example 25
     */
    @Column({ name: 'age', nullable: false }) // Maps to 'age' column, ensures it cannot be null
    age: number;
}
