export function getValue(dataIndexes: string[], data: Record<string, any>) {
  let currObj: Record<string, any> = {};
  dataIndexes.forEach((dataIndex) => {
    if (!currObj) currObj = data[dataIndex];
    else currObj = currObj[dataIndex];
  });

  return currObj;
}
