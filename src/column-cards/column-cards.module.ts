import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { AuthModule } from 'src/auth/auth.module'
import { Card } from 'src/card/card.model'
import { ColumnCardsController } from './column-cards.controller'
import { ColumnCards } from './column-cards.model'
import { ColumnCardsService } from './column-cards.service'

@Module({
  imports: [
    SequelizeModule.forFeature([
      ColumnCards, Card
    ]),
    AuthModule
  ],
  controllers: [ColumnCardsController],
  providers: [ColumnCardsService],
  exports: [ColumnCardsService]
})
export class ColumnCardsModule {}
