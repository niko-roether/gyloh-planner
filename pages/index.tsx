import { server } from "../config";
import { makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@material-ui/core";
import { Room, Substitution, TimeTable } from "gyloh-webuntis-api";
import React from "react";
import SubstitutionView from "../components/substitution_view";
import Page from "../components/page";

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
    return <div />
  }
  return (
    <Page title="Dashboard">
      <TableContainer component={Paper}>
          <Table size="small">
            <TableHead className={classes.tableHead}>
              <TableRow>
                <TableCell className={classes.tableHeadCell}>Klassen</TableCell>
                <TableCell className={classes.tableHeadCell}>Stunde</TableCell>
                <TableCell className={classes.tableHeadCell}>Fach</TableCell>
                <TableCell className={classes.tableHeadCell}>Raum</TableCell>
                <TableCell className={classes.tableHeadCell}>Lehrer</TableCell>
                <TableCell className={classes.tableHeadCell}>Info</TableCell>
                <TableCell className={classes.tableHeadCell}>Nachricht</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {table.entries?.map(e => (
              <TableRow>
                <TableCell width={150}>{e.classes.map(c => c.shortName).join(", ")}</TableCell>
                <TableCell>{e.lesson}</TableCell>
                <TableCell>{e.subject.shortName}</TableCell>
                <TableCell>
                  {e.rooms.map(room => (
                    <SubstitutionView value={room}>
                      {(current, subst) => (
                        <React.Fragment>
                          <span>{current && current.shortName}</span>
                          <span> </span>
                          {subst && <s>{subst.shortName}</s>}
                        </React.Fragment>
                      )}
                    </SubstitutionView>
                  ))}
                </TableCell>
                <TableCell>
                  <SubstitutionView value={e.teacher}>
                      {(current, subst) => (
                        <React.Fragment>
                          {current && <Typography>{current}</Typography>}
                          {subst && <Typography style={{textDecoration: "line-through"}}>{subst}</Typography>}
                        </React.Fragment>
                      )}
                  </SubstitutionView>
                </TableCell>
                <TableCell>{e.info}</TableCell>
                <TableCell>{e.message}</TableCell>
              </TableRow>
            ))}
            </TableBody>
          </Table>
      </TableContainer>
    </Page>
  )
}

export default Home;