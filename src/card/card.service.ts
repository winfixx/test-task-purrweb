import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common'
import { CreateCardDto } from './dto/card.dto'
import { InjectModel } from '@nestjs/sequelize'
import { Card } from './card.model'
import { ColumnCardsService } from 'src/column-cards/column-cards.service'

@Injectable()
export class CardService {

    constructor(
        @InjectModel(Card) private readonly cardRepository: typeof Card,
        private readonly columnCardsService: ColumnCardsService
    ) { }

    async createCard(
        createCardDto: CreateCardDto
    ) {
        const columnCards = await this.resolveChangeColumn(createCardDto.column_id, createCardDto.user_id)

        const card = await this.cardRepository.create({
            content: createCardDto.content,
            colum_cards_id: columnCards.id
        })

        return card
    }

    async deleteColumnCards(
        createCardDto: Omit<CreateCardDto, 'content'>
    ) {
        const columnCards = await this.resolveChangeColumn(createCardDto.column_id, createCardDto.user_id)

        const card = await this.findCardById(createCardDto.id)

        await card.destroy()
        return card
    }

    private async resolveChangeColumn(
        column_id: number,
        user_id: number
    ) {
        const columnCards = await this.columnCardsService.findColumnCardsById(column_id)
        if (columnCards.user_id !== user_id) throw new ForbiddenException('Вы не автор колонки')

        return columnCards
    }

    private async findCardById(
        card_id: number
    ) {
        const card = await this.cardRepository.findByPk(card_id)
        if (!card) throw new BadRequestException('Такой карточки не существует')

        return card
    }
}
