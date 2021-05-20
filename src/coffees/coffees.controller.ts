import { Controller, Get, Param } from '@nestjs/common';

@Controller('coffees')
export class CoffeesController {
  @Get('flavors')
  findAll() {
    return 'This action returns all coffees';
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return `This action returns #${id} coffee`;
    // Instead of receiving all params at the decorator, we can specify exactly which ones do we want
    // findOne(@Param() params) {
    // return `This action returns #${params.id} coffee`;
  }
}
