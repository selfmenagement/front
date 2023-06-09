import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Divider, Stack, Button, Typography } from '@mui/material';
import { signup } from 'controllers/application/User';
import {
  checkEmail,
  checkPw,
  confirmPw,
  checkName
} from 'controllers/domain/User';
import ModalAtom from 'components/atoms/ModalAtom';
import AlertMessage from 'components/atoms/AlertMessage';
import LoginBody from 'components/atoms/LoginBody';
import { SignupCard } from 'components/organisms/SignupCard';

export interface TextFieldProps {
  email: {
    value: string;
    onChange: (params: string) => void;
  };
  pw: {
    value: string;
    onChange: (params: string) => void;
  };
  twoPw: {
    value: string;
    onChange: (params: string) => void;
  };
  name: {
    value: string;
    onChange: (params: string) => void;
  };
}

export default function Signup() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [twoPw, setTwoPw] = useState('');
  const [name, setName] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [message, setMessage] = useState('');

  const saveUserEmail = (e: string) => {
    setEmail(e);
  };

  const saveUserPw = (e: string) => {
    setPw(e);
  };

  const saveUserCheckPw = (e: string) => {
    setTwoPw(e);
  };

  const saveUserName = (e: string) => {
    setName(e);
  };

  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);

  const doSignup = async () => {
    const res = await signup(email, pw, twoPw, name);
    if (res.result) {
      router.push('/signup/complete');
    } else {
      setMessage(res.message);
      handleOpen();
    }
  };

  const TextFieldArrayProps: TextFieldProps = {
    email: {
      value: email,
      onChange: saveUserEmail
    },
    pw: {
      value: pw,
      onChange: saveUserPw
    },
    twoPw: {
      value: twoPw,
      onChange: saveUserCheckPw
    },
    name: {
      value: name,
      onChange: saveUserName
    }
  };

  return (
    <>
      <Head>
        <title>signup</title>
      </Head>
      <LoginBody>
        <Stack
          direction="column"
          alignItems="flex-start"
          justifyContent="space-between"
        >
          <Typography
            variant="h4"
            fontWeight={700}
            fontFamily="Title_Medium"
            color={'#EA811C'}
            gutterBottom
          >
            회원가입
          </Typography>
        </Stack>

        <Divider
          sx={{ my: 3, bgcolor: 'secondary.light', borderBottomWidth: 2 }}
        ></Divider>
        <SignupCard props={TextFieldArrayProps}></SignupCard>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ my: 1 }}
        ></Stack>

        <Button
          data-cy="signup-submit"
          disabled={
            !(
              checkEmail(email) &&
              checkPw(pw) &&
              confirmPw(pw, twoPw) &&
              checkName(name)
            )
          }
          variant="contained"
          size="large"
          onClick={doSignup}
          sx={{
            color: 'white',
            height: '52px',
            boxShadow: 'none',
            fontFamily: 'Title_Light'
          }}
        >
          회원가입
        </Button>
      </LoginBody>
      <ModalAtom open={modalOpen} handleClose={handleClose}>
        <AlertMessage title={'error'} message={message} />
      </ModalAtom>
    </>
  );
}
