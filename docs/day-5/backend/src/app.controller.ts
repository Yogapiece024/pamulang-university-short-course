import { BlockchainService } from './blockchain.service';
import { Controller, Get, Post, Body } from '@nestjs/common';

@Controller('blockchain')
export class AppController {
  constructor(private readonly blockchainService: BlockchainService) {}

  @Get('value')
  async getValue() {
    const value = await this.blockchainService.getValue();
    return { value: value.toString() };
  }
  @Post('set-value')
  async setValue(@Body('value') value: number) {
    const result = await this.blockchainService.setValue(value);
    return result; 
  }
}


