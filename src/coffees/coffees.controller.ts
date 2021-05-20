import { Body, Controller, Get, Param, Post } from '@nestjs/common';

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

  @Post()
  create(@Body() body) {
    return body;
    // We can also choose to receive only a specific property from the body, which is not a good practice because you might miss some validations
    // create(@Body('name') body) {
  }
}
