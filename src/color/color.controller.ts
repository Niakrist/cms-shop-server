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
import { ColorService } from './color.service';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ColorDto } from './dto/color.dto';

@Controller(' ')
export class ColorController {
  constructor(private readonly colorService: ColorService) {}

  @Auth()
  @Get('by-color/:storeId')
  async getByStoreId(@Param('id') storeId: string) {
    return this.colorService.getByStoreId(storeId);
  }

  @Auth()
  @Get('by-id/:colorId')
  async getById(@Param('colorId') colorId: string) {
    return this.colorService.getById(colorId);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth()
  @Post(':storeId')
  async create(@Param('storeId') storeId: string, @Body() dto: ColorDto) {
    return this.colorService.create(storeId, dto);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth()
  @Put(':colorId')
  async update(@Param('colorId') colorId: string, @Body() dto: ColorDto) {
    return this.colorService.update(colorId, dto);
  }

  @HttpCode(200)
  @Auth()
  @Delete(':colorId')
  async delete(@Param('colorId') colorId: string) {
    return this.colorService.delete(colorId);
  }
}
