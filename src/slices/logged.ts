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
export const filterLogged = createSlice({
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
export const { changeMenuSlice } = filterLogged.actions;

// Export de select state
export const selectStartDate = (state: RootState) => state.Logged.menuSlice;

// Export do reducer
export const { reducer } = filterLogged;

// Export do arquivo
export default filterLogged;
