import { ApiProperty } from '@nestjs/swagger/dist'
import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from 'sequelize-typescript'
import { User } from 'src/users/users.model'
import { Card } from '../card/card.model'


@Table({ tableName: 'columnCards' })
export class ColumnCards extends Model<ColumnCards> {
    @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number

    @ApiProperty({ example: 'Хранилище задач', description: 'Название колонки' })
    @Column({ type: DataType.STRING, allowNull: false })
    title: string

    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER })
    user_id: number
    @BelongsTo(() => User)
    author: User

    @HasMany(() => Card)
    cards: Card[]
}