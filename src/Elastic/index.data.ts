export default [
  {
    name: "market_companies",
    settings: {
      mappings: {
        properties: {
          cnpj: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword",
              },
            },
          },
          name: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword",
              },
            },
          },
          phone: {
            type: "integer",
          },
          email: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword",
              },
            },
          },
        },
      },
    },
  },
];
