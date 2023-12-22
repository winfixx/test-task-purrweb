import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { Card } from 'src/card/card.model'
import { ColumnCards } from './column-cards.model'
import { CreateColumnCards } from './dto/create-column-cards.dto'

@Injectable()
export class ColumnCardsService {

    constructor(
        @InjectModel(ColumnCards) private readonly columnCardsRepository: typeof ColumnCards
    ) { }

    async createColumnCards(
        createColumnCards: CreateColumnCards
    ) {
        const columnCards = await this.columnCardsRepository.create({
            title: createColumnCards.title,
            user_id: createColumnCards.user_id
        })
        return columnCards
    }

    async deleteColumnCards(
        createColumnCards: CreateColumnCards
    ) {
        const columnCards = await this.findColumnCardsByTitle(createColumnCards.title)

        if (columnCards.user_id !== createColumnCards.user_id) throw new ForbiddenException('Вы не автор колонки')

        await columnCards.destroy()
        return columnCards
    }

    async changeTitleColumnCards(
        createColumnCards: CreateColumnCards & { column_cards_id: number }
    ) {
        const columnCards = await this.findColumnCardsById(createColumnCards.column_cards_id)

        if (columnCards.user_id !== createColumnCards.user_id) throw new ForbiddenException('Вы не автор колонки')

        await columnCards.update({
            title: createColumnCards.title
                ? createColumnCards.title
                : columnCards.title
        })
        return columnCards
    }

    async getColumnCards(
        column_cards_id: number
    ) {
        const columnCards = await this.columnCardsRepository.findByPk(
            column_cards_id,
            {
                include: {
                    model: Card
                }
            })

        if (!columnCards) throw new BadRequestException('Такой колонки не существует')

        return columnCards
    }

    async findColumnCardsById(
        column_cards_id: number
    ) {
        const columnCards = await this.columnCardsRepository.findByPk(column_cards_id)
        if (!columnCards) throw new BadRequestException('Такой колонки не существует')

        return columnCards
    }

    private async findColumnCardsByTitle(
        title: string
    ) {
        const columnCards = await this.columnCardsRepository.findOne({
            where: {
                title
            }
        })

        if (!columnCards) throw new BadRequestException('Такой колонки не существует')

        return columnCards
    }
}
