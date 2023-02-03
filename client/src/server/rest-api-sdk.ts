import {
  Configuration,
  ContentApi,
  ContentModelApi,
  FieldApi,
  FieldTypeApi,
} from "./sdk";
const configuration = new Configuration({
  // basePath: from env file
  basePath: "http://127.0.0.1:4000",
});

export const sdk = {
  content: new ContentApi(configuration),
  contentModel: new ContentModelApi(configuration),
  field: new FieldApi(configuration),
  fieldType: new FieldTypeApi(configuration),
};
