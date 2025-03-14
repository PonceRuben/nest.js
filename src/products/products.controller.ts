import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-guard.guard';
import { AcceptedRoles } from 'src/custom-decorators/roles.decorator';
import { Roles } from '@prisma/client';
import { RolesGuard } from 'src/custom-decorators/roles.guard';
import { NotificationsGateway } from 'src/websocket/notifications/notifications.gateway';

//@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly notificationsGateway: NotificationsGateway,
  ) {}

  @Post()
 // @UseGuards(JwtAuthGuard, RolesGuard)
  @AcceptedRoles(Roles.ADMIN)
  create(@Body() createProductDto: CreateProductDto, @Res() res) {
    const product = this.productsService.create(createProductDto);
    this.notificationsGateway.sendNotification('Nuevo producto creado!');
    return res.status(HttpStatus.CREATED).json({
      message: 'Producto creado correctamente',
      product,
    });
  }

  @Get()
 // @UseGuards(JwtAuthGuard)
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.productsService.remove(id);
  }
}
