import { isAxiosError } from 'axios';
import { sdk } from '../utils/sdk';

describe('getContentList (contentModel)', () => {
  let contentModelId: number;
  const testModel = {
    name: 'test',
    userId: 'cldrasvqb0000q2n858e54qiy',
    description: 'shorto',
  };
  beforeAll(async () => {
    const model = await sdk.contentModel.v1ContentModelPost(testModel);
    const {
      data: { id },
    } = model;
    contentModelId = id;
  });

  it('expect correct result', async () => {
    const res = await sdk.contentModel
      .v1ContentModelIdDelete(contentModelId)
      .catch((err) => err);

    expect(res.status).toBe(200);
  });
  it('try to delete twice', async () => {
    const res = await sdk.contentModel
      .v1ContentModelIdDelete(contentModelId)
      .catch((err) => err);
    if (!isAxiosError(res)) return;

    expect(res.response?.status).toBe(404);
  });
});
