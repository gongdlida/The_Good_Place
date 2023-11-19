import { useMemo } from 'react';
// import reactLogo from './assets/react.svg';
import { Carousel } from '@/home/elements/Carousel';
import { DATA } from '@/home/constants';
import Layout from '@/layout/Layout';
import { Link } from 'react-router-dom';
import { PATH } from '@/routes/constants';

function Main() {
  const imgs = useMemo(
    () =>
      Array(4)
        .fill(0)
        .map((_, idx) => `/assets/imgs/${idx + 1}.png`),
    [],
  );

  return (
    <Layout>
      <article className='flex justify-center'>
        <section className='flex w-[1330px] flex-col gap-20 pt-12'>
          <div className='flex w-full gap-[25px]'>
            {DATA.map((catalog) => {
              return (
                <div key={catalog.Id} className='relative flex'>
                  <img
                    className='h-[400px] w-[250px] rounded-lg object-cover shadow-[0px_4px_6px_rgba(0,0,0,0.3)]'
                    src={catalog.representativeImage}
                  />
                  <Link to={`${PATH.CATALOG_LIST}/${catalog.Id}`}>
                    <button className='btn-xl-submit-filled text-grey-800 absolute bottom-9 left-4 bg-white py-2 opacity-80'>
                      Show more
                    </button>
                  </Link>
                </div>
              );
            })}
          </div>
          <Carousel images={imgs} />
        </section>
      </article>
    </Layout>
  );
}

export default Main;
