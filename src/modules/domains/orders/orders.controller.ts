import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { BasicAuthGuard } from 'src/modules/functions/auth/guard/basic-auth.guard';
import { CurrentUser } from 'src/commons/common/decorators/user.decorator';
import { User } from '../users/entities/user.entity';
@ApiTags('orders')
@ApiBearerAuth('access-token을 통한 인증이 필요합니다.')
@UseGuards(BasicAuthGuard)
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @ApiOperation({
    summary: '가장 최근 주문을 가져옵니다.',
    description:
      '주문을 생성합니다. 가장 최근 주문이 없을 경우 새로운 주문을 생성합니다.',
  })
  @Get('@me/recent')
  async find(@CurrentUser() user: User) {
    return await this.ordersService.getRecentNotPaidOrderWithUserId(user.id);
  }

  @ApiOperation({
    summary: '내 모든 주문을 가져옵니다.',
    description: '내 모든 주문을 가져옵니다. id는 token을 통해 가져옵니다.',
  })
  @Get('@me/all')
  async findAll(@CurrentUser() user: User) {
    return await this.ordersService.findMyOrders(user.id);
  }

  @ApiOperation({
    summary: '주문을 수정합니다.',
    description: '주문을 수정합니다. id는 token을 통해 가져옵니다.',
  })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateOrderDto: UpdateOrderDto,
    @CurrentUser() user: User,
  ) {
    await this.ordersService.checkOrderBelongsToUser(+id, user.id);
    return this.ordersService.update(+id, updateOrderDto);
  }

  @ApiOperation({
    summary: '주문을 삭제합니다.',
    description: '주문을 삭제합니다. id는 token을 통해 가져옵니다.',
  })
  @Delete(':id')
  async remove(@Param('id') id: string, @CurrentUser() user: User) {
    await this.ordersService.checkOrderBelongsToUser(+id, user.id);
    return this.ordersService.remove(+id);
  }
}
