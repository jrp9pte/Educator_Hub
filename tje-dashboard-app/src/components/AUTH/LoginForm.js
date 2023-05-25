import { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const handleLogin = async (e) => {
      e.preventDefault();
      const auth = getAuth();
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);

        const user = userCredential.user;
        
      } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;

        console.log(errorCode, errorMessage);
      }
    };
  
    return (
      <form onSubmit={handleLogin}>
        <TextField 
          label="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
        />
        <TextField 
          label="Password" 
          type="password"
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />
        <Button type="submit">Log in</Button>
      </form>
    );
  }
  
  export default LoginForm;