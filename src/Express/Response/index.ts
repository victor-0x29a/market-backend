import { ResponseApi } from "../../types/response.options";

function ReturnResponse(
  error: boolean,
  data: string | object | Array<Object> | Array<string> | Array<number>
): ResponseApi {
  return {
    name: "Market",
    error: error,
    values: data,
  };
}

export default ReturnResponse;
