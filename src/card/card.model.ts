import { ApiProperty } from '@nestjs/swagger/dist'
import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from 'sequelize-typescript'
import { ColumnCards } from '../column-cards/column-cards.model'
import { Comment } from '../model/comment.model'


@Table({ tableName: 'card' })
export class Card extends Model<Card> {
    @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number

    @ApiProperty({ example: 'Сама задача', description: 'Что нужно сделать' })
    @Column({ type: DataType.STRING, allowNull: false })
    content: string

    @ForeignKey(() => ColumnCards)
    @Column({ type: DataType.INTEGER })
    colum_cards_id: number
    @BelongsTo(() => ColumnCards)
    column_cards: ColumnCards

    @HasMany(() => Comment)
    comments: Comment[]
}