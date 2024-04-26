## Simmp website

### Requerimentos
- website para
    - com:
        - outline:
            - layout de header, corpo de pagina e footer, todos envoltos em um container padronizado
            - barra de navegação (logo a esquerda aparece mediante 230px no window.scrollY e position sticky, z-index: 100 e top: 0px) para: inínio, afiliado (com texto "Porque se sindicalizar ?" incluindo convênios e ficha cadastral), legislação e creches e escolas (lista de accordions de pdfs para visualização) e página institucional "sobre" com: diretoria, estatuto, história e localização a direita; a esquerda, links sociais e pesquisar no site
            - parginas para exposição de agenda, notícias e galerias;
            - e requisição de carteirinha de afiliado mediante registro em formulário no site 
            - e acesso a conteúdo exclusivo a afiliados
                - carteira de associado
                - lista de posts para afiliados

        - componetização:
            - página comum para post: imagem de destaque, corpo de texto, galeria de imagens
            - accordions para pdfs
            - grade de cartões com imagem de capa e href com id de galeria
            - cartão com capa e título
            - galeria de imagens (titulo e src)
            - agenda: timeline com título e data, que leva a um post com a id
            - formulário de afiliação

            - paginas:
                - institucional com os textos do servidor:
                    - diretoria ( texto em exibição)
                    - estatuto (pdf em accordion)

            - coleção de galeria:
                - imagem de capa
                    - array de imagens

        - Design:
            - verde logo: #0e720f
            

#### Roadmap
    - Produção de cards
    - Produção de 4 column grades de cards para as galerias
    - Produção de uma coleção de imagens para galeria, 
    - Produção de uma página dedicada a uma galeria
        - Produção de uma galeria full screen
    - Produção de 2 column cards para a home
