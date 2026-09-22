# Risk Front

Frontend React 19 da plataforma Risk, organizado por domínio e alinhado ao padrão visual do Obelisco.

```bash
cp .env.example .env
npm install
npm run dev
```

A API deve estar disponível em `http://localhost:8080/api`. No ambiente local, use `admin` / `password`.

## Verificação

```bash
npm run lint
npm test
npm run build
```

O frontend anterior em Angular foi removido após a migração para React.

## Docker

O ambiente integrado é iniciado pelo backend:

```bash
cd ../risk-organograma
./infra/local-environment.sh
```

O build multi-stage usa Node 22 e publica os arquivos estáticos com Nginx. No ambiente Docker, chamadas para `/api` são encaminhadas ao serviço backend sem expor endereços internos ao navegador.
