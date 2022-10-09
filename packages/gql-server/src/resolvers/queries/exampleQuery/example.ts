import { client } from '../../../utils/trcp';

type args = Parameters<typeof client.getHealth.query>;

const example = async (_: unknown, args: { input: args[0] }) => {
  const res = await client.getHealth.query(args.input);

  return res;
};

export default example;
