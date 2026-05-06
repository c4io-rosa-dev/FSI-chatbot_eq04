import dinoProfissional from '@/assets/dinoProfissional.png';
import souProfissional from '@/assets/souProfissional.jpg';
import samuProfissional from '@/assets/samuProfissional.png';

export interface Servico {
  id: string;
  nome: string;
  preco: number;
  duracao: string;
  desc: string;
}

export interface ComboItem {
  nome: string;
  preco: string;
}

export interface ComboGrupo {
  grupo: string;
  faixa: string;
  items: ComboItem[];
}

export interface Plano {
  id: string;
  nome: string;
  preco: number;
  inclui: string[];
  destaque?: boolean;
}

export interface Profissional {
  id: string;
  nome: string;
  titulo: string;
  anos: number;
  especialidade: string;
  bio: string;
  foto: string;
}

export interface HorarioDisp {
  data: string;
  slots: string[];
}

export const CORTES: Servico[] = [
  { id: 'simples', nome: 'Corte Simples', preco: 35, duracao: '40-45 min', desc: 'Corte clássico, máquina e tesoura.' },
  { id: 'acabamento', nome: 'Corte com Acabamento', preco: 45, duracao: '50 min', desc: 'Corte completo com acabamento detalhado em navalha.' },
  { id: 'degrade', nome: 'Corte Degradê', preco: 50, duracao: '50 min', desc: 'Degradê preciso, precisão milimétrica entre as camadas.' },
  { id: 'social', nome: 'Corte Social', preco: 40, duracao: '50 min', desc: 'Estilo executivo. Único, discreto e atemporal.' },
];

export const BARBAS: Servico[] = [
  { id: 'maquina', nome: 'Barba na Máquina', preco: 20, duracao: '20 min', desc: 'Modelagem rápida e precisa.' },
  { id: 'navalha', nome: 'Barba na Navalha', preco: 25, duracao: '20 min', desc: 'A navalha, uma toalha quente, óleo. Ritual completo, feito no seu ritmo.' },
  { id: 'micro', nome: 'Micro-Pigmentação', preco: 20, duracao: '5 min', desc: 'Preenchimento estético para falhas na barba.' },
];

export const COMBOS: ComboGrupo[] = [
  {
    grupo: 'Básicos',
    faixa: 'R$ 45 – 85',
    items: [
      { nome: 'Corte + Barba', preco: '75 – 85' },
      { nome: 'Barba + Sobrancelha', preco: '45 – 65' },
      { nome: 'Corte + Hidratação', preco: '60 – 75' },
    ],
  },
  {
    grupo: 'Intermediários',
    faixa: 'R$ 70 – 85',
    items: [
      { nome: 'Corte + Barba + Sobrancelha (Completo)', preco: '75 – 85' },
      { nome: 'Corte + Lavagem + Finalização', preco: '70 – 80' },
    ],
  },
  {
    grupo: 'Completos',
    faixa: 'R$ 110 – 150',
    items: [
      { nome: 'Corte + Barba + Hidratação + Toalha quente', preco: '110 – 130' },
      { nome: 'Corte + Barba + Sobrancelha + Hidratação + Lavagem', preco: '125 – 150' },
      { nome: 'Barba + Limpeza de pele + Sobrancelha', preco: '75 – 85' },
    ],
  },
];

export const PLANOS: Plano[] = [
  { id: 'cabelo', nome: 'Cabelo', preco: 149.99, inclui: ['Corte ou cabelo quantas vezes desejar', 'Profissional de sua preferência', 'Agendamento prioritário'] },
  { id: 'barba', nome: 'Barba', preco: 119.99, inclui: ['Faça a barba quantas vezes desejar', 'Toalha quente e produtos premium', 'Agendamento prioritário'] },
  { id: 'completo', nome: 'Cabelo + Barba', preco: 229.99, destaque: true, inclui: ['Corte ou cabelo quantas vezes desejar', 'Faça a barba quantas vezes desejar', 'Agendamento prioritário', 'Plano nominal — apenas para o titular'] },
];

export const PROFISSIONAIS: Profissional[] = [
  { id: 'guilherme', nome: 'Guilherme Dino', titulo: 'Mestre Barbeiro', anos: 8, especialidade: 'Degradê & navalha', bio: 'Formado pela Wahl Academy. Trabalha com clássicos atemporais e degradê de precisão milimétrica.', foto: dinoProfissional },
  { id: 'caio', nome: 'Caio Rosa', titulo: 'Barbeiro Sênior', anos: 6, especialidade: 'Corte social executivo', bio: 'Especialista em corte social. Atende a clientela executiva mais discreta da casa.', foto: souProfissional },
  { id: 'samuel', nome: 'Samuel Goes', titulo: 'Barbeiro Sênior', anos: 5, especialidade: 'Ritual completo de barba', bio: 'Mestre na navalha. Conduz o ritual de toalha quente, óleos e finalização.', foto: samuProfissional },
];

export const PAGAMENTO: string[] = ['Débito', 'Crédito', 'Dinheiro', 'Pix'];

export const HORARIOS_DISP: HorarioDisp[] = [
  { data: 'Hoje · 06 mai', slots: ['14:30', '15:30', '17:00', '19:30'] },
  { data: 'Amanhã · 07 mai', slots: ['10:00', '11:30', '14:00', '16:00', '18:30'] },
  { data: 'Sex · 08 mai', slots: ['09:30', '13:00', '15:00', '17:30'] },
];
