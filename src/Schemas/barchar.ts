import { z } from "zod";

export const BARCHAR = z.string({}).min(12).max(13);
