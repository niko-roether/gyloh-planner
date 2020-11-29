import React from "react";
import Page from "../components/page";
import { getCurrentTables } from "../api_consume/consume_table";
import TimeTableView from "../components/time_table_view";
import ResponsiveListView from "../components/responsive_list_view";
import { Box, CircularProgress, Container } from "@material-ui/core";
import useSWR from "swr";

const Home: React.FC = () => {
  const swr = useSWR("dashboard-tables", () => getCurrentTables(3));

  let content
  if(swr.error) content = (
    <Container>Ein Fehler ist aufgetreten: {swr.error}</Container>
  )
  else if(!swr.data) content = (
    <Box mt={6} marginX="auto" textAlign="center">
      <CircularProgress />
    </Box>
  )
  else content = (
    <ResponsiveListView titles={swr.data.map(table => table.date.toLocaleDateString("de-DE"))}>
      {swr.data.map((table, i) => <TimeTableView table={table} key={i} />)}
    </ResponsiveListView>
  );

  return (
    <Page title="Dashboard">
      {content}
    </Page>
  )
}

export default Home;