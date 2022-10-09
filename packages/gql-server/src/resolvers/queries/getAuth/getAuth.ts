import { client } from '../../../utils/trcp';

type args = Parameters<typeof client.getAuth.mutate>;

const getAuth = async (_: unknown, args: { input: args[0] }) => {
  const res = await client.getAuth.mutate(args.input);

  return res;
};

export default getAuth;

// client.
