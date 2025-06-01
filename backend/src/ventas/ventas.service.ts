import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateVentaDto } from './dto/create-venta.dto';
import { UpdateVentaDto } from './dto/update-venta.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Venta } from './entities/venta.entity';

@Injectable()
export class VentasService {
  constructor(
    @InjectRepository(Venta) private ventasRepository: Repository<Venta>,
  ) {}
  async create(createVentaDto: CreateVentaDto): Promise<Venta> {
    const venta = new Venta();
    venta.fecha = createVentaDto.fecha;
    venta.total = createVentaDto.total;
    venta.idUsuario = createVentaDto.idUsuario;
    venta.idCliente = createVentaDto.idCliente;

    return this.ventasRepository.save(venta);
  }

  async findAll(): Promise<Venta[]> {
    return this.ventasRepository.find({
      relations: { usuario: true, cliente: true },
      select: {
        id: true,
        fecha: true,
        total: true,
        usuario: { id: true, usuario: true, rol: true },
        cliente: { id: true, nombre: true, apellido: true, telefono: true },
      },
      order: { cliente: { nombre: 'ASC' }, fecha: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Venta> {
    const venta = await this.ventasRepository.findOne({
      where: { id },
      relations: { usuario: true, cliente: true },
    });

    if (!venta) throw new NotFoundException('La venta no existe');

    return venta;
  }

  async update(id: number, updateVentaDto: UpdateVentaDto): Promise<Venta> {
    const venta = await this.findOne(id);
    Object.assign(venta, updateVentaDto);
    return this.ventasRepository.save(venta);
  }

  async remove(id: number) {
    const venta = await this.findOne(id);
    return this.ventasRepository.softRemove(venta);
  }
}
