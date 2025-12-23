import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CONTENT } from '../data/content';

export const useStore = create(
  persist(
    (set, get) => ({
      language: 'es',
      players: [],
      playerQueue: [], // Cola para manejar turnos sin repetición
      gameMode: 'roulette',
      isHotMode: false,

      setLanguage: (lang) => set({ language: lang }),
      setGameMode: (mode) => set({ gameMode: mode }),
      toggleHotMode: () => set((state) => ({ isHotMode: !state.isHotMode })),
      
      addPlayer: (name, gender) => set((state) => ({
        players: [...state.players, { name, gender, id: Math.random().toString() }],
        playerQueue: [] // Reiniciar cola al cambiar jugadores
      })),
      
      removePlayer: (id) => set((state) => ({
        players: state.players.filter(p => p.id !== id),
        playerQueue: []
      })),

      getText: () => CONTENT[get().language],

      // Esta es la función que daba error, asegúrate de extraerla correctamente
      getFilteredContent: (mode, subType = null) => {
        const state = get();
        const rawData = CONTENT[state.language];
        let items = [];

        if (mode === 'roulette') items = rawData.roulette;
        else if (mode === 'never') items = rawData.never;
        else if (mode === 'truthOrDare') items = rawData.truthOrDare[subType];

        // Filtro picante
        return state.isHotMode ? items : items.filter(i => i.intensity !== 'hot');
      },

      // Lógica de turnos equitativos
      getNextPlayer: () => {
        const state = get();
        let queue = [...state.playerQueue];

        if (queue.length === 0) {
          if (state.players.length === 0) return { name: 'Jugador', gender: 'male' };
          // Mezclamos a todos los jugadores para empezar una nueva ronda
          queue = [...state.players].sort(() => Math.random() - 0.5);
        }

        const next = queue.pop();
        set({ playerQueue: queue });
        return next;
      },

      // Busca una "víctima" aleatoria distinta al jugador actual
      getTargetPlayerName: (currentPlayerName) => {
        const others = get().players.filter(p => p.name !== currentPlayerName);
        if (others.length === 0) return "alguien";
        return others[Math.floor(Math.random() * others.length)].name;
      }
    }),
    {
      name: 'drink-up-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);