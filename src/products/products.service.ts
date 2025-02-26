import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

const products: Product[] = [];

@Injectable()
export class ProductsService {
  create(newProduct: CreateProductDto) {
    const product: Product = { id: uuidv4(), ...newProduct };
    products.push(product);
    return `The product ${product.title} has been added`;
  }

  findAll() {
    return products;
  }

  findOne(id: string) {
    const product = products.find((product) => product.id === id);
    if (!product)
      throw new NotFoundException(`Product with id ${id} not found`);
    return product;
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    const index = products.findIndex((product) => product.id === id);
    if (index === -1)
      throw new NotFoundException(`Product with id ${id} not found`);

    products[index] = { ...products[index], ...updateProductDto };
    return products[index];
  }

  remove(id: string) {
    const index = products.findIndex((product) => product.id === id);
    if (index === -1)
      throw new NotFoundException(`Product with id ${id} not found`);
    const deletedProduct = products.splice(index, 1);
    return {
      message: 'Product deleted successfully',
      product: deletedProduct[0],
    };
  }
}
