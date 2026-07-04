Perfeito — agora entendi exatamente o ajuste que você quer fazer no CONTRACT 1.1:

> não é “explicar o sistema atual”
> é **reconstruir a evolução real até o estado atual**, com narrativa completa, decisões, desvios e contexto histórico

Vou evoluir o documento mantendo sua estrutura original, mas já incorporando a **realidade que vocês chegaram hoje (Manifest, Engine, EventContext, AppShell, UX PWA, pipeline e decisões recentes)**.

---

# 📘 CANGUESS SYSTEM CONTRACT

## Versão 1.1 — *Evolução Real do Sistema (Narrativa Completa)*

---

# 0. PREFÁCIO — POR QUE ESTE DOCUMENTO EXISTE

O Canguess não evolui de forma linear.

Ele evolui por:

* implementação incremental
* decisões arquiteturais contínuas
* correções de rota
* descobertas durante uso real
* e validação prática no sistema em produção

Este documento existe para preservar:

> não apenas o que o sistema é
> mas como ele chegou a ser o que é

Ele é um **registro histórico da construção viva do sistema**, não uma especificação final.

---

# 1. FILOSOFIA DE DESENVOLVIMENTO

## 1.1 Cooperação Humano + IA

O sistema evolui através de uma cooperação contínua:

### IA:

* organiza complexidade emergente
* estrutura padrões técnicos
* detecta inconsistências arquiteturais
* sugere consolidação de sistemas

### Humano:

* define intenção e direção do produto
* valida coerência conceitual
* toma decisões de corte e priorização
* mantém consistência da visão original

---

## 1.2 Risco estrutural identificado

Durante evolução acelerada do sistema foi identificado um risco central:

> a velocidade de implementação supera a capacidade de retenção do contexto arquitetural

Isso cria sistemas que:

* funcionam tecnicamente
* mas perdem coerência histórica
* e começam a divergir da intenção original

---

# 2. HISTÓRICO DAS VERSÕES

## v0.1 → v0.4 — Fundação

* estrutura inicial do conceito de eventos
* primeiras implementações de frontend/backend
* ausência de pipeline formal
* dados fortemente acoplados ao banco

---

## v0.5 — Participação aberta

* início da ideia de usuários interagindo com eventos
* surgimento de palpites/predictions
* aumento de complexidade de dados

---

## v0.6 — Sistema orientado a contexto

* introdução da ideia de contexto de evento
* primeiras tentativas de centralização de estado
* início da fragmentação de rotas

---

## v1.0 — Consolidação do Evento como Unidade Central

* evento passa a ser entidade principal do sistema
* introdução do EventContext como base de navegação
* primeiras regras de consistência entre páginas
* início da padronização estrutural

---

## v1.1 — Sistema híbrido: contexto + filesystem + engine

* introdução do Manifest como estrutura de evento
* eventos passam a ter representação em arquivos
* engine começa a gerar estrutura derivada
* pipeline ainda parcialmente manual
* início da separação entre dados e apresentação

---

# 3. O EVENTO COMO ELEMENTO CENTRAL

## Evolução conceitual

### Fase 1:

Evento = registro no banco

### Fase 2:

Evento = contexto de navegação

### Fase 3:

Evento = entidade social + estrutural

### Fase atual (v1.1):

Evento = conjunto de:

* dados (Supabase)
* estrutura (Manifest)
* assets (filesystem)
* contexto (EventContext)
* renderização (frontend)

---

## Consequência arquitetural

O frontend deixa de consumir dados isolados e passa a consumir:

> um **ecossistema de evento estruturado**

---

# 4. EVENT CONTEXT

## Problema original

* navegação entre páginas quebrava estado
* perda de evento ativo
* inconsistência entre rotas

---

## Solução implementada

* criação do `EventContext`
* centralização do evento ativo
* carregamento por código via URL

---

## Limitações atuais

* dependência de runtime navigation
* acoplamento com query string
* risco de estado inconsistente em reload
* necessidade de maior robustez em PWA

---

# 5. WORKSPACES (CONCEITO EM EVOLUÇÃO)

## Origem

Derivado da necessidade de:

* agrupar entidades relacionadas a eventos
* separar domínio de usuários e administração
* estruturar contexto organizacional

---

## Problema que resolve

* excesso de dispersão de entidades no sistema
* dificuldade de segmentação lógica

---

## Status

* conceito definido
* implementação parcial
* integração futura com engine e manifest

---

# 6. EVENTO COMO ARQUIVO (MUDANÇA CRÍTICA DA v1.1)

## Evolução do modelo

### Antes:

* banco de dados era fonte única

### Depois:

* banco + frontend desacoplado parcialmente

### Agora:

* filesystem passa a conter estrutura derivada

---

## Introdução do Manifest

Cada evento passa a possuir:

```json
Manifest.CODE.json
```

Função:

* descrever estrutura do evento
* servir como ponte entre backend e frontend
* reduzir dependência direta do banco

---

## Decisão crítica

❌ remoção progressiva de `events-index.json`

Motivo:

* não escala
* cria gargalo centralizado
* conflita com modelo distribuído

---

# 7. ENGINE 2.0 → 2.1 (ESTABILIZAÇÃO)

## Estado atual

* scripts fragmentados
* geração manual parcial
* inconsistência entre eventos gerados

---

## Objetivo da evolução

Transformar criação de evento em pipeline:

```
evento → engine → manifest → assets → frontend
```

---

## Limitações atuais

* ausência de automação total
* dependência de execução manual
* falta de pipeline reativo completo

---

# 8. PIPELINE DE CRIAÇÃO DE EVENTOS

## Estado atual

Manual com apoio parcial de scripts

---

## Direção futura

Automação via:

* triggers Supabase
* engine no Render
* geração automática de manifest
* publicação estruturada no storage

---

## Problema identificado

Cada novo evento ainda exige intervenção técnica em múltiplos pontos do sistema

---

# 9. ESTABILIZAÇÃO DA v1.0 (PRINCÍPIO CRÍTICO)

Antes de evoluir para automação total:

* sistema precisa ser previsível
* comportamento precisa ser consistente
* regressões precisam ser evitadas

---

## Princípio central

> estabilidade operacional é prioridade sobre arquitetura perfeita

---

# 10. CONCEITOS FUTUROS (JÁ DEFINIDOS, NÃO IMPLEMENTADOS)

## Sistema de Status de Evento

* draft
* open
* closed
* processing
* published
* archived

---

## Social Core Layer (Dev futuro)

Separação entre:

* engine estável
* camada social dinâmica

---

# 11. DECISÕES ABANDONADAS

## 11.1 events-index.json global

❌ abandonado

Motivo:

* centralização excessiva
* crescimento não controlado
* conflito com arquitetura distribuída

---

## 11.2 Banco de dados como única fonte de estrutura

❌ abandonado parcialmente

Motivo:

* frontend precisa de estrutura derivada (manifest + assets)

---

## 11.3 UI baseada apenas em páginas isoladas

❌ abandonado

Motivo:

* quebra de consistência de contexto
* perda de identidade de evento

---

# 12. PROBLEMAS CONHECIDOS DA v1.1

* inconsistência entre runtime e filesystem
* pipelines parcialmente manuais
* dependência forte de EventContext
* geração incompleta de assets em alguns fluxos
* acoplamentos temporários entre camadas

---

# 13. PRINCÍPIOS DE EVOLUÇÃO

1. Nenhuma decisão é perdida — apenas evoluída ou abandonada com registro
2. Estabilidade antes de perfeição arquitetural
3. Separação clara entre dados, estrutura e apresentação
4. Toda decisão deve ter rastreabilidade histórica
5. O sistema é um processo, não um estado final

---

# 14. VISÃO DO SISTEMA

O Canguess evolui para:

> uma infraestrutura de eventos sociais estruturados, onde cada evento é um ecossistema independente de dados, contexto e experiência.

---

# 🔒 FECHO DO PATCH

Este documento consolida a versão 1.1 como:

> um registro histórico da evolução real do sistema Canguess até seu estado atual híbrido (DB + Context + Manifest + Engine parcial)

---

Se quiser o próximo passo natural, ele não é técnico — é estrutural:

👉 definir como os próximos patches vão ser gerados automaticamente dentro do próprio fluxo de desenvolvimento (sem depender de escrita manual)

Isso é o ponto onde esse CONTRACT vira um sistema vivo de memória real.

