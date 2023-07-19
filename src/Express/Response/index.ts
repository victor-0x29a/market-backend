import { ResponseApi } from "../../types/response.options";

function ReturnResponse(
  error: boolean,
  message: string,
  data?: string | object | Array<Object> | Array<string> | Array<number> | null
): ResponseApi {
  return {
    name: "Market",
    error: error,
    message: message,
    data: data ? data : null,
  };
}

export default ReturnResponse;
