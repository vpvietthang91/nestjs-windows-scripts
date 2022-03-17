import { createConnection } from "typeorm"

export const databaseProviders = [
    {
        provide: 'DATABASE_CONNECTION',
        useFactory: async () => await createConnection({
            type: "postgres",
            host: "192.168.5.17",
            port: 5432,
            username: "postgres",
            password: "Matkhaucap10!",
            database: "pac",
            entities: [
                __dirname + '/../**/*.entity{.ts,.js}',
            ],
            synchronize: true,
            extra: {
                trustServerCertificate: true,
            }
        }),
    },
]