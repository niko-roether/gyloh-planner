import { TimeTable } from "gyloh-webuntis-api";
import React from "react";
import Page from "../components/page";
import { getCurrentTables } from "../api_consume/consume_table";
import TimeTableView from "../components/time_table_view";
import PromiseBuilder from "../components/promise_builder";

const Home: React.FC = () => {
  return (
    <Page title="Dashboard">
      <PromiseBuilder promise={getCurrentTables(3)}>
        {tables => tables && tables.map(table => <TimeTableView table={table} />)}
      </PromiseBuilder>
    </Page>
  )
}

export default Home;