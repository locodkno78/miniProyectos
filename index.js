document.getElementById("btnOk").addEventListener("click", function () {
    const nameInput = document.getElementById("nameInput").value;
    const nameDiv = document.querySelector(".name");

    if (nameInput.trim() !== "") {
        // Mostrar mensaje de bienvenida
        nameDiv.innerHTML = `
            Hola ${nameInput},<br>
            ¡Comencemos a jugar!<br>
            <div class="limits">
                <label for="lowerLimit">Dame un límite inferior:</label>
                <input id="lowerLimit" type="number" class="form-control mb-2" placeholder="Límite inferior">
                <label for="upperLimit">Dame un límite superior:</label>
                <input id="upperLimit" type="number" class="form-control mb-2" placeholder="Límite superior">
                <button class="btn btn-success" id="btnStart">Iniciar Juego</button>
            </div>
        `;

        document.getElementById("nameInput").value = ""; // Limpiar el input de nombre

        // Agregar evento para el botón "Iniciar Juego"
        document.getElementById("btnStart").addEventListener("click", function () {
            const lowerLimit = parseInt(document.getElementById("lowerLimit").value, 10);
            const upperLimit = parseInt(document.getElementById("upperLimit").value, 10);

            if (!isNaN(lowerLimit) && !isNaN(upperLimit) && lowerLimit < upperLimit) {
                // Generar número aleatorio
                const randomNumber = Math.floor(Math.random() * (upperLimit - lowerLimit + 1)) + lowerLimit;
                console.log("Número a adivinar:", randomNumber); // Para pruebas

                let attemptsLeft = 5; // Intentos permitidos
                const attemptsHistory = []; // Historial de intentos

                // Mostrar input para adivinar
                nameDiv.innerHTML += `
                    <div class="guess">
                        <label for="guessInput">Adivina el número:</label>
                        <input id="guessInput" type="number" class="form-control mb-2" placeholder="Tu número">
                        <button class="btn btn-primary" id="btnGuess">Probar</button>
                        <p id="hint" class="mt-2"></p>
                        <p id="attempts" class="mt-2">Intentos restantes: ${attemptsLeft}</p>
                        <ul id="history" class="mt-2">Historial de intentos:</ul>
                    </div>
                `;

                // Evento para adivinar
                document.getElementById("btnGuess").addEventListener("click", function () {
                    const guess = parseInt(document.getElementById("guessInput").value, 10);//Convierte la cadena de texto obtenida en un número entero (tipo number), asegurándose de interpretarlo en base 10 (decimal)
                    const hint = document.getElementById("hint");
                    const attempts = document.getElementById("attempts");
                    const history = document.getElementById("history");

                    if (!isNaN(guess)) {
                        attemptsHistory.push(guess); // Guardar intento en el historial
                        const listItem = document.createElement("li");
                        listItem.textContent = guess;
                        history.appendChild(listItem);

                        if (guess === randomNumber) {
                            hint.textContent = "🎉 ¡Felicidades! Adivinaste el número.";
                            hint.style.color = "green";
                            gameOver(true); // Terminar el juego
                        } else if (guess < lowerLimit || guess > upperLimit){
                            alert("El número ingresado está fuera de los límites")
                            attemptsLeft++
                        } 
                        else if (guess < randomNumber) {
                            hint.textContent = "📉 El número es mayor. Intenta de nuevo.";
                            hint.style.color = "blue";
                        } else {
                            hint.textContent = "📈 El número es menor. Intenta de nuevo.";
                            hint.style.color = "orange";
                        }

                        // Restar intentos
                        attemptsLeft--;
                        attempts.textContent = `Intentos restantes: ${attemptsLeft}`;

                        if (attemptsLeft <= 0) {
                            hint.textContent = `❌ ¡Se acabaron los intentos! El número era ${randomNumber}.`;
                            hint.style.color = "red";
                            gameOver(false); // Terminar el juego
                        }
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
                alert("Por favor, ingresa límites válidos. El límite inferior debe ser menor que el superior.");
            }
        });
    } else {
        alert("Por favor ingrese un nombre");
    }
});


   