const countryList: CountryInfo[] = [
  { code: 'CN', name: "China", nameZh: '中国', },
  { code: 'DE', name: "Germany", nameZh: '德国', },
  { code: 'FR', name: "France", nameZh: '法国', },
  { code: 'HK', name: "Hong Kong", nameZh: '中国香港', },
  { code: 'IN', name: "India", nameZh: '印度', },
  { code: 'IT', name: "Italy", nameZh: '意大利', },
  { code: 'JP', name: "Japan", nameZh: '日本', },
  { code: 'KR', name: "South Korea", nameZh: '韩国', },
  { code: 'MO', name: "Macao", nameZh: '中国澳门', },
  { code: 'RU', name: "Russia", nameZh: '俄罗斯', },
  { code: 'SG', name: "Singapore", nameZh: '新加坡', },
  { code: 'TW', name: "Taiwan", nameZh: '中国台湾', },
  { code: 'UK', name: "the United Kingdom", nameZh: '英国', },
  { code: 'US', name: "the United States of America", nameZh: '美国', },
]

export declare type CountryInfo = {
  code: string,
  name?: string,
  nameZh?: string,
}
export const getCountryList = (): Promise<CountryInfo[]> => {
  try {
    const list: CountryInfo[] = countryList;
    return Promise.resolve(list);
  } catch (err: any) {
    return Promise.reject(err);
  }
}
export const getCountryNameByCode = (code: string): {name: string, nameZh: string} => {
  for (let i = 0; i < countryList.length; i++) {
    const country = countryList[i];
    if (country.code === code) {
      return {name: country.name || "unknown", nameZh: country.nameZh || "未知"};
    }
  }
  return {name: "unknown", nameZh: "未知"};
}