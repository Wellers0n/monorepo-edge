"use client";
import { Button, Typography, Stack, useMediaQuery } from "@mui/material";
import { useRouter } from "next/navigation";
import theme from "@/theme";

export default function Home() {
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));

  const router = useRouter();
  return (
    <Stack
      height={"100vh"}
      width={"100%"}
      justifyContent={"center"}
      alignItems={"center"}
      sx={{
        backgroundImage:
          "linear-gradient(to left top, #b0fff1, #97f1e0, #7ee3cf, #63d5bd, #46c7ac, #40c7ab, #39c7a9, #31c7a8, #46d5b8, #58e3c7, #69f1d7, #7affe7)",
      }}
    >
      <Typography
        variant="h5"
        color={"secondary"}
        width={mobile ? "95%" : "40%"}
        textAlign={"center"}
        mb={5}
      >
        Clique em entrar para entrar na plataforma
      </Typography>
      <Button
        variant="outlined"
        color="secondary"
        onClick={() => router.push("/login")}
      >
        Entrar
      </Button>
    </Stack>
  );
}
