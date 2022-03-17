import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class AgentWindowsDto {
    @ApiProperty()
    @IsNotEmpty()
    id: number;
    
    @ApiProperty()
    @IsString()
    scriptPath: string;

    @ApiProperty()
    @IsString()
    scriptTag: string;
}