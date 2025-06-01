import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  IsUrl,
  Min,
} from 'class-validator';

export class CreateProductoDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'La URL de la imagen no puede estar vacía.' })
  @IsUrl({}, { message: 'La URL de la imagen debe ser una URL válida.' })
  readonly imagen_url: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El nombre no puede estar vacío.' })
  @IsString({ message: 'El nombre debe ser una cadena de texto.' })
  readonly nombre: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'La descripción no puede estar vacía.' })
  @IsString({ message: 'La descripción debe ser una cadena de texto.' })
  readonly descripcion: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El precio no puede estar vacío.' })
  @IsNumber({}, { message: 'El precio debe ser un número.' })
  @IsPositive({ message: 'El precio debe ser un número positivo.' })
  readonly precio: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'El stock no puede estar vacío.' })
  @IsNumber({}, { message: 'El stock debe ser un número.' })
  @Min(0, { message: 'El stock no puede ser negativo.' })
  readonly stock: number;
}
