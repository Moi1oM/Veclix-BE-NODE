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
import { PlansService } from './plans.service';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { BasicAuthGuard } from '../../functions/auth/guard/basic-auth.guard';
import { CurrentUser } from '../../../commons/common/decorators/user.decorator';
import { CompanyUser } from '../company-users/entities/company-user.entity';
import { ChangePlanDto } from './dto/change-plan.dto';

@ApiTags('Plans')
@Controller('v1/plans')
export class PlansController {
  constructor(private readonly plansService: PlansService) {}

  @ApiOperation({
    summary: 'Create plan',
    description: 'Create plan. you should request with access token',
    deprecated: true,
  })
  @ApiBearerAuth('access-token')
  @UseGuards(BasicAuthGuard)
  @Post('new')
  async create(@Body() createPlanDto: CreatePlanDto) {
    return await this.plansService.create(createPlanDto);
  }

  @ApiOperation({
    summary: 'Change my plan',
    description: 'Change my plan. you should request with access token',
  })
  @ApiBearerAuth('access-token')
  @UseGuards(BasicAuthGuard)
  @Post('user')
  async changeMyPlan(
    @CurrentUser() user: CompanyUser,
    @Body() selectedPlan: ChangePlanDto,
  ) {
    return await this.plansService.changeMyPlan(user.id, selectedPlan.planId);
  }

  @ApiOperation({
    summary: 'Find my plans',
    description: 'Find my plans. user id is from access token',
  })
  @Get('@me')
  async findMyPlans(@CurrentUser() user: CompanyUser) {
    return await this.plansService.findMyPlans(user.id);
  }

  @ApiOperation({
    summary: 'Find all plans',
    description: 'Find all plans',
  })
  @Get('all')
  async findAll() {
    return await this.plansService.findAll();
  }

  @ApiOperation({
    summary: 'Find one plan',
    description: 'Find one plan. It will return 400 if plan not found',
  })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.plansService.findOneByIdOrException(+id);
  }

  @ApiOperation({
    summary: 'Update plan',
    description: 'Update plan',
    deprecated: true,
  })
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updatePlanDto: UpdatePlanDto) {
    return await this.plansService.update(+id, updatePlanDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.plansService.remove(+id);
  }
}
