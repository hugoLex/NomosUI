import React, { Fragment, useState } from 'react';
import { useRouter } from 'next/router';
import { Head } from '@app/components/ui';
import { CaseHeader, FilterSideBar } from '@app/components/app';
import { AppLayout as Layout } from '@app/components/layout';

const Page = () => {
  const router = useRouter();

  const slug = String(router.query.slug);
  const title = slug.replace(/-/g, ' ');
  const tabId: string = router.query.tab ? String(router.query.tab) : 'case';

  const [filters, setFilters] = useState<
    { header: string; options: string[] }[]
  >([]);

  return (
    <Fragment>
      <Head title={`Search Result - ${title}`} />
      <Layout>
        <CaseHeader />
        <section className='flex justify-center items-center self-stretch py-6 '>
          <div className='px-16 max-md:px-5 max-w-full'>
            <div className='md:grid grid-cols-12 gap-8'>
              <div className='col-span-4 self-baselane'>
                <div className='sticky top-[68px]'>
                  <FilterSideBar filters={filters} setFilters={setFilters} />
                </div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </Fragment>
  );
};

export default Page;
