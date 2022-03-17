import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { AutomationScriptEntity } from '../entity/agent-windows-script.entity';
import { AgentWindowsDto } from '../dto/agent-windows.dto';

@Injectable()
export class AgentWindowsService {
    
    constructor(
        @Inject('AGENT_WINDOWS_SCRIPT_REPOSITORY')
        private agentScriptRepository: Repository<AutomationScriptEntity>
    ) {}

    async findById(id: number): Promise<AutomationScriptEntity> {
        const script = await this.agentScriptRepository.findOne(id);
        if(!script) {
            throw new InternalServerErrorException('Not found record with id '+id);
        }
        return script;
    }

    async executeScript(payload: AgentWindowsDto): Promise<any> {
        const executeScript = await this.agentScriptRepository.findOne(payload.id);
        if(!executeScript) {
            throw new InternalServerErrorException('Not found record with id '+payload.id);
        } else if(!executeScript.isActive) {
            throw new InternalServerErrorException('Record status is not active.')
        }

        const fs = require('fs');
        let scriptPath = getScriptPath(payload, executeScript);
        fs.writeFile(scriptPath, executeScript.scriptContent, (err: any) => {
            console.log("file created: "+scriptPath);
            if (err) throw new InternalServerErrorException(err);
        });

        const { exec } = require('child_process');
        if(executeScript.scriptExecutor != null) {
            const result = await exec(executeScript.scriptExecutor+' '+scriptPath, {'shell':'powershell.exe'}, (error: string, stdout: string, stderr: any)=> {
                if(stdout) {
                    console.log("This is stdout: \n"+stdout);
                }
                if(error) {
                    console.log("This is error: \n"+error);
                }
                if(stderr) {
                    console.log("This is stderr: \n"+stderr);
                }
                console.log("done executing script.");
            });
            fs.unlinkSync(scriptPath, (err: any) => {
                if(err) throw new InternalServerErrorException(err);
            });
            return result;
        }
        return;
    }
}

function getScriptPath(payload: AgentWindowsDto, executeScript: AutomationScriptEntity) {
    let scriptPath = null;
    const fs = require('fs');
    //Get path
    if(payload.scriptPath) {
        scriptPath = payload.scriptPath;
    } else {
        scriptPath = './src/script-temp/';
    }
    //Get filename
    scriptPath = scriptPath+'/'+executeScript.scriptName.split(" ").join();
    //Get tag
    if(payload.scriptTag) {
        scriptPath = scriptPath+'-'+payload.scriptTag;
        if(fs.existsSync(scriptPath)) {
            scriptPath = scriptPath+'-'+Date.now();
        }
    } else {
        scriptPath = scriptPath+'-'+Date.now();
    }
    //Get file extension
    if(executeScript.scriptType) {
        scriptPath = scriptPath+'.'+executeScript.scriptType;
    }
    return scriptPath;
}

