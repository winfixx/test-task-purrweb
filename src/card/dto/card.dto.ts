import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsString } from 'class-validator'

export class CreateCardDto {
    @ApiProperty({ example: '1', description: 'Идентификатор карточки' })
    @IsNumber({ allowNaN: false }, { message: 'Должно быть числом' })
    readonly id: number

    @ApiProperty({ example: 'Сама задача', description: 'Что нужно сделать' })
    @IsString({ message: 'Должно быть строкой' })
    readonly content: string

    @ApiProperty({ example: '1', description: 'Идентификатор автора' })
    @IsNumber({ allowNaN: false }, { message: 'Должно быть числом' })
    readonly user_id: number

    @ApiProperty({ example: '1', description: 'Идентификатор колонки' })
    @IsNumber({ allowNaN: false }, { message: 'Должно быть числом' })
    readonly column_id: number
}