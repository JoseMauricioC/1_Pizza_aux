import { DetalleVenta } from 'src/detalle_venta/entities/detalle_venta.entity';
import { ProductosIngrediente } from 'src/productos_ingredientes/entities/productos_ingrediente.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('productos')
export class Producto {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @Column({ nullable: true })
  imagen_url: string;

  @Column('varchar', { length: 100 })
  nombre: string;

  @Column('text')
  descripcion: string;

  @Column('decimal', { precision: 10, scale: 2 })
  precio: number;

  @Column('int')
  stock: number;

  @CreateDateColumn({ name: 'fecha_creacion' })
  fechaCreacion: Date;

  @UpdateDateColumn({ name: 'fecha_modificacion' })
  fechaModificacion: Date;

  @DeleteDateColumn({ name: 'fecha_eliminacion', select: false })
  fechaEliminacion: Date;

  @OneToMany(
    () => ProductosIngrediente,
    (productoingrediente) => productoingrediente.producto,
  )
  productoIngredientes: ProductosIngrediente[];

  @OneToMany(() => DetalleVenta, (detalleventa) => detalleventa.producto)
  detalleVenta: DetalleVenta[];
}
