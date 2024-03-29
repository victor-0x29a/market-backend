import supplierFace from "../../types/supplier.options";

import { EnterpriseNewSchema } from "../../Schemas/enterprise";

import { response } from "../../types/controller.options";

import { ID, Numerico } from "../../Schemas/id";

import Elastic from "../../Elastic";

import { v4 } from "uuid";

import { estypes } from "@elastic/elasticsearch";

/*
const EnterpriseController = {
  create: async (body: supplierFace): Promise<response> => {
    const bodyValidation = EnterpriseNewSchema.safeParse(body);

    if (!bodyValidation.success)
      return {
        error: true,
        message: `Confira o campo ${bodyValidation.error.errors[0].path[0]}`,
        statusCode: 406,
      };

    const findEnterprise: supplierFace | null = await Supplier.findOne({
      where: {
        cnpj: body.cnpj,
      },
    });

    if (findEnterprise)
      return {
        error: true,
        message: `Já existe um fornecedor com o mesmo CNPJ!`,
        statusCode: 409,
      };

    return await Supplier.create({
      name: body.name,
      cnpj: body.cnpj,
      phone: body.phone,
      email: body.email,
    })
      .then(() => {
        return {
          error: false,
          message: `Fornecedor cadastrado!`,
          statusCode: 201,
        };
      })
      .catch((err: Error) => {
        return {
          error: true,
          message: `Houve um erro, confira os dados enviados!`,
          statusCode: 400,
        };
      });
  },
  edit: async (id: number, body: supplierFace): Promise<response> => {
    const idValidation = ID.safeParse(id);

    if (!idValidation.success)
      return {
        error: true,
        message: "Confira o ID!",
        statusCode: 406,
      };

    const bodyValidation = EnterpriseNewSchema.safeParse(body);

    if (!bodyValidation.success)
      return {
        error: true,
        message: `Confira o campo ${bodyValidation.error.errors[0].path[0]}`,
        statusCode: 406,
      };

    const findEnterprise: supplierFace | null = await Supplier.findOne({
      where: {
        id: id,
      },
    });

    if (!findEnterprise)
      return {
        error: true,
        message: `Não existe nenhum fornecedor com esse ID!`,
        statusCode: 409,
      };

    return await Supplier.create({
      name: body.name,
      cnpj: body.cnpj,
      email: body.email,
      phone: body.phone,
    })
      .then(() => {
        return {
          error: false,
          message: `Fornecedor atualizado!`,
          statusCode: 204,
        };
      })
      .catch((err: Error) => {
        return {
          error: true,
          message: `Houve um erro, confira os dados enviados!`,
          statusCode: 400,
        };
      });
  },
};
*/
class EnterpriseController {
  public async Create(body: supplierFace): Promise<response> {
    try {
      const bodyValidation = EnterpriseNewSchema.safeParse(body);

      if (!bodyValidation.success)
        return {
          error: true,
          message: `Confira o campo ${bodyValidation.error.errors[0].path[0]}`,
          statusCode: 406,
        };

      const CompanySearch = await Elastic.Client.search({
        index: "market_companies",
        size: 1,
        query: {
          match: {
            cnpj: body.cnpj,
          },
        },
      });

      // If exists any company with equals cnpj
      if (CompanySearch.hits.hits.length > 0) {
        return {
          error: true,
          message: `Já existe um fornecedor com o mesmo CNPJ!`,
          statusCode: 409,
        };
      }
      const UUIDGENERATED = v4();
      return await Elastic.Client.index({
        index: "market_companies",
        id: UUIDGENERATED,
        document: {
          name: body.name,
          cnpj: body.cnpj,
          phone: body.phone,
          email: body.email,
          timestamp: new Date(),
        },
      })
        .then(() => {
          return {
            error: false,
            message: `Fornecedor cadastrado!`,
            statusCode: 201,
          };
        })
        .catch((err) => {
          return {
            error: true,
            message: `Houve um erro interno, confira os dados enviados!`,
            statusCode: 400,
          };
        });
    } catch (e) {
      console.log(e);
      return {
        error: true,
        message: "Houve um erro interno.",
        statusCode: 500,
      };
    }
  }
  public async Update(id: string, body: supplierFace): Promise<response> {
    try {
      const idValidation = ID.safeParse(id);

      if (!idValidation.success)
        return {
          error: true,
          message: "Confira o ID!",
          statusCode: 406,
        };

      const bodyValidation = EnterpriseNewSchema.safeParse(body);

      if (!bodyValidation.success)
        return {
          error: true,
          message: `Confira o campo ${bodyValidation.error.errors[0].path[0]}`,
          statusCode: 406,
        };

      const CompanySearch = await Elastic.Client.search({
        index: "market_companies",
        size: 1,
        query: {
          match: {
            _id: id,
          },
        },
      });

      // If exists any company with equals cnpj
      if (CompanySearch.hits.hits.length < 1) {
        return {
          error: true,
          message: `Não existe nenhum fornecedor com esse ID!`,
          statusCode: 409,
        };
      }

      return await Elastic.Client.update({
        index: "market_companies",
        id: id,
        doc: {
          name: body.name,
          cnpj: body.cnpj,
          email: body.email,
          phone: body.phone,
        },
      })
        .then(() => {
          return {
            error: false,
            message: `Fornecedor atualizado!`,
            statusCode: 204,
          };
        })
        .catch((err: Error) => {
          console.log(err);
          return {
            error: true,
            message: `Houve um erro, confira os dados enviados!`,
            statusCode: 400,
          };
        });
    } catch (e) {
      return {
        error: true,
        message: `Houve um erro interno.`,
        statusCode: 500,
      };
    }
  }
  public async Get(cnpj: number): Promise<response> {
    try {
      const Fetched = await Elastic.Client.search({
        index: "market_companies",
        size: 1,
        query: {
          match: {
            cnpj: cnpj,
          },
        },
      });
      const Data: estypes.SearchHit[] = Fetched.hits.hits;
      if (Data.length < 1)
        return {
          error: true,
          message: "Empresa não encontrada.",
          statusCode: 404,
        };
      const Company = Data[0]._source as supplierFace;

      return {
        error: false,
        message: `Empresa #${Company.cnpj}`,
        statusCode: 200,
        data: Company,
      };
    } catch {
      return {
        error: true,
        message: "Houve um erro interno.",
        statusCode: 500,
      };
    }
  }
  public async GetAll(From: number): Promise<response> {
    try {
      const FromValidation = await Numerico.safeParseAsync(From);
      if (!FromValidation.success)
        return {
          error: true,
          message: `Confira o parâmetro "from"...`,
          statusCode: 406,
        };
      const Fetched = await Elastic.Client.search({
        index: "market_companies",
        size: 100,
        from: From,
      });
      return {
        error: false,
        statusCode: 200,
        message: "Todas as empresas.",
        data: Fetched.hits.hits,
      };
    } catch (e) {
      return {
        error: true,
        message: "Houve um erro interno.",
        statusCode: 500,
      };
    }
  }
}

export default new EnterpriseController();
