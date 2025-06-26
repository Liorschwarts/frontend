import React from "react";
import { Box, Container } from "@mui/material";
import Header from "./Header";

const Layout = ({
  children,
  onAddPlayer = () => {},
  maxWidth = "xl",
  showHeader = true,
  className = "",
}) => {
  return (
    <Box className={`app-layout ${className}`}>
      {showHeader && <Header onAddPlayer={onAddPlayer} />}

      <main className="app-layout__main">
        <Container maxWidth={maxWidth} className="app-layout__container">
          {children}
        </Container>
      </main>
    </Box>
  );
};

export default Layout;
