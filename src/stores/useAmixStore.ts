import { create } from 'zustand';

type AmixState = {
  interestedPlanIds: string[];
  savedIds: string[];
  appliedEventIds: string[];
  blockedUserIds: string[];
  selectedInterests: string[];
  onboardingComplete: boolean;
  togglePlanInterest: (id: string) => void;
  toggleSaved: (id: string) => void;
  toggleEventApplication: (id: string) => void;
  blockUser: (id: string) => void;
  toggleInterest: (interest: string) => void;
  finishOnboarding: () => void;
};

const toggleInArray = (items: string[], value: string) =>
  items.includes(value) ? items.filter((item) => item !== value) : [...items, value];

export const useAmixStore = create<AmixState>((set) => ({
  interestedPlanIds: [],
  savedIds: [],
  appliedEventIds: [],
  blockedUserIds: [],
  selectedInterests: ['Cine', 'Cafés', 'Beauty'],
  onboardingComplete: false,
  togglePlanInterest: (id) =>
    set((state) => ({ interestedPlanIds: toggleInArray(state.interestedPlanIds, id) })),
  toggleSaved: (id) => set((state) => ({ savedIds: toggleInArray(state.savedIds, id) })),
  toggleEventApplication: (id) =>
    set((state) => ({ appliedEventIds: toggleInArray(state.appliedEventIds, id) })),
  blockUser: (id) =>
    set((state) => ({ blockedUserIds: Array.from(new Set([...state.blockedUserIds, id])) })),
  toggleInterest: (interest) =>
    set((state) => ({ selectedInterests: toggleInArray(state.selectedInterests, interest) })),
  finishOnboarding: () => set({ onboardingComplete: true }),
}));
