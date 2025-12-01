from rest_framework.throttling import AnonRateThrottle

class MatriculaAnonRateThrottle(AnonRateThrottle):
    rate = '5/day' # Limita a 5 requisições anônimas por dia