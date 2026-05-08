

export async function treinarBot(manager) {
    // Saudações
    manager.addDocument("pt", "olá", "saudacao");
    manager.addDocument("pt", "olá", "saudacao");
    manager.addDocument("pt", "oi", "saudacao");
    manager.addDocument("pt", "bom dia", "saudacao");
    manager.addDocument("pt", "boa tarde", "saudacao");
    manager.addDocument("pt", "boa noite", "saudacao");
    manager.addDocument("pt", "eae", "saudacao");
    manager.addDocument("pt", "opa", "saudacao");

    manager.addAnswer(
        "pt", 
        "saudacao", 
        `
            Olá! Seja bem-vindo a Barbearia ACDKS!\n
            Explore os nossos seriços e marque um horário conosco.\n
            Para começar, escolha o que você pretende fazer em nossa barbearia: \n
            1 - Cabelo
            2 - Barba
            3 - Combos
            4 - Planos
            5 - Falar com um atendente
        `
    );

    // Fluxo Cabelo
    manager.addDocument("pt", "1", "fluxo.cabelo");
    manager.addDocument("pt", "cabelo", "fluxo.cabelo");
    manager.addDocument("pt", "cortar cabelo", "fluxo.cabelo");
    manager.addDocument("pt", "corte de cabelo", "fluxo.cabelo");
    manager.addDocument("pt", "quero cortar o cabelo", "fluxo.cabelo");

    manager.addAnswer(
        "pt", 
        "fluxo.cabelo",
        `
            Beleza! Estes são os tipos de corte disponíveis: \n
            1 - Corte Simples - R$ 35,00\n
            2 - Corte com acabamento - R$ 45,00\n
            3 - Corte Degradê - R$ 50,00\n
            4 - Corte Social - R$ 40,00\n
        ` 
    );
    manager.addAnswer(
        "pt", 
        "fluxo.cabelo",
        `
            Ta certo! Estes são os tipos de corte disponíveis: \n
            1 - Corte Simples - R$ 35,00\n
            2 - Corte com acabamento - R$ 45,00\n
            3 - Corte Degradê - R$ 50,00\n
            4 - Corte Social - R$ 40,00\n
        ` 
    );
    manager.addAnswer(
        "pt", 
        "fluxo.cabelo",
        `
            Tranquilo! Estes são os tipos de corte disponíveis: \n
            1 - Corte Simples - R$ 35,00\n
            2 - Corte com acabamento - R$ 45,00\n
            3 - Corte Degradê - R$ 50,00\n
            4 - Corte Social - R$ 40,00\n
        ` 
    );

    manager.addDocument("")


}