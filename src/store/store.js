import { create } from 'zustand';
import { CONTENT } from '../data/content';

export const useStore = create((set, get) => ({
  language: 'es',
  players: [],
  gameMode: 'roulette',
  isHotMode: false,
  
  setLanguage: (lang) => set({ language: lang }),
  setGameMode: (mode) => set({ gameMode: mode }),
  toggleHotMode: () => set((state) => ({ isHotMode: !state.isHotMode })),
  
  addPlayer: (name, gender) => set((state) => ({ 
    players: [...state.players, { name, gender, id: Date.now() }] 
  })),
  
  removePlayer: (id) => set((state) => ({ 
    players: state.players.filter(p => p.id !== id) 
  })),

  getText: () => CONTENT[get().language],

  getFilteredContent: (mode, subType = null) => {
    const state = get();
    const rawData = CONTENT[state.language];
    let items = [];

    if (mode === 'roulette') items = rawData.roulette;
    else if (mode === 'never') items = rawData.never;
    else if (mode === 'truthOrDare') items = rawData.truthOrDare[subType];

    if (!state.isHotMode) {
      items = items.filter(i => i.intensity !== 'hot');
    }
    return items;
  },

  getRandomPlayer: () => {
    const p = get().players;
    return p.length > 0 ? p[Math.floor(Math.random() * p.length)] : {name: 'Todos'};
  }
}));