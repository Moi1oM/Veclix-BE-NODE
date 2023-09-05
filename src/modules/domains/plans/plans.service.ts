import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Plan } from './entities/plan.entity';
import { Repository } from 'typeorm';
import { CompanyUsersService } from '../company-users/company-users.service';
import { CompanyUser } from '../company-users/entities/company-user.entity';

@Injectable()
export class PlansService {
  constructor(
    @InjectRepository(Plan)
    private readonly planRepository: Repository<Plan>,
    private readonly companyUsersService: CompanyUsersService,
  ) {}

  async changeMyPlan(
    companyUserId: number,
    planId: number,
  ): Promise<CompanyUser> {
    const companyUser = await this.companyUsersService.findOneByIdOrException(
      companyUserId,
    );
    const plan = await this.findOneByIdOrException(planId);
    companyUser.plan = await Promise.resolve(plan);
    return await this.companyUsersService.update(companyUserId, companyUser);
  }

  async findMyPlans(companyUserId: number): Promise<Plan> {
    return await this.companyUsersService.findPlansByCompanyUserId(
      companyUserId,
    );
  }

  async create(createPlanDto: CreatePlanDto): Promise<Plan> {
    return await this.planRepository.save(createPlanDto);
  }

  async findAll() {
    return await this.planRepository.find();
  }

  async findOneByIdOrException(id: number) {
    const foundPlan = await this.planRepository.findOne({
      where: { id: id },
      order: { updatedAt: 'DESC' },
    });
    if (!foundPlan) {
      throw new HttpException(
        `Plan with id:${id} not found`,
        HttpStatus.BAD_REQUEST,
      );
    }
    return foundPlan;
  }

  async update(id: number, updatePlanDto: UpdatePlanDto): Promise<Plan> {
    await this.findOneByIdOrException(id);
    await this.planRepository.update(id, updatePlanDto);
    return await this.findOneByIdOrException(id);
  }

  async remove(id: number): Promise<Plan> {
    const plan = await this.findOneByIdOrException(id);
    await this.planRepository.remove(plan);
    return plan;
  }
}
