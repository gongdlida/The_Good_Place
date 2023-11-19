import Layout from '@/layout/Layout';
import { ReactSVG } from 'react-svg';
import { useNavigate, useParams } from 'react-router-dom';
import { Card } from '@/catalog/catalogList/elements';
import { useEffect, useState } from 'react';
import { getCatalogInfo } from '@/catalog/catalogDetail/container';
import { PATH } from '@/routes/constants';
import { Spinner } from '@/components';
import { firstLetterToUpper } from '@/catalog/catalogList/container';
import formatNumber from '@/util/formatNumber';

export const CatalogDetail = () => {
  const { id } = useParams();
  const [catalog, setCatalog] = useState<TCatalogDetail>({
    catalogInfo: null,
    catalogList: null,
  });
  const navigator = useNavigate();

  useEffect(() => {
    if (id === undefined) {
      //에러 모달 필요
      navigator(PATH.CATALOG_LIST, { replace: true });
      return;
    }
    window.scroll({ top: 0, left: 0, behavior: 'smooth' });
    getCatalogInfo(id, setCatalog, navigator);
  }, [id]);
  const { catalogInfo, catalogList } = catalog;

  return (
    <Layout>
      {catalogInfo === null ? (
        <Spinner />
      ) : (
        <article className='relative flex h-full w-full flex-col items-center gap-20 pt-20'>
          <button
            id='page_back_btn'
            className='fixed left-[230px] top-[150px] flex h-[52px] w-[52px] items-center justify-center rounded-[52px] border-[1px] bg-white shadow-[0px_2px_6px_rgba(0,0,0,0.08)]'
            onClick={() => navigator(PATH.CATALOG_LIST)}
          >
            <ReactSVG
              src='/assets/icons/LeftArrow.svg'
              beforeInjection={(svg) => svg.setAttribute('class', 'fill-grey-300')}
            />
          </button>
          <section className='flex w-[1330px] flex-col gap-5'>
            <div className='flex gap-10'>
              <Card catalog={catalogInfo} type='detail' />

              <div
                id='place_info'
                className='text-L/Medium flex w-[590px] max-w-[590px] flex-col gap-10 break-words'
              >
                <div id='hotel_info'>
                  <p className='text-4XL/Medium'>{catalogInfo.hotel}</p>

                  <div className='flex flex-col gap-2 pt-1'>
                    <div className='flex items-center gap-1'>
                      {Array(5)
                        .fill(0)
                        .map((_, index) => {
                          const svgStyle =
                            catalogInfo.grade >= index + 1
                              ? 'fill-yellow-400'
                              : 'fill-grey-400';
                          return (
                            <ReactSVG
                              key={`star_${index}`}
                              src='/assets/icons/Star.svg'
                              beforeInjection={(svg) =>
                                svg.setAttribute('class', `${svgStyle} w-5 h-5`)
                              }
                            />
                          );
                        })}
                    </div>

                    <div className='flex items-center gap-1'>
                      <ReactSVG
                        src='/assets/icons/Location.svg'
                        beforeInjection={(svg) => svg.setAttribute('class', 'w-4 h-4')}
                      />
                      <p className='text-M/Regular'>{catalogInfo.address}</p>
                    </div>

                    <div className='text-M/Regular flex gap-5'>
                      <div className='flex items-center gap-1'>
                        <ReactSVG
                          src='/assets/icons/Phone.svg'
                          beforeInjection={(svg) => svg.setAttribute('class', 'w-4 h-4')}
                        />
                        <p>{catalogInfo.phone}</p>
                      </div>
                      <div className='flex items-center gap-1'>
                        <ReactSVG
                          src='/assets/icons/Mail.svg'
                          beforeInjection={(svg) => svg.setAttribute('class', 'w-4 h-4')}
                        />
                        <p>{catalogInfo.email}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div id='program_info' className='flex  flex-col gap-8'>
                  <p className='text-3XL/Medium'>{catalogInfo.productName}</p>

                  <div
                    id='item_price'
                    className='flex justify-between rounded-lg border border-orange-300 bg-orange-100 p-10'
                  >
                    <div className='flex items-center gap-1'>
                      <ReactSVG src='/assets/icons/Bed.svg' />
                      <p className='text-2XL/Medium'>
                        {firstLetterToUpper(catalogInfo.roomType)}
                      </p>
                    </div>
                    <p className='text-2XL/Medium'>
                      $ {formatNumber(catalogInfo.price)} / night
                    </p>
                  </div>

                  <div className='w-[590px]'>
                    <p>{catalogInfo.description}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className='w-[1330px] pb-[100px]'>
            <p className='text-2XL/Medium'>You may also like</p>
            <div className='flex grow flex-wrap gap-[30px] pt-[30px]'>
              {catalogList?.map((catalog) => <Card key={catalog.Id} catalog={catalog} />)}
            </div>
          </section>
        </article>
      )}
    </Layout>
  );
};
