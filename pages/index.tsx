import { makeStyles } from "@material-ui/core";
import { TimeTable } from "gyloh-webuntis-api";
import React from "react";
import Page from "../components/page";
import { getCurrentTables } from "../api_consume/consume_table";
import TimeTableView from "../components/time_table_view";

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