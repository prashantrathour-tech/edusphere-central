import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type OrganizationType = 'college' | 'school' | 'coaching' | 'institute' | 'training';

export interface Organization {
  id: string;
  name: string;
  type: OrganizationType;
  logo?: string;
  settings?: Record<string, any>;
}

interface OrganizationState {
  current: Organization | null;
  organizations: Organization[];
}

const initialState: OrganizationState = {
  current: null,
  organizations: [],
};

const organizationSlice = createSlice({
  name: 'organization',
  initialState,
  reducers: {
    setCurrentOrganization: (state, action: PayloadAction<Organization>) => {
      state.current = action.payload;
    },
    setOrganizations: (state, action: PayloadAction<Organization[]>) => {
      state.organizations = action.payload;
    },
  },
});

export const { setCurrentOrganization, setOrganizations } = organizationSlice.actions;
export default organizationSlice.reducer;
