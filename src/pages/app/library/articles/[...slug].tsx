import React, {
  Fragment,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useRouter } from "next/router";
import { AppLayout, AppLayoutContext } from "@app/components/layout";
import {
  Navbar,
  ErrorView404,
  Container,
  Markdown,
  NavbarTitle,
  ActionButtons,
} from "@app/components/shared";
import { Head, Loader } from "@app/components/ui";
import { useVisibility } from "@app/hooks";
import { useGetArticleQuery } from "@app/store/services/librarySlice";
import { NextPageWithLayout } from "@app/types";
import axios from "axios";
import matter from "gray-matter";

type Article = {
  document_id: string;
  article_title: string;
  author: string;
  main_text_url: string;
  year: number;
};

const Page: NextPageWithLayout = () => {
  const router = useRouter();
  const { referrer } = useContext(AppLayoutContext);
  const query = router.query;
  const slug = query.slug ? query.slug : "";
  const articleId = slug as string;

  const [article, setArticle] = useState<string | undefined>(undefined);
  const h1Ref = useRef<HTMLHeadingElement | null>(null);

  const isTitle = useVisibility({
    ref: h1Ref,
    options: {
      root: null,
      threshold: 0.8,
    },
  });

  const { data, isLoading, isError } = useGetArticleQuery(articleId);

  useEffect(() => {
    if (data) {
      const { article } = data;
      const { main_text_url: url } = article as Article;

      if (url) {
        (async () => {
          try {
            const res = await axios.get(url);
            const { content } = matter(res.data);

            setArticle(content);
          } catch (error) {
            console.log(error);
          }
        })();
      }
    }
    return () => {};
  }, [data]);

  if (isLoading) {
    // Early return for loading state
    return (
      <Fragment>
        <Navbar />

        <div className="flex-1 flex flex-col justify-center items-center self-stretch py-6 min-h-[]">
          <Loader variant="classic" size={80} />
        </div>
      </Fragment>
    );
  }

  if (!data && isError) {
    // Simplified error check
    return (
      <Fragment>
        <Navbar />

        <ErrorView404
          caption="No matching legal resources found"
          desc="Check your search terms and try again, or explore our curated collection of legal resources to find what you need"
        />
      </Fragment>
    );
  }

  return (
    <Fragment>
      <Navbar>
        <div className="flex justify-between py-2.5">
          <NavbarTitle isTitle={!isTitle} title={data.article.article_title} />
          <ActionButtons />
        </div>
      </Navbar>

      <Container>
        <div className="py-8 space-y-6 text-dark-2">
          <h1
            id="searchQuery"
            ref={h1Ref}
            className="text-xx font-normal mb-3 text-[#245b91]"
          >
            {data.article.article_title}
          </h1>

          <div className="flex items-center gap-2 flex-wrap mb-4">
            <span
              className={` px-2 py-[0.125rem] bg-stone-100 rounded text-center text-teal-900 text-sm font-medium`}
              title="Primary domain"
            >
              {data.article.author}
            </span>

            <span
              className={` px-2 py-[0.125rem] bg-stone-100 rounded text-center text-teal-900 text-sm font-medium`}
              title=" domain"
            >
              {data.article.year}
            </span>
          </div>

          {article && (
            <div>
              <Markdown
                content={article}
                className="wrapper text-wrap overflow-x-hidden"
              />
            </div>
          )}
        </div>
      </Container>
    </Fragment>
  );
};

Page.getLayout = (page) => {
  return (
    <Fragment>
      <Head title={"Article"} />
      <AppLayout>{page}</AppLayout>
    </Fragment>
  );
};

export default Page;
