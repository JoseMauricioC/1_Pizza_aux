import { ApiProperty } from '@nestjs/swagger';
import {
  IsDefined,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  Min,
} from 'class-validator';
import { Producto } from 'src/productos/entities/producto.entity';
import { Venta } from 'src/ventas/entities/venta.entity';

export class CreateDetalleVentaDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'La cantidad es obligatoria.' })
  @IsNumber({}, { message: 'La cantidad debe ser un número.' })
  @IsPositive({ message: 'La cantidad debe ser mayor que cero.' })
  readonly cantidad: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'El precio unitario es obligatorio.' })
  @IsNumber({}, { message: 'El precio unitario debe ser un número.' })
  @IsPositive({ message: 'El precio unitario debe ser mayor que cero.' })
  readonly precioUnitario: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'El subtotal es obligatorio.' })
  @IsNumber({}, { message: 'El subtotal debe ser un número.' })
  @Min(0.01, { message: 'El subtotal debe ser mayor que cero.' })
  readonly subtotal: number;

  @ApiProperty()
  @IsDefined({ message: 'El campo idVenta debe estar definido' })
  @IsInt({ message: 'El campo idVenta debe ser de tipo numérico' })
  readonly idVenta: Venta['id'];

  @ApiProperty()
  @IsDefined({ message: 'El campo idProducto debe estar definido' })
  @IsInt({ message: 'El campo idProducto debe ser de tipo numérico' })
  readonly idProducto: Producto['id'];
}
