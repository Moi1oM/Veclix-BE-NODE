import { ApiOperation, ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class OauthCodeDto {
  @ApiProperty({
    description: 'oauth code.',
    example: '1234567890',
  })
  @IsNotEmpty()
  @IsString()
  code: string;
}

export class OauthCodePKCE {
  @ApiProperty({
    description: 'oauth code.',
    example: '1234567890',
  })
  @IsNotEmpty()
  @IsString()
  code: string;

  @ApiProperty({
    description: 'oauth code verifier. random string.',
    example: '1234567890',
  })
  @IsNotEmpty()
  @IsString()
  code_verifier: string;
}
