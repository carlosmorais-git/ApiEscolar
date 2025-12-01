@echo off
title Inicializador API
echo Criando as variaveis de ambiente...

set CAMINHO_BACKEND=C:\Users\carlo\Documents\GitHub\_Projetos\DjangoRF-API
set AMBIENTE_BACKEND=venv\Scripts\activate
set SERVIDOR_BACKEND=python manage.py runserver

timeout /t 5 >nul

echo Iniciando o backend...
start /min "Backend" cmd /k "cd /d %CAMINHO_BACKEND% && call %AMBIENTE_BACKEND% && %SERVIDOR_BACKEND%"

timeout /t 5 >nul

echo  Todo foi iniciado com sucesso!

