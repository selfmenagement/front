import React, { PropsWithChildren } from 'react';
import { Container, styled } from '@mui/material';

const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex'
  }
}));

const StyledContent = styled('div')(() => ({
  maxWidth: 375,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column'
}));

export default function MainBody({ children }: PropsWithChildren) {
  return (
    <StyledRoot>
      <Container maxWidth="sm">
        <StyledContent sx={{ pt: 6 }}>{children}</StyledContent>
      </Container>
    </StyledRoot>
  );
}
