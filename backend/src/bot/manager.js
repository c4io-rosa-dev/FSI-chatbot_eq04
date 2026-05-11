import { NlpManager } from "node-nlp";
import { treinarBot } from "./treino";


const manager = new NlpManager({ languages: ["pt"], forceNER: true });

await treinarBot(manager);

export default manager;