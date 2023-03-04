import { sdk } from '../utils/sdk';
describe('getContentList (contentModel)', () => {
  const contentModelIds: number[] = [];
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
    contentModelIds.push(id);
  });
  afterAll(async () => {
    contentModelIds.forEach(async (id) => {
      await sdk.contentModel.v1ContentModelIdDelete(id);
    });
  });
  it('expect correct result', async () => {
    const res = await sdk.contentModel.v1ContentModelGet(
      'cldrasvqb0000q2n858e54qiy',
      1,
      10
    );
    const { data } = res.data;
    expect(data[0].id).toBeDefined();
    expect(data[0].userId).toBe(testModel.userId);
    expect(data[0].description).toBe(testModel.description);
    expect(data[0].name).toBe(testModel.name);
    expect(data.length).toBeGreaterThan(0);
    expect(res.status).toBe(200);
  });
  it('try to get other user content models. expect []', async () => {
    const res = await sdk.contentModel.v1ContentModelGet(
      'cldrasvqb0000q2n858e54qiddy',
      1,
      10
    );
    const { data } = res.data;
    expect(data).toEqual([]);
    expect(res.status).toBe(200);
  });
});
