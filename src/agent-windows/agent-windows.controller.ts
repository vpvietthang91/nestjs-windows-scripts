import { Body, Controller, Get, HttpStatus, Param, ParseIntPipe, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { AutomationScriptEntity } from '../entity/agent-windows-script.entity';
import { AgentWindowsDto } from '../dto/agent-windows.dto';
import { AgentWindowsService } from './agent-windows.service';

@Controller('agent-windows')
export class AgentWindowsController {

    constructor(private readonly agentWindowsService: AgentWindowsService) {}

    @Get('/findScriptByID/:id')
    async findOneScriptById(@Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) id: number): Promise<AutomationScriptEntity> {
        return this.agentWindowsService.findById(id);
    }

    @Post('/executeScript')
    async executeScript(@Body() payload: AgentWindowsDto, @Res({passthrough: true}) res: Response): Promise<any> {
        const result = await this.agentWindowsService.executeScript(payload);
        if(result) {
            res.status(HttpStatus.OK).json({
                message: "Scrip execute without error.",
                error: "SUCCESS",
            });
        } else {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                message: "Scrip execute with an error.",
                error: "FAIL",
            });
        }
    }
}
