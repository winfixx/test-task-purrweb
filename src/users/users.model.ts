import { ApiProperty } from '@nestjs/swagger/dist'
import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript'
import { ColumnCards } from 'src/column-cards/column-cards.model'

export interface UserCreationAttrs {
    email: string
    password: string
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttrs> {
    @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number

    @ApiProperty({ example: 'test@test.test', description: 'Email' })
    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    email: string

    @ApiProperty({ example: '12345', description: 'Пароль' })
    @Column({ type: DataType.STRING, allowNull: false })
    password: string

    @HasMany(() => ColumnCards)
    columnCards: ColumnCards[]
}