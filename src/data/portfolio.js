export const profile = {
  name: 'Pedro Lucas Ornellas de Abreu',
  shortName: 'Pedro Lucas',
  role: 'Data Analyst Intern',
  education: 'Sistemas de Informação — CEFET/RJ',
  location: 'Nova Friburgo — RJ',
  age: '22 anos',
  language: 'Inglês básico',
  status: 'Disponível para estágio',
  summary:
    'Transformo dados dispersos em histórias claras, decisões melhores e produtos que fazem sentido.',
}

export const navigation = [
  ['overview', 'Início'],
  ['summary', 'Perfil'],
  ['why-data', 'Por que Dados'],
  ['journey', 'Jornada'],
  ['skills', 'Habilidades'],
  ['project', 'Projeto'],
  ['insights', 'Insights'],
  ['report', 'Relatório'],
  ['contact', 'Contato'],
]

export const stages = [
  { value: 10, label: 'Dados recebidos', target: 'overview' },
  { value: 30, label: 'Perfil validado', target: 'summary' },
  { value: 55, label: 'Padrões encontrados', target: 'why-data' },
  { value: 80, label: 'Evidências processadas', target: 'project' },
  { value: 100, label: 'Análise concluída', target: 'report' },
]

export const summaryFields = [
  ['Nome', profile.name],
  ['Idade', profile.age],
  ['Formação', profile.education],
  ['Localização', profile.location],
  ['Objetivo Profissional', profile.role],
  ['Idioma', profile.language],
  ['Status', profile.status],
]

export const journey = [
  {
    year: '2021',
    role: 'Técnico em Informática',
    company: 'CEFET/RJ',
    description: 'Base técnica em sistemas, lógica e desenvolvimento.',
    tags: ['Lógica', 'Sistemas'],
  },
  {
    year: '2022',
    role: 'Jovem Aprendiz',
    company: 'Rota 116 S/A',
    description: 'Rotinas administrativas e visão prática de processos.',
    tags: ['Processos', 'Excel'],
  },
  {
    year: '2023',
    role: 'Estagiário de Suporte',
    company: 'Sousa & Couto',
    description: 'Suporte técnico, atendimento e manutenção de sistemas.',
    tags: ['Suporte', 'Dados'],
  },
  {
    year: '2024',
    role: 'Desenvolvedor Web',
    company: 'WXS E-commerce',
    description: 'Produtos digitais com foco em clareza e operação.',
    tags: ['JavaScript', 'UX'],
  },
  {
    year: '2026+',
    role: 'Transição para Dados',
    company: 'Próximo capítulo',
    description: 'Aprofundamento em análise, SQL, Python e BI.',
    tags: ['SQL', 'Power BI'],
  },
]

export const skills = [
  { name: 'JavaScript', level: 92, label: 'Avançado' },
  { name: 'SQL', level: 72, label: 'Intermediário' },
  { name: 'Power BI', level: 68, label: 'Intermediário' },
  { name: 'Excel', level: 74, label: 'Intermediário' },
  { name: 'Python', level: 38, label: 'Básico' },
]

export const technologies = [
  'SQL',
  'Power BI',
  'Excel',
  'Python',
  'Pandas',
  'JavaScript',
  'HTML5',
  'CSS3',
  'Git',
]

export const insights = [
  'Dados bem estruturados são a base para qualquer boa decisão.',
  'Visualizar é transformar complexidade em clareza.',
  'O melhor insight nasce das perguntas certas.',
  'Tecnologia é meio. Impacto no negócio é o objetivo.',
]

export const project = {
  title: 'O Catálogo',
  eyebrow: 'Case Study em destaque',
  description:
    'Uma plataforma SaaS para catálogos digitais e gestão de pedidos de pequenos negócios.',
  facts: [
    ['Problema', 'Informação fragmentada, pedidos manuais e pouca visibilidade operacional.'],
    ['Abordagem', 'Modelagem clara, automações e uma experiência orientada a decisões.'],
    ['Tecnologias', 'PostgreSQL, SQL, Python, Power BI e JavaScript.'],
    ['Resultado', 'Dados organizados e indicadores que tornam a operação legível.'],
  ],
}

export const social = {
  github: 'https://github.com/PedroLucasOrnellas',
  linkedin: 'https://www.linkedin.com/in/pedro-lucas-ornellas-de-abreu',
  email: 'pedrolucasornellas69@gmail.com',
}
