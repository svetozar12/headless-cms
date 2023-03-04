// import { isAxiosError } from 'axios';
// import { sdk } from '../utils/sdk';
// import { v4 as uuidv4 } from 'uuid';

// describe('getContentList (contentModel)', () => {
//   let contentModelId: number;
//   const nonExistingId = 0;
//   const testModel = {
//     name: 'test',
//     userId: 'cldrasvqb0000q2n858e54qiy',
//     description: 'shorto',
//   };
//   beforeAll(async () => {
//     const model = await sdk.contentModel.v1ContentModelPost(testModel);
//     const {
//       data: { id },
//     } = model;
//     contentModelId = id;
//   });
//   afterAll(async () => {
//     await sdk.contentModel.v1ContentModelIdDelete(contentModelId);
//   });
//   it('expect correct result', async () => {
//     const res = await sdk.contentModel.v1ContentModelIdGet(contentModelId);
//     const { id, userId, description, name } = res.data;
//     expect(id).toBeDefined();
//     expect(userId).toBe(testModel.userId);
//     expect(description).toBe(testModel.description);
//     expect(name).toBe(testModel.name);
//     expect(res.status).toBe(200);
//   });
//   it('try to get other user content models. expect []', async () => {
//     const res = await sdk.contentModel
//       .v1ContentModelIdGet(nonExistingId)
//       .catch((err) => err);
//     if (!isAxiosError(res)) return;

//     const { status, statusText } = res.response || {};
//     expect(status).toBe(404);
//     expect(statusText).toBe('Not Found');
//   });
// });
