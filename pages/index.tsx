import React from "react";
import Page from "../src/components/page";
import { getCurrentTables } from "../src/api_consume/consume_table";
import TimeTableView from "../src/components/time_table_view";
import ResponsiveListView from "../src/components/responsive_list_view";
import { Box, CircularProgress, Container } from "@material-ui/core";
import useSWR from "swr";
import { GetServerSideProps } from "next";
import { GylohWebUntis, TimeTable } from "gyloh-webuntis-api";
import TimeTableLoader from "../src/components/time_table_loader";
import { CalendarToday } from "@material-ui/icons";

interface HomeProps {
  dates: number[]
}

const Home: React.FC<HomeProps> = ({ dates }) => {
  return (
    <Page title="Vertretungsplan">
      <ResponsiveListView iconComponent={CalendarToday} titles={dates.map(d => new Date(d).toLocaleDateString("de-DE"))}>
        {dates.map((date, i) => (
          <TimeTableLoader date={date} key={i} />
        ))}
      </ResponsiveListView>
    </Page>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  let tables: TimeTable[] = [];
  try {
    tables = await GylohWebUntis.getCurrentTables(3);
  } catch(e) {
    return {props: { dates: [] }, notFound: true}
  }
  const dates = tables.map(t => t.date.getTime());

  return {
    props: { dates }
  }
}

export default Home;