import { Provider, Scope } from "@nestjs/common"
import { MongoDatabaseService } from "./mongo-database-service";
import { ContractSchema } from "src/contract/adapter/out/contract.schema";
import { ConfigService } from '@nestjs/config';
import { Contract } from "src/contract/domain/models/contract";

export const Persistence: Provider[] = [
  {
    provide: 'MongoDatabaseService',
    scope: Scope.DEFAULT,
    useFactory: async (configService: ConfigService) => {
      const mongoDatabaseService = new MongoDatabaseService(configService);

      mongoDatabaseService.connect().then(async response => {
        console.log(response.message);
        if(response.message==="Connected to the database.") {
          // const contract1 = new Contract({
          //   loanDate: new Date(),
          //   clientName: "André Luiz",
          //   loanAmount: 20000,
          //   interestRate: 0.02,
          //   dailyFine: 0.01,
          //   installments: 4,
          //   installmentsPayed: 1,
          //   pastDueAmount: 0,
          //   status: 1
          // });
          // const contract2 = new Contract({
          //   loanDate: new Date(),
          //   clientName: "André Luiz",
          //   loanAmount: 30000,
          //   interestRate: 0.02,
          //   dailyFine: 0.01,
          //   installments: 5,
          //   installmentsPayed: 2,
          //   pastDueAmount: 0,
          //   status: 1
          // });

          // const ContractModel = mongoDatabaseService.conn.model('Contract', ContractSchema);
          // const contractModel1 = new ContractModel(contract1);
          // contractModel1.save().then(() => console.log('meow1'));
          // const contractModel2 = new ContractModel(contract1);
          // contractModel2.save().then(() => console.log('meow2'));
          // const contractModel3 = new ContractModel(contract1);
          // contractModel3.save().then(() => console.log('meow3'));
          // const contractModel4 = new ContractModel(contract1);
          // contractModel4.save().then(() => console.log('meow4'));
          // const contractModel5 = new ContractModel(contract1);
          // contractModel5.save().then(() => console.log('meow5'));

          // const contractModel6 = new ContractModel(contract2);
          // contractModel6.save().then(() => console.log('meow6'));
          // const contractModel7 = new ContractModel(contract2);
          // contractModel7.save().then(() => console.log('meow7'));
          // const contractModel8 = new ContractModel(contract2);
          // contractModel8.save().then(() => console.log('meow8'));
          // const contractModel9 = new ContractModel(contract2);
          // contractModel9.save().then(() => console.log('meow9'));
          // const contractModel10 = new ContractModel(contract2);
          // contractModel10.save().then(() => console.log('meow10'));
        }
      });
      return mongoDatabaseService;
    },
    inject: [ConfigService]
  }
]