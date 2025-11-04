// Funções utilitárias para interagir com Supabase
import supabase from './supabaseClient.js'

// Exemplo: Função para inserir dados em uma tabela
export const inserirRegistro = async (tabela, dados) => {
  try {
    const { data, error } = await supabase
      .from(tabela)
      .insert(dados)
      .select()
    
    if (error) throw error
    return { sucesso: true, dados: data }
  } catch (error) {
    console.error('Erro ao inserir registro:', error)
    return { sucesso: false, erro: error.message }
  }
}

// Exemplo: Função para buscar dados de uma tabela
export const buscarRegistros = async (tabela, filtros = {}) => {
  try {
    let query = supabase.from(tabela).select('*')
    
    // Aplicar filtros se fornecidos
    Object.entries(filtros).forEach(([campo, valor]) => {
      query = query.eq(campo, valor)
    })
    
    const { data, error } = await query
    
    if (error) throw error
    return { sucesso: true, dados: data }
  } catch (error) {
    console.error('Erro ao buscar registros:', error)
    return { sucesso: false, erro: error.message }
  }
}

// Exemplo: Função para atualizar dados
export const atualizarRegistro = async (tabela, id, dadosAtualizados) => {
  try {
    const { data, error } = await supabase
      .from(tabela)
      .update(dadosAtualizados)
      .eq('id', id)
      .select()
    
    if (error) throw error
    return { sucesso: true, dados: data }
  } catch (error) {
    console.error('Erro ao atualizar registro:', error)
    return { sucesso: false, erro: error.message }
  }
}

// Exemplo: Função para deletar dados
export const deletarRegistro = async (tabela, id) => {
  try {
    const { error } = await supabase
      .from(tabela)
      .delete()
      .eq('id', id)
    
    if (error) throw error
    return { sucesso: true }
  } catch (error) {
    console.error('Erro ao deletar registro:', error)
    return { sucesso: false, erro: error.message }
  }
}

// Exemplo: Função para upload de arquivos
export const uploadArquivo = async (bucket, nomeArquivo, arquivo) => {
  try {
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(nomeArquivo, arquivo)
    
    if (error) throw error
    return { sucesso: true, dados: data }
  } catch (error) {
    console.error('Erro ao fazer upload:', error)
    return { sucesso: false, erro: error.message }
  }
}

// Exemplo: Função para autenticação (login)
export const fazerLogin = async (email, senha) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password: senha
    })
    
    if (error) throw error
    return { sucesso: true, usuario: data.user }
  } catch (error) {
    console.error('Erro ao fazer login:', error)
    return { sucesso: false, erro: error.message }
  }
}

// Exemplo: Função para registro de usuário
export const registrarUsuario = async (email, senha, metadados = {}) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password: senha,
      options: {
        data: metadados
      }
    })
    
    if (error) throw error
    return { sucesso: true, usuario: data.user }
  } catch (error) {
    console.error('Erro ao registrar usuário:', error)
    return { sucesso: false, erro: error.message }
  }
}

// Exemplo: Função para logout
export const fazerLogout = async () => {
  try {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
    return { sucesso: true }
  } catch (error) {
    console.error('Erro ao fazer logout:', error)
    return { sucesso: false, erro: error.message }
  }
}

// Exemplo: Função para obter usuário atual
export const obterUsuarioAtual = () => {
  return supabase.auth.getUser()
}

// Exemplo: Função para escutar mudanças em tempo real
export const escutarMudancas = (tabela, callback) => {
  return supabase
    .channel(`mudancas-${tabela}`)
    .on('postgres_changes', 
      { event: '*', schema: 'public', table: tabela }, 
      callback
    )
    .subscribe()
}