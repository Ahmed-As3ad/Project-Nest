import {
  MongooseModule,
  Prop,
  Schema,
  SchemaFactory,
  Virtual,
} from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { GenderEnum, ProviderEnum, RoleEnum } from '../../common/enums/user.enum';
import { generateHash } from '../../common/utils/security/hash.utils.js';

@Schema({
  timestamps: true,
  strictQuery: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class User {
  @Prop({
    type: String,
    trim: true,
    minLength: 2,
    maxLength: 30,
    required: true,
  })
  fName: string;
  @Prop({
    type: String,
    trim: true,
    minLength: 2,
    maxLength: 30,
    required: true,
  })
  lName: string;
  @Virtual({
    get: function (this: User) {
      return this.fName + ' ' + this.lName;
    },
  })
  userName: string;

  @Prop({ type: String, trim: true, unique: true, required: true })
  email: string;

  @Prop({ type: Date })
  confirmEmail: Date;

  @Prop({
    type: String,
    required: function (this: User) {
      return this.Provider === ProviderEnum.Google ? false : true;
    },
  })
  password: string;
  @Prop({ type: String, enum: ProviderEnum, default: ProviderEnum.System })
  Provider: ProviderEnum;
  @Prop({ type: String, enum: GenderEnum, default: GenderEnum.male })
  gender: GenderEnum;

  @Prop({ type: String, enum: RoleEnum, default: RoleEnum.user })
  role: RoleEnum;

  @Prop({ type: Date })
  changeCredentials: Date;
}

const userSchema = SchemaFactory.createForClass(User);
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = generateHash({ plaintext: this.password });
  }
  next();
})
export type HUserDocument = HydratedDocument<User>;
export const UserModel = MongooseModule.forFeature([
  {
    name: User.name,
    schema: userSchema,
  },
]);
