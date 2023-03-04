// import { isAxiosError } from 'axios';
// import { sdk } from '../utils/sdk';

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
//     const res = await sdk.contentModel.v1ContentModelIdDelete(contentModelId);
//     expect(res.status).toBe(200);
//   });
//   it('try to delete twice', async () => {
//     const res = await sdk.contentModel.v1ContentModelIdDelete(contentModelId);
//     expect(res.status).toBe(200);
//   });
// });
