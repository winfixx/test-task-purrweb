import { ApiProperty } from '@nestjs/swagger/dist'
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript'
import { Card } from '../card/card.model'


@Table({ tableName: 'comment' })
export class Comment extends Model<Comment> {
    @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number

    @ApiProperty({ example: 'Отличная задача', description: 'Комментарий к карточке' })
    @Column({ type: DataType.STRING, allowNull: false })
    content: string

    @ForeignKey(() => Card)
    @Column({ type: DataType.INTEGER })
    card_id: number
    @BelongsTo(() => Card)
    card: Card
}