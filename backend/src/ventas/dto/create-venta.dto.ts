import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsDefined,
  IsInt,
  IsNotEmpty,
  IsNumber,
  Min,
} from 'class-validator';
import { Cliente } from 'src/clientes/entities/cliente.entity';
import { Usuario } from 'src/usuarios/entities/usuario.entity';

export class CreateVentaDto {
  @ApiProperty()
  @IsDefined({ message: 'El campo fecha debe estar definido' })
  @IsDateString({}, { message: 'El campo fecha debe ser tipo fecha' })
  readonly fecha: Date;

  @ApiProperty()
  @IsNotEmpty({ message: 'El total es obligatorio.' })
  @IsNumber({}, { message: 'El total debe ser un número.' })
  @Min(0.01, { message: 'El total debe ser mayor que cero.' })
  readonly total: number;

  @ApiProperty()
  @IsDefined({ message: 'El campo idUsuario debe estar definido' })
  @IsInt({ message: 'El campo idUsuario debe ser de tipo numérico' })
  readonly idUsuario: Usuario['id'];

  @ApiProperty()
  @IsDefined({ message: 'El campo idUsuario debe estar definido' })
  @IsInt({ message: 'El campo idUsuario debe ser de tipo numérico' })
  readonly idCliente: Cliente['id'];
}
