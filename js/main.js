document.addEventListener("DOMContentLoaded", () => {
        // --- ESTADO DEL JUEGO ---
        const gameState = {
          players: [],
          currentPlayerIndex: 0,
          lastPunishmentIndex: null,
          editing: { type: null, index: null }, // Para saber si estamos editando algo
          questions: [],
          punishments: [],
          lg:[],
          defaultQuestions: [
            "¿Quién es más probable que haga algo vergonzoso cuando está borracho?",
            "¿Quién es más probable que acabe en otra ciudad después de una noche loca?",
            "¿Quién es más probable que se despierte con un tatuaje nuevo?",
            "¿Quién es más probable que pierda su teléfono en una fiesta?",
            "¿Quién aguantaría más tiempo sin beber alcohol?",
            "¿Quién es más probable que llame a su ex borracho?",
          ],
          defaultPunishments: [
            { text: "Bebe 2 tragos", requiresOppositeGender: false },
            { text: "Bebe un chupito", requiresOppositeGender: false },
            {
              text: "Cuenta un secreto vergonzoso",
              requiresOppositeGender: false,
            },
            { text: "Imita a otro jugador", requiresOppositeGender: true },
            { text: "Haz 10 flexiones", requiresOppositeGender: false },
            {
              text: "Baila durante 30 segundos",
              requiresOppositeGender: false,
            },
          ],
        };

        const flags_element = document.getElementById("flags");
        const textsToChange = document.querySelectorAll("[data-section='ui']");
        
        const chanceLanguage = async language =>{
            
            const requestJSON = await fetch(`./lang/${language}.json`);
            const text = await requestJSON.json();
            gameState.lg = text["ui"];
            console.log(gameState.lg);
            // Actualizar las preguntas y castigos predeterminados
            gameState.defaultQuestions = text["questions"];
            gameState.defaultPunishments = text["punishments"];
            gameState.questions = [...gameState.defaultQuestions];
            gameState.punishments = [...gameState.defaultPunishments];
            renderSettings();
            for(const textToChange of textsToChange){
                const section = textToChange.dataset.section;
                const value = textToChange.dataset.value;
                textToChange.innerHTML = text[section][value];
            }
            initialize();
        };
        flags_element.addEventListener("click", (e)=>{
            chanceLanguage(e.target.parentElement.dataset.language);
        });
        // --- ELEMENTOS DEL DOM ---
        const pages = {
          addPlayers: document.getElementById("add-players-page"),
          gameQuestion: document.getElementById("game-question-page"),
          gameRoulette: document.getElementById("game-roulette-page"),
          settings: document.getElementById("settings-page"),
        };
        const backBtn = document.getElementById("back-btn");
        const settingsBtn = document.getElementById("settings-btn");
        const confirmModal = document.getElementById("confirmation-modal");


        // --- FUNCIONES DE NAVEGACIÓN ---
        const showPage = (pageId) => {
          Object.values(pages).forEach((page) =>
            page.classList.remove("active")
          );
          pages[pageId].classList.add("active");
          backBtn.classList.toggle("hidden", pageId !== "settings");
          settingsBtn.classList.toggle("hidden", pageId === "settings");
        };

        // --- LÓGICA PRINCIPAL DEL JUEGO (sin cambios) ---
        const playerNameInput = document.getElementById("player-name-input");
        const genderTabs = document.querySelectorAll(".gender-tab");
        const addPlayerBtn = document.getElementById("add-player-btn");
        const playerListContainer = document.getElementById(
          "player-list-container"
        );
        const startGameBtn = document.getElementById("start-game-btn");
        const logo = document.getElementById("logo");
        const currentPlayerQuestion = document.getElementById(
          "current-player-question"
        );
        const questionText = document.getElementById("question-text");
        const nextPlayerBtn = document.getElementById("next-player-btn");
        const punishmentBtn = document.getElementById("punishment-btn");
        const currentPlayerRoulette = document.getElementById(
          "current-player-roulette"
        );
        const wheelStrip = document.getElementById("wheel-strip");
        const spinBtn = document.getElementById("spin-btn");
        const punishmentResultContainer = document.getElementById(
          "punishment-result-container"
        );
        const punishmentResultText = document.getElementById(
          "punishment-result-text"
        );
        const confirmPunishmentBtn = document.getElementById(
          "confirm-punishment-btn"
        );

        const renderPlayerList = () => {
          playerListContainer.innerHTML = "";
          if (gameState.players.length === 0) {
            playerListContainer.innerHTML = `<p class="text-center p-4 text-gray-400" data-section="ui" data-value="playerListPlaceholder">${gameState.lg.playerListPlaceholder ?? "Añade de 2 a más jugadores"}</p>`;
            return;
          }
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
          document.querySelectorAll(".remove-player-btn").forEach((btn) => {
            btn.addEventListener("click", (e) => {
              const index = parseInt(e.currentTarget.dataset.index);
              gameState.players.splice(index, 1);
              renderPlayerList();
              updateStartButtonState();
            });
          });
        };
        const updateStartButtonState = () => {
          startGameBtn.disabled = gameState.players.length < 2;
        };
        const nextRound = () => {
          const currentPlayer = gameState.players[gameState.currentPlayerIndex];
          if (gameState.questions.length === 0) {
            questionText.textContent =
              `${gameState.lg.noQuestions ?? "No hay preguntas. ¡Añade algunas en la configuración!"}`;
          } else {
            const randomQuestion =
              gameState.questions[
                Math.floor(Math.random() * gameState.questions.length)
              ];
            questionText.textContent = randomQuestion;
          }
          currentPlayerQuestion.textContent = currentPlayer.name;
          showPage("gameQuestion");
        };
        const setupRoulette = () => {
          const currentPlayer = gameState.players[gameState.currentPlayerIndex];
          currentPlayerRoulette.textContent = currentPlayer.name;
          punishmentResultContainer.classList.add("hidden");
          confirmPunishmentBtn.classList.add("hidden");
          spinBtn.disabled = false;
          spinBtn.classList.remove("hidden");
          populateWheel();
          showPage("gameRoulette");
        };
        const populateWheel = () => {
          wheelStrip.innerHTML = "";
          if (gameState.punishments.length === 0) return;
          const wheelItems = Array(5).fill(gameState.punishments).flat();
          wheelItems.forEach((p) => {
            const card = document.createElement("div");
            card.className = "wheel-card";
            card.textContent = p.text;
            wheelStrip.appendChild(card);
          });
        };
        const spinWheel = () => {
          spinBtn.disabled = true;
          const cardWidth = 120 + 16;
          const numCards = gameState.punishments.length;
          if (numCards === 0) {
            displayPunishmentResult(-1); // Special index for no punishments
            return;
          }
          let availableIndices = [...Array(numCards).keys()];
          if (gameState.lastPunishmentIndex !== null && numCards > 1) {
            availableIndices = availableIndices.filter(
              (index) => index !== gameState.lastPunishmentIndex
            );
          }
          if (availableIndices.length === 0) {
            availableIndices = [...Array(numCards).keys()];
          }
          const winningCardIndexInOriginalSet =
            availableIndices[
              Math.floor(Math.random() * availableIndices.length)
            ];
          const initialResetPosition = numCards * cardWidth;
          wheelStrip.style.transition = "none";
          wheelStrip.style.transform = `translateX(-${initialResetPosition}px)`;
          setTimeout(() => {
            const targetCardIndex =
              winningCardIndexInOriginalSet + numCards * 3;
            const containerWidth = wheelStrip.parentElement.offsetWidth;
            const targetPosition =
              targetCardIndex * cardWidth - containerWidth / 2 + cardWidth / 2;
            wheelStrip.style.transition =
              "transform 6s cubic-bezier(0.23, 1, 0.32, 1)";
            wheelStrip.style.transform = `translateX(-${targetPosition}px)`;
            wheelStrip.addEventListener(
              "transitionend",
              () => {
                displayPunishmentResult(winningCardIndexInOriginalSet);
              },
              { once: true }
            );
          }, 100);
        };
        const displayPunishmentResult = (winningIndex) => {
          if (winningIndex === -1) {
            punishmentResultText.textContent =
              `${gameState.lg.noPunishments ?? "No hay castigos. ¡Todos se salvan!"}`;
          } else {
            gameState.lastPunishmentIndex = winningIndex;
            let punishment = gameState.punishments[winningIndex];
            let resultText = punishment.text;
            if (punishment.requiresOppositeGender) {
              const currentPlayer =
                gameState.players[gameState.currentPlayerIndex];
              const oppositeGender =
                currentPlayer.gender === "hombre" ? "mujer" : "hombre";
              const potentialPartners = gameState.players.filter(
                (p) =>
                  p.gender === oppositeGender && p.name !== currentPlayer.name
              );
              if (potentialPartners.length > 0) {
                const partner =
                  potentialPartners[
                    Math.floor(Math.random() * potentialPartners.length)
                  ];
                resultText += ` con ${partner.name}`;//------------------------------------------------------------------------
              } else {
                resultText +=
                  " (pero no hay nadie del otro sexo disponible, ¡te salvaste!)";
              }
            }
            punishmentResultText.textContent = resultText;
          }
          punishmentResultContainer.classList.remove("hidden");
          confirmPunishmentBtn.classList.remove("hidden");
          spinBtn.classList.add("hidden");
        };
        const advanceToNextPlayer = () => {
          gameState.currentPlayerIndex =
            (gameState.currentPlayerIndex + 1) % gameState.players.length;
          nextRound();
        };

        // --- LÓGICA DE LA PÁGINA DE CONFIGURACIÓN ---
        const settingsTabBtns = document.querySelectorAll(".settings-tab-btn");
        const settingsContents = document.querySelectorAll(".settings-content");
        const questionsList = document.getElementById("questions-list");
        const questionFormTitle = document.getElementById(
          "question-form-title"
        );
        const questionInput = document.getElementById("question-input");
        const questionFormButtons = document.getElementById(
          "question-form-buttons"
        );
        const punishmentsList = document.getElementById("punishments-list");
        const punishmentFormTitle = document.getElementById(
          "punishment-form-title"
        );
        const punishmentInput = document.getElementById("punishment-input");
        const requiresOppositeGenderCheckbox = document.getElementById(
          "requires-opposite-gender-checkbox"
        );
        const punishmentFormButtons = document.getElementById(
          "punishment-form-buttons"
        );
        const resetDefaultsBtn = document.getElementById("reset-defaults-btn");

        const renderSettings = () => {
          renderEditableList("questions", questionsList, gameState.questions);
          renderEditableList(
            "punishments",
            punishmentsList,
            gameState.punishments
          );
          saveAllSettings();
        };

        const renderEditableList = (type, listElement, data) => {
          listElement.innerHTML = "";
          data.forEach((item, index) => {
            const listItem = document.createElement("div");
            listItem.className =
              "editable-list-item p-3 rounded-lg flex items-center justify-between gap-4";

            let contentHTML = "";
            if (type === "punishments") {
              contentHTML = `
                        <div class="flex-1 flex items-center gap-3">
                            <p>${item.text}</p>
                            ${
                              item.requiresOppositeGender
                                ? '<i class="fas fa-venus-mars text-pink-400" title="Requiere otro sexo"></i>'
                                : ""
                            }
                        </div>
                    `;
            } else {
              contentHTML = `<p class="flex-1">${item}</p>`;
            }

            listItem.innerHTML = `
                    ${contentHTML}
                    <div class="flex-shrink-0 flex gap-3">
                        <button class="edit-btn" data-type="${type}" data-index="${index}"><i class="fas fa-pencil-alt text-blue-400"></i></button>
                        <button class="delete-btn" data-type="${type}" data-index="${index}"><i class="fas fa-trash text-red-400"></i></button>
                    </div>
                `;
            listElement.appendChild(listItem);
          });
        };

        const setupFormForEdit = (type, index) => {
          gameState.editing = { type, index };
          if (type === "questions") {
            const question = gameState.questions[index];
            questionFormTitle.textContent = gameState.lg.editQuestion ?? "Editar Pregunta";
            questionInput.value = question;
            questionFormButtons.innerHTML = `<button id="update-question-btn" class="btn btn-primary flex-1">${gameState.lg.update ?? "Actualizar"}</button><button id="cancel-edit-btn" class="btn btn-secondary flex-1">${gameState.lg.cancel ?? "Cancelar"}</button>`;
          } else {
            const punishment = gameState.punishments[index];
            punishmentFormTitle.textContent = gameState.lg.editPunishment ?? "Editar Castigo";
            punishmentInput.value = punishment.text;
            requiresOppositeGenderCheckbox.checked =
              punishment.requiresOppositeGender;
            punishmentFormButtons.innerHTML = `<button id="update-punishment-btn" class="btn btn-primary flex-1">${gameState.lg.update ?? "Actualizar"}</button><button id="cancel-edit-btn" class="btn btn-secondary flex-1">${gameState.lg.cancel ?? "Cancelar"}</button>`;
          }
        };

        const resetForms = () => {
          gameState.editing = { type: null, index: null };
          questionFormTitle.textContent = gameState.lg.addQuestion ?? "Añadir Pregunta";
          questionInput.value = "";
          questionFormButtons.innerHTML = `<button id="add-question-btn" class="btn btn-secondary flex-1" data-section="ui" data-value="add">
                ${gameState.lg.add ?? "Añadir"}
              </button>`;
          punishmentFormTitle.textContent = gameState.lg.addPunishment ?? "Añadir Castigo";
          punishmentInput.value = "";
          requiresOppositeGenderCheckbox.checked = false;
          punishmentFormButtons.innerHTML = `<button id="add-question-btn" class="btn btn-secondary flex-1" data-section="ui" data-value="add">
                 ${gameState.lg.add ?? "Añadir"}
              </button>`;
        };

        const saveAllSettings = () => {
          localStorage.setItem(
            "drinkUpQuestions",
            JSON.stringify(gameState.questions)
          );
          localStorage.setItem(
            "drinkUpPunishments",
            JSON.stringify(gameState.punishments)
          );
        };

        const loadAllSettings = () => {
          const savedQuestions = localStorage.getItem("drinkUpQuestions");
          const savedPunishments = localStorage.getItem("drinkUpPunishments");
          gameState.questions = savedQuestions
            ? JSON.parse(savedQuestions)
            : [...gameState.defaultQuestions];
          gameState.punishments = savedPunishments
            ? JSON.parse(savedPunishments)
            : [...gameState.defaultPunishments];
        };

        const showConfirmation = (text, onConfirm) => {
          document.getElementById("confirmation-text").textContent = text;
          confirmModal.classList.remove("hidden");
          const yesBtn = document.getElementById("confirm-yes-btn");
          const noBtn = document.getElementById("confirm-no-btn");

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

        // --- EVENT LISTENERS ---
        settingsBtn.addEventListener("click", () => showPage("settings"));
        backBtn.addEventListener("click", () => showPage("addPlayers"));
        logo.addEventListener("click", () => {
          if (pages.settings.classList.contains("active")) {
            showPage("addPlayers");
          }
        });

        // Listeners del juego
        addPlayerBtn.addEventListener("click", () => {
          const name = playerNameInput.value.trim();
          if (!name) {
            playerNameInput.classList.add("shake");
            setTimeout(() => playerNameInput.classList.remove("shake"), 500);
            return;
          }
          const gender =
            document.querySelector(".gender-tab.active").dataset.gender;
          gameState.players.push({ name, gender });
          renderPlayerList();
          updateStartButtonState();
          playerNameInput.value = "";
          playerNameInput.focus();
        });
        genderTabs.forEach((tab) =>
          tab.addEventListener("click", () => {
            genderTabs.forEach((t) => t.classList.remove("active"));
            tab.classList.add("active");
          })
        );
        startGameBtn.addEventListener("click", () => {
          if (gameState.players.length < 2) return;
          gameState.currentPlayerIndex = 0;
          gameState.lastPunishmentIndex = null;
          nextRound();
        });
        nextPlayerBtn.addEventListener("click", advanceToNextPlayer);
        punishmentBtn.addEventListener("click", setupRoulette);
        spinBtn.addEventListener("click", spinWheel);
        confirmPunishmentBtn.addEventListener("click", advanceToNextPlayer);

        // Listeners de configuración
        settingsTabBtns.forEach((btn) => {
          btn.addEventListener("click", () => {
            settingsTabBtns.forEach((b) => b.classList.remove("active"));
            settingsContents.forEach((c) => c.classList.remove("active"));
            btn.classList.add("active");
            document
              .getElementById(`settings-content-${btn.dataset.target}`)
              .classList.add("active");
          });
        });

        document
          .getElementById("settings-content-questions")
          .addEventListener("click", (e) => {
            if (e.target.matches("#add-question-btn")) {
              const text = questionInput.value.trim();
              if (text) {
                gameState.questions.push(text);
                resetForms();
                renderSettings();
              }
            } else if (e.target.matches("#update-question-btn")) {
              const text = questionInput.value.trim();
              if (text) {
                gameState.questions[gameState.editing.index] = text;
                resetForms();
                renderSettings();
              }
            }
          });

        document
          .getElementById("settings-content-punishments")
          .addEventListener("click", (e) => {
            if (e.target.matches("#add-punishment-btn")) {
              const text = punishmentInput.value.trim();
              if (text) {
                gameState.punishments.push({
                  text,
                  requiresOppositeGender:
                    requiresOppositeGenderCheckbox.checked,
                });
                resetForms();
                renderSettings();
              }
            } else if (e.target.matches("#update-punishment-btn")) {
              const text = punishmentInput.value.trim();
              if (text) {
                gameState.punishments[gameState.editing.index] = {
                  text,
                  requiresOppositeGender:
                    requiresOppositeGenderCheckbox.checked,
                };
                resetForms();
                renderSettings();
              }
            }
          });

        document
          .getElementById("settings-page")
          .addEventListener("click", (e) => {
            if (e.target.matches("#cancel-edit-btn")) {
              resetForms();
            } else if (e.target.closest(".edit-btn")) {
              const btn = e.target.closest(".edit-btn");
              setupFormForEdit(btn.dataset.type, parseInt(btn.dataset.index));
            } else if (e.target.closest(".delete-btn")) {
              const btn = e.target.closest(".delete-btn");
              const type = btn.dataset.type;
              const index = parseInt(btn.dataset.index);
              showConfirmation(
                gameState.lg.deleteElement ?? "¿Seguro que quieres eliminar este elemento?",
                () => {
                  if (type === "questions")
                    gameState.questions.splice(index, 1);
                  else gameState.punishments.splice(index, 1);
                  renderSettings();
                }
              );
            }
          });

        resetDefaultsBtn.addEventListener("click", () => {
          showConfirmation(
            gameState.lg.resetDefaults ?? "Resetear a Predeterminados",
            () => {
              gameState.questions = [...gameState.defaultQuestions];
              gameState.punishments = [...gameState.defaultPunishments];
              renderSettings();
            }
          );
        });

        // --- INICIALIZACIÓN ---
        const initialize = () => {
          loadAllSettings();
          renderPlayerList();
          updateStartButtonState();
          renderSettings();
        };
        showPage("addPlayers");
        initialize();
      });