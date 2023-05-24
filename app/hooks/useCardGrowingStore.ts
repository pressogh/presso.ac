import { create } from 'zustand';

export const useCardGrowingStore = create((set) => (
	{
		growing: false,
		onGrowStart: () => set({ growing: true }),
		onGrowEnd: () => set({ growing: false }),
	}),
);
