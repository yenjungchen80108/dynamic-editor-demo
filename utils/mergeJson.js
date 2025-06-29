// 判断是否是对象的辅助函数
function isObject(value) {
  return value && typeof value === "object" && !Array.isArray(value);
}

export const deepMerge = (obj1, obj2) => {
  const merged = { ...obj1 }; // 初始化为 obj1 的拷贝

  for (const key in obj2) {
    if (obj2.hasOwnProperty(key)) {
      if (isObject(obj1[key]) && isObject(obj2[key])) {
        // 如果两者都是对象，递归合并
        merged[key] = deepMerge(obj1[key], obj2[key]);
      } else {
        // 否则直接取 obj2 的值
        merged[key] = obj2[key];
      }
    }
  }

  return JSON.parse(JSON.stringify(merged));
};

// compose list by key
export const composeList = (list1 = [], list2 = [], key = "id") => {
  const newList = list1?.map((config) => {
    const target = list2?.find((item) => config[key] === item[key]);

    if (target) {
      return {
        ...config,
        ...target,
      };
    }

    return config;
  });

  return newList;
};
