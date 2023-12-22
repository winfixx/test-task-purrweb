import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards, UsePipes } from '@nestjs/common'
import { ColumnCardsService } from './column-cards.service'
import { CreateColumnCards } from './dto/create-column-cards.dto'
import { AvailabilityTitlePipe } from './availability-title.pipe'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'

@Controller('column-cards')
@UseGuards(JwtAuthGuard)
export class ColumnCardsController {

    constructor(
        private readonly columnCardsService: ColumnCardsService
    ) { }

    @Post()
    @UsePipes(AvailabilityTitlePipe)
    createColumnCards(
        @Body() createColumnCards: CreateColumnCards
    ) {
        const columnCards = this.columnCardsService.createColumnCards(createColumnCards)
        return columnCards
    }

    @Patch()
    @UsePipes(AvailabilityTitlePipe)
    changeTitleColumnCards(
        @Body() createColumnCards: CreateColumnCards & { column_cards_id: number }
    ) {
        const columnCards = this.columnCardsService.changeTitleColumnCards(createColumnCards)
        return columnCards
    }

    @Get(':column_cards_id')
    getColumnCards(
        @Param('column_cards_id', ParseIntPipe) column_cards_id: number,
    ) {
        const columnCards = this.columnCardsService.getColumnCards(column_cards_id)
        return columnCards
    }

    @Delete(':title')
    @UsePipes(AvailabilityTitlePipe)
    deleteColumnCards(
        @Param('title') title: CreateColumnCards['title'],
        @Query('user_id', ParseIntPipe) user_id: CreateColumnCards['user_id']
    ) {
        const columnCards = this.columnCardsService.deleteColumnCards({ title, user_id })
        return columnCards
    }
}
