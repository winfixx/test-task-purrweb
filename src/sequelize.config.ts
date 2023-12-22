import { ConfigService } from '@nestjs/config'
import { SequelizeModuleOptions } from '@nestjs/sequelize'
import { Card } from './card/card.model'
import { ColumnCards } from './column-cards/column-cards.model'
import { Comment } from './model/comment.model'
import { User } from './users/users.model'

export const getSequelizeConfig = async (
    config: ConfigService
): Promise<SequelizeModuleOptions> => {
    const host = config.get<string>('POSTGRES_HOST')
    const port = +config.get<string>('POSTGRES_PORT')
    const username = config.get<string>('POSTGRES_USER')
    const password = config.get<string>('POSTGRES_PASSWORD')
    const database = config.get<string>('POSTGRES_DB')

    return {
        dialect: 'postgres',
        host,
        port,
        username,
        password,
        database,
        models: [
            User,
            ColumnCards,
            Card,
            Comment
        ],
        autoLoadModels: true,
        // sync: { force: true }
    }
}