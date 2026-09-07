/**
 * Minimal React + JSX type shims.
 *
 * The sandbox has no npm registry access, so @types/react is not installed.
 * These declarations provide just enough typing for our components and JSX to
 * typecheck. At runtime, real React is loaded from an ESM CDN via the import
 * map in index.html.
 */

declare module "react" {
  export type ReactNode =
    | string
    | number
    | boolean
    | null
    | undefined
    | ReactElement
    | ReactNode[];

  export interface ReactElement {
    type: unknown;
    props: unknown;
    key: string | number | null;
  }

  export type FC<P = Record<string, unknown>> = (props: P) => ReactElement | null;

  export type Dispatch<A> = (value: A) => void;
  export type SetStateAction<S> = S | ((prev: S) => S);

  export function useState<S>(initial: S | (() => S)): [S, Dispatch<SetStateAction<S>>];
  export function useMemo<T>(factory: () => T, deps: unknown[]): T;
  export function useEffect(effect: () => void | (() => void), deps?: unknown[]): void;
  export function useRef<T>(initial: T): { current: T };
  export function useCallback<T extends (...args: never[]) => unknown>(cb: T, deps: unknown[]): T;

  export const Fragment: unknown;
  export function createElement(type: unknown, props?: unknown, ...children: unknown[]): ReactElement;

  const React: {
    useState: typeof useState;
    useMemo: typeof useMemo;
    useEffect: typeof useEffect;
    useRef: typeof useRef;
    useCallback: typeof useCallback;
    Fragment: typeof Fragment;
    createElement: typeof createElement;
  };
  export default React;
}

declare module "react/jsx-runtime" {
  export const jsx: unknown;
  export const jsxs: unknown;
  export const Fragment: unknown;
}

declare module "react-dom/client" {
  import type { ReactNode } from "react";
  export interface Root {
    render(node: ReactNode): void;
  }
  export function createRoot(container: Element | null): Root;
}

// JSX intrinsic elements: allow any HTML element with any props.
declare namespace JSX {
  interface Element {
    type: unknown;
    props: unknown;
    key: string | number | null;
  }
  interface IntrinsicElements {
    [elemName: string]: Record<string, unknown>;
  }
  // Allow `key` (and other special attributes) on all elements and components.
  interface IntrinsicAttributes {
    key?: string | number | null;
  }
}

// Allow importing .css side-effect (ignored by tsc, handled by browser link tag).
declare module "*.css";
