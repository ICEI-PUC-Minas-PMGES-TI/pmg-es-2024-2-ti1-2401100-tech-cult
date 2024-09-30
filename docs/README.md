# Documentação do Projeto - Culturar


# Introdução

O Brasil enfrenta uma disparidade no acesso à cultura, especialmente nas áreas periféricas e rurais. Muitos brasileiros têm dificuldade em participar de eventos culturais, acessar bibliotecas e centros culturais, e consumir arte de maneira geral. A tecnologia pode ser um facilitador no acesso à cultura, promovendo a democratização do conhecimento e o engajamento cultural.

## Problema

A falta de acesso à cultura resulta em exclusão social, dificultando o desenvolvimento intelectual e emocional de parte da população. Eventos culturais, bibliotecas, galerias de arte e museus, frequentemente, estão concentrados em áreas urbanas e são inacessíveis para comunidades mais afastadas, seja por distância geográfica ou por falta de recursos financeiros.

## Objetivos

O objetivo deste projeto é desenvolver uma aplicação web que conecte os cidadãos a oportunidades culturais, oferecendo uma plataforma acessível onde possam encontrar eventos culturais gratuitos ou a preços acessíveis, além de disponibilizar conteúdos educacionais e artísticos online.

## Justificativa

A cultura é um elemento essencial na formação de cidadãos conscientes e críticos. No entanto, o acesso à cultura ainda é limitado para grande parte da população brasileira. Ao propor uma solução tecnológica, visa-se criar um ambiente que facilite o acesso a atividades culturais, fortalecendo o impacto positivo que a cultura pode ter na sociedade.


## Público-Alvo

O público-alvo principal da aplicação são jovens e adultos que vivem em áreas periféricas e rurais com pouco acesso a atividades culturais, além de professores e educadores que desejam promover a cultura em suas comunidades.


## Personas

<p align="center"><img alt="Persona 01" src="https://github.com/ICEI-PUC-Minas-PMGES-TI/pmg-es-2024-2-ti1-2401100-tech-cult/blob/master/docs/assets/images/persona-01.jpg" width=600/></p>

<p align="center"><img alt="Persona 02" src="https://github.com/ICEI-PUC-Minas-PMGES-TI/pmg-es-2024-2-ti1-2401100-tech-cult/blob/master/docs/assets/images/persona-02.jpg" width=600/></p>

<p align="center"><img alt="Persona 03" src="https://github.com/ICEI-PUC-Minas-PMGES-TI/pmg-es-2024-2-ti1-2401100-tech-cult/blob/master/docs/assets/images/persona-03.jpg" width=600/></p>

## Histórias de Usuários

| Id | História de Usuário |
|----|----------------|
| 1 | Eu, como usuário, **desejo** encontrar eventos culturais gratuitos próximos de mim, para que eu possa participar e expandir meus conhecimentos artísticos. |
| 2 |  Eu, como professor, **quero** acessar conteúdos culturais digitais, como vídeos, exposições virtuais e materiais didáticos, para incluir em minhas aulas e enriquecer a educação de meus alunos. |
| 3 | Eu, como um organizador de eventos culturais, **preciso** divulgar meus eventos na plataforma, para atrair mais participantes, especialmente aqueles que não possuem acesso a outros meios de divulgação.|


## Requisitos
| Requisitos Funcionais | Requisitos Não Funcionais|
|----------------|----------------|
| O sistema deve permitir que o agente cultural se cadastre na plataforma | O sistema deve ser acessível aos usuários que tem dificuldade em utilizar aparelhos eletrônicos (ex: idosos) aplicando métricas de acessibilidade no design da plataforma |
| O sistema deve permitir que o usuário se cadastre na plataforma caso ele queira | O sistema deve estar alinhado aos padrões de usabilidade do mercado, e à QMP 1 da ISO 9001 (foco no cliente), proporcionando maior qualidade na experiência do usuário |
| O sistema deve permitir que o usuário salve os eventos no qual planeja ir | O sistema deve ser passível de manutenção|
| O sistema deve permitir que o usuário tenha a opção de avaliar o evento, e comentar sobre ele | O sistema deve permitir que o usuário complete uma tarefa de cadastro de evento em menos de 5 minutos|
| Em um sistema de promoção de eventos culturais devem ser amazenadas as datas do evento, uma breve descrição, o local e quem são os agentes culturais envolvidos (organizadores) | O sistema deve carregar em menos de 3 segundos em redes móveis e Wi-Fi.|
| O sistema deve permitir que o usuário tenha a opção de avaliar o evento, e comentar sobre ele |  O sistema deve ser escalável, suportando o crescimento da quantidade de usuários sem perda de desempenho|
| O sistema deve permitir formas de filtros, para que os eventos possuam categorias. | O sistema deve ser responsivo, funcionando em celulares, tablets e desktops|
| O sistema deve possuir um feed com os eventos adicionados por diferentes usuários | O sistema deve ser compatível com a Lei Geral de Proteção de Dados|
| O sistema deve possuir um tutorial para que os usuários possam entender como usá-los |
| O sistema deve possuir uma opção de favoritar eventos |
| O sistema deve possuir integração com agendas externas como Google Calendar, para que a pessoa acompanhe os eventos que irá participar |
| O sistema deve possuir uma funcionalidade de denúncia de perfil, caso um usuário esteja impersonando outro |
| O sistema deve permitir que um agente cultural se cadastre em uma categoria especifica (ex: música, culinária, etc) |


## User Flow

<p align="center"><img alt="Persona 03" src="https://github.com/ICEI-PUC-Minas-PMGES-TI/pmg-es-2024-2-ti1-2401100-tech-cult/blob/master/docs/assets/images/Userflow.png"/></p>

## Wireframes
<a href="https://www.figma.com/design/AtERkdTTcbSxXVRLa6dXWR/Untitled?node-id=12-527&t=jCjKjBCQm7NMpeAr-1" target="_blank">Protótipo Interativo</a>

### Home
<p align="center"><img alt="Wireframe da Home" src="https://github.com/ICEI-PUC-Minas-PMGES-TI/pmg-es-2024-2-ti1-2401100-tech-cult/blob/master/docs/assets/images/Wireframe%2001%20-%20Desktop%20-%20Home.png"/></p>

<p align="center"><img alt="Wireframe da Home" src="https://github.com/ICEI-PUC-Minas-PMGES-TI/pmg-es-2024-2-ti1-2401100-tech-cult/blob/master/docs/assets/images/wireframe-02-desktop-home.png"/></p>

### Login

<p align="center"><img alt="Wireframe de Login" src="https://github.com/ICEI-PUC-Minas-PMGES-TI/pmg-es-2024-2-ti1-2401100-tech-cult/blob/master/docs/assets/images/wireframe-03-login.png"/></p>

### Cadastro

<p align="center"><img alt="Wireframe de Cadastro" src="https://github.com/ICEI-PUC-Minas-PMGES-TI/pmg-es-2024-2-ti1-2401100-tech-cult/blob/master/docs/assets/images/wireframe-04-cadastro.png"/></p>

<p align="center"><img alt="Wireframe de Cadastro bem-sucedido" src="https://github.com/ICEI-PUC-Minas-PMGES-TI/pmg-es-2024-2-ti1-2401100-tech-cult/blob/master/docs/assets/images/wireframe-05-cadastro.png"/></p>

### Feed

<p align="center"><img alt="Wireframe do Feed" src="https://github.com/ICEI-PUC-Minas-PMGES-TI/pmg-es-2024-2-ti1-2401100-tech-cult/blob/master/docs/assets/images/wireframe-06-feed.png"/></p>

<p align="center"><img alt="Wireframe do Feed" src="https://github.com/ICEI-PUC-Minas-PMGES-TI/pmg-es-2024-2-ti1-2401100-tech-cult/blob/master/docs/assets/images/wireframe-07-post-selecionado.png"/></p>

### Sobre Nós

<p align="center"><img alt="Wireframe Sobre Nós" src="https://github.com/ICEI-PUC-Minas-PMGES-TI/pmg-es-2024-2-ti1-2401100-tech-cult/blob/master/docs/assets/images/wireframe-08-sobre-nos.png"/></p>

## Gestão de Projetos

O projeto foi desenvolvido usando as metodologias Scrum e Kanban, tendo como principal ferramenta de gestão o Trello, da Atlassian

<p align="center"><img alt="Trello do Culturar" src="https://github.com/ICEI-PUC-Minas-PMGES-TI/pmg-es-2024-2-ti1-2401100-tech-cult/blob/master/docs/assets/images/trello-culturar.png"/></p>
