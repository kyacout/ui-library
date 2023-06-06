import {
  StringMap,
  TFunctionKeys,
  TFunctionResult,
  TOptions,
} from 'i18next'
import { useCallback } from 'react'
import {
  Namespace,
  useTranslation as useTranslationCore,
  UseTranslationOptions,
  UseTranslationResponse as UseTranslationResponseCore,
} from 'react-i18next'

type TResultDanger<T> = {
  dangerouslySetInnerHTML: {
    __html: T,
  },
}

interface TFunctionDanger {
  // basic usage
  <
    TResult extends TFunctionResult = string,
    TKeys extends TFunctionKeys = string,
    TInterpolationMap extends object = StringMap
  >(
    key: TKeys | TKeys[],
    options?: TOptions<TInterpolationMap> | string,
  ): TResultDanger<TResult>;
  // overloaded usage
  <
    TResult extends TFunctionResult = string,
    TKeys extends TFunctionKeys = string,
    TInterpolationMap extends object = StringMap
  >(
    key: TKeys | TKeys[],
    defaultValue?: string,
    options?: TOptions<TInterpolationMap> | string,
  ): TResultDanger<TResult>;
}

type UseTranslationResponse = UseTranslationResponseCore & {
  tDanger: TFunctionDanger
}

export const useTranslation = (
  ns?: Namespace,
  options?: UseTranslationOptions,
): UseTranslationResponse => {
  const base = useTranslationCore(ns, options) as UseTranslationResponse

  const tDanger = useCallback<TFunctionDanger>(
    (...args: Parameters<TFunctionDanger>): ReturnType<TFunctionDanger> => ({
      dangerouslySetInnerHTML: {
        __html: base.t(...args),
      },
    }),
    base,
  )

  base.tDanger = tDanger

  return base
}
