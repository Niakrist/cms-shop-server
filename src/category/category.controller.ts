import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CategoryDto } from './dto/category.dto';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Auth()
  @Get('by-category/:storeId')
  async getByStoreId(@Param('storeId') storeId: string) {
    return this.categoryService.getByStoreId(storeId);
  }

  @Auth()
  @Get('by-id/:categoryId')
  async getById(@Param('categoryId') categoryId: string) {
    console.log('categoryId: ', categoryId);
    return this.categoryService.getById(categoryId);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth()
  @Post(':storeId')
  async create(@Param('storeId') storeId: string, @Body() dto: CategoryDto) {
    return this.categoryService.create(storeId, dto);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth()
  @Put(':categotyId')
  async update(
    @Param('categotyId') categotyId: string,
    @Body() dto: CategoryDto,
  ) {
    return this.categoryService.update(categotyId, dto);
  }

  @HttpCode(200)
  @Auth()
  @Delete(':categotyId')
  async delete(@Param('categotyId') categotyId: string) {
    return this.categoryService.delete(categotyId);
  }
}
