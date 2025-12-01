# Django DRF + Swagger (drf-yasg) Boilerplate

Este arquivo contém um guia e um exemplo completo para você adicionar Swagger/OpenAPI 2 ao seu projeto Django REST Framework.

---

## 📁 Estrutura proposta

```
project/
│── manage.py
│── project/
│     ├── settings.py
│     ├── urls.py
│── api/
      ├── views.py
      ├── serializers.py
      ├── urls.py
```

---

## 📦 Instalação

```
pip install drf-yasg
pip install djangorestframework
pip install beautifulsoup4
pip install requests
```

---

## ⚙ settings.py

```python
INSTALLED_APPS = [
    ...,
    "rest_framework",
    "drf_yasg",
    "api",
]
```

---

## 🌐 project/urls.py

```python
from django.contrib import admin
from django.urls import path, include, re_path
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

schema_view = get_schema_view(
    openapi.Info(
        title="API de Raspagem",
        default_version='v1',
        description="Documentação da API",
    ),
    public=True,
    permission_classes=[permissions.AllowAny],
)

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include("api.urls")),

    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
]
```

---

## 🧱 api/urls.py

```python
from django.urls import path
from .views import ScrapingAPIView

urlpatterns = [
    path("scrape/", ScrapingAPIView.as_view()),
]
```

---

## 🧠 api/views.py

```python
import requests
from bs4 import BeautifulSoup # pip install beautifulsoup4 requests
from rest_framework.views import APIView
from rest_framework.response import Response
from drf_yasg.utils import swagger_auto_schema

class ScrapingAPIView(APIView):

    @swagger_auto_schema(
        operation_description="Raspa informações de um site e retorna o título da página.",
        responses={200: "Sucesso"}
    )
    def get(self, request):
        url = "https://example.com"

        resp = requests.get(url)
        soup = BeautifulSoup(resp.text, "html.parser")

        title = soup.find("h1").text if soup.find("h1") else None

        return Response({"titulo": title})
```

---

## 🎉 Rotas disponíveis

- `/swagger/` → Interface Swagger
- `/redoc/` → Interface Redoc
- `/api/scrape/` → Endpoint da raspagem

---

Pronto! Agora você tem um projeto Django DRF completo com Swagger.
