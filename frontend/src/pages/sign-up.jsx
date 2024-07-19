import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import useSignup from '../hooks/useSignup';

function Copyright(props) {
  return (
    <Typography variant="body2" color="white" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="/">
        MovieEnthusiast
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: '#ffffff',
    },
  },
});

const useStyles = makeStyles((theme) => ({
  input: {
    color: 'white',
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'white',
      },
      '&:hover fieldset': {
        borderColor: 'lightgray',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'white',
      },
    },
    '& .MuiInputLabel-root': {
      color: 'white',
    },
    '& .MuiInputBase-input': {
      color: 'white',
    },
  },
}));

export default function SignUp() {
  const classes = useStyles();
  const { loading, signup } = useSignup();

  const handleSubmit = async (event) => {
    event.preventDefault();
    await signup(inputs);
    const form = event.target;
    const formData = new FormData(form);

    console.log({
      name: formData.get('name'),
      username: formData.get('username'),
      password: formData.get('password'),
    });
  };

  const [inputs, setInputs] = React.useState({
    fullName: '',
    username: '',
    password: '',
    confirmPassword: '',
  });

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ background: '#14171C', height: '100vh', width: '100vw' }}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              pt: '10vh',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography variant="h2" sx={{ fontFamily: 'zap', color: 'white' }}>ME</Typography>
            <Typography component="h1" variant="h5" color={'white'}>
              Sign up
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    name="name"
                    required
                    fullWidth
                    id="name"
                    label="Name"
                    autoFocus
                    value={inputs.fullName}
                    onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}
                    className={classes.input}
                    InputLabelProps={{ className: classes.input }}
                    InputProps={{ className: classes.input }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    autoComplete="username"
                    value={inputs.username}
                    onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
                    className={classes.input}
                    InputLabelProps={{ className: classes.input }}
                    InputProps={{ className: classes.input }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    value={inputs.password}
                    onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
                    className={classes.input}
                    InputLabelProps={{ className: classes.input }}
                    InputProps={{ className: classes.input }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="confirmpassword"
                    label="Confirm Password"
                    type="password"
                    id="confirmpassword"
                    autoComplete="new-password"
                    value={inputs.confirmPassword}
                    onChange={(e) => setInputs({ ...inputs, confirmPassword: e.target.value })}
                    className={classes.input}
                    InputLabelProps={{ className: classes.input }}
                    InputProps={{ className: classes.input }}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, background: 'white', color: 'black' }}
                disabled={loading}
              >
                {loading ? 'Loading...' : 'Sign Up'}
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/signin" variant="body2" sx={{ color: 'white' }}>
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 5, color: 'white' }} />
        </Container>
      </Box>
    </ThemeProvider>
  );
}
