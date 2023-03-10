import express from "express";
import { array, boolean, object } from "zod";
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
