import { Inject, Injectable } from "@nestjs/common";
import { User } from "src/user/domain/models/user";
import { MongoDatabaseService } from "./mongo-database-service";
import { ContractDocument, ContractModel, ContractSchema } from "src/contract/adapter/out/contract.schema";
import { UserDocument, UserModel, UserSchema } from "src/user/adapter/out/user.schema";

@Injectable()
export class SeedService {
  constructor(@Inject('MongoDatabaseService') private readonly mongoDatabaseService: MongoDatabaseService) {}

  async populateDatabase() {
    if(this.mongoDatabaseService.isConnected()) {
      await this.populateUsers();
      await this.populateContracts();
    } else {
      console.error("MongoDb not connected!");
    }
  }

  async populateUsers() {

    const userModel: UserModel = this.mongoDatabaseService.conn.connection.model<UserDocument>('User', UserSchema);
    const usersCount = await userModel.countDocuments();

    if(usersCount === 0) {
      const initialUsers = [
        await User.new({ firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', password: 'password1', createdAt: new Date, googleOAuthFlag: false }),
        await User.new({ firstName: 'Jane', lastName: 'Doe', email: 'jane.doe@example.com', password: 'password2', createdAt: new Date, googleOAuthFlag: false }),
      ];

      await userModel.insertMany(initialUsers);
    }
  }

  async populateContracts() {

    const contractModel: ContractModel = this.mongoDatabaseService.conn.connection.model<ContractDocument>('Contract', ContractSchema);
    const contractsCount = await contractModel.countDocuments();

    if(contractsCount === 0) {
      const initialContracts = Array.from({ length: 270 }, (v, k) => {
        const option1 = {
          loanDate: new Date(),
          clientName: "André Luiz"+k,
          loanAmount: 20000,
          interestRate: 0.02,
          dailyFine: 0.01,
          installments: 4,
          installmentsPayed: 1,
          pastDueAmount: 0,
          status: 1,
          createdAt: new Date
        }
        const option2 = {
          loanDate: new Date(),
          clientName: "André Luiz"+k,
          loanAmount: 30000,
          interestRate: 0.02,
          dailyFine: 0.01,
          installments: 5,
          installmentsPayed: 2,
          pastDueAmount: 0,
          status: 1,
          createdAt: new Date
        }
        return (Math.random()*10 < 5) ? option1 : option2;
      });

      await contractModel.insertMany(initialContracts);
    }
  }
}