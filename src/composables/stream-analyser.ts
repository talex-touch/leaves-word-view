export function parseSSEData(data: string): any[] {
  const lines = data.split('\n\n');

  // 把lines进行聚合 具体规则如下：
  // 如果当前这一行是data:就新开一个数组 否则就都加到全来的数组里
  const aggregatedLines = lines.reduce((acc, line) => {
    if (line.startsWith('data:')) {
      acc.push(line.substring(5));
    } else {
      acc[acc.length - 1] += line;
    }
    return acc;
  }, [] as string[]);

  return aggregatedLines.map(item => {
    try {
      return JSON.parse(item)
    } catch (e) {
      return null
    }
  }).filter(item => item !== null).flat();

  // let lastContent = ''

  // return lines.map(line => {
  //   if (line.startsWith('data:')) {
  //     const eventData = line.substring(5);

  //     console.log(eventData)

  //     try {
  //       const obj = JSON.parse(lastContent + eventData);

  //       console.log({ obj })

  //       lastContent = ''

  //       return obj

  //     } catch (e) {
  //       lastContent = eventData
  //       return null
  //     }
  //   }
  //   return null; // 如果不是data: 开头，返回null
  // }).filter(eventData => eventData !== null);
}

