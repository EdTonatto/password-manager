import { ApiProperty } from '@nestjs/swagger';

class UptimeRestModel {
  @ApiProperty()
  public message: string;

  constructor(message: string) {
    this.message = message;
  }
}

export { UptimeRestModel };
