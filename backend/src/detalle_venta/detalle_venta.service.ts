// import { Injectable } from '@nestjs/common';
// import { CreateDetalleVentaDto } from './dto/create-detalle_venta.dto';
// import { UpdateDetalleVentaDto } from './dto/update-detalle_venta.dto';

// @Injectable()
// export class DetalleVentaService {
//   create(createDetalleVentaDto: CreateDetalleVentaDto) {
//     return 'This action adds a new detalleVenta';
//   }

//   findAll() {
//     return `This action returns all detalleVenta`;
//   }

//   findOne(id: number) {
//     return `This action returns a #${id} detalleVenta`;
//   }

//   update(id: number, updateDetalleVentaDto: UpdateDetalleVentaDto) {
//     return `This action updates a #${id} detalleVenta`;
//   }

//   remove(id: number) {
//     return `This action removes a #${id} detalleVenta`;
//   }
// }
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDetalleVentaDto } from './dto/create-detalle_venta.dto';
import { UpdateDetalleVentaDto } from './dto/update-detalle_venta.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DetalleVenta } from './entities/detalle_venta.entity';

@Injectable()
export class DetalleVentaService {
  constructor(
    @InjectRepository(DetalleVenta)
    private detalleventasRepository: Repository<DetalleVenta>,
  ) {}
  async create(
    createDetalleVentaDto: CreateDetalleVentaDto,
  ): Promise<DetalleVenta> {
    const detalle_venta = new DetalleVenta();
    detalle_venta.cantidad = createDetalleVentaDto.cantidad;
    detalle_venta.precioUnitario = createDetalleVentaDto.precioUnitario;
    detalle_venta.subtotal = createDetalleVentaDto.subtotal;
    detalle_venta.idVenta = createDetalleVentaDto.idVenta;
    detalle_venta.idProducto = createDetalleVentaDto.idProducto;

    return this.detalleventasRepository.save(detalle_venta);
  }

  async findAll(): Promise<DetalleVenta[]> {
    return this.detalleventasRepository.find({
      relations: { producto: true, venta: { usuario: true, cliente: true } },
      select: {
        id: true,
        cantidad: true,
        precioUnitario: true,
        subtotal: true,
        producto: { id: true, imagen_url: true, nombre: true, precio: true },
        venta: {
          id: true,
          fecha: true,
          total: true,
          usuario: { usuario: true, rol: true },
          cliente: { nombre: true, apellido: true, telefono: true },
        },
      },
      order: { venta: { fecha: 'DESC', cliente: { nombre: 'ASC' } } },
    });
  }

  async findOne(id: number): Promise<DetalleVenta> {
    const detalleventa = await this.detalleventasRepository.findOne({
      where: { id },
      relations: { venta: true, producto: true },
    });

    if (!detalleventa) throw new NotFoundException('el detalle no existe');

    return detalleventa;
  }

  async update(
    id: number,
    updateDetalleVentaDto: UpdateDetalleVentaDto,
  ): Promise<DetalleVenta> {
    const detalleVenta = await this.findOne(id);
    Object.assign(detalleVenta, updateDetalleVentaDto);
    return this.detalleventasRepository.save(detalleVenta);
  }

  async remove(id: number) {
    const detalleVenta = await this.findOne(id);
    return this.detalleventasRepository.softRemove(detalleVenta);
  }
}
