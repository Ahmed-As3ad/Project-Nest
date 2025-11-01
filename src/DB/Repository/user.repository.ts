import { Injectable } from "@nestjs/common";
import { DBRepository } from "./DB.repository.js";
import { HUserDocument as TDocument, User } from "../model/user.model.js";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class UserRepository extends DBRepository<TDocument> {
    constructor(@InjectModel(User.name) protected override readonly model: Model<TDocument>) {
        super(model);
    }
}