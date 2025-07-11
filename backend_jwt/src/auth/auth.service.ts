// import { Injectable } from '@nestjs/common';
// import { JwtPayload } from './interfaces/jwt-payload.interface';

// @Injectable()
// export class AuthService {
//     verifyPayload(payload: JwtPayload): import("../usuarios/entities/usuario.entity").Usuario | PromiseLike<import("../usuarios/entities/usuario.entity").Usuario> {
//         throw new Error('Method not implemented.');
//     }
// }
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { AuthLoginDto } from './dto/auth-login.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { Usuario } from 'src/usuarios/entities/usuario.entity';

@Injectable()
export class AuthService {
  constructor(
    private usuarioService: UsuariosService,
    private jwtService: JwtService,
  ) {}

  async login(authLoginDto: AuthLoginDto): Promise<any> {
    const { usuario, clave } = authLoginDto;
    const usuarioOk = await this.usuarioService.validate(usuario, clave);

    const payload = { sub: usuarioOk.id };
    const access_token = this.getAccessToken(payload);

    return { ...usuarioOk, access_token };
  }

  getAccessToken(payload: any) {
    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_TOKEN,
      expiresIn: process.env.JWT_TOKEN_EXPIRATION,
    });
    return accessToken;
  }

  async verifyPayload(payload: JwtPayload): Promise<Usuario> {
    let usuario: Usuario;

    try {
      usuario = await this.usuarioService.findOne(payload.sub);
    } catch {
      throw new UnauthorizedException(`Usuario inválido: ${payload.sub}`);
    }

    return usuario;
  }
}
