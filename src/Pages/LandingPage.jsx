import supabase from "../API/supabaseClient";
import { useEffect, useState } from "react";
import SimpleCard from "../Components/SimpleCard";
import "./LandingPage.css";
import HeroCard from "../Components/Herocard";


function LandingPage() {
  // Estados para gerir os dados do Supabase
  const [pausasLetivas, setPausasLetivas] = useState([]);
  const [servicos, setServicos] = useState([]);
  const [heroData, setHeroData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingServicos, setLoadingServicos] = useState(true);
  const [loadingHero, setLoadingHero] = useState(true);
  const [erro, setErro] = useState(null);
  const [erroServicos, setErroServicos] = useState(null);
  const [erroHero, setErroHero] = useState(null);

  // useEffect para buscar dados quando a página carrega
  useEffect(() => {
    async function buscarPausasLetivas() {
      try {
        setLoading(true);
        setErro(null);

        console.log('Buscando pausas letivas...');

        // Buscar dados da tabela schoolholidays incluindo imagens
        const { data, error } = await supabase
          .from('schoolholidays')
          .select('*')
          .order('start_date', { ascending: true });

        if (error) {
          throw error;
        }

        console.log('Pausas letivas carregadas:', data);
        console.log('Verificando TODOS os campos de cada item:');
        data?.forEach((item, index) => {
          console.log(`Item ${index + 1}:`, {
            'Todos os campos': Object.keys(item),
            'Valores completos': item
          });
        });
        
        console.log('Verificando especificamente campos de imagem:', data?.map(item => ({ 
          id: item.id, 
          title: item.title,
          image_url: item.img_url,
          img: item.img,
          imagem: item.imagem,
          photo: item.photo,
          picture: item.picture,
          acesslink: item.acesslink
        })));
        setPausasLetivas(data || []);

      } catch (error) {
        console.error('Erro ao buscar pausas letivas:', error);
        setErro(error.message);
      } finally {
        setLoading(false);
      }
    }

    async function buscarServicos() {
      try {
        setLoadingServicos(true);
        setErroServicos(null);

        console.log('Buscando serviços...');

        // Buscar dados da tabela service
        const { data, error } = await supabase
          .from('services')
          .select('*');

        if (error) {
          throw error;
        }

        console.log('Serviços carregados:', data);
        console.log('Verificando campos dos serviços:');
        data?.forEach((item, index) => {
          console.log(`Serviço ${index + 1}:`, {
            'Todos os campos': Object.keys(item),
            'Valores completos': item
          });
        });
        
        setServicos(data || []);

      } catch (error) {
        console.error('Erro ao buscar serviços:', error);
        setErroServicos(error.message);
      } finally {
        setLoadingServicos(false);
      }
    }

    async function buscarHeroData() {
      try {
        setLoadingHero(true);
        setErroHero(null);

        console.log('Buscando dados do HeroCard (ID 1)...');

        // Buscar dados do ID 1 da tabela schoolholidays para o HeroCard
        const { data, error } = await supabase
          .from('schoolholidays')
          .select('*')
          .eq('id', 1)
          .single();

        if (error) {
          throw error;
        }

        console.log('Dados do HeroCard carregados:', data);
        console.log('Verificando campos do HeroCard:', {
          'Todos os campos': Object.keys(data),
          'Valores completos': data
        });
        
        setHeroData(data);

      } catch (error) {
        console.error('Erro ao buscar dados do HeroCard:', error);
        setErroHero(error.message);
      } finally {
        setLoadingHero(false);
      }
    }

    // Chamar as funções para buscar dados
    buscarPausasLetivas();
    buscarServicos();
    buscarHeroData();
  }, []);

  return (
    <>
      
<section className="landing-holidays-section"></section>
        {/* HeroCard com dados do Supabase */}
        {loadingHero ? (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <p>A carregar HeroCard...</p>
          </div>
        ) : erroHero ? (
          <div style={{ textAlign: 'center', padding: '40px', color: 'red' }}>
            <p>Erro ao carregar HeroCard: {erroHero}</p>
          </div>
        ) : heroData ? (
          <HeroCard
            imageSrc={heroData.cartaz || "https://via.placeholder.com/200"}
            title={heroData.name || "Título do HeroCard"}
            subtitle={heroData.category || heroData.title || "Subtítulo do HeroCard"}
            description={heroData.category || "Descrição do HeroCard"}
            ctaText="Saber Mais"
            ctaHref={heroData.acesslink || "#"}
          />
        ) : (
          <HeroCard
            imageSrc="https://via.placeholder.com/200"
            title="Título do HeroCard"
            subtitle="Subtítulo do HeroCard"
            description="Descrição do HeroCard"
            ctaText="Saiba mais"
            ctaHref="#"
          />
        )}

      {/* Secção das Pausas Letivas do Supabase */}
      <section className="landing-holidays-section">
        <div className="holidays-container">
          <h2>Pausas Letivas</h2>
          
          {/* Estado de loading */}
          {loading && (
            <div className="holidays-loading">
              <p>A carregar pausas letivas...</p>
            </div>
          )}

          {/* Estado de erro */}
          {erro && (
            <div className="holidays-error">
              <p>Erro ao carregar pausas letivas: {erro}</p>
            </div>
          )}

          {/* Renderizar dados */}
          {!loading && !erro && (
            <div className="holidays-grid">
              {pausasLetivas.length > 0 ? (
                pausasLetivas.map((pausa) => (
                  <div key={pausa.id} className="holiday-card">
                    <div className="holiday-header">
                      <h3>{pausa.title}</h3>
                    </div>
                    <div className="holiday-body">
                      {/* Renderizar imagem se existir */}
                      {(pausa.img || pausa.img) ? (
                        <div className="holiday-image-container">
                          <img 
                            src={pausa.img || pausa.img} 
                            alt={pausa.title || 'Pausa letiva'} 
                            className="holiday-image"
                            onError={(e) => {
                              console.log('Erro ao carregar imagem:', pausa.image_url || pausa.img);
                              e.target.style.display = 'none';
                            }}
                            onLoad={() => {
                              console.log('Imagem carregada com sucesso:', pausa.image_url || pausa.img);
                            }}
                          />
                        </div>
                      ) : (
                        <div className="holiday-no-image">
                          <p>📅 Sem imagem disponível</p>
                          <small>
                            Debug: image_url={String(pausa.img)}, img={String(pausa.img)}
                          </small>
                        </div>
                      )}
                      
                      <p className="holiday-description">{pausa.description || pausa.name}</p>
                      <div className="holiday-dates">
                        <div className="date-info">
                          <span className="date-label">Início:</span>
                          <span className="date-value">
                            {new Date(pausa.start_date).toLocaleDateString('pt-PT')}
                          </span>
                        </div>
                        <div className="date-info">
                          <span className="date-label">Fim:</span>
                          <span className="date-value">
                            {new Date(pausa.end_date).toLocaleDateString('pt-PT')}
                          </span>
                        </div>
                      </div>
                      <div className="holiday-duration">
                        <span>
                          Duração: {Math.ceil((new Date(pausa.end_date) - new Date(pausa.start_date)) / (1000 * 60 * 60 * 24))} dias
                        </span>
                      </div>
                      <div className="holiday-duration">
                        {pausa.acesslink ? (
                          <a 
                            href={pausa.acesslink} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="holiday-duration"
                          >
                            Inscrever-se
                          </a>
                        ) : (
                          <button className="holiday-button" disabled>
                            Sem Link Disponível
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="holidays-empty">
                  <p>Nenhuma pausa letiva programada.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Secção dos Serviços */}
      <section className="landing-services-section">
        <div className="services-container">
          <h2>Nossos Serviços</h2>
          
          {/* Estado de loading para serviços */}
          {loadingServicos && (
            <div className="services-loading">
              <p>A carregar serviços...</p>
            </div>
          )}

          {/* Estado de erro para serviços */}
          {erroServicos && (
            <div className="services-error">
              <p>Erro ao carregar serviços: {erroServicos}</p>
            </div>
          )}

          {/* Renderizar dados dos serviços */}
          {!loadingServicos && !erroServicos && (
            <div className="simple-card-container-service">
              <div className="cardService">
                {servicos.length > 0 ? (
                  servicos.map((servico) => (
                    <div key={servico.id} className="simple-card">
                      {/* Imagem do serviço */}
                      {servico.img && (
                        <img 
                          src={servico.img} 
                          alt={servico.title || servico.name || 'Serviço'} 
                          className="simple-card-image"
                          onError={(e) => {
                            console.log('Erro ao carregar imagem do serviço:', servico.image_url);
                            e.target.style.display = 'none';
                          }}
                        />
                      )}
                      
                      {/* Título do serviço */}
                      <h3 className="simple-card-title">
                        {servico.Municipio || servico.name || 'Sem título'}
                      </h3>
                      
                      {/* Descrição do serviço */}
                      {servico.description && (
                        <p className="simple-card-description">
                          {servico.description}
                        </p>
                      )}
                      
                      {/* Data de criação ou lançamento */}
                      {(servico.created_at || servico.release_date) && (
                        <p className="simple-card-release-date">
                          {servico.release_date 
                            ? new Date(servico.release_date).toLocaleDateString('pt-PT')
                            : new Date(servico.created_at).toLocaleDateString('pt-PT')
                          }
                        </p>
                      )}
                      
                      {/* Botão com link */}
                      <div className="simple-card-button-container">
                        {servico.link || servico.acesslink ? (
                          <a className="simple-card-button"
                            href={servico.link || servico.acesslink} 
                            target="_blank" 
                            rel="noopener noreferrer"
                          >
                            Saber Mais
                          </a>
                        ) : (
                          <button className="simple-card-button" disabled>
                            Em Breve
                          </button>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="services-empty">
                    <p>Nenhum serviço disponível no momento.</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default LandingPage;
