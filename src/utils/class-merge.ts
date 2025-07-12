import classNames from 'classnames'
import { twMerge } from 'tailwind-merge'

export const cns = (...classx: unknown[]) => twMerge(classNames(classx))
