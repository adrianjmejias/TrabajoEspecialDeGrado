import { NextPage } from "next";
import React from "react";
import useGetArticleList from "api/article/useGetArticleList";

const useArticleDetailsPageViewModel = () => {
  const articleQuery = useGetArticleList({
    params: {
      title: "Orgia",
    },
  });

  return { articleQuery };
};

const ArticleDetailsPage: NextPage = () => {
  const { articleQuery } = useArticleDetailsPageViewModel();

  return <>{JSON.stringify(articleQuery)}</>;
};

export default ArticleDetailsPage;
