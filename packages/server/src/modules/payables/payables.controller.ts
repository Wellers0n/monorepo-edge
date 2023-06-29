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
  Request,
} from '@nestjs/common';
import { PayablesService } from './payables.service';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { CreatePayableBodyDTO } from './dtos/create-payable.dto';
import { PayableEntity } from './entities/payables.entity';
import { AuthGuard } from '../auth/auth.guard';
import {
  PayableOkResponse,
  PayableUnauthorizedResponse,
} from './swagger/payables.swagger';
import { FindOnePayableParamDTO } from './dtos/find-one-payable.dto';
import {
  UpdatePayableBodyDTO,
  UpdatePayableParamDTO,
} from './dtos/update-payable.dto';
import { FindPayableQueryDTO } from './dtos/find-payable.dto';
import { DeletePayableParamDTO } from './dtos/delete-payable.dto';
import moment from 'moment';
import { AssignorUnauthorizedResponse } from '../assignors/swagger/assignors.swagger';

@Controller('payables')
@ApiTags('Payables')
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class PayablesController {
  constructor(private readonly payablesService: PayablesService) {}

  @Post('create')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: PayableOkResponse })
  @ApiUnauthorizedResponse({ type: PayableUnauthorizedResponse })
  create(
    @Body() body: CreatePayableBodyDTO,
    @Request() request,
  ): Promise<PayableEntity> {
    const userId = request.user.id;
    const { value, assignorId } = body;

    const emissionDate = new Date();

    const valueInCents = Number(value) * 100;

    return this.payablesService.create({
      value,
      valueInCents,
      assignorId,
      emissionDate,
      userId,
    });
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: [PayableOkResponse] })
  @ApiUnauthorizedResponse({ type: PayableUnauthorizedResponse })
  findAll(
    @Query() query: FindPayableQueryDTO,
  ): Promise<{ payables: PayableEntity[]; totalPages: number }> {
    const { emissionDate, assignorId, limit = 10, offset = 0 } = query;

    return this.payablesService.findAll({
      emissionDate,
      assignorId: assignorId ? Number(assignorId) : assignorId,
      limit: Number(limit),
      offset: Number(offset),
    });
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: PayableOkResponse })
  @ApiUnauthorizedResponse({ type: PayableUnauthorizedResponse })
  findById(@Param() param: FindOnePayableParamDTO): Promise<PayableEntity> {
    const { id } = param;

    return this.payablesService.findOne({ id: Number(id) });
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: PayableOkResponse })
  @ApiUnauthorizedResponse({ type: PayableUnauthorizedResponse })
  update(
    @Param() param: UpdatePayableParamDTO,
    @Body() body: UpdatePayableBodyDTO,
  ): Promise<PayableEntity> {
    const { id } = param;
    const { value } = body;
    const valueInCents = Number(value) * 100;
    return this.payablesService.update({
      value,
      valueInCents,
      id: Number(id),
    });
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse()
  @ApiUnauthorizedResponse({ type: AssignorUnauthorizedResponse })
  delete(@Param() param: DeletePayableParamDTO): Promise<void> {
    const { id } = param;
    return this.payablesService.delete({ id: Number(id) });
  }
}
