import { AddAccountRepository } from "../../../../data/protocols";
import { AccountModel } from "../../../../domain/models";
import { AddAccountModel } from "../../../../domain/usecases";
import { MongoHelper } from "../helpers/mongo-helper";

export class AccountMongoRepository implements AddAccountRepository {
  async add(accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = MongoHelper.getCollection("accounts");
    const result = await accountCollection.insertOne(accountData);
    const id = result.insertedId;
    const account = await accountCollection.findOne({ _id: id });
    const { _id, ...accountWithoutId } = account;
    return Object.assign({}, accountWithoutId as Omit<AccountModel, "id">, {
      id: _id.toString(),
    });
  }
}
