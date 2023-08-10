import { UnprocessableEntityError } from "./errors";

const isNil = (value: any): boolean =>
  value === null || typeof value === "undefined" || String(value).trim() === "";

interface ValidateFieldsOptions {
  required: string[];
  obj: Record<string, any>;
  location?: string;
}

const validateFields = ({ required, obj, location }: ValidateFieldsOptions): void => {

  if (!obj) throw new UnprocessableEntityError(`Missing object for validation.`);
  required.forEach((item) => {
    console.log("item: ", obj[item])
    if (isNil(obj[item])) {
      throw new UnprocessableEntityError(
        `Required field - ${item} missing${location ? ` at ${location}` : ""}`
      );
    }
  });
};

export { validateFields, isNil };
