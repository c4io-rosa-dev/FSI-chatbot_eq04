import { NlpManager } from "node-nlp";
import { treinarBot } from "./treino.js";

const manager = new NlpManager({ languages: ["pt"], forceNER: true });

// Treinar o bot na inicialização
await treinarBot(manager);
await manager.train();

export default manager;