import * as React from 'react'
declare module 'react' {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    flex?: boolean
    relative?: boolean
    absolute?: boolean
    text?: string
    grid?: boolean
    before?: string
    after?: string
    shadow?: boolean
    w?: string
    h?: string
    top?: string
    bg?: string
    fixed?: boolean
    z?: string
    block?: boolean
    rounded?: string
    b?: string
    left?: string
  }
  interface SVGProps<T> extends SVGAttributes<T>, ClassAttributes<T> {
    w?: string
    h?: string
  }
}
