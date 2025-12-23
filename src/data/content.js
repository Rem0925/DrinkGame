export const CONTENT = {
  es: {
    ui: {
      title: "DRINK UP",
      settings: "Ajustes",
      addPlayer: "Añadir Jugador",
      placeholder: "Nombre...",
      hotToggle: "Modo Picante 🔥",
      modes: {
        roulette: { title: "Ruleta", desc: "La suerte decide tu destino" },
        never: { title: "Yo Nunca", desc: "Si lo has hecho, bebes" },
        truth: { title: "Verdad o Reto", desc: "Confesiones o dolor" },
      },
      actions: { spin: "GIRAR", next: "SIGUIENTE", truth: "VERDAD", dare: "RETO" },
    },
    // --- RULETA (Castigos, Suerte e Interacciones) ---
    roulette: [
      { text: "Bebe 2 tragos", type: 'punishment', color: '#ef4444' },
      { text: "Manda 3 tragos a {target}", type: 'social', color: '#10b981' },
      { text: "{target} bebe contigo", type: 'social', color: '#3b82f6' },
      { text: "Bebed todos", type: 'rule', color: '#f59e0b' },
      { text: "Reto de miradas con {target}. El que parpadee bebe.", type: 'minigame', color: '#8b5cf6' },
      { text: "Baila sexy para {target} por 20 seg o bebe 3", type: 'social', color: '#ec4899', intensity: 'hot' },
      { text: "Los hombres beben", type: 'rule', color: '#3b82f6' },
      { text: "Las mujeres beben", type: 'rule', color: '#ec4899' },
      { text: "El jugador con menos ropa bebe", type: 'rule', color: '#ef4444', intensity: 'hot' },
      { text: "Bebe si tienes tatuajes", type: 'rule', color: '#6366f1' },
      { text: "Quítate una prenda o bebe 5 tragos", type: 'punishment', color: '#ef4444', intensity: 'hot' },
      { text: "Dale un beso en la mejilla a {target}", type: 'social', color: '#ec4899' },
      { text: "Besa el cuello de {target}", type: 'social', color: '#ef4444', intensity: 'hot' },
      { text: "Haz 10 flexiones o bebe 2", type: 'minigame', color: '#10b981' },
      { text: "Intercambia una prenda con {target}", type: 'social', color: '#f59e0b', intensity: 'hot' },
      { text: "Siéntate en las piernas de {target} una ronda", type: 'social', color: '#ef4444', intensity: 'hot' },
      { text: "Hazle un masaje de hombros a {target}", type: 'social', color: '#10b981' },
      { text: "Susúrrale algo sucio al oído a {target}", type: 'social', color: '#ef4444', intensity: 'hot' },
      { text: "Elige a alguien para que beba 2 tragos", type: 'luck', color: '#10b981' },
      { text: "Di una palabra y el resto debe decir una que rime. El primero que falle bebe.", type: 'minigame', color: '#8b5cf6' },
    ],
    // --- YO NUNCA ---
    never: [
      { text: "Yo nunca he sido arrestado.", intensity: 'soft' },
      { text: "Yo nunca he mentido en este juego.", intensity: 'soft' },
      { text: "Yo nunca he tenido un sueño húmedo con {target}.", intensity: 'hot' },
      { text: "Yo nunca he mandado un nude por error.", intensity: 'hot' },
      { text: "Yo nunca he tenido sexo en un lugar público.", intensity: 'hot' },
      { text: "Yo nunca he stalkeado a {target}.", intensity: 'soft' },
      { text: "Yo nunca he usado Tinder.", intensity: 'soft' },
      { text: "Yo nunca me he liado con el ex de un amigo.", intensity: 'hot' },
      { text: "Yo nunca he vomitado por borracho.", intensity: 'soft' },
      { text: "Yo nunca he nadado desnudo.", intensity: 'hot' },
      { text: "Yo nunca he sido infiel.", intensity: 'hot' },
      { text: "Yo nunca he revisado el teléfono de mi pareja.", intensity: 'soft' },
      { text: "Yo nunca he salido sin ropa interior.", intensity: 'hot' },
      { text: "Yo nunca me he enamorado de un amigo.", intensity: 'soft' },
      { text: "Yo nunca he fingido un orgasmo.", intensity: 'hot' },
      { text: "Yo nunca he tenido una aventura de una noche.", intensity: 'hot' },
      { text: "Yo nunca he enviado fotos picantes a {target}.", intensity: 'hot' },
      { text: "Yo nunca he orinado en una piscina.", intensity: 'soft' },
      { text: "Yo nunca he besado a alguien de mi mismo sexo.", intensity: 'soft' },
    ],
    // --- VERDAD O RETO ---
    truthOrDare: {
      truth: [
        { text: "¿Cuál es tu mayor miedo?", intensity: 'soft' },
        { text: "¿Qué es lo peor que has hecho borracho?", intensity: 'soft' },
        { text: "¿Con quién de aquí tendrías sexo?", intensity: 'hot' },
        { text: "¿Cuál es tu fantasía sexual más oscura?", intensity: 'hot' },
        { text: "¿Qué parte de tu cuerpo te gusta más?", intensity: 'soft' },
        { text: "¿Qué es lo que más te gusta físicamente de {target}?", intensity: 'hot' },
        { text: "¿Qué es lo más raro que has pensado sobre {target}?", intensity: 'hot' },
        { text: "¿Saldrías con {target} si fuera la última persona en la tierra?", intensity: 'soft' },
        { text: "¿Quién de aquí crees que besa mejor?", intensity: 'soft' },
        { text: "¿Alguna vez has sido infiel?", intensity: 'hot' },
        { text: "¿Qué opinas realmente de {target}?", intensity: 'soft' },
        { text: "¿Mandarías nudes por dinero?", intensity: 'hot' },
      ],
      dare: [
        { text: "Bebe un trago sin usar las manos.", intensity: 'soft' },
        { text: "Deja que el grupo envíe un mensaje a quien quieran desde tu móvil.", intensity: 'hot' },
        { text: "Haz un baile sexy para {target}.", intensity: 'hot' },
        { text: "Gime lo más alto que puedas.", intensity: 'hot' },
        { text: "Intercambia una prenda de ropa con {target}.", intensity: 'hot' },
        { text: "Lame el cuello de {target}.", intensity: 'hot' },
        { text: "Habla con acento extranjero hasta tu próximo turno.", intensity: 'soft' },
        { text: "Dale un beso en el cuello a {target}.", intensity: 'hot' },
        { text: "Déjate hacer cosquillas por {target} por 15s.", intensity: 'soft' },
        { text: "Muerde suavemente la oreja de {target}.", intensity: 'hot' },
        { text: "Hazle un cumplido al oído a {target}.", intensity: 'soft' },
        { text: "Simula un orgasmo mirando a los ojos a {target}.", intensity: 'hot' },
        { text: "Muestra tu última foto de la galería.", intensity: 'hot' },
      ]
    }
  },
  en: {
    ui: {
      title: "DRINK UP",
      settings: "Settings",
      addPlayer: "Add Player",
      placeholder: "Name...",
      hotToggle: "Spicy Mode 🔥",
      modes: {
        roulette: { title: "Roulette", desc: "Fate decides" },
        never: { title: "Never Have I Ever", desc: "Drink if you did" },
        truth: { title: "Truth or Dare", desc: "Honesty or Pain" },
      },
      actions: { spin: "SPIN", next: "NEXT", truth: "TRUTH", dare: "DARE" },
    },
    roulette: [
      { text: "Drink 2 sips", type: 'punishment', color: '#ef4444' },
      { text: "Give 3 sips to {target}", type: 'social', color: '#10b981' },
      { text: "Kiss the cheek of {target}", type: 'social', color: '#ec4899' },
      { text: "Remove an item of clothing", type: 'punishment', color: '#ef4444', intensity: 'hot' },
    ],
    never: [
      { text: "Never have I ever been arrested.", intensity: 'soft' },
      { text: "Never have I ever had public sex.", intensity: 'hot' },
      { text: "Never have I ever stalked {target}.", intensity: 'soft' },
    ],
    truthOrDare: {
      truth: [
        { text: "What is your biggest fear?", intensity: 'soft' },
        { text: "What do you like most about {target}?", intensity: 'hot' },
      ],
      dare: [
        { text: "Drink without hands.", intensity: 'soft' },
        { text: "Kiss {target}'s neck.", intensity: 'hot' },
      ]
    }
  }
};