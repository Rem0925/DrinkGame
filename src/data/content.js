export const CONTENT = {
  es: {
    ui: {
      title: "DRINK UP",
      modes: {
        roulette: { title: "Ruleta", desc: "La suerte decide" },
        never: { title: "Yo Nunca", desc: "Tragos y confesiones" },
        truth: { title: "Verdad o Reto", desc: "Atrévete o bebe" },
      },
      actions: { spin: "GIRAR", next: "SIGUIENTE", truth: "VERDAD", dare: "RETO" },
      hotToggle: "Modo Picante 🌶️",
    },
    // RULETA: gender: 'male' (solo sale a hombres), 'female' (solo a mujeres), null (a todos)
    roulette: [
      { text: "Bebe 2 tragos", type: 'punishment', color: '#ef4444' },
      { text: "Reparte 3 tragos", type: 'luck', color: '#10b981' },
      { text: "Baila sexy 15s", type: 'minigame', color: '#f59e0b', intensity: 'hot' },
      { text: "Quítate una prenda", type: 'punishment', color: '#ef4444', intensity: 'hot' },
      { text: "Besa a una jugadora", type: 'punishment', color: '#ec4899', gender: 'male' },
      { text: "Besa a un jugador", type: 'punishment', color: '#ec4899', gender: 'female' },
      { text: "El jugador a tu derecha bebe", type: 'rule', color: '#3b82f6' },
      { text: "Todos los hombres beben", type: 'rule', color: '#3b82f6' },
    ],
    never: [
      { text: "Yo nunca he sido arrestado.", intensity: 'soft' },
      { text: "Yo nunca he tenido sexo en un lugar público.", intensity: 'hot' },
      { text: "Yo nunca he mentido jugando esto.", intensity: 'soft' },
      { text: "Yo nunca he mandado nudes.", intensity: 'hot' },
    ],
    truthOrDare: {
      truth: [
        { text: "¿Cuál es tu fantasía oculta?", intensity: 'hot' },
        { text: "¿Qué es lo peor que has hecho?", intensity: 'soft' },
        { text: "¿Quién te cae mal de aquí?", intensity: 'hot' },
      ],
      dare: [
        { text: "Gime por 10 segundos.", intensity: 'hot' },
        { text: "Bebe un trago sin manos.", intensity: 'soft' },
        { text: "Dale un masaje al de tu derecha.", intensity: 'soft' },
        { text: "Muestra tu última foto.", intensity: 'hot' },
      ]
    }
  },
  en: {
    ui: {
      title: "DRINK UP",
      modes: {
        roulette: { title: "Roulette", desc: "Spin the wheel" },
        never: { title: "Never Have I Ever", desc: "Drink if you did" },
        truth: { title: "Truth or Dare", desc: "Dare to play" },
      },
      actions: { spin: "SPIN", next: "NEXT", truth: "TRUTH", dare: "DARE" },
      hotToggle: "Spicy Mode 🌶️",
    },
    roulette: [
      { text: "Drink 2 sips", type: 'punishment', color: '#ef4444' },
      { text: "Give 3 sips", type: 'luck', color: '#10b981' },
      { text: "Remove an item of clothing", type: 'punishment', color: '#ef4444', intensity: 'hot' },
    ],
    never: [
      { text: "Never have I ever been arrested.", intensity: 'soft' },
      { text: "Never have I ever had public sex.", intensity: 'hot' },
    ],
    truthOrDare: {
      truth: [{ text: "What is your biggest secret?", intensity: 'hot' }],
      dare: [{ text: "Drink without hands.", intensity: 'soft' }]
    }
  }
};