import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
  Length,
  registerDecorator,
  ValidateIf,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

export function IsMatch(
  constraints?: string[],
  validationOptions?: ValidationOptions,
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints,
      validator: IsMatchFields,
    });
  };
}

@ValidatorConstraint({ async: false })
export class IsMatchFields implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    return value === args.object[args.constraints[0] as string];
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    return `mismatch fields ${validationArguments?.property} with ${validationArguments?.constraints[0]}`;
  }
}

export class SignUpDTO {
  @Length(2, 20)
  @IsNotEmpty()
  @IsString()
  fName: string;
  @Length(2, 20)
  @IsNotEmpty()
  @IsString()
  lName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsStrongPassword()
  @IsNotEmpty()
  password: string;

  @ValidateIf((data: SignUpDTO) => {
    return Boolean(data.password);
  })
  @IsMatch(['password'])
  @IsNotEmpty()
  cPassword: string;

  @IsOptional()
  @IsString()
  gender: string;
}
