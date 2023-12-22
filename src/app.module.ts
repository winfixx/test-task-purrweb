import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { SequelizeModule } from '@nestjs/sequelize'
import { getSequelizeConfig } from './sequelize.config'
import { UsersModule } from './users/users.module'
import { AuthModule } from './auth/auth.module'
import { ColumnCardsModule } from './column-cards/column-cards.module';
import { CardModule } from './card/card.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env'
    }),
    SequelizeModule.forRootAsync({
      inject: [ConfigService],
      useFactory: getSequelizeConfig
    }),
    UsersModule,
    AuthModule,
    ColumnCardsModule,
    CardModule
  ]
})
export class AppModule { }
