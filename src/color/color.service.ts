import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ColorDto } from './dto/color.dto';

@Injectable()
export class ColorService {
  constructor(private prisms: PrismaService) {}

  async getByStoreId(storeId: string) {
    return this.prisms.color.findMany({
      where: {
        id: storeId,
      },
    });
  }

  async getById(colorId: string) {
    const color = await this.prisms.color.findUnique({
      where: {
        id: colorId,
      },
    });

    if (!color) {
      throw new Error('Цвет не найден');
    }
    return color;
  }

  async create(storeId: string, dto: ColorDto) {
    return this.prisms.color.create({
      data: { ...dto, storeId },
    });
  }

  async update(colorId: string, dto: ColorDto) {
    await this.getById(colorId);
    return this.prisms.color.update({
      where: { id: colorId },
      data: { ...dto },
    });
  }

  async delete(colorId: string) {
    await this.getById(colorId);
    return this.prisms.color.delete({ where: { id: colorId } });
  }
}
