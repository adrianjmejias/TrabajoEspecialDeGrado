import { NextPage } from "next";
import React from "react";
import useGetArticleListQuery from "api/article/useGetArticleList";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";

import Box from "@mui/material/Box";

import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import useGetRevisionsQuery from "api/article/useGetRevisions";
import useGetModeQuery from "api/article/useGetMode";
import useExtractRevisionDataQuery from "api/article/useExtractRevisionData";

import { useRouter } from "next/router";

const useArticleDetailsPageViewModel = (wikiid: string) => {
  console.log("wikiid", wikiid);

  let title: string | undefined = undefined;
  let url: string | undefined = undefined;

  console.log("wikiid", wikiid);

  if (wikiid?.startsWith("https://")) {
    url = wikiid;
  } else {
    title = wikiid;
  }

  console.log("title:", title);
  console.log("url:", url);

  const articleQuery = useGetArticleListQuery({
    params: {
      title,
      url,
    },
  });

  const revisionsQuery = useGetRevisionsQuery({});

  const modeQuery = useGetModeQuery({
    params: {
      attribute: "user",
      datestart: "2010-01-01",
    },
  });

  const extractRevisionQuery = useExtractRevisionDataQuery({
    params: {
      title,
      url,
    },
  });

  return { articleQuery, revisionsQuery, modeQuery, extractRevisionQuery };
};

const ArticleDetailsPage: NextPage = () => {
  const router = useRouter();

  let wikiid = (router.query.title as string) || (router.query.url as string);
  console.log(wikiid);
  const { articleQuery, revisionsQuery, modeQuery, extractRevisionQuery } =
    useArticleDetailsPageViewModel(wikiid);

  return (
    <div>
      <Box component="pre">{JSON.stringify(modeQuery, null, 2)}</Box>

      <Box component="pre">{JSON.stringify(revisionsQuery, null, 2)}</Box>

      <br />
      <Box component="pre">{JSON.stringify(articleQuery, null, 2)}</Box>
      <Box component="pre">{JSON.stringify(extractRevisionQuery, null, 2)}</Box>

      <Box display="flex">
        {articleQuery.data?.map((article) => {
          return (
            <Card key={article.title} sx={{ minWidth: 275 }}>
              <CardContent>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  Word of the Day
                </Typography>
                <Typography variant="h5" component="div">
                  {article.title}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  adjective
                </Typography>
                <Typography variant="body2">
                  well meaning and kindly.
                  <br />
                  {'"a benevolent smile"'}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Learn More</Button>
              </CardActions>
            </Card>
          );
        })}
      </Box>
    </div>
  );
};

export default ArticleDetailsPage;
