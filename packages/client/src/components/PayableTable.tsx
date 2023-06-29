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

import { Box, Button, Stack } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import moment from "moment";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";

export type RowsType = {
  value: number;
  emissionDate: Date;
};

type Props = {
  rows: RowsType[];
  totalPages: number;
  loading?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
};

const PayableTable = ({
  totalPages,
  rows,
  loading = false,
  onEdit,
  onDelete,
}: Props) => {
  const router = useRouter();

  const searchParams = useSearchParams();

  const offset = searchParams.get("offset");

  const handleChangePagination = (
    event: React.ChangeEvent<unknown> | null,
    value: number
  ) => {
    router.replace(`/payables?offset=${value - 1}`);
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
                <TableCell align="left">Valor</TableCell>
                <TableCell align="left">Data de emissão</TableCell>
                {onEdit && <TableCell align="right">Ação</TableCell>}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="left">R$ {row.value}</TableCell>
                  <TableCell align="left">
                    {moment(row.emissionDate).format("DD/MM/YYYY")}
                  </TableCell>
                  {(onEdit || onDelete) && (
                    <TableCell align="right">
                      <Box
                        display={"flex"}
                        flexDirection={"row"}
                        alignItems={"center"}
                        justifyContent={"flex-end"}
                      >
                        {onEdit && (
                          <Button onClick={onEdit}>
                            <VisibilityIcon />
                          </Button>
                        )}
                        {onDelete && (
                          <Button onClick={onDelete}>
                            <DeleteIcon />
                          </Button>
                        )}
                      </Box>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {!rows.length && (
            <Stack alignItems={"center"} padding={5}>
              <div>Nenhum recebível encontrado</div>
            </Stack>
          )}
        </TableContainer>
      )}
      <Stack mt={2}>
        <Pagination
          onChange={handleChangePagination}
          count={totalPages}
          page={Number(offset) + 1}
          shape="rounded"
          color="primary"
        />
      </Stack>
    </Stack>
  );
};

export default PayableTable;
