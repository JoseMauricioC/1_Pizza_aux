import { ApiProperty } from '@nestjs/swagger';

export class CreateProveedorDto {
  @ApiProperty()
  readonly nombre: string;
  @ApiProperty()
  readonly telefono: string;
  @ApiProperty()
  readonly correo: string;
  @ApiProperty()
  readonly direccion: string;
}
