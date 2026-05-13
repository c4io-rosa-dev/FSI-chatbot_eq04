import { NlpManager } from "node-nlp";

const manager = new NlpManager({ languages: ["pt"], forceNER: true });

export default manager;