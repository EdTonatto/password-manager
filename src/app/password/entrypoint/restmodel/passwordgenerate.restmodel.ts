import { ApiProperty } from '@nestjs/swagger';

class PasswordGenerateRestModel {
  @ApiProperty()
  public application: string;

  @ApiProperty()
  public username: string;

  @ApiProperty()
  public length?: number;

  @ApiProperty()
  public numbers?: boolean;

  @ApiProperty()
  public symbols?: boolean;

  @ApiProperty()
  public uppercase?: boolean;

  @ApiProperty()
  public lowercase?: boolean;

  @ApiProperty()
  public excludeSimilarCharacters?: boolean;

  constructor(
    application: string,
    username: string,
    length?: number,
    numbers?: boolean,
    symbols?: boolean,
    uppercase?: boolean,
    lowercase?: boolean,
    excludeSimilarCharacters?: boolean,
  ) {
    this.application = application;
    this.username = username;
    this.length = length;
    this.numbers = numbers;
    this.symbols = symbols;
    this.uppercase = uppercase;
    this.lowercase = lowercase;
    this.excludeSimilarCharacters = excludeSimilarCharacters;
  }
}

export { PasswordGenerateRestModel };
