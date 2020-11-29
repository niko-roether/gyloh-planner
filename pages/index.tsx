import { TimeTable } from "gyloh-webuntis-api";
import React from "react";
import Page from "../components/page";
import { getCurrentTables } from "../api_consume/consume_table";
import TimeTableView from "../components/time_table_view";
import PromiseBuilder from "../components/promise_builder";
import ResponsiveListView from "../components/responsive_list_view";

const Home: React.FC = () => {
  return (
    <Page title="Dashboard">
      <PromiseBuilder promise={getCurrentTables(3)}>
        {tables => tables && 
          <ResponsiveListView titles={tables.map(table => table.date.toLocaleDateString("de-DE"))}>
            {tables.map((table, i) => <TimeTableView table={table} key={i} />)}
          </ResponsiveListView>
        }
      </PromiseBuilder>
    </Page>
  )
}

export default Home;