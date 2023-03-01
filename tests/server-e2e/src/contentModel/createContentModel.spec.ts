import { sdk } from '../utils/sdk';
describe('create (contentModel)', () => {
  const contentModelIds: number[] = [];
  const userId = 'cldrasvqb0000q2n858e54qiy';
  const testModel = {
    name: 'test',
    userId,
    description: 'shorto',
  };

  afterAll(async () => {
    contentModelIds.forEach(async (id) => {
      await sdk.contentModel.v1ContentModelIdDelete(id);
    });
  });
  it('create content model', async () => {
    const res = await sdk.contentModel.v1ContentModelPost(testModel);

    const { id, name, userId: userIdModel, description } = res.data;
    contentModelIds.push(id);
    expect(userIdModel).toBe(userId);
    expect(id).toBeDefined();
    expect(name).toBe(testModel.name);
    expect(description).toBe(testModel.description);
    expect(res.status).toBe(201);
  });

  it('create content model with incorrect input', async () => {
    const res = await sdk.contentModel
      .v1ContentModelPost({
        name: 1221,
        userId,
        description: true,
      } as any)
      .catch((err) => err);

    expect(res.response.statusText).toBe('Unprocessable Entity');
    expect(res.response.status).toBe(422);
  });
});
