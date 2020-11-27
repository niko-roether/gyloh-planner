import { server } from "../config";
import { makeStyles } from "@material-ui/core";
import { TimeTable } from "gyloh-webuntis-api";
import React from "react";
import Page from "../components/page";
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
    fetch(`${server}/api/tables/current?num=1`).then(res => res.json().then(data => setTable(data[0])));
    return <Page title="Dashboard" />
  }
  return (
    <Page title="Dashboard">
      <TimeTableView table={table} />
    </Page>
  )
}

export default Home;