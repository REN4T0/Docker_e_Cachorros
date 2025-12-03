# Importando a imagem oficial do PHP com Apache
FROM php:8.2-apache

# Primeiro, atualizando as dependências do meu container (com update, visto que é Linux) e depois,
# instalando as bibliotecas necessárias para conseguir rodar o PHP com Postgresql.
RUN apt-get update && apt-get install -y libpq-dev && docker-php-ext-install pdo pdo_pgsql pgsql

# Habilita o mod_rewrite do apache para rotas e URLs amigáveis???
RUN a2enmod rewrite

# Copiando os arquivos da minha pasta atual para a pasta 'html' do container.
COPY . /var/www/html