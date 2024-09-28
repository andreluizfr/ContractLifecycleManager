import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import mongoose from 'mongoose';

@Injectable()
export class MongoDatabaseService {

    conn: mongoose.Mongoose;

    constructor (private configService: ConfigService) {}

    async connect () {

        const response = {message: "initialState"};

        try {
            this.conn = new mongoose.Mongoose();
            //desconectado ou não inicializado
            if(this.conn.connection.readyState === 0 || this.conn.connection.readyState === 99){

                const nodeEnvironment = this.configService.get<string>('NODE_ENVIRONMENT');
                const username = this.configService.get<string>('MONGO_USERNAME');
                const password = this.configService.get<string>('MONGO_PASSWORD');
                const databaseName = this.configService.get<string>('MONGO_DB_NAME');
                const port = this.configService.get<string>('MONGO_DB_PORT');
                const cluster = this.configService.get<string>('MONGO_CLUSTER');

                if(nodeEnvironment === 'development') {
                    this.conn = await mongoose.connect(`mongodb://${cluster}:${port}/${databaseName}?retryWrites=true&w=majority`, {
                        authSource: "admin",
                        user: username,
                        pass: password,
                    });
                } else {
                    this.conn = await mongoose.connect(`mongodb+srv://${username}:${password}@${cluster}.mongodb.net/?retryWrites=true&w=majority&appName${databaseName}`, {
                            serverApi: {
                                version: '1',
                                strict: true,
                                deprecationErrors: true
                            }
                        }
                    );
                }
                response.message = "Connected to the database."
            }

        } catch(err) {
            response.message = String(err);
        }
        return response;
    }

    disconnect () {
        this.conn.connection.close();
    }

    isConnected() {
        if (this.conn.connection.readyState === 1) return true;
        else return false;
    }
}