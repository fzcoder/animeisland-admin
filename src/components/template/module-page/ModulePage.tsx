import React, { Suspense, useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { Breadcrumb, Skeleton, BreadcrumbProps, } from 'antd';
import "./styles/module-page.css";

type ModulePageFallbackProps = {
  delay?: number,
}
const ModulePageFallback: React.FC<ModulePageFallbackProps> = ({ delay }) => {
  const [skeleton, setSkeleton] = useState<boolean>(false);
  // 延迟 1000ms 之后展示骨架屏
  // 这样做的原因是为了防止闪屏, 优化用户体验
  useEffect(() => {
    const id = setTimeout(() => {
      setSkeleton(true);
    }, delay || 1000);
    return (() => {
      clearTimeout(id);
      setSkeleton(false);
    })
  }, []);
  return (
    <div className='component-template-module-page-skeleton'>
      {
        skeleton && [
          <Skeleton key={1} active />,
          <Skeleton key={2} active />,
          <Skeleton key={3} active />,
        ]
      }
    </div>
  )
}

export declare type ModulePageBreadcrumbItemProps = {
  title?: React.ReactNode,
  path?: string | undefined,
}
export declare type ModulePageProps = {
  header?: React.ReactNode,
  main?: React.ReactNode,
  renderHtmlTitle?: (brand: string) => string
  lazy?: boolean,
  fallback?: React.ReactNode,
  breadcrumbProps?: BreadcrumbProps,
}
const ModulePage: React.FC<ModulePageProps> = ({
  header, main, fallback, lazy, breadcrumbProps, renderHtmlTitle
}) => {
  useEffect(() => {
    (async () => {
      if (renderHtmlTitle) {
        document.title = (renderHtmlTitle("动漫岛后台管理系统"))
      } else {
        document.title = "动漫岛后台管理系统"
      }
      try {
      } catch (err: any) {
        console.error(err);
      }
    })();
  },[]);
  return (
    <div className='app-component-template-module-page'>
      <div className='app-component-template-module-page-header'>
        {
          header ? header : (
            <Breadcrumb
              itemRender={(route, params, routes, paths) => {
                const last = routes.indexOf(route) === routes.length - 1;
                return last ? (
                  <span>{route.breadcrumbName}</span>
                ) : (
                  <Link to={"/" + paths.join('/')}>{route.breadcrumbName}</Link>
                );
              }}
              {...breadcrumbProps}
            />
          )
        }
      </div>
      {
        lazy || lazy === undefined ? (
          <Suspense fallback={fallback ? fallback : <ModulePageFallback delay={1000} />}>
            <div className='app-component-template-module-page-main'>{main}</div>
          </Suspense>
        ) : (
          <div className='app-component-template-module-page-main'>{main}</div>
        )
      }
    </div>
  )
}

export default ModulePage;