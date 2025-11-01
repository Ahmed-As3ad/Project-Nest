import { Model, ProjectionType, QueryOptions, RootFilterQuery, UpdateQuery } from "mongoose";

export abstract class DBRepository<TDocument> {
    constructor(protected readonly model: Model<TDocument>) { }
    async findOne({ filter, select, options }: { filter?: RootFilterQuery<TDocument>, select?: ProjectionType<TDocument>, options?: QueryOptions<TDocument> }): Promise<TDocument | null> {
        return this.model.findOne(filter || {}, select, options).exec();
    }
    async find({ filter, select, options }: { filter?: RootFilterQuery<TDocument>, select?: ProjectionType<TDocument>, options?: QueryOptions<TDocument> }): Promise<TDocument[]> {
        return this.model.find(filter || {}, select, options).exec();
    }
    async create({data}: {data: Partial<TDocument>[] }): Promise<TDocument[]> {
        return this.model.create(data);
    }
    async findOneAndUpdate({ filter, update, options }: { filter: RootFilterQuery<TDocument>, update: UpdateQuery<TDocument>, options?: QueryOptions<TDocument> }): Promise<TDocument | null> {
        return this.model.findOneAndUpdate(filter, update, options).exec();
    }
    async deleteOne({ filter, options }: { filter: RootFilterQuery<TDocument>, options?: QueryOptions<TDocument> }): Promise<TDocument | null> {
        return this.model.findOneAndDelete(filter, options).exec();
    }
    async deleteMany({ filter }: { filter: RootFilterQuery<TDocument> }): Promise<TDocument[]> {
        const res = await this.model.deleteMany(filter || {}).exec();
        return res.deletedCount ? [] : [];
    }

}