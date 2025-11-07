import React from 'react';
import { Link } from 'react-router-dom';

type Crumb = {
  label: string;
  to?: string;
  current?: boolean;
};

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav className="text-sm text-black/60 mb-4" aria-label="Breadcrumb">
      <ol className="flex items-center gap-2">
        {items.map((item, idx) => (
          <li key={idx} className="flex items-center">
            {item.to && !item.current ? (
              <Link to={item.to} className="hover:underline">
                {item.label}
              </Link>
            ) : (
              <span aria-current={item.current ? 'page' : undefined} className={item.current ? 'text-black font-medium' : ''}>
                {item.label}
              </span>
            )}

            {idx < items.length - 1 && (
              <svg className="w-4 h-4 mx-2 text-black/40" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                <path d="M7 5l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
