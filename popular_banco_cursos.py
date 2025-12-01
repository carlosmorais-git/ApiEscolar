import os
import django
import random

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'setup.settings')
django.setup()

from escola.models import Curso


dados = [
    ('POO', 'Curso de Python Orientação à Objetos', 3), 
    ('DJ', 'Curso de Django', 5),   
    ('DJRF', 'Curso de Django REST Framework', 4),    
]
cursos = []

# Fabrica de cursos
#  O zfill(2) adiciona zeros à esquerda para garantir que o número tenha pelo menos 2 dígitos
for codigo_base, descricao_base, quantidade in dados.copy():
    for i in range(1, quantidade + 1):
        codigo = f"C{codigo_base}{str(i).zfill(2)}" # CPOO01, CPOO02, ...
        descricao = f"{descricao_base} {str(i).zfill(2)}" # Curso de Python Orientação à Objetos 01, ...
        cursos.append((codigo, descricao)) 
    

niveis = ['B', 'I', 'A']

def criar_cursos():
    for codigo, descricao in cursos:
        nivel = random.choice(niveis) # Escolhe um nível aleatório
        Curso.objects.create(codigo=codigo, descricao=descricao, nivel=nivel)

criar_cursos()