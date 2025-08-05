      // Data para la interfaz de usuario en español
      const spanishData = {
        ui: {
          addPlayer: "Añadir Jugador",
          startGame: "Comenzar",
          settings: "Configuración",
          questionsTab: "Preguntas",
          rouletteTab: "Ruleta",
          punishmentsTab: "Castigos",
          minigamesTab: "Minijuegos",
          addQuestion: "Añadir Pregunta",
          addPunishment: "Añadir Castigo",
          addMinigame: "Añadir Minijuego",
          add: "Añadir",
          spin: "Girar",
          editQuestion: "Editar Pregunta",
          editPunishment: "Editar Castigo",
          editMinigame: "Editar Minijuego",
          update: "Actualizar",
          cancel: "Cancelar",
          resetDefaults: "Resetear a Predeterminados",
          deleteElement: "¿Seguro que quieres eliminar este elemento?",
          requiresPeople: "¿Requiere otro jugador?",
          requiresNone: "Nadie",
          requiresOppositeGender: "Género Opuesto",
          requiresAny: "Cualquier Jugador",
          confirmation: "¿Estás seguro?",
          yes: "Sí",
          no: "No",
          noQuestions: "No hay preguntas. ¡Añade algunas!",
          noRouletteItems:
            "La ruleta está vacía. ¡Añade items en la configuración!",
          playerListPlaceholder: "Añade de 2 a más jugadores",
          addPlayersPlaceholder: "Nombre del jugador",
          male: "HOMBRE",
          female: "MUJER",
          addQuestionPlaceholder: "Escribe la pregunta...",
          addPunishmentPlaceholder: "Escribe el castigo...",
          addMinigamePlaceholder: "Describe el minijuego...",
          with: "con",
          noOppositeGender:
            "(pero no hay nadie del otro género, ¡te salvaste!)",
          noOtherPerson: "(pero no hay nadie más, ¡te salvaste!)",
          questionHeader: "La pregunta es para todos:",
          rouletteHeader: "¡{playerName}, tu destino te espera!",
          choosePlayerPrompt:
            "El grupo elige al jugador más votado y presiona el botón.",
          playerChosenBtn: "ELEGIR JUGADOR",
          continueBtn: "LISTO",
          activeRule: "Regla Activa",
          selectPlayerTitle: "¿Quién fue el elegido?",
          cardPunishment: "Castigo",
          cardMinigame: "Minijuego",
          cardRule: "Regla",
          cardLuck: "Suerte",
          createRule: "Crea una nueva regla:",
          activeRulesTitle: "Reglas Activas",
          clearRules: "Borrar Reglas Activas",
          reSpinHeader: "¡Gira de nuevo!", // Nuevo texto para la carta de suerte
          ruleCardDescription: "¡REGLA! Tienes el poder. Crea una nueva regla que todos deban seguir.",
          luckCardDescription: "¡SUERTE! Te has salvado. Elige a otra persona para que gire la ruleta en tu lugar.",
        },
        questions: [
          "¿Quién es más probable que se ría en un momento serio?",
          "¿Quién se gastaría todo su sueldo en un día?",
          "¿Quién sobreviviría a un apocalipsis zombie?",
        ],
        punishments: [
          { text: "Bebe 2 tragos" },
          { text: "Cuenta un secreto vergonzoso" },
          { text: "Baila 30 segundos sin música" },
          {
            text: "Bésate con alguien del sexo opuesto",
            requiresOppositeGender: true,
          },
        ],
        minigames: [
          { text: "El suelo es lava. ¡El último en subirse a una silla bebe!" },
          {
            text: "Categorías. Elige una categoría y di una palabra por turnos. El primero que falle, bebe.",
          },
        ],
      };

      // Data para la interfaz de usuario en inglés
      const englishData = {
        ui: {
          addPlayer: "Add Player",
          startGame: "Start",
          settings: "Settings",
          questionsTab: "Questions",
          rouletteTab: "Roulette",
          punishmentsTab: "Punishments",
          minigamesTab: "Minigames",
          addQuestion: "Add Question",
          addPunishment: "Add Punishment",
          addMinigame: "Add Minigame",
          add: "Add",
          spin: "Spin",
          editQuestion: "Edit Question",
          editPunishment: "Edit Punishment",
          editMinigame: "Edit Minigame",
          update: "Update",
          cancel: "Cancel",
          resetDefaults: "Reset to Defaults",
          deleteElement: "Are you sure you want to delete this item?",
          requiresPeople: "Requires another player?",
          requiresNone: "Nobody",
          requiresOppositeGender: "Opposite Gender",
          requiresAny: "Any Player",
          confirmation: "Are you sure?",
          yes: "Yes",
          no: "No",
          noQuestions: "No questions. Add some!",
          noRouletteItems: "The roulette is empty. Add items in settings!",
          playerListPlaceholder: "Add 2 or more players",
          addPlayersPlaceholder: "Player name",
          male: "MALE",
          female: "FEMALE",
          addQuestionPlaceholder: "Write the question...",
          addPunishmentPlaceholder: "Write the punishment...",
          addMinigamePlaceholder: "Describe the minigame...",
          with: "with",
          noOppositeGender:
            "(but there's no one of the opposite gender, you're safe!)",
          noOtherPerson: "(but there's nobody else, you're safe!)",
          questionHeader: "This question is for everyone:",
          rouletteHeader: "{playerName}, your destiny awaits!",
          choosePlayerPrompt:
            "The group chooses the most voted player and presses the button.",
          playerChosenBtn: "CHOOSE PLAYER",
          continueBtn: "DONE",
          activeRule: "Active Rule",
          selectPlayerTitle: "Who was chosen?",
          cardPunishment: "Punishment",
          cardMinigame: "Minigame",
          cardRule: "Rule",
          cardLuck: "Luck",
          createRule: "Create a new rule:",
          activeRulesTitle: "Active Rules",
          clearRules: "Clear Active Rules",
          reSpinHeader: "Spin again!", // New text for the luck card
          ruleCardDescription: "RULE! You have the power. Create a new rule that everyone must follow.",
          luckCardDescription: "LUCK! You're safe. Choose another person to spin the roulette wheel in your place.",
          
        },
        questions: [
          "Who is most likely to laugh at a serious moment?",
          "Who would spend their entire salary in one day?",
          "Who would survive a zombie apocalypse?",
        ],
        punishments: [
          { text: "Drink 2 sips" },
          { text: "Tell an embarrassing secret" },
          { text: "Dance 30 seconds without music" },
          {
            text: "Kiss someone of the opposite gender",
            requiresOppositeGender: true,
          },
        ],
        minigames: [
          { text: "The floor is lava. The last one to get on a chair drinks!" },
          {
            text: "Categories. Choose a category and say a word in turns. The first to fail, drinks.",
          },
        ],
      };

      document.addEventListener("DOMContentLoaded", () => {
        // Estado global del juego
        const gameState = {
          players: [],
          currentPlayerIndex: 0,
          editing: { type: null, index: null },
          questions: [],
          punishments: [],
          minigames: [],
          rouletteItems: [], // Todos los items de ruleta disponibles (master list)
          questionDeck: [],
          defaultQuestions: [],
          defaultPunishments: [],
          defaultMinigames: [],
          lg: {}, // Objeto para almacenar los textos de la interfaz de usuario del idioma actual
          currentLanguage: "es",
          activeRules: [], // Array para múltiples reglas activas
          rouletteItemsAvailable: [], // Items de ruleta disponibles para el siguiente giro (excluyendo el último)
          currentRouletteOrder: [], // El orden de los items tal como se muestran en la ruleta para el giro actual
          lastSpunItem: null, // Almacena el último item que salió en la ruleta
        };

        // Referencias a elementos del DOM
        const pages = {
          addPlayers: document.getElementById("add-players-page"),
          gameQuestion: document.getElementById("game-question-page"),
          gameRoulette: document.getElementById("game-roulette-page"),
          settings: document.getElementById("settings-page"),
        };
        const backBtn = document.getElementById("back-btn"),
          settingsBtn = document.getElementById("settings-btn"),
          confirmModal = document.getElementById("confirmation-modal"),
          playerNameInput = document.getElementById("player-name-input"),
          genderTabs = document.querySelectorAll(".gender-tab"),
          addPlayerBtn = document.getElementById("add-player-btn"),
          playerListContainer = document.getElementById(
            "player-list-container"
          ),
          startGameBtn = document.getElementById("start-game-btn"),
          logo = document.getElementById("logo"),
          gameQuestionHeader = document.getElementById("game-question-header"),
          questionText = document.getElementById("question-text"),
          playerChosenBtn = document.getElementById("player-chosen-btn"),
          chosenPlayerHeader = document.getElementById("chosen-player-header"),
          wheelStrip = document.getElementById("wheel-strip"),
          spinBtn = document.getElementById("spin-btn"),
          resultContainer = document.getElementById("result-container"),
          resultText = document.getElementById("result-text"),
          confirmResultBtn = document.getElementById("confirm-result-btn"),
          settingsTabBtns = document.querySelectorAll(".settings-tab-btn"),
          settingsContents = document.querySelectorAll(".settings-content"),
          questionsList = document.getElementById("questions-list"),
          questionFormTitle = document.getElementById("question-form-title"),
          questionInput = document.getElementById("question-input"),
          questionFormButtons = document.getElementById(
            "question-form-buttons"
          ),
          punishmentsList = document.getElementById("punishments-list"),
          punishmentFormTitle = document.getElementById(
            "punishment-form-title"
          ),
          punishmentInput = document.getElementById("punishment-input"),
          punishmentFormButtons = document.getElementById(
            "punishment-form-buttons"
          ),
          minigamesList = document.getElementById("minigames-list"),
          minigameFormTitle = document.getElementById("minigame-form-title"),
          minigameInput = document.getElementById("minigame-input"),
          minigameFormButtons = document.getElementById(
            "minigame-form-buttons"
          ),
          resetDefaultsBtn = document.getElementById("reset-defaults-btn"),
          flags_element = document.getElementById("flags"),
          activeRuleBanner = document.getElementById("active-rule-banner"),
          activeRuleText = document.getElementById("active-rule-text"),
          playerSelectionModal = document.getElementById(
            "player-selection-modal"
          ),
          playerSelectionList = document.getElementById(
            "player-selection-list"
          ),
          cancelSelectionBtn = document.getElementById("cancel-selection-btn"),
          textInputModal = document.getElementById("text-input-modal"),
          textInputTitle = document.getElementById("text-input-title"),
          textInputField = document.getElementById("text-input-field"),
          textInputConfirmBtn = document.getElementById(
            "text-input-confirm-btn"
          ),
          textInputCancelBtn = document.getElementById(
            "text-input-cancel-btn"
          ),
          activeRulesContainer = document.getElementById(
            "active-rules-container"
          ),
          activeRulesList = document.getElementById("active-rules-list"),
          clearActiveRulesBtn = document.getElementById(
            "clear-active-rules-btn"
          );

        // Se define `textsToChange` para que la función `changeLanguage` pueda actualizar los textos de la UI.
        const textsToChange = document.querySelectorAll("[data-section='ui']");

        // Función para cambiar el idioma de la interfaz
        const changeLanguage = (language) => {
          document.documentElement.lang = language;
          gameState.currentLanguage = language;
          localStorage.setItem("drinkUpLanguage", language);
          const data = language === "en" ? englishData : spanishData;
          gameState.defaultQuestions = data.questions;
          gameState.defaultPunishments = data.punishments;
          gameState.defaultMinigames = data.minigames;
          gameState.lg = data.ui;

          // Actualiza todos los elementos con el atributo data-section="ui"
          textsToChange.forEach((el) => {
            if (gameState.lg[el.dataset.value]) {
              el.innerHTML = gameState.lg[el.dataset.value];
            }
          });

          // Actualiza los placeholders de los inputs
          playerNameInput.placeholder = gameState.lg.addPlayersPlaceholder;
          questionInput.placeholder = gameState.lg.addQuestionPlaceholder;
          punishmentInput.placeholder = gameState.lg.addPunishmentPlaceholder;
          minigameInput.placeholder = gameState.lg.addMinigamePlaceholder;

          // Actualiza el estado activo de las banderas
          document
            .querySelectorAll(".flag-item")
            .forEach((flag) =>
              flag.classList.toggle(
                "active",
                flag.dataset.language === language
              )
            );
          loadAllData();
          renderSettings();
          resetForms();
          renderActiveRules(); // Renderizar reglas activas al cambiar de idioma
        };

        // Funciones para manejar el almacenamiento local
        const getFromStorage = (key) => JSON.parse(localStorage.getItem(key));
        const saveToStorage = (key, value) =>
          localStorage.setItem(key, JSON.stringify(value));

        // Guarda todos los datos de preguntas, castigos y minijuegos en el almacenamiento local
        const saveAllData = () => {
          const lang = gameState.currentLanguage;
          saveToStorage(`drinkUpQuestions_${lang}`, gameState.questions);
          saveToStorage(`drinkUpPunishments_${lang}`, gameState.punishments);
          saveToStorage(`drinkUpMinigames_${lang}`, gameState.minigames);
          saveToStorage(`drinkUpActiveRules_${lang}`, gameState.activeRules);
        };

        // Carga todos los datos del almacenamiento local o usa los predeterminados
        const loadAllData = () => {
          const lang = gameState.currentLanguage;
          gameState.questions = getFromStorage(`drinkUpQuestions_${lang}`) || [
            ...gameState.defaultQuestions,
          ];
          gameState.punishments = getFromStorage(
            `drinkUpPunishments_${lang}`
          ) || [...gameState.defaultPunishments];
          gameState.minigames = getFromStorage(`drinkUpMinigames_${lang}`) || [
            ...gameState.defaultMinigames,
          ];
          gameState.activeRules =
            getFromStorage(`drinkUpActiveRules_${lang}`) || [];
          rebuildRouletteItems();
        };

        // Reconstruye los elementos de la ruleta combinando castigos, minijuegos y elementos fijos
        const rebuildRouletteItems = () => {
          const fixedItems = [
            {
              type: "rule",
              text: gameState.lg.ruleCardDescription,
            },
            {
              type: "luck",
              text: gameState.lg.luckCardDescription,
            },
          ];
          gameState.rouletteItems = [
            ...gameState.punishments.map((p) => ({ ...p, type: "punishment" })),
            ...gameState.minigames.map((m) => ({ ...m, type: "minigame" })),
            ...fixedItems,
          ];
          // Inicializar rouletteItemsAvailable con todos los items disponibles
          gameState.rouletteItemsAvailable = [...gameState.rouletteItems];
        };

        // Muestra una página específica y gestiona la visibilidad de los botones de navegación
        const showPage = (pageId) => {
          Object.values(pages).forEach((page) =>
            page.classList.remove("active")
          );
          pages[pageId].classList.add("active");
          backBtn.classList.toggle("hidden", pageId !== "settings");
          flags_element.classList.toggle("hidden",pageId !== "settings");
          settingsBtn.classList.toggle(
            "hidden",
            pageId === "settings" ||
              pageId === "gameQuestion" ||
              pageId === "gameRoulette"
          );
          // Mostrar/ocultar el contenedor de reglas activas según la página
          activeRulesContainer.classList.toggle(
            "hidden",
            pageId !== "gameQuestion"
          );
          renderActiveRules(); // Asegura que las reglas se rendericen al cambiar de página
        };

        // Renderiza la lista de jugadores en la interfaz
        const renderPlayerList = () => {
          playerListContainer.innerHTML =
            gameState.players.length === 0
              ? `<p class="text-center p-4 text-gray-400">${gameState.lg.playerListPlaceholder}</p>`
              : "";
          if (gameState.players.length === 0) return;
          gameState.players.forEach((player, index) => {
            const playerEl = document.createElement("div");
            playerEl.className =
              "p-3 rounded-lg mb-2 bg-gray-700 flex justify-between items-center";
            const iconClass =
              player.gender === "hombre"
                ? "fa-mars text-blue-400"
                : "fa-venus text-pink-400";
            playerEl.innerHTML = `<span class="font-semibold flex items-center gap-3"><i class="fas ${iconClass}"></i> ${player.name}</span><button class="remove-player-btn text-red-400 hover:text-red-600" data-index="${index}"><i class="fas fa-times"></i></button>`;
            playerListContainer.appendChild(playerEl);
          });
        };

        // Actualiza el estado del botón de inicio del juego (habilitado si hay al menos 2 jugadores)
        const updateStartButtonState = () => {
          startGameBtn.disabled = gameState.players.length < 2;
        };

        // Actualiza el banner de regla activa (este banner solo muestra la última regla, la lista es para todas)
        const updateActiveRuleBanner = () => {
          activeRuleBanner.classList.toggle(
            "visible",
            gameState.activeRules.length > 0
          );
          if (gameState.activeRules.length > 0) {
            activeRuleText.textContent =
              gameState.activeRules[gameState.activeRules.length - 1]; // Muestra la última regla añadida
          } else {
            activeRuleText.textContent = "";
          }
        };

        // Renderiza la lista de reglas activas
        const renderActiveRules = () => {
          activeRulesList.innerHTML = "";
          if (gameState.activeRules.length === 0) {
            activeRulesContainer.classList.add("hidden");
            return;
          }
          activeRulesContainer.classList.remove("hidden");
          gameState.activeRules.forEach((rule, index) => {
            const li = document.createElement("li");
            li.innerHTML = `<span>${rule}</span>
                            <button class="remove-rule-btn" data-index="${index}">
                                <i class="fas fa-times"></i>
                            </button>`;
            activeRulesList.appendChild(li);
          });
          updateActiveRuleBanner(); // Actualiza el banner también
        };

        // Crea una baraja de preguntas aleatoria
        const createQuestionDeck = () => {
          const deck = [...gameState.questions];
          for (let i = deck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [deck[i], deck[j]] = [deck[j], deck[i]];
          }
          gameState.questionDeck = deck;
        };

        // Pasa a la siguiente ronda del juego (muestra una pregunta)
        const nextRound = () => {
          gameQuestionHeader.textContent = gameState.lg.questionHeader;
          if (gameState.questions.length === 0) {
            questionText.textContent = gameState.lg.noQuestions;
            playerChosenBtn.disabled = true;
          } else {
            if (gameState.questionDeck.length === 0) createQuestionDeck();
            questionText.textContent = gameState.questionDeck.pop();
            playerChosenBtn.disabled = false;
          }
          // Re-añadir el último item girado a los items disponibles para el siguiente giro
          if (gameState.lastSpunItem) {
            gameState.rouletteItemsAvailable.push(gameState.lastSpunItem);
            gameState.lastSpunItem = null; // Limpiar el último item girado
          }
          populateWheel(); // Volver a poblar la ruleta con los items actualizados
          showPage("gameQuestion");
        };

        // Abre el modal de selección de jugador
        const openPlayerSelectionModal = () => {
          playerSelectionList.innerHTML = "";
          gameState.players.forEach((player, index) => {
            const btn = document.createElement("button");
            btn.className = "btn btn-secondary";
            btn.textContent = player.name;
            btn.dataset.index = index;
            playerSelectionList.appendChild(btn);
          });
          playerSelectionModal.classList.remove("hidden");
        };

        // Cierra el modal de selección de jugador
        const closePlayerSelectionModal = () =>
          playerSelectionModal.classList.add("hidden");

        // Configura la ruleta para el jugador elegido
        const setupRoulette = (playerIndex) => {
          gameState.currentPlayerIndex = playerIndex;
          const chosenPlayer = gameState.players[playerIndex];
          chosenPlayerHeader.textContent = gameState.lg.rouletteHeader.replace(
            "{playerName}",
            chosenPlayer.name
          );
          resultContainer.classList.add("hidden");
          confirmResultBtn.classList.add("hidden");
          spinBtn.disabled = false;
          spinBtn.classList.remove("hidden");
          populateWheel();
          showPage("gameRoulette");
        };

        // Función para barajar un array (Algoritmo de Fisher-Yates)
        const shuffleArray = (array) => {
          for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
          }
          return array;
        };

        // Rellena la ruleta con los elementos disponibles
        const populateWheel = () => {
          wheelStrip.innerHTML = "";
          if (gameState.rouletteItemsAvailable.length === 0) {
            // Si no hay items disponibles, usar todos los originales (caso de emergencia)
            gameState.rouletteItemsAvailable = [...gameState.rouletteItems];
            if (gameState.rouletteItemsAvailable.length === 0) {
              // Si aún no hay items, no se puede poblar la ruleta
              console.warn("No hay elementos para la ruleta.");
              return;
            }
          }

          // Barajar los elementos disponibles y almacenar este orden para el giro actual
          gameState.currentRouletteOrder = shuffleArray([
            ...gameState.rouletteItemsAvailable,
          ]);

          // Se duplican los elementos barajados para asegurar un desplazamiento suave y continuo
          // Se repite el array barajado para que el efecto visual de la ruleta sea continuo
          const wheelItems = Array(5).fill(gameState.currentRouletteOrder).flat();
          wheelItems.forEach((item) => {
            const card = document.createElement("div");
            card.className = "wheel-card";
            let cardText = item.text;
            let cardClass = "";
            switch (item.type) {
              case "punishment":
                cardClass =
                  item.requiresOppositeGender || item.requiresAnyPlayer
                    ? "card-punishment-special"
                    : "card-punishment";
                break;
              case "minigame":
                cardClass = "card-minigame";
                cardText = gameState.lg.cardMinigame; // Muestra un texto genérico para minijuegos
                break;
              case "rule":
                cardClass = "card-rule";
                cardText = gameState.lg.cardRule; // Muestra un texto genérico para reglas
                break;
              case "luck":
                cardClass = "card-luck";
                cardText = gameState.lg.cardLuck; // Muestra un texto genérico para suerte
                break;
            }
            card.classList.add(cardClass);
            card.textContent = cardText;
            wheelStrip.appendChild(card);
          });
        };

        // Simula el giro de la ruleta
        const spinWheel = () => {
          spinBtn.disabled = true;
          const cardWidth = 120 + 16; // Ancho de la tarjeta + margen
          // Usar el orden actual de la ruleta para obtener el número de cartas
          const numCards = gameState.currentRouletteOrder.length;
          if (numCards === 0) {
            displayRouletteResult(null); // No hay elementos en la ruleta
            return;
          }

          // Selecciona un índice ganador del orden actual de la ruleta
          const winningCardIndexInShuffled = Math.floor(
            Math.random() * numCards
          );
          // El item ganador es del array barajado actual
          const winningItem =
            gameState.currentRouletteOrder[winningCardIndexInShuffled];

          // Posiciona la tira de la ruleta para un reinicio visual antes de girar
          const initialResetPosition = numCards * cardWidth;
          wheelStrip.style.transition = "none";
          wheelStrip.style.transform = `translateX(-${initialResetPosition}px)`;

          // Pequeño retraso para que el navegador aplique el "none" transition antes de iniciar el giro
          setTimeout(() => {
            // Calcula la posición final para que la tarjeta ganadora esté centrada
            const targetCardIndex = winningCardIndexInShuffled + numCards * 3; // Gira varias veces para un efecto más dramático
            const containerWidth = wheelStrip.parentElement.offsetWidth;
            const targetPosition =
              targetCardIndex * cardWidth - containerWidth / 2 + cardWidth / 2;

            wheelStrip.style.transition =
              "transform 6s cubic-bezier(0.23, 1, 0.32, 1)"; // Transición suave
            wheelStrip.style.transform = `translateX(-${targetPosition}px)`;

            // Cuando la transición termina, muestra el resultado
            wheelStrip.addEventListener(
              "transitionend",
              () => displayRouletteResult(winningItem), // Pasa el item ganador directamente
              { once: true }
            );
          }, 100);
        };

        // Muestra el resultado de la ruleta
        const displayRouletteResult = (item) => {
          if (!item) {
            // Si no se pasó un item (ej. ruleta vacía)
            resultText.textContent = gameState.lg.noRouletteItems;
            resultContainer.classList.remove("hidden");
            confirmResultBtn.classList.remove("hidden");
            spinBtn.classList.add("hidden");
            return;
          }

          gameState.lastSpunItem = item; // Almacenar el item girado
          // Eliminar el item girado de rouletteItemsAvailable para el siguiente turno
          const indexToRemove = gameState.rouletteItemsAvailable.findIndex(
            (availableItem) => availableItem === item
          );
          if (indexToRemove > -1) {
            gameState.rouletteItemsAvailable.splice(indexToRemove, 1);
          }

          let resultString = item.text;
          const currentPlayer =
            gameState.players[gameState.currentPlayerIndex];

          if (item.type === "punishment") {
            if (item.requiresOppositeGender) {
              const partners = gameState.players.filter(
                (p) => p.gender !== currentPlayer.gender
              );
              resultString +=
                partners.length > 0
                  ? ` ${gameState.lg.with} ${
                      partners[Math.floor(Math.random() * partners.length)]
                        .name
                    }`
                  : ` ${gameState.lg.noOppositeGender}`;
            } else if (item.requiresAnyPlayer) {
              const partners = gameState.players.filter(
                (p) => p.name !== currentPlayer.name
              );
              resultString +=
                partners.length > 0
                  ? ` ${gameState.lg.with} ${
                      partners[Math.floor(Math.random() * partners.length)]
                        .name
                    }`
                  : ` ${gameState.lg.noOtherPerson}`;
            }
            resultText.textContent = resultString;
            resultContainer.classList.remove("hidden");
            confirmResultBtn.classList.remove("hidden");
            spinBtn.classList.add("hidden");
          } else if (item.type === "rule") {
            showTextInputModal(gameState.lg.createRule, (newRule) => {
              if (newRule && newRule.trim()) {
                gameState.activeRules.push(newRule.trim()); // Añadir a array de reglas
                saveAllData(); // Guardar reglas
                renderActiveRules(); // Renderizar reglas
                resultText.textContent = `${gameState.lg.activeRule}: ${newRule.trim()}`; // Actualiza el texto después de cerrar el modal
              } else {
                resultText.textContent =
                  "No se creó ninguna regla. ¡Te salvaste!";
              }
              // Mostrar los botones de resultado y ocultar el de girar DESPUÉS de que el modal se cierre
              resultContainer.classList.remove("hidden");
              confirmResultBtn.classList.remove("hidden");
              spinBtn.classList.add("hidden");
            });
            // No se hace nada más aquí, ya que el resto de la lógica se ejecuta en el callback del modal
          } else if (item.type === "luck") {
            // Lógica para la carta de suerte: permite volver a girar
            resultText.textContent = resultString;
            resultContainer.classList.remove("hidden"); // Muestra el texto de suerte
            spinBtn.classList.remove("hidden"); // Muestra el botón de girar de nuevo
            spinBtn.disabled = false; // Habilita el botón de girar
            confirmResultBtn.classList.add("hidden"); // Oculta el botón de listo
            chosenPlayerHeader.textContent = gameState.lg.reSpinHeader; // Cambia la cabecera
            return; // Salir para no ejecutar la lógica común de abajo
          } else {
            // Para otros tipos de ítems (minigame, etc.)
            resultText.textContent = resultString;
            resultContainer.classList.remove("hidden");
            confirmResultBtn.classList.remove("hidden");
            spinBtn.classList.add("hidden");
          }
        };

        // Renderiza las listas de configuración (preguntas, castigos, minijuegos)
        const renderSettings = () => {
          renderEditableList(
            "questions",
            questionsList,
            gameState.questions,
            (item) => item
          );
          renderEditableList(
            "punishments",
            punishmentsList,
            gameState.punishments,
            (item) => item.text
          );
          renderEditableList(
            "minigames",
            minigamesList,
            gameState.minigames,
            (item) => item.text
          );
        };

        // Crea un elemento de lista editable para la configuración
        const renderEditableList = (type, listElement, data, textExtractor) => {
          listElement.innerHTML = "";
          data.forEach((item, index) => {
            const listItem = document.createElement("div");
            listItem.className =
              "editable-list-item p-3 rounded-lg flex items-center justify-between gap-4";
            let icon = "";
            if (
              type === "punishments" &&
              (item.requiresOppositeGender || item.requiresAnyPlayer)
            ) {
              icon = item.requiresOppositeGender
                ? `<i class="fas fa-venus-mars text-pink-400"></i>`
                : `<i class="fa-solid fa-people-group text-blue-400"></i>`;
            }
            listItem.innerHTML = `<div class="flex-1 flex items-center gap-3"><p class="break-all">${textExtractor(
              item
            )}</p>${icon}</div>
                        <div class="flex-shrink-0 flex gap-3">
                            <button class="edit-btn" data-type="${type}" data-index="${index}"><i class="fas fa-pencil-alt text-blue-400"></i></button>
                            <button class="delete-btn" data-type="${type}" data-index="${index}"><i class="fas fa-trash text-red-400"></i></button>
                        </div>`;
            listElement.appendChild(listItem);
          });
        };

        // Configura el formulario de edición para preguntas, castigos o minijuegos
        const setupFormForEdit = (type, index) => {
          gameState.editing = { type, index };
          if (type === "questions") {
            questionFormTitle.textContent = gameState.lg.editQuestion;
            questionInput.value = gameState.questions[index];
            questionFormButtons.innerHTML = `<button id="update-question-btn" class="btn btn-primary flex-1">${gameState.lg.update}</button><button type="button" id="cancel-edit-btn" class="btn btn-secondary flex-1">${gameState.lg.cancel}</button>`;
          } else if (type === "punishments") {
            const punishment = gameState.punishments[index];
            punishmentFormTitle.textContent = gameState.lg.editPunishment;
            punishmentInput.value = punishment.text;
            document.querySelector(
              'input[name="requires"][value="none"]'
            ).checked =
              !punishment.requiresOppositeGender &&
              !punishment.requiresAnyPlayer;
            document.querySelector(
              'input[name="requires"][value="opposite"]'
            ).checked = punishment.requiresOppositeGender;
            document.querySelector(
              'input[name="requires"][value="any"]'
            ).checked = punishment.requiresAnyPlayer;
            punishmentFormButtons.innerHTML = `<button id="update-punishment-btn" class="btn btn-primary flex-1">${gameState.lg.update}</button><button type="button" id="cancel-edit-btn" class="btn btn-secondary flex-1">${gameState.lg.cancel}</button>`;
          } else if (type === "minigames") {
            minigameFormTitle.textContent = gameState.lg.editMinigame;
            minigameInput.value = gameState.minigames[index].text;
            minigameFormButtons.innerHTML = `<button id="update-minigame-btn" class="btn btn-primary flex-1">${gameState.lg.update}</button><button type="button" id="cancel-edit-btn" class="btn btn-secondary flex-1">${gameState.lg.cancel}</button>`;
          }
        };

        // Resetea los formularios de edición a su estado inicial de "añadir"
        const resetForms = () => {
          gameState.editing = { type: null, index: null };
          questionFormTitle.textContent = gameState.lg.addQuestion;
          questionInput.value = "";
          questionFormButtons.innerHTML = `<button id="add-question-btn" class="btn btn-secondary flex-1">${gameState.lg.add}</button>`;
          punishmentFormTitle.textContent = gameState.lg.addPunishment;
          punishmentInput.value = "";
          document.querySelector(
            'input[name="requires"][value="none"]'
          ).checked = true;
          punishmentFormButtons.innerHTML = `<button id="add-punishment-btn" class="btn btn-secondary flex-1">${gameState.lg.add}</button>`;
          minigameFormTitle.textContent = gameState.lg.addMinigame;
          minigameInput.value = "";
          minigameFormButtons.innerHTML = `<button id="add-minigame-btn" class="btn btn-secondary flex-1">${gameState.lg.add}</button>`;
        };

        // Muestra un modal de confirmación
        const showConfirmation = (text, onConfirm) => {
          document.getElementById("confirmation-text").textContent = text;
          confirmModal.classList.remove("hidden");
          const yesBtn = document.getElementById("confirm-yes-btn"),
            noBtn = document.getElementById("confirm-no-btn");
          const confirmHandler = () => {
            onConfirm();
            hideConfirmation();
          };
          const cancelHandler = () => hideConfirmation();
          const hideConfirmation = () => {
            confirmModal.classList.add("hidden");
            yesBtn.removeEventListener("click", confirmHandler);
            noBtn.removeEventListener("click", cancelHandler);
          };
          yesBtn.addEventListener("click", confirmHandler, { once: true });
          noBtn.addEventListener("click", cancelHandler, { once: true });
        };

        // Función para mostrar un modal de entrada de texto personalizado
        const showTextInputModal = (title, onConfirm) => {
          textInputTitle.textContent = title;
          textInputField.value = ""; // Limpiar el campo de texto
          textInputModal.classList.remove("hidden");

          const confirmHandler = () => {
            onConfirm(textInputField.value.trim());
            hideTextInputModal();
          };
          const cancelHandler = () => {
            onConfirm(null); // Pasa null si se cancela
            hideTextInputModal();
          };

          const hideTextInputModal = () => {
            textInputModal.classList.add("hidden");
            textInputConfirmBtn.removeEventListener("click", confirmHandler);
            textInputCancelBtn.removeEventListener("click", cancelHandler);
          };

          textInputConfirmBtn.addEventListener("click", confirmHandler, {
            once: true,
          });
          textInputCancelBtn.addEventListener("click", cancelHandler, {
            once: true,
          });
          textInputField.focus(); // Enfocar el input al abrir el modal
        };

        // --- LISTENERS DE EVENTOS ---
        // Navegación principal
        settingsBtn.addEventListener("click", () => showPage("settings"));
        backBtn.addEventListener("click", () => showPage("addPlayers"));
        logo.addEventListener("click", () => location.reload()); // Recarga la página al hacer clic en el logo
        flags_element.addEventListener("click", (e) => {
          const langTarget = e.target.closest("[data-language]");
          if (langTarget) changeLanguage(langTarget.dataset.language);
        });

        // Gestión de jugadores
        addPlayerBtn.addEventListener("click", () => {
          const name = playerNameInput.value.trim();
          if (!name) {
            playerNameInput.classList.add("shake");
            setTimeout(() => playerNameInput.classList.remove("shake"), 500);
            return;
          }
          gameState.players.push({
            name,
            gender: document.querySelector(".gender-tab.active").dataset.gender,
          });
          renderPlayerList();
          updateStartButtonState();
          playerNameInput.value = "";
          playerNameInput.focus();
        });
        playerListContainer.addEventListener("click", (e) => {
          if (e.target.closest(".remove-player-btn")) {
            gameState.players.splice(
              parseInt(e.target.closest(".remove-player-btn").dataset.index),
              1
            );
            renderPlayerList();
            updateStartButtonState();
          }
        });
        genderTabs.forEach((tab) =>
          tab.addEventListener("click", () => {
            genderTabs.forEach((t) => t.classList.remove("active"));
            tab.classList.add("active");
          })
        );
        startGameBtn.addEventListener("click", () => {
          if (gameState.players.length < 2) return; // Requiere al menos 2 jugadores
          updateActiveRuleBanner();
          createQuestionDeck(); // Prepara la baraja de preguntas
          nextRound(); // Inicia la primera ronda de preguntas
        });

        // Lógica de juego (Pregunta y Ruleta)
        playerChosenBtn.addEventListener("click", openPlayerSelectionModal);
        cancelSelectionBtn.addEventListener("click", closePlayerSelectionModal);
        playerSelectionList.addEventListener("click", (e) => {
          if (e.target.matches("button")) {
            closePlayerSelectionModal();
            setupRoulette(parseInt(e.target.dataset.index));
          }
        });
        spinBtn.addEventListener("click", spinWheel);
        confirmResultBtn.addEventListener("click", nextRound); // Pasa a la siguiente pregunta después de confirmar el resultado de la ruleta

        // Gestión de configuración (Preguntas, Castigos, Minijuegos)
        settingsTabBtns.forEach((btn) =>
          btn.addEventListener("click", () => {
            settingsTabBtns.forEach((b) => b.classList.remove("active"));
            settingsContents.forEach((c) => c.classList.remove("active"));
            btn.classList.add("active");
            document
              .getElementById(`settings-content-${btn.dataset.target}`)
              .classList.add("active");
            resetForms(); // Resetea los formularios al cambiar de pestaña
          })
        );

        // Delegación de eventos para los botones de añadir, editar y eliminar en la página de configuración
        document
          .getElementById("settings-page")
          .addEventListener("click", (e) => {
            // Funciones auxiliares para añadir, actualizar y eliminar elementos
            const handleUpdate = (type, index, newText, options) => {
              const dataArray = gameState[type];
              if (type === "questions") dataArray[index] = newText;
              else {
                dataArray[index].text = newText;
                if (options) {
                  dataArray[index].requiresOppositeGender =
                    options.requires === "opposite";
                  dataArray[index].requiresAnyPlayer =
                    options.requires === "any";
                }
              }
              saveAllData();
              rebuildRouletteItems();
              renderSettings();
              resetForms();
            };

            const handleAdd = (type, text, options) => {
              if (!text) return;
              const dataArray = gameState[type];
              if (type === "questions") dataArray.push(text);
              else {
                const newItem = { text };
                if (options) {
                  newItem.requiresOppositeGender =
                    options.requires === "opposite";
                  newItem.requiresAnyPlayer = options.requires === "any";
                }
                dataArray.push(newItem);
              }
              saveAllData();
              rebuildRouletteItems();
              renderSettings();
              // Limpia y enfoca el input después de añadir
              if (type === "questions") {
                questionInput.value = "";
                questionInput.focus();
              } else if (type === "punishments") {
                punishmentInput.value = "";
                punishmentInput.focus();
              } else if (type === "minigames") {
                minigameInput.value = "";
                minigameInput.focus();
              }
            };

            const handleDelete = (type, index) => {
              showConfirmation(gameState.lg.deleteElement, () => {
                gameState[type].splice(index, 1);
                saveAllData();
                rebuildRouletteItems();
                renderSettings();
                resetForms();
              });
            };

            const target = e.target;
            const btn = target.closest("button");
            if (!btn) return;

            const id = btn.id;
            const editBtn = target.closest(".edit-btn");
            const deleteBtn = target.closest(".delete-btn");

            // Manejo de botones de añadir/actualizar
            if (id === "add-question-btn")
              handleAdd("questions", questionInput.value.trim());
            else if (id === "update-question-btn")
              handleUpdate(
                "questions",
                gameState.editing.index,
                questionInput.value.trim()
              );
            else if (id === "add-punishment-btn")
              handleAdd("punishments", punishmentInput.value.trim(), {
                requires: document.querySelector(
                  'input[name="requires"]:checked'
                ).value,
              });
            else if (id === "update-punishment-btn")
              handleUpdate(
                "punishments",
                gameState.editing.index,
                punishmentInput.value.trim(),
                {
                  requires: document.querySelector(
                    'input[name="requires"]:checked'
                  ).value,
                }
              );
            else if (id === "add-minigame-btn")
              handleAdd("minigames", minigameInput.value.trim());
            else if (id === "update-minigame-btn")
              handleUpdate(
                "minigames",
                gameState.editing.index,
                minigameInput.value.trim()
              );
            else if (id === "cancel-edit-btn") resetForms();
            // Manejo de botones de editar y eliminar
            else if (editBtn)
              setupFormForEdit(
                editBtn.dataset.type,
                parseInt(editBtn.dataset.index)
              );
            else if (deleteBtn)
              handleDelete(
                deleteBtn.dataset.type,
                parseInt(deleteBtn.dataset.index)
              );
          });

        // Listener para eliminar reglas activas individualmente
        activeRulesList.addEventListener("click", (e) => {
          if (e.target.closest(".remove-rule-btn")) {
            const index = parseInt(
              e.target.closest(".remove-rule-btn").dataset.index
            );
            gameState.activeRules.splice(index, 1);
            saveAllData();
            renderActiveRules();
          }
        });

        // Botón para borrar todas las reglas activas
        clearActiveRulesBtn.addEventListener("click", () => {
          showConfirmation(gameState.lg.confirmation, () => {
            gameState.activeRules = [];
            saveAllData();
            renderActiveRules();
          });
        });

        // Botón de resetear a valores predeterminados
        resetDefaultsBtn.addEventListener("click", () => {
          showConfirmation(gameState.lg.confirmation, () => {
            // Elimina los datos guardados para el idioma actual
            localStorage.removeItem(
              `drinkUpQuestions_${gameState.currentLanguage}`
            );
            localStorage.removeItem(
              `drinkUpPunishments_${gameState.currentLanguage}`
            );
            localStorage.removeItem(
              `drinkUpMinigames_${gameState.currentLanguage}`
            );
            localStorage.removeItem(
              `drinkUpActiveRules_${gameState.currentLanguage}`
            );
            changeLanguage(gameState.currentLanguage); // Recarga todo desde defaults para el idioma actual
            renderSettings();
            resetForms();
            renderActiveRules(); // Asegura que las reglas se limpien visualmente
          });
        });

        // Función de inicialización al cargar la página
        const initialize = () => {
          const savedLanguage = localStorage.getItem("drinkUpLanguage") ?? "es";
          changeLanguage(savedLanguage); // Establece el idioma inicial
          renderPlayerList(); // Renderiza la lista de jugadores
          updateStartButtonState(); // Actualiza el estado del botón de inicio
          showPage("addPlayers"); // Muestra la página de añadir jugadores
          renderActiveRules(); // Renderizar las reglas al iniciar
        };

        initialize(); // Llama a la función de inicialización
      });