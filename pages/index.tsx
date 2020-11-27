import { makeStyles } from "@material-ui/core";
import { TimeTable } from "gyloh-webuntis-api";
import React from "react";
import Page from "../components/page";
import TimeTableTableView from "../components/time_table_table_view";
import { getCurrentTables } from "../api_consume/consume_table";

const useStyles = makeStyles({
  tableHead: {
    position: "sticky",
  },
  tableHeadCell: {
    fontWeight: "bold"
  }
})

const Home: React.FC = () => {
  const [table, setTable] = React.useState<TimeTable | null>(null);
  const classes = useStyles();
  if(table == null) {
    getCurrentTables(2).then(tables => setTable(tables[1]));
    return <Page title="Dashboard" />
  }
  return (
    <Page title="Dashboard">
      <TimeTableTableView table={table} />
    </Page>
  )
}

export default Home;