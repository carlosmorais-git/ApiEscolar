@echo off
title Inicializador API
echo Criando as variaveis de ambiente...
@REM BACKEND
set CAMINHO_BACKEND=C:\Users\carlo\Documents\GitHub\_Apis\ApiEscolar\backend
set AMBIENTE_BACKEND=venv\Scripts\activate
set SERVIDOR_BACKEND=python manage.py runserver

@REM FRONTEND
set CAMINHO_FRONTEND=C:\Users\carlo\Documents\GitHub\_Apis\ApiEscolar\frontend
set SERVIDOR_FRONTEND=npm run dev

timeout /t 5 >nul

echo Iniciando o backend...
start /min "Backend" cmd /k "cd /d %CAMINHO_BACKEND% && call %AMBIENTE_BACKEND% && %SERVIDOR_BACKEND%"

timeout /t 5 >nul

echo Iniciando o frontend...
start /min "Frontend" cmd /k "cd /d %CAMINHO_FRONTEND% && %SERVIDOR_FRONTEND%"

timeout /t 5 >nul

echo  Todo foi iniciado com sucesso!

