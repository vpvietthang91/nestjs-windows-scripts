import { ApiProperty } from "@nestjs/swagger";

export class ResponseDto {
    @ApiProperty()
    statusCode: number;
    @ApiProperty()
    statusMessage: string;
}