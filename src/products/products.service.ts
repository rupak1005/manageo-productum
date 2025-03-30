import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Product } from '@prisma/client';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async getAllProducts(): Promise<Product[]> {
    return this.prisma.product.findMany();
  }

  async getProductById(id: number): Promise<Product> {
    return this.prisma.product.findUnique({ where: { id } });
  }

  async createProduct(data: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<Product> {
    return this.prisma.product.create({ data });
  }

  async updateProduct(id: number, data: Partial<Product>): Promise<Product> {
    return this.prisma.product.update({ where: { id }, data });
  }

  async deleteProduct(id: number): Promise<Product> {
    return this.prisma.product.delete({ where: { id } });
  }
} 