# Arquitetura de Firebase Authentication

## Objetivo

Adicionar autenticação Firebase ao Flag Game sem exigir cadastro, sem criar interface de conta nesta etapa e sem acoplar Firebase à lógica principal do jogo.

O jogo continua offline-first. Se Firebase não estiver disponível, o app usa apenas o perfil local, ranking local, desafios locais e `playerId` existente.

## Módulo

Arquivo:

```text
js/firebase-auth.js
```

Global exposto:

```js
window.FlagGameAuth
```

Interface principal:

```js
FlagGameAuth.init()
FlagGameAuth.signInAnonymously()
FlagGameAuth.linkWithCredential(credential)
FlagGameAuth.getState()
FlagGameAuth.getStatus()
FlagGameAuth.setAdapter(adapter)
FlagGameAuth.getAdapter()
```

`app.js` não chama Firebase diretamente. Qualquer integração visual futura deve chamar `FlagGameAuth`, não o SDK Firebase.

## Adapters

### OfflineAuthAdapter

Usado quando:

- não existe `window.FlagGameFirebaseConfig`;
- o SDK Firebase compat não foi carregado;
- o Firebase falha ao inicializar;
- a autenticação falha por falta de conexão.

Ele nunca faz chamadas de rede e nunca bloqueia o jogo.

### FirebaseCompatAuthAdapter

Usado quando:

- `window.FlagGameFirebaseConfig` existe;
- o SDK compat está disponível em `window.firebase`;
- `firebase-app-compat.js` e `firebase-auth-compat.js` foram carregados antes de `js/firebase-auth.js`.

O adapter usa autenticação anônima e salva o `uid` retornado.

## Configuração Firebase

O projeto não mantém credenciais fixas dentro de `app.js`.

Antes de `js/firebase-auth.js`, o ambiente Web/PWA/Android pode carregar:

```html
<script src="https://www.gstatic.com/firebasejs/12.15.0/firebase-app-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/12.15.0/firebase-auth-compat.js"></script>
<script>
  window.FlagGameFirebaseConfig = {
    apiKey: "...",
    authDomain: "...",
    projectId: "...",
    appId: "..."
  };
</script>
```

Para Chrome Extension, não usar scripts remotos no HTML da extensão. O SDK deve ser empacotado localmente ou carregado por uma página Web autorizada, respeitando as regras de CSP da extensão.

## Chave local

Nova chave:

```text
flagGameAuthState
```

Formato:

```json
{
  "schemaVersion": 1,
  "playerId": "fgp_uuid",
  "firebaseUid": "firebase_uid",
  "isAnonymous": true,
  "providerIds": [],
  "createdAt": "2026-07-11T00:00:00.000Z",
  "updatedAt": "2026-07-11T00:00:00.000Z",
  "lastAuthAt": "2026-07-11T00:00:00.000Z",
  "lastError": ""
}
```

O `playerId` local continua sendo a identidade pública do jogo. O `firebaseUid` é apenas o vínculo técnico para sincronização/autenticação futura e não deve ser exibido nem enviado em payloads públicos de ranking.

## Fluxo de autenticação

1. `index.html` carrega `storage.js`, `ranking.js` e depois `firebase-auth.js`.
2. `FlagGameAuth.init()` roda automaticamente.
3. O módulo garante que existe um `playerId` local por meio de `FlagGameRanking.getPlayer()`.
4. Se Firebase estiver configurado e disponível, o adapter chama login anônimo.
5. Ao autenticar, salva `playerId + firebaseUid` em `flagGameAuthState`.
6. Se Firebase não estiver disponível, salva o estado local possível e mantém o app em modo offline.

## Vincular Google ou e-mail futuramente

Quando houver interface, o fluxo deve:

1. Obter a credencial do provedor.
2. Chamar `FlagGameAuth.linkWithCredential(credential)`.
3. Preservar o mesmo `firebaseUid` quando o link for aceito pelo Firebase.
4. Manter o mesmo `playerId` local.
5. Iniciar sincronização após o vínculo, sem apagar dados locais.

Essa estratégia permite transformar a conta anônima em conta Google/e-mail sem perder progresso.

## Compatibilidade

### Website

Pode usar SDK compat via CDN ou arquivos locais, desde que carregados antes de `js/firebase-auth.js`.

### PWA

Mesmo fluxo do Website. Se o usuário abrir offline, o app segue com dados locais e tenta autenticar em uma sessão futura.

### Android / Capacitor

Pode usar o mesmo Web SDK dentro da WebView ou trocar o adapter por uma implementação nativa no futuro, mantendo `FlagGameAuth` como contrato.

### Chrome Extension

Não depende de script remoto por padrão. Para usar Firebase dentro da extensão, empacotar SDK/config localmente e manter `js/firebase-auth.js` como camada de orquestração.

## Decisões desta etapa

- Nenhuma tela de login foi criada.
- Nenhum cadastro é exigido para jogar.
- Nenhuma regra do jogo foi alterada.
- `app.js` não importa nem chama Firebase.
- A autenticação é oportunista: melhora a preparação para sync, mas nunca bloqueia o uso offline.

## Pendências para Cloud Firestore

- Criar repositórios remotos por `firebaseUid`.
- Definir regras de segurança.
- Enviar eventos pendentes de ranking/desafios.
- Mesclar perfil remoto e local usando `docs/sync-strategy.md`.
- Tratar troca de dispositivo e conflitos por `eventId`.
