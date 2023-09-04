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
import { OrderDetailsService } from './order-details.service';
import { CreateOrderDetailDto } from './dto/create-order-detail.dto';
import { UpdateOrderDetailDto } from './dto/update-order-detail.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { BasicAuthGuard } from '../../functions/auth/guard/basic-auth.guard';
import { CurrentUser } from 'src/commons/common/decorators/user.decorator';
import { User } from '../users/entities/user.entity';

@ApiTags('order-details')
@ApiBearerAuth('access-token을 통한 인증이 필요합니다.')
@UseGuards(BasicAuthGuard)
@Controller('v1/order-details')
export class OrderDetailsController {
  constructor(private readonly orderDetailsService: OrderDetailsService) {}

  @ApiOperation({
    summary: '주문 상세를 생성합니다.',
    description:
      '주문 상세를 생성합니다. 가장 최근 주문을 가져와서 집어 넣습니다.',
  })
  @Post()
  async create(
    @Body() createOrderDetailDto: CreateOrderDetailDto,
    @CurrentUser() user: User,
  ) {
    createOrderDetailDto.userId = user.id;
    return await this.orderDetailsService.create(createOrderDetailDto);
  }

  @ApiOperation({
    summary: '주문 상세를 수정합니다.',
    description:
      '주문 상세를 수정합니다. id에 해당하는 주문 상세가 없으면 400에러를 반환합니다.',
  })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateOrderDetailDto: UpdateOrderDetailDto,
    @CurrentUser() user: User,
  ) {
    await this.orderDetailsService.checkOrderDetailBelongsToUser(+id, user.id);
    return this.orderDetailsService.update(+id, updateOrderDetailDto);
  }

  @ApiOperation({
    summary: '주문 상세를 삭제합니다.',
    description: '주문 상세를 삭제합니다. user id는 token을 통해 가져옵니다.',
  })
  @Delete(':id')
  async remove(@Param('id') id, @CurrentUser() user: User) {
    await this.orderDetailsService.checkOrderDetailBelongsToUser(+id, user.id);
    return this.orderDetailsService.remove(+id);
  }
}
