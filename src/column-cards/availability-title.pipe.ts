import { ArgumentMetadata, BadRequestException, HttpException, HttpStatus, Injectable, PipeTransform } from '@nestjs/common'
import { CreateColumnCards } from './dto/create-column-cards.dto'

@Injectable()
export class AvailabilityTitlePipe implements PipeTransform<CreateColumnCards> {

    public async transform(value: CreateColumnCards, metadata: ArgumentMetadata) {

        if (!metadata.metatype || this.toValidate(metadata.metatype)) {
            throw new HttpException('Нет метатипа параметра запроса', HttpStatus.INTERNAL_SERVER_ERROR)
        }

        if (!value.title) throw new BadRequestException('Отсутствует название колонки ')

        return value
    }

    private toValidate(metatype: Function): Boolean {
        const types: Function[] = [String, Number, Array, Object, Boolean]
        return types.includes(metatype)
    }

}
