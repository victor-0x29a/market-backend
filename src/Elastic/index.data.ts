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
            type: "keyword",
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
  {
    name: "market_products",
    settings: {
      mappings: {
        properties: {
          barchar: {
            type: "keyword",
          },
          name: {
            type: "keyword",
          },
          stock: {
            type: "integer",
          },
          breakdownStock: {
            type: "integer",
          },
          hasReplacement: {
            type: "boolean",
          },
          enterprise: {
            type: "keyword",
          },
          price: {
            type: "float",
          },
        },
      },
    },
  },
];
