# Configuração do Supabase

Este projeto está configurado para usar o Supabase como backend. Aqui estão as informações e instruções completas.

## ✅ Configuração Atual

### Dependências Instaladas
- `@supabase/supabase-js: ^2.78.0` ✅

### Estrutura de Arquivos
```
src/
├── API/
│   ├── supabaseClient.js      # Cliente configurado do Supabase
│   ├── supabaseFunctions.js   # Funções utilitárias
│   └── calendario-caf-28244081747e.json
└── Components/
    ├── SupabaseTest.jsx       # Componente para testar conexão
    └── ExemploSupabase.jsx    # Exemplo completo de uso
```

### Variáveis de Ambiente
Arquivo `.env` na raiz do projeto:
```
VITE_SUPABASE_URL=https://dhnymmpiofjwogjohkhx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## 🚀 Como Usar

### 1. Importar o Cliente
```javascript
import supabase from './src/API/supabaseClient.js'
```

### 2. Usar Funções Utilitárias
```javascript
import { inserirRegistro, buscarRegistros } from './src/API/supabaseFunctions.js'

// Inserir dados
const resultado = await inserirRegistro('tabela', { nome: 'Teste' })

// Buscar dados
const dados = await buscarRegistros('tabela')
```

### 3. Operações Básicas

#### Inserir Dados
```javascript
const { data, error } = await supabase
  .from('tabela')
  .insert({ nome: 'João', email: 'joao@email.com' })
  .select()
```

#### Buscar Dados
```javascript
const { data, error } = await supabase
  .from('tabela')
  .select('*')
  .eq('ativo', true)
```

#### Atualizar Dados
```javascript
const { data, error } = await supabase
  .from('tabela')
  .update({ nome: 'João Silva' })
  .eq('id', 1)
```

#### Deletar Dados
```javascript
const { error } = await supabase
  .from('tabela')
  .delete()
  .eq('id', 1)
```

## 🗄️ Configuração de Tabelas no Supabase

### Acesso ao Painel
1. Vá para [supabase.com/dashboard](https://supabase.com/dashboard)
2. Faça login e selecione seu projeto
3. No menu lateral, clique em "Table Editor"

### Exemplo de Tabela: `contatos`
```sql
CREATE TABLE contatos (
  id BIGSERIAL PRIMARY KEY,
  nome TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  telefone TEXT,
  mensagem TEXT,
  data_envio TIMESTAMPTZ DEFAULT NOW(),
  respondido BOOLEAN DEFAULT FALSE
);
```

### Exemplo de Tabela: `projetos`
```sql
CREATE TABLE projetos (
  id BIGSERIAL PRIMARY KEY,
  titulo TEXT NOT NULL,
  descricao TEXT,
  imagem_url TEXT,
  data_inicio DATE,
  data_fim DATE,
  status TEXT DEFAULT 'ativo',
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Exemplo de Tabela: `servicos`
```sql
CREATE TABLE servicos (
  id BIGSERIAL PRIMARY KEY,
  nome TEXT NOT NULL,
  descricao TEXT,
  preco DECIMAL(10,2),
  ativo BOOLEAN DEFAULT TRUE,
  categoria TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

## 🔐 Autenticação

### Configurar Autenticação
```javascript
// Login
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@email.com',
  password: 'senha'
})

// Registro
const { data, error } = await supabase.auth.signUp({
  email: 'user@email.com',
  password: 'senha'
})

// Logout
const { error } = await supabase.auth.signOut()

// Verificar usuário atual
const { data: { user } } = await supabase.auth.getUser()
```

## 📁 Storage (Arquivos)

### Upload de Arquivos
```javascript
const { data, error } = await supabase.storage
  .from('imagens')
  .upload('projetos/projeto1.jpg', arquivo)

// URL pública
const { data } = supabase.storage
  .from('imagens')
  .getPublicUrl('projetos/projeto1.jpg')
```

## 🔄 Tempo Real

### Escutar Mudanças
```javascript
const canal = supabase
  .channel('mudancas-contatos')
  .on('postgres_changes', 
    { event: '*', schema: 'public', table: 'contatos' }, 
    (payload) => {
      console.log('Mudança detectada:', payload)
    }
  )
  .subscribe()
```

## 🛡️ Segurança (RLS)

### Habilitar Row Level Security
```sql
-- Habilitar RLS
ALTER TABLE contatos ENABLE ROW LEVEL SECURITY;

-- Política para leitura pública
CREATE POLICY "Permitir leitura pública" ON contatos
FOR SELECT USING (true);

-- Política para inserção pública
CREATE POLICY "Permitir inserção pública" ON contatos
FOR INSERT WITH CHECK (true);
```

## 🧪 Testes

Para testar a conexão, adicione ao seu componente:
```jsx
import SupabaseTest from './Components/SupabaseTest.jsx'

// No seu JSX
<SupabaseTest />
```

## 📊 Monitoramento

### Logs no Painel
- Vá em "Logs" no painel do Supabase
- Monitore queries, autenticação e erros
- Configure alertas se necessário

## 🚨 Dicas Importantes

1. **Nunca commite** a chave `service_role` - use apenas a `anon_key`
2. **Configure RLS** para proteger dados sensíveis
3. **Use índices** em colunas frequentemente consultadas
4. **Monitore uso** para evitar limites do plano gratuito
5. **Backup regular** dos dados importantes

## 📞 Suporte

- Documentação oficial: [supabase.com/docs](https://supabase.com/docs)
- Discord da comunidade: [discord.supabase.com](https://discord.supabase.com)
- GitHub: [github.com/supabase/supabase](https://github.com/supabase/supabase)