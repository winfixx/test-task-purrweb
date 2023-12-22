import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { Card } from 'src/card/card.model'
import { ColumnCards } from 'src/column-cards/column-cards.model'
import { CardController } from './card.controller'
import { CardService } from './card.service'
import { ColumnCardsModule } from 'src/column-cards/column-cards.module'

@Module({
  imports: [
    SequelizeModule.forFeature([
      Card, ColumnCards
    ]),
    ColumnCardsModule
  ],
  controllers: [CardController],
  providers: [CardService]
})
export class CardModule { }
