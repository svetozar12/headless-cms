import { client } from '../../../utils/trcp';

type args = Parameters<typeof client.getUser.queries>;

const getUser = async (_: unknown, args: { input: args[0] }) => {
  const res = await client.getUser.mutate(args.input);

  return res;
};

export default getUser;
