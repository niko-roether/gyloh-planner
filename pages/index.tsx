import { TimeTable } from "gyloh-webuntis-api";
import React from "react";
import Page from "../components/page";
import { getCurrentTables } from "../api_consume/consume_table";
import TimeTableView from "../components/time_table_view";

const Home: React.FC = () => {
  const [table, setTable] = React.useState<TimeTable | null>(null);
  if(table == null) {
    getCurrentTables(1).then(tables => setTable(tables[0]));
    return <Page title="Dashboard" />
  }
  return (
    <Page title="Dashboard">
      <TimeTableView table={table} />
    </Page>
  )
}

export default Home;