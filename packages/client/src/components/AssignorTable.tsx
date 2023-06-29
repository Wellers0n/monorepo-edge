// components
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import Pagination from "@mui/material/Pagination";
import Skeleton from "@mui/material/Skeleton";

import { Stack } from "@mui/material";
import { useRouter } from "next/navigation";
// import { useSearchParams } from 'next/navigation'

export type RowsType = {
  name: string;
  email: string;
  document: string;
  phone: string;
};

type Props = {
  rows: RowsType[];
  totalPages: number;
  // setOffset: (offset: number) => void;
  loading?: boolean;
};

const AssignorTable = ({
  totalPages,
  // setOffset,
  rows,
  loading = false,
}: Props) => {
  const router = useRouter();
  
  // const searchParams = useSearchParams()


  const handleChangePagination = (
    event: React.ChangeEvent<unknown> | null,
    value: number
  ) => {
    // const params = new URLSearchParams('offset')
    // params.set('offset', `${value - 1}`)

    // searchParams.set('')
    router.replace(`/assignors?offset=${value - 1}`);
  };

  return (
    <Stack width={"100%"} mt={5} alignItems={"flex-end"}>
      {loading ? (
        <Skeleton
          variant="rectangular"
          animation="wave"
          width={"100%"}
          height={"60vh"}
        />
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Tipo</TableCell>
                <TableCell align="left">Nome</TableCell>
                <TableCell align="left">Email</TableCell>
                <TableCell align="left">Documento</TableCell>
                <TableCell align="left">Telefone</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="left">{row.name}</TableCell>
                  <TableCell align="left">{row.email}</TableCell>
                  <TableCell align="left">{row.document}</TableCell>
                  <TableCell align="left">{row.phone}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {!rows.length && (
            <Stack alignItems={"center"} padding={5}>
              <div>Nenhum cedente encontrado</div>
            </Stack>
          )}
        </TableContainer>
      )}
      <Stack mt={2}>
        <Pagination
          onChange={handleChangePagination}
          count={totalPages}
          shape="rounded"
          color="primary"
        />
      </Stack>
    </Stack>
  );
};

export default AssignorTable;

// export const Container = styled.div`
//   width: 95%;
//   margin-top: 2rem;
//   margin-bottom: 2rem;
//   display: flex;
//   flex-direction: column;
//   align-items: flex-end;
//   justify-content: center;
// `;
