document.addEventListener("DOMContentLoaded", function () {

    /* =========================================================
       ELEMENTOS DA INTERFACE
    ========================================================== */

    const mapa = document.getElementById("mapa");

    const modal = document.getElementById("modal-empresas");
    const modalClose = document.getElementById("modal-close");
    const modalTitle = document.getElementById("modal-region-title");
    const modalBadge = document.getElementById("modal-badge");
    const modalList = document.getElementById("modal-empresas-list");

    const btnReset = document.getElementById("btn-reset");
    const btnViewAll = document.getElementById("btn-view-all");

    const detailsEmpty = document.getElementById("details-empty");
    const detailsContent = document.getElementById("details-content");

    const detailsRegionTitle =
        document.getElementById("details-region-title");

    const detailsCount =
        document.getElementById("details-count");

    const detailsCompaniesList =
        document.getElementById("details-companies-list");

    const mapLoading =
        document.getElementById("map-loading");

    const regionFilters =
        document.querySelectorAll(".region-filter");


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
                "BR-AC",
                "BR-AP",
                "BR-AM",
                "BR-PA",
                "BR-RO",
                "BR-RR",
                "BR-TO"
            ],

            empresas: [
                "R&N Engenharia e Avaliações",
                "LAH SERVICOS DE ENGENHARIA LTDA",
                "PROJETTA SCHORR ENGENHARIA & CONSULTORIA LTDA",
                "COELHOS ENGENHARIA E SERVIÇOS LTDA",
                "MANGUALDE ENGENHARIA E CONSULTORIA LTDA",
                "JRODZINSKI CONSULTORIA E SERVICOS LTDA",
                "HRC ENGENHARIA",
                "HALLIADNI ARQUITETURA LTDA",
                "PLANO GESTÃO DE PROJETOS LTDA",
                "SANTOS & MARTINS SERVIÇOS LTDA",
                "VALLE CONSULT CONSTRUCAO E GESTAO DE ATIVOS",
                "G. E. S. GARCIA LTDA",
                "ATLAS ENGENHARIA E PLANEJAMENTO LTDA"
            ]
        },


        "Nordeste": {
            nome: "Região Nordeste",

            estados: [
                "BR-AL",
                "BR-BA",
                "BR-CE",
                "BR-MA",
                "BR-PB",
                "BR-PE",
                "BR-PI",
                "BR-RN",
                "BR-SE"
            ],

            empresas: [
                "R&N Engenharia e Avaliações",
                "JM. MAIA ENGENHARIA LTDA",
                "LAH SERVICOS DE ENGENHARIA LTDA",
                "PROJETTA SCHORR ENGENHARIA & CONSULTORIA LTDA",
                "COELHOS ENGENHARIA E SERVIÇOS LTDA",
                "MANGUALDE ENGENHARIA E CONSULTORIA LTDA",
                "JRODZINSKI CONSULTORIA E SERVICOS LTDA",
                "HRC ENGENHARIA",
                "HALLIADNI ARQUITETURA LTDA",
                "PLANO GESTÃO DE PROJETOS LTDA",
                "FIBO ENGENHARIA LTDA",
                "SANTOS & MARTINS SERVIÇOS LTDA",
                "RMP ENGENHARIA LTDA",
                "VALLE CONSULT CONSTRUCAO E GESTAO DE ATIVOS",
                "ATLAS ENGENHARIA E PLANEJAMENTO LTDA"
            ]
        },


        "CentroOeste": {
            nome: "Região Centro-Oeste",

            estados: [
                "BR-DF",
                "BR-GO",
                "BR-MT",
                "BR-MS"
            ],

            empresas: [
                "R&N Engenharia e Avaliações",
                "JM. MAIA ENGENHARIA LTDA",
                "LAH SERVICOS DE ENGENHARIA LTDA",
                "PROJETTA SCHORR ENGENHARIA & CONSULTORIA LTDA",
                "COELHOS ENGENHARIA E SERVIÇOS LTDA",
                "MANGUALDE ENGENHARIA E CONSULTORIA LTDA",
                "JRODZINSKI CONSULTORIA E SERVICOS LTDA",
                "HRC ENGENHARIA",
                "HALLIADNI ARQUITETURA LTDA",
                "PLANO GESTÃO DE PROJETOS LTDA",
                "FIBO ENGENHARIA LTDA",
                "MULTIPLOS CONSTRUÇÃO E SERVIÇOS LTDA",
                "SANTOS & MARTINS SERVIÇOS LTDA",
                "VALLE CONSULT CONSTRUCAO E GESTAO DE ATIVOS",
                "SA E SILVA ENGENHARIA LTDA",
                "ATLAS ENGENHARIA E PLANEJAMENTO LTDA",
                "R. M. OLIVEIRA ME"
            ]
        },


        "Sudeste": {
            nome: "Região Sudeste",

            estados: [
                "BR-ES",
                "BR-MG",
                "BR-RJ",
                "BR-SP"
            ],

            empresas: [
                "R&N Engenharia e Avaliações",
                "FEAT ENGENHARIA",
                "JM. MAIA ENGENHARIA LTDA",
                "KFK CONSTRUTORA LTDA",
                "LAH SERVICOS DE ENGENHARIA LTDA",
                "MARINA BASSO ARQUITETURA LTDA",
                "PROJETTA SCHORR ENGENHARIA & CONSULTORIA LTDA",
                "COELHOS ENGENHARIA E SERVIÇOS LTDA",
                "MANGUALDE ENGENHARIA E CONSULTORIA LTDA",
                "JRODZINSKI CONSULTORIA E SERVICOS LTDA",
                "HRC ENGENHARIA",
                "HALLIADNI ARQUITETURA LTDA",
                "PLANO GESTÃO DE PROJETOS LTDA",
                "FIBO ENGENHARIA LTDA",
                "IDEIA CONSULTORIA E PROJ DE ARQ E ENG CIVIL LTDA",
                "J. DANIEL ENGENHARIA LTDA",
                "STUDIO CL20 ARQUITETURA LTDA",
                "STUDIO NOW SERVIÇOS DE ARQUITETURA, URBANISMO E INTERIORES LTDA",
                "C.C.G DE L. FERNANDES – SERVIÇOS ESPECIALIZADOS EM ENGENHARIA",
                "SANTOS & MARTINS SERVIÇOS LTDA",
                "RS PEIXOTO ARQUITETURA E ENGENHARIA LTDA",
                "VALLE CONSULT CONSTRUCAO E GESTAO DE ATIVOS",
                "SANEVIDA ENGENHARIA LTDA",
                "ATLAS ENGENHARIA E PLANEJAMENTO LTDA",
                "FERRIS ENGENHARIA LTDA",
                "M F CHERPINSKI ENGENHARIA"
            ]
        },


        "Sul": {
            nome: "Região Sul",

            estados: [
                "BR-PR",
                "BR-RS",
                "BR-SC"
            ],

            empresas: [
                "R&N Engenharia e Avaliações",
                "JLA ENGENHARIA DE AVALIAÇÕES E PERICIAS",
                "DAL PIZZOL ENGENHARIA E AVALIAÇÕES LTDA",
                "LAH SERVICOS DE ENGENHARIA LTDA",
                "MARINA BASSO ARQUITETURA LTDA",
                "PROJETTA SCHORR ENGENHARIA & CONSULTORIA LTDA",
                "COELHOS ENGENHARIA E SERVIÇOS LTDA",
                "MANGUALDE ENGENHARIA E CONSULTORIA LTDA",
                "JRODZINSKI CONSULTORIA E SERVICOS LTDA",
                "HRC ENGENHARIA",
                "JULIANA RIBEIRO MENDES LTDA",
                "HALLIADNI ARQUITETURA LTDA",
                "PLANO GESTÃO DE PROJETOS LTDA",
                "ARAUJO ENGENHARIA CIVIL LTDA",
                "SANTOS & MARTINS SERVIÇOS LTDA",
                "VALLE CONSULT CONSTRUCAO E GESTAO DE ATIVOS",
                "ATLAS ENGENHARIA E PLANEJAMENTO LTDA",
                "FERRIS ENGENHARIA LTDA",
                "M F CHERPINSKI ENGENHARIA"
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
    let svg = null;


    /* =========================================================
       MÉTRICAS
    ========================================================== */

    function calcularMetricas() {

        const totalEmpresas =
            Object.values(regioes).reduce(
                (total, regiao) =>
                    total + regiao.empresas.length,
                0
            );

        const quantidadeRegioes =
            Object.keys(regioes).length;

        const quantidadeEstados =
            Object.values(regioes).reduce(
                (total, regiao) =>
                    total + regiao.estados.length,
                0
            );

        let maiorRegiao = null;

        Object.keys(regioes).forEach(chave => {

            if (
                !maiorRegiao ||
                regioes[chave].empresas.length >
                regioes[maiorRegiao].empresas.length
            ) {
                maiorRegiao = chave;
            }

        });


        document.getElementById("metric-total")
            .textContent = totalEmpresas;

        document.getElementById("metric-regioes")
            .textContent = quantidadeRegioes;

        document.getElementById("metric-estados")
            .textContent = quantidadeEstados;

        document.getElementById("metric-maior-regiao")
            .textContent =
            maiorRegiao
                ? maiorRegiao.replace("CentroOeste", "Centro-Oeste")
                : "-";

        document.getElementById("metric-maior-regiao-qtd")
            .textContent =
            maiorRegiao
                ? `${regioes[maiorRegiao].empresas.length} empresas`
                : "-";
    }


    /* =========================================================
       ABRIR MODAL
    ========================================================== */

    function abrirModal(dadosRegiao) {

        modalTitle.textContent = dadosRegiao.nome;

        modalBadge.textContent =
            `${dadosRegiao.empresas.length} empresa(s)`;


        modalList.innerHTML =
            dadosRegiao.empresas
                .map(emp => `<li>${emp}</li>`)
                .join("");


        modal.classList.remove("hidden");

        modal.setAttribute("aria-hidden", "false");

        document.body.style.overflow = "hidden";
    }


    /* =========================================================
       FECHAR MODAL
    ========================================================== */

    function fecharModal() {

        modal.classList.add("hidden");

        modal.setAttribute("aria-hidden", "true");

        document.body.style.overflow = "";
    }


    modalClose.addEventListener(
        "click",
        fecharModal
    );


    modal.addEventListener(
        "click",
        function (e) {

            if (e.target === modal) {
                fecharModal();
            }

        }
    );


    document.addEventListener(
        "keydown",
        function (e) {

            if (e.key === "Escape") {
                fecharModal();
            }

        }
    );


    /* =========================================================
       ATUALIZA PAINEL DE DETALHES
    ========================================================== */

    function atualizarDetalhes(
        chaveRegiao,
        abrirLista = true
    ) {

        const dadosRegiao =
            regioes[chaveRegiao];

        if (!dadosRegiao) return;


        regiaoSelecionada = chaveRegiao;


        detailsEmpty.classList.add("hidden");

        detailsContent.classList.remove("hidden");


        detailsRegionTitle.textContent =
            dadosRegiao.nome;


        detailsCount.textContent =
            dadosRegiao.empresas.length;


        /*
         * Mostra inicialmente apenas parte
         * da lista para manter o painel limpo.
         */

        const empresasVisiveis =
            dadosRegiao.empresas.slice(0, 8);


        detailsCompaniesList.innerHTML =
            empresasVisiveis
                .map(emp => `<li>${emp}</li>`)
                .join("");


        if (abrirLista) {

            btnViewAll.onclick = function () {
                abrirModal(dadosRegiao);
            };

        }


        destacarRegiaoNoMapa(chaveRegiao);
    }


    /* =========================================================
       RESETAR PAINEL
    ========================================================== */

    function resetarVisao() {

        regiaoSelecionada = null;

        detailsContent.classList.add("hidden");

        detailsEmpty.classList.remove("hidden");


        regionFilters.forEach(btn => {
            btn.classList.remove("active");

            if (
                btn.dataset.region === "todos"
            ) {
                btn.classList.add("active");
            }
        });


        if (!svg) return;


        Object.keys(estadoParaRegiao)
            .forEach(estadoId => {

                const estado =
                    svg.getElementById(estadoId);

                if (!estado) return;

                estado.classList.remove(
                    "region-selected",
                    "region-active",
                    "region-muted"
                );

                estado.style.fill =
                    COR_PADRAO;

                estado.style.filter =
                    "none";

                estado.style.opacity =
                    "1";
            });
    }


    btnReset.addEventListener(
        "click",
        resetarVisao
    );


    /* =========================================================
       DESTAQUE DE REGIÃO
    ========================================================== */

    function destacarRegiaoNoMapa(
        chaveRegiao
    ) {

        if (!svg) return;


        Object.keys(estadoParaRegiao)
            .forEach(estadoId => {

                const estado =
                    svg.getElementById(estadoId);

                if (!estado) return;


                const regiao =
                    estadoParaRegiao[estadoId];


                estado.classList.remove(
                    "region-selected",
                    "region-active",
                    "region-muted"
                );


                if (regiao === chaveRegiao) {

                    estado.classList.add(
                        "region-selected"
                    );

                    estado.style.fill =
                        COR_SELECIONADO;

                    estado.style.opacity =
                        "1";

                } else {

                    estado.classList.add(
                        "region-muted"
                    );

                    estado.style.fill =
                        COR_PADRAO;

                }

            });


        /*
         * Atualiza botão correspondente.
         */

        regionFilters.forEach(btn => {

            btn.classList.toggle(
                "active",
                btn.dataset.region === chaveRegiao
            );

        });
    }


    /* =========================================================
       FILTRAR REGIÃO
    ========================================================== */

    function filtrarRegiao(
        chaveRegiao
    ) {

        if (chaveRegiao === "todos") {

            resetarVisao();

            return;
        }


        atualizarDetalhes(
            chaveRegiao
        );
    }


    regionFilters.forEach(btn => {

        btn.addEventListener(
            "click",
            function () {

                filtrarRegiao(
                    this.dataset.region
                );

            }
        );

    });


    /* =========================================================
       HOVER REGIONAL
    ========================================================== */

    function aplicarHoverEstado(
        estadoElement,
        chaveRegiao,
        entrada
    ) {

        const dadosRegiao =
            regioes[chaveRegiao];

        if (!dadosRegiao) return;


        /*
         * Se existe região selecionada,
         * o hover continua funcionando apenas
         * para a região correspondente.
         */

        dadosRegiao.estados.forEach(id => {

            const el =
                svg.getElementById(id);

            if (!el) return;


            if (entrada) {

                el.style.fill =
                    COR_HIGHLIGHT;

                el.style.filter =
                    "brightness(1.05)";

                el.style.opacity =
                    "1";

            } else {

                if (
                    regiaoSelecionada ===
                    chaveRegiao
                ) {

                    el.style.fill =
                        COR_SELECIONADO;

                    el.style.filter =
                        "none";

                } else if (
                    regiaoSelecionada
                ) {

                    el.style.fill =
                        COR_PADRAO;

                    el.style.filter =
                        "none";

                    el.style.opacity =
                        "0.32";

                } else {

                    el.style.fill =
                        COR_PADRAO;

                    el.style.filter =
                        "none";

                    el.style.opacity =
                        "1";
                }
            }
        });
    }


    /* =========================================================
       INICIALIZAÇÃO DO SVG
    ========================================================== */

    function inicializarMapa() {

        if (mapaInicializado) {
            return;
        }


        try {

            svg = mapa.contentDocument;

            if (!svg) {
                return;
            }


            const testePath =
                svg.querySelector("path");

            if (!testePath) {
                return;
            }


            mapaInicializado = true;


            /*
             * Configuração visual de todos os paths.
             */

            const todosPaths =
                svg.querySelectorAll("path");


            todosPaths.forEach(path => {

                path.classList.add(
                    "map-state"
                );

                path.style.fill =
                    COR_PADRAO;

                path.style.stroke =
                    "#ffffff";

                path.style.strokeWidth =
                    "1";

                path.style.cursor =
                    "pointer";
            });


            /*
             * Configuração dos estados
             * utilizados pelo sistema.
             */

            Object.keys(estadoParaRegiao)
                .forEach(estadoId => {

                    const estadoElement =
                        svg.getElementById(
                            estadoId
                        );

                    if (!estadoElement) {
                        return;
                    }


                    const chaveRegiao =
                        estadoParaRegiao[
                            estadoId
                        ];


                    /*
                     * Entrada do mouse.
                     */

                    estadoElement.addEventListener(
                        "mouseenter",
                        function () {

                            aplicarHoverEstado(
                                estadoElement,
                                chaveRegiao,
                                true
                            );

                        }
                    );


                    /*
                     * Saída do mouse.
                     */

                    estadoElement.addEventListener(
                        "mouseleave",
                        function () {

                            aplicarHoverEstado(
                                estadoElement,
                                chaveRegiao,
                                false
                            );

                        }
                    );


                    /*
                     * Clique no estado.
                     */

                    estadoElement.addEventListener(
                        "click",
                        function () {

                            atualizarDetalhes(
                                chaveRegiao
                            );

                        }
                    );

                });


            /*
             * Mapa carregado.
             */

            mapLoading.style.opacity = "0";


            setTimeout(() => {
                mapLoading.style.display = "none";
            }, 250);


        } catch (error) {

            console.warn(
                "Não foi possível inicializar o mapa:",
                error
            );

        }
    }


    /* =========================================================
       EVENTOS DO OBJECT SVG
    ========================================================== */

    mapa.addEventListener(
        "load",
        inicializarMapa
    );


    /*
     * Fallback para navegadores que carregam
     * o SVG antes do listener.
     */

    try {

        if (
            mapa.contentDocument &&
            mapa.contentDocument.readyState === "complete"
        ) {

            inicializarMapa();

        }

    } catch (e) {}


    const intervalFallback =
        setInterval(() => {

            if (!mapaInicializado) {

                try {

                    if (
                        mapa.contentDocument &&
                        mapa.contentDocument.querySelector(
                            "path"
                        )
                    ) {

                        inicializarMapa();

                        clearInterval(
                            intervalFallback
                        );
                    }

                } catch (e) {}

            } else {

                clearInterval(
                    intervalFallback
                );

            }

        }, 50);


    setTimeout(() => {

        clearInterval(
            intervalFallback
        );

    }, 5000);


    /* =========================================================
       INICIALIZAÇÃO
    ========================================================== */

    calcularMetricas();

    lucide.createIcons();

});