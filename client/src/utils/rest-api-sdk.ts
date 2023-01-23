import {
  Configuration,
  ContentApi,
  ContentModelApi,
  FieldApi,
  FieldTypeApi,
} from "./sdk";
import "./sdk";
const configuration = new Configuration({
  // basePath: from env file
  basePath: "https://api-development.netfield.io",
});

export const sdk = {
  content: new ContentApi(configuration),
  contentModel: new ContentModelApi(configuration),
  field: new FieldApi(configuration),
  fieldType: new FieldTypeApi(configuration),
};
