import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateProductoDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'El campo imagen es obligatorio' })
  @IsString({ message: 'El campo imagen debe ser de tipo cadena' })
  @MaxLength(500, {
    message: 'El campo imagen no debe ser mayor a 500 caracteres',
  })
  readonly imagen: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El nombre no puede estar vacío.' })
  @IsString({ message: 'El nombre debe ser una cadena de texto.' })
  readonly nombre: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'La descripción no puede estar vacía.' })
  @IsString({ message: 'La descripción debe ser una cadena de texto.' })
  readonly descripcion: string;

  @ApiProperty({
    description: 'Precio del producto',
    example: 19.99,
    minimum: 0,
    maximum: 10000,
  })
  @IsNotEmpty({ message: 'El precio del producto es obligatorio.' })
  @Type(() => Number)
  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'El precio del producto debe ser un número.' },
  )
  @Min(0, { message: 'El precio no puede ser negativo.' })
  @Max(10000, { message: 'El precio no puede ser mayor a 10000.' })
  readonly precio: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'El stock no puede estar vacío.' })
  @IsNumber({}, { message: 'El stock debe ser un número.' })
  @Min(0, { message: 'El stock no puede ser negativo.' })
  readonly stock: number;
}
