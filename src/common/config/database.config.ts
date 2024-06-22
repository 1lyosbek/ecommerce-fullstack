import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from './config';


export const connectionSource: DataSourceOptions = {
    type: 'postgres',
    host: config.database_host,
    port: config.database_port,
    username: config.database_user,
    password: config.database_password,
    database: config.database,
    entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
    synchronize: true,
};

export default new DataSource(connectionSource)