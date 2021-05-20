import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

@Controller('coffees')
export class CoffeesController {
  @Get()
  findAll() {
    return 'This action returns all coffees';
  }
  // Loose compatibility with Nest features that depend on Nest standard response handling, which are Interceptors and HttpCode decorator
  // It becomes plataform dependent and harder to test (mock response object)
  // It is possible to specify the name of the nested route by placing a string inside the decorator
  // @Get('flavors')
  // findAll(@Res() response) {
  //   response.status(200).send('This action returns all coffees');
  // }

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

  @Patch(':id')
  update(@Param('id') id: string, @Body() body) {
    return `This action updates #${id} coffee`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes #${id} coffee`;
  }
}
