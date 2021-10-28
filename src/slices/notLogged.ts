import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

// Interface de objeto
interface FilterState {
  // Globais
  menuSlice: number;
}
const initialState: FilterState = {
  // Globais
  menuSlice: 0,
};

// Funções de alterações de estado
export const filterNotLogged = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    // Globais
    changeMenuSlice: (state, action: PayloadAction<number>) => {
      state.menuSlice = action.payload;
    }, // Altera o cost center
  },
});

// Export de funções
// Globais
export const { changeMenuSlice } = filterNotLogged.actions;

// Export de select state
export const selectStartDate = (state: RootState) => state.notLogged.menuSlice;

// Export do reducer
export const { reducer } = filterNotLogged;

// Export do arquivo
export default filterNotLogged;
