import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from '@prisma/client';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async getAllProducts(): Promise<Product[]> {
    return this.productsService.getAllProducts();
  }

  @Get(':id')
  async getProductById(@Param('id') id: string): Promise<Product> {
    return this.productsService.getProductById(Number(id));
  }

  @Post()
  async createProduct(@Body() productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<Product> {
    return this.productsService.createProduct(productData);
  }

  @Put(':id')
  async updateProduct(@Param('id') id: string, @Body() productData: Partial<Product>): Promise<Product> {
    return this.productsService.updateProduct(Number(id), productData);
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: string): Promise<Product> {
    return this.productsService.deleteProduct(Number(id));
  }
} 