import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { useRouter } from 'next/router';
import MyImage from '@/components/MyImage';

export default function Layout({ children }) {
  const router = useRouter();

  const isActiveLink = (path) => {
    return router.pathname === path;
  };

  const links = [
    { name: 'Home', path: '/' },
    { name: 'My Pokemons', path: '/my-pokemons' },
  ];
  return (
    <div className={wrapper}>
      <div className="fixed sm:p-4 sm:h-16 sm:py-0 top-0 left-0 w-full bg-blue-600 z-10">
        <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
          <div className="w-16 sm:w-32 sm:h-16">
            <Link href="/">
              <a>
                <MyImage src={'/assets/img/logo.png'} width={5} height={3} />
              </a>
            </Link>
          </div>
          <ul className="flex pb-2 sm:pb-0 items-center justify-end h-full space-x-3">
            {links.map(({ name, path }) => (
              <li key={path}>
                <Link href={path}>
                  <a
                    className={`px-4 py-2 rounded-lg block font-bold text-white hover:bg-blue-500 ${
                      isActiveLink(path) ? 'bg-blue-500' : ''
                    }`}
                  >
                    {name}
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {children}
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.any,
};

const wrapper = `
  md:mx-6 lg:max-w-5xl xl:max-w-5xl lg:mx-auto pt-32 sm:pt-12 pb-12 bg-white min-h-[90vh]
`;
