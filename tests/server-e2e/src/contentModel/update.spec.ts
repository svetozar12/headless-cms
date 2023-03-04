import { sdk } from '../utils/sdk';
describe('getList (contentModel)', () => {
  const contentModelIds: number[] = [];
  const userId = 'cldrasvqb0000q2n858e54qiy';
  const testModel = {
    name: 'test',
    userId,
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
    const res = await sdk.contentModel.v1ContentModelIdPut(1, {
      ...testModel,
      name: 'new Name',
    });
    const { id, name, userId: userIdModel, description } = res.data;
    expect(userIdModel).toBe(userId);
    expect(id).toBeDefined();
    expect(name).toBe('new Name');
    expect(description).toBe(testModel.description);
    expect(res.status).toBe(200);
  });
  //   it('try to update content model that isnt yours', async () => {
  //     const res = await sdk.contentModel.v1ContentModelIdPut(1, {
  //       ...testModel,
  //       name: 'new Name',
  //       userId: 'other id',
  //     });
  //     const { id, name, userId: userIdModel, description } = res.data;
  //     expect(userIdModel).toBe(userId);
  //     expect(id).toBeDefined();
  //     expect(name).toBe('new Name');
  //     expect(description).toBe(testModel.description);
  //     expect(res.status).toBe(200);
  //   });
});
