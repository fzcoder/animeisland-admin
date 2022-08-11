import React from 'react';
import { Route } from 'react-router-dom';
import { Authentication } from './';

interface RoutersMapEntryMetaProps {
  requiredAuth: Boolean,
  isIndex: Boolean,
}

interface RoutersMapEntryProps {
  path: string,
  element: (path: string) => JSX.Element,
  meta: RoutersMapEntryMetaProps,
  sub?: RoutersMapEntryProps[] | undefined,
}

const RoutesLoader = (routes: RoutersMapEntryProps[]): JSX.Element[] => {
  // 渲染生成路由树
  const renderRoutesTree = (root: RoutersMapEntryProps, index: number): JSX.Element => {
    const Element = root.element(root.path);
    const AuthElement = root.meta.requiredAuth ? <Authentication>{Element}</Authentication> : Element;
    if (root.meta.isIndex) {
      return <Route key={`${root.path}-${index}`} index element={AuthElement} />
    } else {
      if (root.sub) {
        return (
          <Route key={`${root.path}-${index}`} path={root.path} element={AuthElement}>
            {root.sub.map(renderRoutesTree)}
          </Route>
        )
      } else {
        return <Route key={`${root.path}-${index}`} path={root.path} element={AuthElement} />
      }
    }
  }
  return routes.map(renderRoutesTree);
}

export default RoutesLoader;
