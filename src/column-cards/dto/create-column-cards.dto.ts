import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsString } from 'class-validator'

export class CreateColumnCards {
    @ApiProperty({ example: 'Хранилище задач', description: 'Название колонки' })
    @IsString({ message: 'Должно быть строкой' })
    readonly title: string

    @ApiProperty({ example: '1', description: 'Идентификатор автора' })
    @IsNumber({ allowNaN: false }, { message: 'Должно быть числом' })
    readonly user_id: number
}