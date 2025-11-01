import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { ZodType } from 'zod';

@Injectable()
export class CustomValidationPipe implements PipeTransform {
  constructor(private schema: ZodType) {}
  transform(value: unknown, metadata: ArgumentMetadata) {
    console.log({ value, metadata });

    const { error, success } = this.schema.safeParse(value);
    if (!success) {
      throw new BadRequestException({
        message: 'validation Error',
        cause: {
          issues: error.issues.map((issue) => {
            return { path: issue.path, message: issue.message };
          }),
        },
      });
    }
    return value;
  }
}
