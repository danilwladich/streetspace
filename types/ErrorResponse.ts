import { AxiosResponse } from "axios";
import { z } from "zod";

export type ErrorResponse<T extends z.ZodType<any, any, any>> = AxiosResponse<
  {
    field: keyof z.infer<T>;
    message: string;
  },
  any
>;
