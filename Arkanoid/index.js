document.getElementById("btnOk").addEventListener("click", function () {
  const nameInput = document.getElementById("nameInput").value;

  if (nameInput.trim() !== "") {
    document.querySelector(".input").style.display = "none";    
    const canvas = document.querySelector("canvas");
    const ctx = canvas.getContext("2d");

    // Tamaño del paño
    canvas.width = 648;
    canvas.height = 600;

    // Variables del juego
    const ballRadius = 6;
    let x = canvas.width / 2;
    let y = canvas.height - 30;
    let dx = 2;
    let dy = -2;

    const naveHeight = 10;
    const naveWidth = 60;
    let naveX = (canvas.width - naveWidth) / 2;
    let naveY = canvas.height - naveHeight - 10;

    let rightPressed = false;
    let leftPressed = false;

    const ladrillosRowCount = 6;
    const ladrillosColumnCount = 19;
    const ladrillosWidth = 30;
    const ladrillosHeight = 14;
    const ladrillosPadding = 2;
    const ladrillosOffsetTop = 80;
    const ladrillosOffsetLeft = 15;
    const ladrillos = [];

    const LADRILLOS_STATUS = {
      SANO: 1,
      ROTO: 0,
    };

    let lives = 3; // Número de intentos
    let gameRunning = false; // El juego comienza pausado

    // Crear los ladrillos iniciales
    function inicializarLadrillos() {
      for (let c = 0; c < ladrillosColumnCount; c++) {
        ladrillos[c] = [];
        for (let r = 0; r < ladrillosRowCount; r++) {
          const ladrilloX =
            c * (ladrillosWidth + ladrillosPadding) + ladrillosOffsetLeft;
          const ladrilloY =
            r * (ladrillosHeight + ladrillosPadding) + ladrillosOffsetTop;
          const random = Math.floor(Math.random() * 8);
          ladrillos[c][r] = {
            x: ladrilloX,
            y: ladrilloY,
            status: LADRILLOS_STATUS.SANO,
            color: random,
          };
        }
      }
    }

    // Funciones de dibujo
    function dibujarPelotita() {
      ctx.beginPath();
      ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
      ctx.fillStyle = "#fff";
      ctx.fill();
      ctx.closePath();
    }

    function dibujarNave() {
      ctx.fillRect(naveX, naveY, naveWidth, naveHeight);
    }

    function dibujarLadrillos() {
      for (let c = 0; c < ladrillosColumnCount; c++) {
        for (let r = 0; r < ladrillosRowCount; r++) {
          const currentLadrillos = ladrillos[c][r];
          if (currentLadrillos.status == LADRILLOS_STATUS.ROTO) continue;

          ctx.fillStyle = "yellow";
          ctx.fillRect(
            currentLadrillos.x,
            currentLadrillos.y,
            ladrillosWidth,
            ladrillosHeight
          );
          ctx.fill();
          ctx.strokeStyle = "#000";
          ctx.stroke();
        }
      }
    }

    // Verificar colisiones
    function colisionDetectada() {
      for (let c = 0; c < ladrillosColumnCount; c++) {
        for (let r = 0; r < ladrillosRowCount; r++) {
          const currentLadrillos = ladrillos[c][r];
          if (currentLadrillos.status == LADRILLOS_STATUS.ROTO) continue;

          const pelotitaChocaLadrilloX =
            x > currentLadrillos.x && x < currentLadrillos.x + ladrillosWidth;
          const pelotitaChocaLadrilloY =
            y > currentLadrillos.y && y < currentLadrillos.y + ladrillosHeight;
          if (pelotitaChocaLadrilloX && pelotitaChocaLadrilloY) {
            dy = -dy;
            currentLadrillos.status = LADRILLOS_STATUS.ROTO;
          }
        }
      }
    }

    // Movimiento de la pelota
    function movimientoPelotita() {
      if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) dx = -dx;
      if (y + dy < ballRadius) dy = -dy;

      const pelotitaEnAncho = x > naveX && x < naveX + naveWidth;
      const pelotitaChocaNave = y + dy > naveY;

      if (pelotitaChocaNave & pelotitaEnAncho) {
        dy = -dy;
      } else if (y + dy > canvas.height - ballRadius) {
        lives--;
        if (lives <= 0) {
          Swal.fire({
            icon: "error",
            title: "¡Perdiste!",
            text: `Te quedaste sin vidas, ${nameInput}.`,
            confirmButtonText: "Reintentar",
          }).then(() => {
            window.location.reload(); // Recarga la página
          });
          gameRunning = false; // Pausa el juego
        } else {
          Swal.fire({
            icon: "error",
            title: `¡PERDISTE, ${nameInput}!`,
            text: `Te quedan ${lives} vidas.`,
            showConfirmButton: true,
          });
          resetPelota();
        }
      }

      x += dx;
      y += dy;
    }

    // Reseteo de la pelota
    function resetPelota() {
      x = canvas.width / 2;
      y = canvas.height - 30;
      dx = 2;
      dy = -2;
      naveX = (canvas.width - naveWidth) / 2;
    }

    // Reseteo completo del juego
    function resetJuego() {
      lives = 3;
      x = canvas.width / 2;
      y = canvas.height - 30;
      dx = 2;
      dy = -2;
      naveX = (canvas.width - naveWidth) / 2;
      inicializarLadrillos();
      gameRunning = true;
      draw();
    }
    // Movimiento de la nave
    function movimientoNave() {
      if (rightPressed && naveX < canvas.width - naveWidth) naveX += 8;
      if (leftPressed && naveX > 0) naveX -= 8;
    }

    // Limpiar el canvas
    function cleanCanvas() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    // Inicializar eventos
    function initEvents() {
      document.addEventListener("keydown", (event) => {
        if (event.key == "Right" || event.key == "ArrowRight") rightPressed = true;
        if (event.key == "Left" || event.key == "ArrowLeft") leftPressed = true;
      });

      document.addEventListener("keyup", (event) => {
        if (event.key == "Right" || event.key == "ArrowRight") rightPressed = false;
        if (event.key == "Left" || event.key == "ArrowLeft") leftPressed = false;
      });
    }

    // Dibujar el juego
    function draw() {
      if (!gameRunning) return;

      cleanCanvas();
      dibujarPelotita();
      dibujarNave();
      dibujarLadrillos();
      colisionDetectada();
      movimientoPelotita();
      movimientoNave();

      requestAnimationFrame(draw);
    }

    // Inicializar el juego
    //solicitarNombreJugador();
    inicializarLadrillos(); // Llama a esta función para preparar los ladrillos
    initEvents();
    gameRunning = true;     // IMPORTANTE: iniciar el juego
    draw();                 // Inicia la animación
  } else {
    alert("Por favor ingrese un nombre");
  }
})
