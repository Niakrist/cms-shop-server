import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ProductDto } from './dto/product.dto';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async getAll(searchTerm: string) {
    if (searchTerm) {
      return this.getSearchTermFilter(searchTerm);
    }
    const products = await this.prisma.product.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        category: true,
      },
    });
    return products;
  }

  private getSearchTermFilter = (searchTerm: string) => {
    return {
      OR: [
        {
          title: {
            contains: searchTerm,
            mode: 'insensitive',
          },
          description: {
            contains: searchTerm,
            mode: 'insensitive',
          },
        },
      ],
    };
  };

  async getByStoreId(storeId: string) {
    return this.prisma.product.findMany({
      where: { storeId },
      include: { category: true, color: true },
    });
  }

  async getById(productId: string) {
    const product = await this.prisma.product.findMany({
      where: { id: productId },
      include: { category: true, color: true, rewiews: true },
    });
    if (!product) {
      throw new NotFoundException('Товар не найден');
    }
    return product;
  }

  async getByCategory(categoryId: string) {
    const products = await this.prisma.product.findMany({
      where: { category: { id: categoryId } },
      include: { category: true },
    });
    if (!products) {
      throw new NotFoundException('Товары не найдены');
    }
    return products;
  }

  async getMostPopular() {
    const mostPopularProducts = await this.prisma.orderItem.groupBy({
      by: ['productId'],
      _count: {
        id: true,
      },
      orderBy: {
        _count: {
          id: 'desc',
        },
      },
    });

    const productIds = mostPopularProducts.map(
      (producrt) => producrt.productId,
    );
    const products = await this.prisma.product.findMany({
      where: { id: { in: productIds } },
      include: { category: true },
    });

    return products;
  }

  async getSimilar(id: string) {
    const currentProduct = await this.getById(id);
    if (!currentProduct) {
      throw new NotFoundException('Товар не найден');
    }
    const products = await this.prisma.product.findMany({
      where: {
        category: {
          title: currentProduct.category.title,
        },
        NOT: {
          id: currentProduct.id,
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        category: true,
      },
    });
    return products;
  }

  async create(storeId: string, dto: ProductDto) {
    return this.prisma.product.create({ data: { ...dto, storeId } });
  }

  async update(productId: string, dto: ProductDto) {
    await this.getById(productId);
    return this.prisma.product.update({
      where: { id: productId },
      data: { ...dto },
    });
  }

  async delete(productId: string) {
    return this.prisma.product.delete({ where: { id: productId } });
  }
}
