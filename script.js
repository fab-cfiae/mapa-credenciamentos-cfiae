document.addEventListener("DOMContentLoaded", function () {
    /* =========================================================
       ELEMENTOS DA INTERFACE
    ========================================================== */
    const mapa = document.getElementById("mapa");
    const btnReset = document.getElementById("btn-reset");
    const detailsEmpty = document.getElementById("details-empty");
    const detailsContent = document.getElementById("details-content");
    const detailsRegionTitle = document.getElementById("details-region-title");
    const detailsCount = document.getElementById("details-count");
    const detailsCompaniesList = document.getElementById("details-companies-list");
    const mapLoading = document.getElementById("map-loading");
    const regionFilters = document.querySelectorAll(".region-filter");

    /* =========================================================
       CORES
    ========================================================== */
    const COR_HIGHLIGHT = "#1d60cd";
    const COR_PADRAO = "#cbd5e1";
    const COR_SELECIONADO = "#1551ad";

    /* =========================================================
       DADOS DAS REGIÕES
    ========================================================== */
    const regioes = {
        "Norte": {
            nome: "Região Norte",
            estados: [
                "BR-AC", "BR-AP", "BR-AM", "BR-PA", "BR-RO", "BR-RR", "BR-TO"
            ],
            empresas: [
                "R&N Engenharia e Avaliações", "LAH SERVICOS DE ENGENHARIA LTDA",
                "PROJETTA SCHORR ENGENHARIA & CONSULTORIA LTDA", "COELHOS ENGENHARIA E SERVIÇOS LTDA",
                "MANGUALDE ENGENHARIA E CONSULTORIA LTDA", "JRODZINSKI CONSULTORIA E SERVICOS LTDA",
                "HRC ENGENHARIA", "HALLIADNI ARQUITETURA LTDA", "PLANO GESTÃO DE PROJETOS LTDA",
                "SANTOS & MARTINS SERVIÇOS LTDA", "VALLE CONSULT CONSTRUCAO E GESTAO DE ATIVOS",
                "G. E. S. GARCIA LTDA", "ATLAS ENGENHARIA E PLANEJAMENTO LTDA"
            ]
        },
        "Nordeste": {
            nome: "Região Nordeste",
            estados: [
                "BR-AL", "BR-BA", "BR-CE", "BR-MA", "BR-PB", "BR-PE", "BR-PI", "BR-RN", "BR-SE"
            ],
            empresas: [
                "R&N Engenharia e Avaliações", "JM. MAIA ENGENHARIA LTDA",
                "LAH SERVICOS DE ENGENHARIA LTDA", "PROJETTA SCHORR ENGENHARIA & CONSULTORIA LTDA",
                "COELHOS ENGENHARIA E SERVIÇOS LTDA", "MANGUALDE ENGENHARIA E CONSULTORIA LTDA",
                "JRODZINSKI CONSULTORIA E SERVICOS LTDA", "HRC ENGENHARIA", "HALLIADNI ARQUITETURA LTDA",
                "PLANO GESTÃO DE PROJETOS LTDA", "FIBO ENGENHARIA LTDA", "SANTOS & MARTINS SERVIÇOS LTDA",
                "RMP ENGENHARIA LTDA", "VALLE CONSULT CONSTRUCAO E GESTAO DE ATIVOS", "ATLAS ENGENHARIA E PLANEJAMENTO LTDA"
            ]
        },
        "CentroOeste": {
            nome: "Região Centro-Oeste",
            estados: [
                "BR-DF", "BR-GO", "BR-MT", "BR-MS"
            ],
            empresas: [
                "R&N Engenharia e Avaliações", "JM. MAIA ENGENHARIA LTDA",
                "LAH SERVICOS DE ENGENHARIA LTDA", "PROJETTA SCHORR ENGENHARIA & CONSULTORIA LTDA",
                "COELHOS ENGENHARIA E SERVIÇOS LTDA", "MANGUALDE ENGENHARIA E CONSULTORIA LTDA",
                "JRODZINSKI CONSULTORIA E SERVICOS LTDA", "HRC ENGENHARIA", "HALLIADNI ARQUITETURA LTDA",
                "PLANO GESTÃO DE PROJETOS LTDA", "FIBO ENGENHARIA LTDA", "GR4 ENGENHARIA E CONSTRUÇÕES LTDA",
                "MULTIPLOS CONSTRUÇÃO E SERVIÇOS LTDA", "SANTOS & MARTINS SERVIÇOS LTDA",
                "VALLE CONSULT CONSTRUCAO E GESTAO DE ATIVOS", "SA E SILVA ENGENHARIA LTDA",
                "ATLAS ENGENHARIA E PLANEJAMENTO LTDA", "R. M. OLIVEIRA ME"
            ]
        },
        "Sudeste": {
            nome: "Região Sudeste",
            estados: [
                "BR-ES", "BR-MG", "BR-RJ", "BR-SP"
            ],
            empresas: [
                "R&N Engenharia e Avaliações", "FEAT ENGENHARIA", "JM. MAIA ENGENHARIA LTDA",
                "KFK CONSTRUTORA LTDA", "LAH SERVICOS DE ENGENHARIA LTDA", "MARINA BASSO ARQUITETURA LTDA",
                "PROJETTA SCHORR ENGENHARIA & CONSULTORIA LTDA", "COELHOS ENGENHARIA E SERVIÇOS LTDA",
                "ENGEFAL CONSULTORIA TÉCNICA ME", "MANGUALDE ENGENHARIA E CONSULTORIA LTDA",
                "JRODZINSKI CONSULTORIA E SERVICOS LTDA", "HRC ENGENHARIA", "HALLIADNI ARQUITETURA LTDA",
                "PLANO GESTÃO DE PROJETOS LTDA", "FIBO ENGENHARIA LTDA", "IDEIA CONSULTORIA E PROJ DE ARQ E ENG CIVIL LTDA",
                "J. DANIEL ENGENHARIA LTDA", "STUDIO CL20 ARQUITETURA LTDA",
                "STUDIO NOW SERVIÇOS DE ARQUITETURA, URBANISMO E INTERIORES LTDA",
                "C.C.G DE L. FERNANDES – SERVIÇOS ESPECIALIZADOS EM ENGENHARIA",
                "SANTOS & MARTINS SERVIÇOS LTDA", "RS PEIXOTO ARQUITETURA E ENGENHARIA LTDA",
                "VALLE CONSULT CONSTRUCAO E GESTAO DE ATIVOS", "SANEVIDA ENGENHARIA LTDA",
                "ATLAS ENGENHARIA E PLANEJAMENTO LTDA", "FERRIS ENGENHARIA LTDA", "M F CHERPINSKI ENGENHARIA"
            ]
        },
        "Sul": {
            nome: "Região Sul",
            estados: [
                "BR-PR", "BR-RS", "BR-SC"
            ],
            empresas: [
                "R&N Engenharia e Avaliações", "JLA ENGENHARIA DE AVALIAÇÕES E PERICIAS",
                "DAL PIZZOL ENGENHARIA E AVALIAÇÕES LTDA", "LAH SERVICOS DE ENGENHARIA LTDA",
                "MARINA BASSO ARQUITETURA LTDA", "PROJETTA SCHORR ENGENHARIA & CONSULTORIA LTDA",
                "COELHOS ENGENHARIA E SERVIÇOS LTDA", "MANGUALDE ENGENHARIA E CONSULTORIA LTDA",
                "JRODZINSKI CONSULTORIA E SERVICOS LTDA", "HRC ENGENHARIA", "JULIANA RIBEIRO MENDES LTDA",
                "HALLIADNI ARQUITETURA LTDA", "PLANO GESTÃO DE PROJETOS LTDA", "ARAUJO ENGENHARIA CIVIL LTDA",
                "SANTOS & MARTINS SERVIÇOS LTDA", "VALLE CONSULT CONSTRUCAO E GESTAO DE ATIVOS",
                "ATLAS ENGENHARIA E PLANEJAMENTO LTDA", "FERRIS ENGENHARIA LTDA", "M F CHERPINSKI ENGENHARIA"
            ]
        }
    };

    /* =========================================================
       MAPA ESTADO → REGIÃO
    ========================================================== */
    const estadoParaRegiao = {};
    Object.keys(regioes).forEach(chaveRegiao => {
        regioes[chaveRegiao].estados.forEach(estadoId => {
            estadoParaRegiao[estadoId] = chaveRegiao;
        });
    });

    /* =========================================================
       ESTADO DA APLICAÇÃO
    ========================================================== */
    let mapaInicializado = false;
    let regiaoSelecionada = null;
    let todasRegioesSelecionadas = false;
    let svg = null;

    /* =========================================================
       MÉTRICAS
    ========================================================== */
    function calcularMetricas() {
        const quantidadeRegioes = Object.keys(regioes).length;
        const quantidadeEstados = Object.values(regioes).reduce(
            (total, regiao) => total + regiao.estados.length, 0
        );
        let maiorRegiao = null;
        Object.keys(regioes).forEach(chave => {
            if (!maiorRegiao || regioes[chave].empresas.length > regioes[maiorRegiao].empresas.length) {
                maiorRegiao = chave;
            }
        });
        document.getElementById("metric-regioes").textContent = quantidadeRegioes;
        document.getElementById("metric-estados").textContent = quantidadeEstados;
        document.getElementById("metric-maior-regiao").textContent = maiorRegiao ? maiorRegiao.replace("CentroOeste", "Centro-Oeste") : "-";
        document.getElementById("metric-maior-regiao-qtd").textContent = maiorRegiao ? `${regioes[maiorRegiao].empresas.length} empresas` : "-";
    }

    /* =========================================================
       ATUALIZA PAINEL DE DETALHES
    ========================================================== */
    function atualizarDetalhes(chaveRegiao, abrirLista = true) {
        const dadosRegiao = regioes[chaveRegiao];
        if (!dadosRegiao) return;
        if (regiaoSelecionada === chaveRegiao) {
            resetarVisao();
            return;
        }
        regiaoSelecionada = chaveRegiao;
        todasRegioesSelecionadas = false;
        detailsEmpty.classList.add("hidden");
        detailsContent.classList.remove("hidden");
        detailsRegionTitle.textContent = dadosRegiao.nome;
        detailsCount.textContent = dadosRegiao.empresas.length;
        detailsCompaniesList.innerHTML = dadosRegiao.empresas.map(emp => `<li>${emp}</li>`).join("");
        destacarRegiaoNoMapa(chaveRegiao);
    }

    /* =========================================================
       RESETAR PAINEL
    ========================================================== */
    function resetarVisao() {
        regiaoSelecionada = null;
        todasRegioesSelecionadas = false;
        detailsContent.classList.add("hidden");
        detailsEmpty.classList.remove("hidden");
        regionFilters.forEach(btn => btn.classList.remove("active"));
        if (!svg) return;
        Object.keys(estadoParaRegiao).forEach(estadoId => {
            const estado = svg.getElementById(estadoId);
            if (!estado) return;
            estado.classList.remove("region-active", "region-muted", "region-selected");
            estado.style.fill = COR_PADRAO;
            estado.style.filter = "none";
            estado.style.opacity = "1";
        });
    }

    function selecionarTodasRegioes() {
        regiaoSelecionada = null;
        todasRegioesSelecionadas = true;
        
        // Exibe o painel de detalhes em vez de esconder
        detailsEmpty.classList.add("hidden");
        detailsContent.classList.remove("hidden");

        // Junta todas as empresas de todas as regiões em um único array
        let todasEmpresas = [];
        Object.values(regioes).forEach(regiao => {
            todasEmpresas = todasEmpresas.concat(regiao.empresas);
        });

        // Remove empresas duplicadas e coloca em ordem alfabética
        todasEmpresas = [...new Set(todasEmpresas)].sort();

        // Atualiza os textos do painel
        detailsRegionTitle.textContent = "Brasil (Visão Geral)";
        detailsCount.textContent = todasEmpresas.length;

        // Renderiza a lista de empresas
        detailsCompaniesList.innerHTML = todasEmpresas
            .map(emp => `<li>${emp}</li>`)
            .join("");

        // Atualiza o estado visual do botão nos filtros
        regionFilters.forEach(btn => {
            btn.classList.toggle("active", btn.dataset.region === "todos");
        });

        // Pinta todo o mapa SVG de azul
        if (!svg) return;
        Object.keys(estadoParaRegiao).forEach(estadoId => {
            const estado = svg.getElementById(estadoId);
            if (!estado) return;
            estado.classList.remove("region-active", "region-muted");
            estado.classList.add("region-selected");
            estado.style.fill = COR_SELECIONADO;
            estado.style.filter = "none";
            estado.style.opacity = "1";
        });
    }

    btnReset.addEventListener("click", resetarVisao);

    /* =========================================================
       DESTAQUE DE REGIÃO
    ========================================================== */
    function destacarRegiaoNoMapa(chaveRegiao) {
        todasRegioesSelecionadas = false;
        if (!svg) return;
        Object.keys(estadoParaRegiao).forEach(estadoId => {
            const estado = svg.getElementById(estadoId);
            if (!estado) return;
            const regiao = estadoParaRegiao[estadoId];
            estado.classList.remove("region-selected", "region-active", "region-muted");
            if (regiao === chaveRegiao) {
                estado.classList.add("region-selected");
                estado.style.fill = COR_SELECIONADO;
                estado.style.opacity = "1";
            } else {
                estado.classList.add("region-muted");
                estado.style.fill = COR_PADRAO;
                estado.style.filter = "none";
                estado.style.opacity = "0.32";
            }
        });
        regionFilters.forEach(btn => {
            btn.classList.toggle("active", btn.dataset.region === chaveRegiao);
        });
    }

    /* =========================================================
       FILTRAR REGIÃO
    ========================================================== */
    function filtrarRegiao(chaveRegiao) {
        if (chaveRegiao === "todos") {
            // Permite desmarcar o "Todas" se já estiver selecionado
            if (todasRegioesSelecionadas) {
                resetarVisao();
            } else {
                selecionarTodasRegioes();
            }
            return;
        }

        // O atualizarDetalhes já tem a lógica de desmarcar (toggle) internamente
        atualizarDetalhes(chaveRegiao);
    }

    regionFilters.forEach(btn => {
        btn.addEventListener("click", function () {
            filtrarRegiao(this.dataset.region);
        });
    });

    /* =========================================================
       HOVER REGIONAL
    ========================================================== */
    function aplicarHoverEstado(estadoElement, chaveRegiao, entrada) {
        const dadosRegiao = regioes[chaveRegiao];
        if (!dadosRegiao) return;
        dadosRegiao.estados.forEach(id => {
            const el = svg.getElementById(id);
            if (!el) return;
            if (entrada) {
                el.style.fill = COR_HIGHLIGHT;
                el.style.filter = "brightness(1.05)";
                el.style.opacity = "1";
            } else {
                if (regiaoSelecionada === chaveRegiao) {
                    el.style.fill = COR_SELECIONADO;
                    el.style.filter = "none";
                } else if (regiaoSelecionada) {
                    el.style.fill = COR_PADRAO;
                    el.style.filter = "none";
                    el.style.opacity = "0.32";
                } else if (todasRegioesSelecionadas) {
                    el.style.fill = COR_SELECIONADO;
                    el.style.filter = "none";
                    el.style.opacity = "1";
                } else {
                    el.style.fill = COR_PADRAO;
                    el.style.filter = "none";
                    el.style.opacity = "1";
                }
            }
        });
    }

    /* =========================================================
       INICIALIZAÇÃO DO SVG
    ========================================================== */
    function inicializarMapa() {
        if (mapaInicializado) return;
        try {
            svg = mapa.contentDocument;
            if (!svg) return;
            const testePath = svg.querySelector("path");
            if (!testePath) return;
            mapaInicializado = true;

            const todosPaths = svg.querySelectorAll("path");
            todosPaths.forEach(path => {
                path.classList.add("map-state");
                path.style.fill = COR_PADRAO;
                path.style.stroke = "#ffffff";
                path.style.strokeWidth = "1";
                path.style.cursor = "pointer";
            });

            Object.keys(estadoParaRegiao).forEach(estadoId => {
                const estadoElement = svg.getElementById(estadoId);
                if (!estadoElement) return;
                const chaveRegiao = estadoParaRegiao[estadoId];

                estadoElement.addEventListener("mouseenter", function () {
                    aplicarHoverEstado(estadoElement, chaveRegiao, true);
                });
                estadoElement.addEventListener("mouseleave", function () {
                    aplicarHoverEstado(estadoElement, chaveRegiao, false);
                });
                estadoElement.addEventListener("click", function () {
                    atualizarDetalhes(chaveRegiao);
                });
            });
            resetarVisao();
            mapLoading.style.opacity = "0";
            setTimeout(() => {
                mapLoading.style.display = "none";
            }, 250);
        } catch (error) {
            console.warn("Não foi possível inicializar o mapa:", error);
        }
    }

    /* =========================================================
       EVENTOS DO OBJECT SVG
    ========================================================== */
    mapa.addEventListener("load", inicializarMapa);
    try {
        if (mapa.contentDocument && mapa.contentDocument.readyState === "complete") {
            inicializarMapa();
        }
    } catch (e) {}

    const intervalFallback = setInterval(() => {
        if (!mapaInicializado) {
            try {
                if (mapa.contentDocument && mapa.contentDocument.querySelector("path")) {
                    inicializarMapa();
                    clearInterval(intervalFallback);
                }
            } catch (e) {}
        } else {
            clearInterval(intervalFallback);
        }
    }, 50);

    setTimeout(() => {
        clearInterval(intervalFallback);
    }, 5000);

    /* =========================================================
       INICIALIZAÇÃO
    ========================================================== */
    calcularMetricas();
    lucide.createIcons();
});
