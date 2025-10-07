FROM python:3.11-slim
# Recebe UID/GID do host via build args (padrão 1000)
ARG UID=1000
ARG GID=1000
RUN groupadd -g $GID appgroup \
    && useradd -m -u $UID -g $GID appuser

# Instalar dependências do sistema
RUN apt-get update && apt-get install -y \
    gcc \
    libpq-dev \
    netcat-openbsd \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

USER appuser
COPY . .
EXPOSE 5000
ENTRYPOINT ["./docker-entrypoint.sh"]
CMD ["python", "run.py"]
