import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Password } from 'src/app/password/dataprovider/model/password.model';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop({ default: false })
  isAdmin: boolean;

  @Prop()
  password: string;

  @Prop({ type: [Types.ObjectId], ref: Password.name })
  stored_passwords: Password[];
}

export const UserSchema = SchemaFactory.createForClass(User);
