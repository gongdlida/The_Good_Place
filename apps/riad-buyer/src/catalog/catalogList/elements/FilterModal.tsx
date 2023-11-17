import { Modal } from '@/components/Modal';
import { ReactSVG } from 'react-svg';
import { catalogStore } from '@/catalog/store';

export const FilterModal = () => {
  const { isModalOpen, setIsModalOpen } = catalogStore();
  return (
    <Modal isOpen={isModalOpen}>
      <article className='flex flex-col rounded-lg bg-white'>
        <header className='border-grey-300 w-[780px] border-b-[1px]'>
          <div className='text-L/Medium relative flex items-center justify-center py-4'>
            <button
              onClick={() => setIsModalOpen(false)}
              className='absolute left-6 flex h-6 w-6 items-center justify-center rounded-lg hover:bg-gray-200 hover:opacity-80'
            >
              <ReactSVG
                src='/assets/icons/Close.svg'
                beforeInjection={(svg) =>
                  svg.setAttribute('class', 'w-4 h-4 fill-grey-800')
                }
              />
            </button>
            <p className='text-L/Medium'>Filters</p>
          </div>
        </header>

        <main>
          <div className='max-h-[700px] overflow-y-scroll'>
            <div className='h-[1000px]' />
          </div>
        </main>

        <footer className='border-grey-300 w-[780px] border-t-[1px]'>
          <div className='flex items-center justify-between px-6 py-4'>
            <button>
              <p className='text-L/Medium underline'>Clear All</p>
            </button>
            <button className='btn-xl-submit-filled rounded-lg bg-orange-500 py-3'>
              <p className='text-L/Medium'>Show {`700`} Places</p>
            </button>
          </div>
        </footer>
      </article>
    </Modal>
  );
};
