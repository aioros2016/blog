/*
 * @Author: lizhigang
 * @Date: 2023-02-16 19:03:37
 * @Company: orientsec.com.cn
 * @Description: 文件描述
 */
import { useMemo } from 'react';
import { URLSearchParamsInit, useSearchParams } from "react-router-dom";

export const isError = (value: any): value is Error => value?.message;

export const isVoid = (value: unknown) =>
  value === undefined || value === null || value === "";

/**
 * 删除值为假的属性
 * @param obj
 * @returns {*}
 */
export const clearObject = (obj: { [key: string]: unknown }) => {
  const result = { ...obj };
  Object.keys(result).forEach((key) => {
    const value = result[key];
    if (isVoid(value)) {
      delete result[key];
    }
  });
  return result;
};
/**
 * 获取url中指定键的参数值
 * @param keys
 */
export const useUrlQueryParams = <K extends string>(keys: K[]) => {
  const [searchParams] = useSearchParams();
  const setSearchParams = useSetUrlSearchParams();
  return [
    useMemo(
      () =>
        keys.reduce(
          (prev, key) => ({ ...prev, [key]: searchParams.get(key) || "" }),
          {} as { [key in K]: string }
        ),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [searchParams]
    ),
    (params: Partial<{ [key in K]: unknown }>) => {
      return setSearchParams(params);
    },
  ] as const;
};

/**
 * 更新urlSearchParams
 */
export const useSetUrlSearchParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  return (params: { [key in string]: unknown }) => {
    const o = clearObject({
      ...Object.fromEntries(searchParams),
      ...params,
    }) as URLSearchParamsInit;
    return setSearchParams(o);
  };
};
