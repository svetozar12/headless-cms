import { client } from '../../../utils/trcp';

type args = Parameters<typeof client.createUser.mutate>;

const createUser = async (_: unknown, args: { input: args[0] }) => {
  const res = await client.createUser.mutate(args.input);

  return res;
};

export default createUser;
