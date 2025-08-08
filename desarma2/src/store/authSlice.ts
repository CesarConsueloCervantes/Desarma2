import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { login } from '@/services/authService';
import { Usuario } from '@/types/Usuario'; // ✅ Importa el tipo centralizado

interface AuthState {
  user: Usuario | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null
};

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (
    { email, password }: { email: string; password: string },
    thunkAPI
  ) => {
    try {
      const response = await login(email, password);

      if (response.success && response.usuario) {
        // ✅ Transforma id → _id si es necesario
        const usuarioTransformado: Usuario = {
          ...response.usuario,
          _id: response.usuario._id || response.usuario.id
        };

        return usuarioTransformado;
      } else {
        return thunkAPI.rejectWithValue('Credenciales inválidas');
      }
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || 'Error de conexión'
      );
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.loading = false;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;