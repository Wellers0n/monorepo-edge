import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  Req,
  Request,
} from '@nestjs/common';
import { AssignorsService } from './assignors.service';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { CreateAssignorBodyDTO } from './dtos/create-assignor.dto';
import { AssignorEntity } from './entities/assignors.entity';
import { AuthGuard } from '../auth/auth.guard';
import {
  AssignorOkResponse,
  AssignorUnauthorizedResponse,
} from './swagger/assignors.swagger';
import { FindOneAssignorParamDTO } from './dtos/find-one-assignor.dto';
import {
  UpdateAssignorBodyDTO,
  UpdateAssignorParamDTO,
} from './dtos/update-assignor.dto';
import { FindAssignorDataDTO } from './dtos/find-assignor.dto';
import { DeleteAssignorParamDTO } from './dtos/delete-assignor.dto';

@Controller('assignors')
@ApiTags('Assignors')
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class AssignorsController {
  constructor(private readonly assignorsService: AssignorsService) {}

  @Post('create')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: AssignorOkResponse })
  @ApiUnauthorizedResponse({ type: AssignorUnauthorizedResponse })
  create(
    @Body() body: CreateAssignorBodyDTO,
    @Request() request,
  ): Promise<AssignorEntity> {
    const userId = request.user.id;
    const { name, email, document, phone } = body;
    return this.assignorsService.create({
      phone,
      document,
      email,
      name,
      userId,
    });
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: [AssignorOkResponse] })
  @ApiUnauthorizedResponse({ type: AssignorUnauthorizedResponse })
  findByEmail(@Query() query: FindAssignorDataDTO): Promise<AssignorEntity[]> {
    const { email, name, phone, document } = query;
    return this.assignorsService.find({ email, name, phone, document });
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: AssignorOkResponse })
  @ApiUnauthorizedResponse({ type: AssignorUnauthorizedResponse })
  findById(@Param() param: FindOneAssignorParamDTO): Promise<AssignorEntity> {
    const { id } = param;
    return this.assignorsService.findOne({ id: Number(id) });
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: AssignorOkResponse })
  @ApiUnauthorizedResponse({ type: AssignorUnauthorizedResponse })
  update(
    @Param() param: UpdateAssignorParamDTO,
    @Body() body: UpdateAssignorBodyDTO,
  ): Promise<AssignorEntity> {
    const { id } = param;
    const { name, email, phone, document } = body;
    return this.assignorsService.update({
      id: Number(id),
      name,
      email,
      phone,
      document,
    });
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse()
  @ApiUnauthorizedResponse({ type: AssignorUnauthorizedResponse })
  delete(@Param() param: DeleteAssignorParamDTO): Promise<void> {
    const { id } = param;
    return this.assignorsService.delete({ id: Number(id) });
  }
}
