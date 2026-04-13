# Forma & Espaço Arquitetura — Landing Page Premium

> Site modelo de alto padrão para escritório de arquitetura fictício localizado em Porto Velho, RO. Foco em conversão de visitantes em reuniões de consultoria.

---

## ✅ Funcionalidades Implementadas

### Identidade Visual
- Paleta de cores: Branco, Cinza Espacial, Bege Areia, Preto Fosco + Dourado/Cobre
- Tipografia: Playfair Display (serif elegante) + Montserrat (sans-serif moderna)
- Estilo Minimalista, Moderno e Luxuoso — Clean & Sophisticated

### Seções da Página
1. **Navbar Fixa** — Transparente → sólida ao rolar, com menu mobile tipo drawer
2. **Hero Section** — Imagem de impacto, título com itálico dourado, 2 CTAs, badge de localização
3. **Diferenciais Técnicos** — 6 cards com ícones, hover animado com linha dourada
4. **Portfólio** — Grid 3 colunas com filtro por categoria (Todos / Residencial / Comercial / Interiores), modal de detalhes
5. **Processo / Autoridade** — Seção fullscreen com imagem de fundo, 4 etapas numeradas
6. **Métricas** — Contadores animados (50+ projetos, 10 anos, 98% satisfação, 15k+ m²)
7. **Depoimentos** — 3 cards de clientes com avatar, avaliação em estrelas e aspas decorativas
8. **Contato / Rodapé de Conversão** — Formulário com validação, mapa do Google Maps (Porto Velho), redes sociais
9. **Footer** — Logo, navegação, registro CAU
10. **Botão Flutuante WhatsApp** — Com tooltip animado

### JavaScript Interativo
- Scroll Reveal com IntersectionObserver
- Filtros de portfólio com animação
- Modal de projeto com dados dinâmicos
- Contadores animados (easeOutExpo)
- Formulário com validação e feedback visual
- Máscara de telefone automática
- Smooth scroll para âncoras
- Destaque da seção ativa na navbar
- Lazy loading com fade-in de imagens
- Ken Burns effect no Hero

### SEO Local (Porto Velho)
- Meta tags otimizadas para busca local
- Schema.org LocalBusiness JSON-LD
- Canonical URL configurada
- Open Graph para compartilhamento social
- Títulos e descrições com palavras-chave locais

### Performance
- Layout 100% responsivo (mobile-first)
- Fontes via Google Fonts com preconnect
- Images com `loading="lazy"` e `fetchpriority="high"` para o hero
- CSS com variáveis customizadas (fácil manutenção)
- Animações via CSS transforms (sem reflow)

---

## 📁 Estrutura de Arquivos

```
index.html          — Página principal completa
css/
  style.css         — Estilos globais, identidade visual, responsividade
js/
  main.js           — Todas as interações e animações
README.md           — Este arquivo
```

---

## 🌐 Pontos de Entrada

| Caminho    | Descrição            |
|------------|----------------------|
| `/`        | Landing Page (index) |
| `/#hero`   | Hero Section         |
| `/#portfolio` | Portfólio        |
| `/#contato` | Formulário + Mapa   |

---

## 🚧 Funcionalidades Não Implementadas (Sugestões de Expansão)

- [ ] Backend real para envio de formulário (ex: EmailJS, Formspree)
- [ ] Blog de conteúdo (artigos sobre arquitetura e decoração)
- [ ] Página individual de projeto (case study completo)
- [ ] Sistema de agendamento integrado (Calendly embed)
- [ ] Chat ao vivo (Intercom / Tawk.to)
- [ ] Galeria com lightbox nativo completo
- [ ] Multi-idioma (PT / EN)
- [ ] Analytics e pixel de rastreamento

---

## 🎨 Paleta de Cores

| Nome         | Valor     | Uso                            |
|--------------|-----------|--------------------------------|
| Dourado      | `#C9A84C` | CTAs, destaques, ícones        |
| Dourado Claro| `#E2C47A` | Textos sobre fundo escuro      |
| Preto Fosco  | `#0F0E0C` | Fundo hero, footer             |
| Carvão       | `#1E1C18` | Seções escuras, contato        |
| Off-White    | `#F8F6F2` | Fundo de seções claras         |
| Bege Areia   | `#E8E0D0` | Bordas, divisores sutis        |

---

## 📌 Próximos Passos Recomendados

1. **Integrar formulário** com EmailJS ou Formspree para envio real
2. **Adicionar logo SVG** personalizado substituindo o "F&E" textual
3. **Criar páginas de projeto** com cases completos e mais imagens
4. **Configurar Google Analytics 4** e Meta Pixel
5. **Conectar Instagram** via API para exibir feed dinâmico do portfólio
6. **Publicar** via Publish Tab e configurar domínio personalizado

---

*© 2025 Forma & Espaço Arquitetura (site modelo fictício)*
