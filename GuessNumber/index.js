document.getElementById("btnOk").addEventListener("click", function () {
    const nameInput = document.getElementById("nameInput").value;
    const nameDiv = document.querySelector(".name");

    if (nameInput.trim() !== "") {
        document.querySelector(".input").style.display = "none";

        // Mostrar mensaje de bienvenida
        nameDiv.innerHTML = `
            Hola ${nameInput},<br>
            ¡Comencemos a jugar!<br>
            <div class="limits">
                <label for="lowerLimit">Dame un límite inferior:</label>
                <input id="lowerLimit" type="number" class="form-control mb-2" placeholder="Límite inferior">
                <label for="upperLimit">Dame un límite superior:</label>
                <input id="upperLimit" type="number" class="form-control mb-2" placeholder="Límite superior">
                <label for="attempts">Dame una cantidad de intentos:</label>
                <input id="attempts" type="number" class="form-control mb-2" placeholder="Cantidad de intentos">
                <button class="btn btn-success" id="btnStart">Iniciar Juego</button>
            </div>
        `;

        // Agregar evento para el botón "Iniciar Juego"
        document.getElementById("btnStart").addEventListener("click", function () {
            const lowerLimit = parseInt(document.getElementById("lowerLimit").value, 10);
            const upperLimit = parseInt(document.getElementById("upperLimit").value, 10);
            let attempts = parseInt(document.getElementById("attempts").value, 10);

            if (!isNaN(lowerLimit) && !isNaN(upperLimit) && lowerLimit < upperLimit && lowerLimit >= 0 && attempts > 0) {
                // Ocultar todo lo que está dentro de la clase limits
                document.querySelector(".limits").style.display = "none";
                // Generar número aleatorio
                const randomNumber = Math.floor(Math.random() * (upperLimit - lowerLimit + 1)) + lowerLimit;
                console.log("Número a adivinar:", randomNumber); // Para pruebas

                const attemptsHistory = []; // Historial de intentos

                // Mostrar input para adivinar
                nameDiv.innerHTML += `
                    <div class="guess">
                        <label for="guessInput">Adivina el número que está entre ${lowerLimit} y ${upperLimit}:</label>
                        <input id="guessInput" type="number" class="form-control mb-2" placeholder="Tu número">
                        <button class="btn btn-primary" id="btnGuess">Probar</button>
                        <p id="hint" class="mt-2"></p>
                        <p id="attemptsDisplay" class="mt-2">Intentos restantes: ${attempts}</p>
                        <ul id="history" class="mt-2">Historial de intentos:</ul>
                    </div>
                `;

                // Evento para adivinar
                document.getElementById("btnGuess").addEventListener("click", function () {
                    const guess = parseInt(document.getElementById("guessInput").value, 10);
                    const hint = document.getElementById("hint");
                    const attemptsDisplay = document.getElementById("attemptsDisplay");
                    const history = document.getElementById("history");

                    if (!isNaN(guess)) {
                        // Guardar intento en el historial
                        const listItem = document.createElement("li");
                        listItem.textContent = guess;
                        history.appendChild(listItem);

                        if (guess === randomNumber) {
                            hint.textContent = `🎉 ¡Felicidades ${nameInput}! Adivinaste el número.`;
                            hint.style.color = "green";
                            gameOver(true); // El jugador gana, termina el juego.
                            return; // Evitar que se sigan evaluando más condiciones.
                        }

                        if (guess < lowerLimit || guess > upperLimit) {
                            alert(`No ${nameInput}!!!\nEl número ingresado está fuera de los límites.`);
                            attempts++;
                        } else if (guess < randomNumber) {
                            hint.textContent = `${nameInput}, el número es mayor. Intenta de nuevo.`;
                            hint.style.color = "yellow";
                        } else {
                            hint.textContent = `${nameInput}, el número es menor. Intenta de nuevo.`;
                            hint.style.color = "orange";
                        }

                        // Restar intentos después de comprobar si se ganó
                        attempts--;
                        attemptsDisplay.textContent = `Te quedan: ${attempts} intentos`;

                        // Verificar si los intentos se agotaron
                        if (attempts <= 0) {
                            hint.textContent = `Lo siento ${nameInput}\n¡Se acabaron los intentos! El número era: ${randomNumber}.`;
                            hint.style.color = "red";
                            gameOver(false); // Terminar el juego con derrota
                        }
                        // Limpiar el campo de entrada después de cada intento
                        guessInput.value = "";
                    } else {
                        hint.textContent = "Por favor, ingresa un número válido.";
                        hint.style.color = "red";
                    }
                });

                // Función para reiniciar el juego
                function gameOver(won) {
                    document.getElementById("guessInput").disabled = true;
                    document.getElementById("btnGuess").disabled = true;

                    // Agregar botón para reiniciar
                    const restartButton = document.createElement("button");
                    restartButton.textContent = "Reiniciar Juego";
                    restartButton.className = "btn btn-warning mt-3";
                    restartButton.addEventListener("click", function () {
                        location.reload(); // Recargar la página
                    });

                    nameDiv.appendChild(restartButton);
                }
            } else {
                alert(`Error ${nameInput}!!!\nPor favor, ingresa números positivos.\nEl límite inferior debe ser menor que el superior y tiene que ser mayor o igual a 0.\nLos intentos tienen que ser mayor a 0`);
            }
        });
    } else {
        alert("Por favor ingrese un nombre");
    }
});