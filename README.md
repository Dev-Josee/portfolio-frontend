📸 Portfólio Fotográfico

Este é um projeto de portfólio fotográfico desenvolvido com a stack MERN (MongoDB, Express, React, Node.js).
O site tem como objetivo apresentar fotografias em diferentes categorias, além de disponibilizar um painel administrativo para gerenciar o conteúdo.

🚀 Funcionalidades
🌐 Frontend (público)

Página inicial com:

Biografia da fotógrafa

Galeria de fotos dividida em categorias (Ex: Eventos, Empresarial)

Formulário de contato integrado, permitindo que clientes enviem mensagens diretamente

Interface responsiva (desktop e mobile)

🔐 Painel Administrativo (/admin)

Autenticação via senha fixa

Área para editar a biografia

Upload de fotos diretamente do computador (sem necessidade de links externos)

Opção de excluir fotos

Organização das fotos por categoria

🛠️ Tecnologias Utilizadas
Frontend

React (com Vite para build rápido)

CSS Modules para estilização isolada

Estrutura modular (componentes e páginas separados)

Backend

Node.js + Express

MongoDB para armazenamento de dados

Biografia

Informações das fotos (nome, categoria, caminho da imagem)

Multer para upload de imagens

Cors para comunicação frontend-backend




📊 Fluxo de Uso

Visitante

Acessa o site e vê a biografia + galeria de fotos

Pode navegar pelas categorias

Pode enviar mensagem através do formulário de contato

Admin

Acessa /admin

Faz login com a senha fixa

Pode editar a biografia

Pode adicionar fotos (upload do PC)

Pode excluir fotos existentes

🔮 Melhorias Futuras

Autenticação com múltiplos usuários e JWT

Filtros e busca por fotos

Área de contato integrada a serviços de email (Ex: Nodemailer)

Deploy em servidor cloud (Heroku, Vercel ou Netlify + Render)
