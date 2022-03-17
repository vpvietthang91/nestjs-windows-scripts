import { Connection } from "typeorm";
import { AutomationScriptEntity } from "../entity/agent-windows-script.entity";

export const AgentWindowsScriptProviders = [
    {
        provide: 'AGENT_WINDOWS_SCRIPT_REPOSITORY',
        useFactory:(connection: Connection) => connection.getRepository(AutomationScriptEntity),
        inject: ['DATABASE_CONNECTION'],
    }
]