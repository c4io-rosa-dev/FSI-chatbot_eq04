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
        `,
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
            5 - Mais informações
        `,
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
            5 - Mais informações
        `,
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
            5 - Mais informações
        `,
  );

  manager.addDocument("pt", "1", "fluxo.cabelo.cortes");
  manager.addDocument("pt", "2", "fluxo.cabelo.cortes");
  manager.addDocument("pt", "3", "fluxo.cabelo.cortes");
  manager.addDocument("pt", "4", "fluxo.cabelo.cortes");
  manager.addDocument("pt", "Corte Simples", "fluxo.cabelo.cortes");
  manager.addDocument("pt", "Corte com acabamento", "fluxo.cabelo.cortes");
  manager.addDocument("pt", "Corte Degradê", "fluxo.cabelo.cortes");
  manager.addDocument("pt", "Corte Social", "fluxo.cabelo.cortes");

  manager.addAnswer(
    "pt",
    "fluxo.cabelo.cortes",
    `Boa escolha! Agora preencha essa ficha de agendamento:\n
         Nome: \n 
         Telefone: \n 
        `,
  );

  manager.addAnswer(
    "pt",
    "fluxo.cabelo.cortes",
    `Ótima escolha! Agora preencha essa ficha de agendamento:\n
         Nome: \n 
         Telefone: \n 
    `,
  );

  manager.addAnswer(
    "pt",
    "fluxo.cabelo.cortes",
    `   Beleza! Agora preencha essa ficha de agendamento:\n
        Nome: \n 
        Telefone: \n 
    `,
  );

  // Fluxo Barba
  manager.addDocument("pt", "2", "fluxo.barba");
  manager.addDocument("pt", "barba", "fluxo.barba");
  manager.addDocument("pt", "fazer barba", "fluxo.barba");
  manager.addDocument("pt", "barbear", "fluxo.barba");
  manager.addDocument("pt", "quero fazer a barba", "fluxo.barba");

  manager.addAnswer(
    "pt",
    "fluxo.barba",
    `
            Certo! Aqui estão os estilos para barba disponíveis: \n
            1 - Corte Simples Máquina - R$ 20,00\n
            2 - Corte Simples Navalha - R$ 25,00\n
            3 - Micropigmentação - R$ 20,00\n
            4 - Mais informações\n
        `,
  );
  manager.addAnswer(
    "pt",
    "fluxo.barba",
    `
            Ótimo! Conheça os estilos para barba disponíveis: \n
            1 - Corte Simples Máquina - R$ 20,00\n
            2 - Corte Simples Navalha - R$ 25,00\n
            3 - Micropigmentação - R$ 20,00\n
            4 - Mais informações\n
        `,
  );
  manager.addAnswer(
    "pt",
    "fluxo.barba",
    `
            Tranquilo! Estes são os estilos para barba disponíveis: \n
            1 - Corte Simples Máquina - R$ 20,00\n
            2 - Corte Simples Navalha - R$ 25,00\n
            3 - Micropigmentação - R$ 20,00\n
            4 - Mais informações\n
        `,
  );

  manager.addDocument("pt", "1", "fluxo.barba.cortes");
  manager.addDocument("pt", "2", "fluxo.barba.cortes");
  manager.addDocument("pt", "3", "fluxo.barba.cortes");
  manager.addDocument("pt", "Corte Simples Máquina", "fluxo.barba.cortes");
  manager.addDocument("pt", "Corte Simples Navalha", "fluxo.barba.cortes");
  manager.addDocument("pt", "Micropigmentação", "fluxo.barba.cortes");

  manager.addAnswer(
    "pt",
    "fluxo.barba.cortes",
    `Boa escolha! Agora preencha essa ficha de agendamento:\n
         Nome: \n 
         Telefone: \n 
        `,
  );

  manager.addAnswer(
    "pt",
    "fluxo.barba.cortes",
    `Ótima escolha! Agora preencha essa ficha de agendamento:\n
         Nome: \n 
         Telefone: \n 
    `,
  );

  manager.addAnswer(
    "pt",
    "fluxo.barba.cortes",
    `   Beleza! Agora preencha essa ficha de agendamento:\n
        Nome: \n 
        Telefone: \n 
    `,
  );

  
  //  Maneiras de extrair variavel
  manager.addDocument(
    "pt",
    `
        Nome: %nome% 
    `,
  );
}
