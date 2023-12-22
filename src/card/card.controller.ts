import { Body, Controller, Delete, Param, ParseIntPipe, Post, Query } from '@nestjs/common'
import { CardService } from './card.service'
import { CreateCardDto } from './dto/card.dto'

@Controller('card')
export class CardController {

    constructor(
        private readonly cardService: CardService
    ) { }

    @Post()
    createCard(
        @Body() createCardDto: CreateCardDto
    ) {
        const columnCards = this.cardService.createCard(createCardDto)
        return columnCards
    }

    @Delete(':id')
    deleteColumnCards(
        @Param('id') card_id: number,
        @Query('user_id', ParseIntPipe) user_id: CreateCardDto['user_id'],
        @Query('column_id', ParseIntPipe) column_id: CreateCardDto['column_id']
    ) {
        const columnCards = this.cardService.deleteColumnCards({ id: card_id, user_id, column_id })
        return columnCards
    }

    // @Patch()
    // changeTitleColumnCards(
    //     @Body() createColumnCards: CreateColumnCards & { newTitle: string }
    // ) {
    //     const columnCards = this.columnCardsService.changeTitleColumnCards(createColumnCards)
    //     return columnCards
    // }

    // @Get(':title')
    // getColumnCards(
    //     @Param('title') title: CreateColumnCards['title'],
    // ) {
    //     const columnCards = this.columnCardsService.getColumnCards({ title })
    //     return columnCards
    // }

}
