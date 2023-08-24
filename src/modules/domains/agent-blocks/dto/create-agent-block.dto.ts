import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { User } from '../../users/entities/user.entity';
import { AgentBlockProperties } from '../entities/agent-block.schema';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { AgentBlock } from '../entities/agent-block.entity';

export class CreateAgentBlockDto {
  @ApiPropertyOptional({
    example: {
      name: 'Agent Block 1',
      description: 'This is a description',
      objective_prmopt: 'What is your objective?',
    },
    description: 'The contents of the agent block',
    type: 'object',
  })
  @IsOptional()
  properties: AgentBlockProperties;

  @ApiProperty({
    example: 'This is a detail of agent block',
    description: 'The detail of the agent block',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  detail: string;

  @ApiProperty({
    example: 'This is a description of agent block',
    description: 'The description of the agent block',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({
    example: '10.000 KR',
    description: 'The price of the agent number:string',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  price: string;

  @ApiProperty({
    example: 'https://picsum.photos/id/237/536/354',
    description: 'The thumbnail image of the agent block',
    required: true,
  })
  thumbnail_img: string;

  // @ApiProperty({
  //   example:
  //     'User Class. It will automatically be filled in by Authorization header',
  //   description: 'The class of the agent block',
  //   required: true,
  // })
  // @IsNotEmpty()
  // @IsString()
  // crafter: User;

  toEntity(user: User) {
    const agentBlock = new AgentBlock();
    agentBlock.properties = this.properties;
    agentBlock.contents = [];
    agentBlock.detail = this.detail;
    agentBlock.description = this.description;
    agentBlock.price = this.price;
    agentBlock.thumbnail_img = this.thumbnail_img;
    agentBlock.parent = null;
    agentBlock.crafter = Promise.resolve(user);
    return agentBlock;
  }
}
