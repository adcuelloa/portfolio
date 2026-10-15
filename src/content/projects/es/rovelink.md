---
title: RoveLink
summary: Control de baja latencia de un robot ESP32 desde el navegador. El navegador y el robot abren conexiones salientes hacia un relay en Cloudflare Workers y Durable Objects, así que el robot no necesita IP pública ni puertos abiertos.
kind: open-source
statusNote: Repositorio público en GitHub.
stack: [TypeScript, Cloudflare Workers, Durable Objects, WebSockets, ESP32]
links:
  repository: https://github.com/adcuelloa/rovelink
order: 5
seoDescription: "RoveLink: control de robots de baja latencia desde el navegador, de código abierto, con un relay en Cloudflare Workers y Durable Objects hasta un ESP32."
---
## Contexto

Manejar un robot pequeño por internet normalmente implica abrir puertos o exponer el dispositivo. RoveLink evita ambas cosas: el navegador y el ESP32 abren cada uno un WebSocket saliente hacia un relay, y el relay solo reenvía mensajes entre ellos.

## Qué construí

- **Un relay de control** en Cloudflare Workers con un Durable Object por sala. Autentica dispositivos y controladores con secretos compartidos y nunca interpreta la física del robot.
- **Un relay de video separado** (su propio Worker y Durable Object) para video en vivo, con autorización por tickets para los espectadores.
- **Un panel web** con Vite, TypeScript y Tailwind. Soporta la Gamepad API, teclado como alternativa y controles táctiles, con aceleración y dirección analógicas y zona muerta.
- **Firmware para ESP32** con cliente WSS, validación de certificados TLS contra CA raíz fijadas y reconexión con backoff.
- **Un paquete de protocolo compartido**, que incluye una sola función `differentialMix()` usada por el navegador y el firmware, para que el PWM que se ve en pantalla sea exactamente el que reciben los motores.
- **Una demo sin hardware** (`pnpm dev:demo`) que ejecuta los protocolos reales de control y video contra un simulador de robot y una cámara simulada.

## Decisiones

- **Gana el último estado.** No hay cola de comandos, así que una entrada vieja se descarta en vez de repetirse.
- **Seguridad por defecto:** un watchdog de 500 ms detiene el robot cuando dejan de llegar comandos, y la parada de emergencia lo desarma y pone en cero todos los ejes.
- **Telemetría para el operador:** RSSI, números de secuencia confirmados y eco de aceleración y dirección.

## Estado

Código abierto con licencia Apache 2.0. El panel desplegado requiere una clave de operador.
