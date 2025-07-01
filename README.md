<!DOCTYPE html>
<html>
<body>

<h1>Bingo TV - Aplicación interactiva para televisores webOS</h1>

<p><img src="assets/images/imagen_3.png" alt="Banner del proyecto"></p>

<p>Bingo TV es una aplicación interactiva de Bingo diseñada específicamente para televisores con webOS, que combina la emoción del bingo tradicional con tecnología moderna de voz y efectos visuales.</p>

<h2><span class="emoji">🌟</span> Características principales</h2>

<ul>
    <li><span class="emoji">🎯</span> Generación aleatoria de números de bingo (1-75) con algoritmo sin repetición</li>
    <li><span class="emoji">🔊</span> Anuncios por voz (TTS) de cada número cantado</li>
    <li><span class="emoji">🔔</span> Efectos de sonido integrados para retroalimentación auditiva</li>
    <li><span class="emoji">🎨</span> Interfaz optimizada para control remoto (navegación con flechas)</li>
    <li><span class="emoji">📊</span> Visualización clara organizada por columnas (B-I-N-G-O)</li>
    <li><span class="emoji">✨</span> Efectos visuales para el último número cantado</li>
    <li><span class="emoji">🏆</span> Detección y anuncio automático de columnas completas</li>
    <li><span class="emoji">🔄</span> Reinicio automático al completar todos los números</li>
</ul>

<h2><span class="emoji">📸</span> Capturas de pantalla</h2>

<p><img src="screenshots/main-screen.png" alt="Interfaz principal"><br>
<em>Interfaz principal con números destacados</em></p>

<p><img src="screenshots/complete-column.png" alt="Columna completa"><br>
<em>Columna completa con indicador visual</em></p>

<h2><span class="emoji">🛠️</span> Requisitos técnicos</h2>

<ul>
    <li>Televisor LG con webOS 6.0.0 o superior</li>
    <li>Navegador compatible con:
        <ul>
            <li>Web Audio API</li>
            <li>CSS Grid</li>
        </ul>
    </li>
    <li>Permisos de audio y TTS (Text-to-Speech)</li>
</ul>

<h2><span class="emoji">🚀</span> Instalación</h2>

<h3>Para desarrollo local</h3>

<pre><code>git clone https://github.com/tu-usuario/bingo-tv.git
cd bingo-tv
</code></pre>

<p>Abre el archivo <code>index.html</code> en tu navegador preferido.</p>

<h3>Para despliegue en webOS</h3>

<pre><code>npm install -g @webosose/ares-cli
ares-package .
ares-install com.example.bingo_1.0.1_all.ipk -d &lt;tu-dispositivo&gt;
</code></pre>

<h2><span class="emoji">🎮</span> Cómo jugar</h2>

<table>
    <tr>
        <th>Control</th>
        <th>Acción</th>
    </tr>
    <tr>
        <td>ENTER/OK</td>
        <td>Iniciar o detener el juego</td>
    </tr>
    <tr>
        <td>Flecha izquierda</td>
        <td>Navegar a la columna izquierda</td>
    </tr>
    <tr>
        <td>Flecha derecha</td>
        <td>Navegar a la columna derecha</td>
    </tr>
    <tr>
        <td>ESC</td>
        <td>Salir de la aplicación</td>
    </tr>
</table>

<h2><span class="emoji">🛠</span> Personalización</h2>

<p>Puedes modificar los siguientes aspectos:</p>

<p><strong>Intervalo entre números</strong>:
Edita el valor en milisegundos en <code>app.js</code> (línea ~96):</p>

<pre><code>this.intervalId = setInterval(() => this.generateNumber(), 7000); // Cambia 7000 por el valor deseado
</code></pre>

<p><strong>Colores y estilos</strong>:
Modifica el archivo <code>style.css</code> para personalizar:</p>

<pre><code>/* Ejemplo: cambiar color principal */
body {
  background: radial-gradient(circle at center, #2a1a5e 0%, #0a0a2a 100%);
}
</code></pre>

<p><strong>Efectos de sonido</strong>:
Ajusta los parámetros en <code>playBeep()</code>:</p>

<pre><code>oscillator.frequency.value = 800; // Frecuencia en Hz
gainNode.gain.value = 0.5;       // Volumen (0 a 1)
</code></pre>

<h2><span class="emoji">📂</span> Estructura del proyecto</h2>

<pre><code>bingo-tv/
├── assets/                  # Recursos multimedia
│   └── images/              # Imágenes e iconos
│       └── imagen_3.png
├── index.html               # Punto de entrada HTML
├── app.js                   # Lógica principal
├── style.css                # Estilos CSS
├── appinfo.json             # Configuración webOS
├── README.md                # Este archivo
└── LICENSE                  # Licencia del proyecto
</code></pre>

<h2><span class="emoji">🤝</span> Cómo contribuir</h2>

<p>¡Tus contribuciones son bienvenidas! Sigue estos pasos:</p>

<ol>
    <li>Haz un fork del proyecto</li>
    <li>Crea una rama para tu feature (<code>git checkout -b feature/nueva-funcionalidad</code>)</li>
    <li>Haz commit de tus cambios (<code>git commit -m 'Añade nueva funcionalidad'</code>)</li>
    <li>Haz push a la rama (<code>git push origin feature/nueva-funcionalidad</code>)</li>
    <li>Abre un Pull Request</li>
</ol>

<h2><span class="emoji">📜</span> Licencia</h2>

<p>Distribuido bajo la licencia MIT. Consulta el archivo <code>LICENSE</code> para más información.</p>

<h2><span class="emoji">✉️</span> Contacto</h2>

<p>Everson Cuellar - <a href="mailto:tu-email@example.com">tu-email@example.com</a></p>

<p>Enlace del proyecto: <a href="https://github.com/tu-usuario/bingo-tv">https://github.com/tu-usuario/bingo-tv</a></p>

<hr>

<h2>Roadmap</h2>

<ul>
    <li><input type="checkbox" checked> Versión inicial funcional</li>
    <li><input type="checkbox"> Modo multijugador local</li>
    <li><input type="checkbox"> Cartones de bingo virtuales</li>
    <li><input type="checkbox"> Más opciones de personalización</li>
    <li><input type="checkbox"> Soporte para múltiples idiomas</li>
    <li><input type="checkbox"> Integración con servicios en la nube</li>
</ul>

<h2>Agradecimientos</h2>

<ul>
    <li>Equipo de desarrollo de webOS</li>
    <li>Comunidad de desarrolladores de LG</li>
    <li>Todos los contribuyentes y testers</li>
</ul>

<hr>

<p><em>¡Diviértete jugando al Bingo!</em> <span class="emoji">🎉</span></p>

</body>
</html>
