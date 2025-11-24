import { http, HttpResponse } from 'msw';

export const postHandlers = [
  http.get('/post/posts', () => {
    return HttpResponse.json([
      {
        postId: '8830589a-ef19-454a-a611-54b033178b1b',
        title: 'Spring Boot e JPA',
        content: 'Hoje vou compartilhar um pouco sobre como integrar o Spring Boot com JPA...',
        author: {
          id: 'edf1d42a-d22e-4178-aa89-7abc8419f52e',
          name: 'Maria Souza',
        },
        createdAt: '2025-09-20',
        comments: [],
      },
      {
        postId: '5589eca9-a820-441b-9f59-dd879361ce80',
        title: 'Dicas de Programação',
        content: 'Aqui vão algumas dicas para melhorar sua produtividade como desenvolvedor...',
        author: {
          id: '8bed4bd6-75c3-4f69-9aaf-d7ee2e7d3062',
          name: 'João Silva',
        },
        createdAt: '2025-09-21',
        comments: [],
      },
      {
        postId: 'e8048de4-93f1-47e2-91e0-f3a1828b2679',
        title: 'Estratégias com Spring Security',
        content:
          'Neste post, discuto medidas de segurança para proteger suas APIs utilizando Spring Security.',
        author: {
          id: '5cec1261-8bd5-4df7-bb66-e6712da66e35',
          name: 'Ana Rocha',
        },
        createdAt: '2025-09-25',
        comments: [
          {
            id: 'dc05b3ff-92f1-4302-9782-7f94c77835c9',
            content: 'Muito bom! Estava com dúvidas sobre autenticação e ajudou bastante.',
            author: 'Lucas Mendes',
            createdAt: '2025-10-05T03:36:26.023607',
          },
          {
            id: 'cdaa3579-cb82-4720-9881-6f3a1101b878',
            content: 'Gostei da explicação sobre filtros, bem didática.',
            author: 'Ana Rocha',
            createdAt: '2025-10-05T03:36:26.023607',
          },
        ],
      },
      {
        postId: 'd7df9aa5-4ddd-4e5a-8cd4-a315c3cfc31c',
        title: 'Java Design Patterns',
        content: 'Um guia para os padrões de design mais comuns no mundo Java!',
        author: {
          id: '104a0969-6172-494f-baa8-45b198b0fe1b',
          name: 'Lucas Mendes',
        },
        createdAt: '2025-09-26',
        comments: [
          {
            id: 'd3b34279-4462-4279-a9b8-75ff1c2eb28b',
            content: 'Excelente guia, me ajudou a revisar Singleton e Factory.',
            author: 'Ana Rocha',
            createdAt: '2025-10-05T03:36:26.023607',
          },
        ],
      },
      {
        postId: 'b659a603-bde5-4bd4-870a-d99c0b27968a',
        title: 'Top 5 bibliotecas Java para 2025',
        content: 'Confira as bibliotecas essenciais que você deve conhecer este ano.',
        author: {
          id: '5cec1261-8bd5-4df7-bb66-e6712da66e35',
          name: 'Ana Rocha',
        },
        createdAt: '2025-09-27',
        comments: [
          {
            id: '7dff7274-f567-44ba-aa26-80c608ff4307',
            content: 'Estou usando algumas dessas libs no trabalho, ótimas escolhas!',
            author: 'Lucas Mendes',
            createdAt: '2025-10-05T03:36:26.023607',
          },
        ],
      },
      {
        postId: '6cdab81d-d879-4e46-a2b7-3368e2834c8e',
        title: 'Kubernetes para Iniciantes',
        content: 'Simplifique a orquestração de contêineres com este guia introdutório.',
        author: {
          id: '104a0969-6172-494f-baa8-45b198b0fe1b',
          name: 'Lucas Mendes',
        },
        createdAt: '2025-09-28',
        comments: [
          {
            id: 'b55b3128-e3b7-45ce-8ad2-c955be9cfc5f',
            content: 'Explicação clara, ajudou a entender os conceitos básicos.',
            author: 'Ana Rocha',
            createdAt: '2025-10-05T03:36:26.023607',
          },
        ],
      },
      {
        postId: '29a7eeb9-ebe9-47a7-acf6-35838e963a54',
        title: 'new',
        content: 'new new',
        author: {
          id: '039e789d-6bc5-4b26-8fc2-79a8081300e3',
          name: 'bea',
        },
        createdAt: '2025-11-21',
        comments: [],
      },
      {
        postId: 'd8964364-d2d8-40a4-b21b-b9a36b72a447',
        title: 'teste',
        content: 'test12',
        author: {
          id: '039e789d-6bc5-4b26-8fc2-79a8081300e3',
          name: 'bea',
        },
        createdAt: '2025-11-21',
        comments: [],
      },
      {
        postId: '10c1e6b4-7572-42ac-9e90-e7067de2e7b3',
        title: 'novo post',
        content: 'novo posijsdioudhasiouhfduioahcoxz;icjopzxjc',
        author: {
          id: '039e789d-6bc5-4b26-8fc2-79a8081300e3',
          name: 'bea',
        },
        createdAt: '2025-11-22',
        comments: [],
      },
      {
        postId: '4f4f500d-3f64-45c7-8d43-b8de0bc6912e',
        title: 'eu',
        content: 'nao sei',
        author: {
          id: '039e789d-6bc5-4b26-8fc2-79a8081300e3',
          name: 'bea',
        },
        createdAt: '2025-11-22',
        comments: [],
      },
    ]);
  }),
];
