---
title: RoveLink
summary: Low-latency control of an ESP32 robot from the browser. The browser and the robot both open outbound connections to a Cloudflare Worker and Durable Object relay, so the robot needs no public IP and no open ports.
kind: open-source
statusNote: Public repository on GitHub.
stack: [TypeScript, Cloudflare Workers, Durable Objects, WebSockets, ESP32]
links:
  repository: https://github.com/adcuelloa/rovelink
order: 5
seoDescription: "RoveLink: open-source, low-latency robot control from the browser through a Cloudflare Worker and Durable Object relay to an ESP32. No public IP needed."
---

## Context

Driving a small robot over the internet usually means opening ports or exposing the device. RoveLink avoids both: the browser and the ESP32 each open an outbound WebSocket to a relay, and the relay only forwards messages between them.

## What I built

- **A control relay** on Cloudflare Workers with a Durable Object per room. It authenticates devices and controllers with shared secrets and never interprets robot physics.
- **A separate video relay** (its own Worker and Durable Object) for live video, with ticket-based authorization for viewers.
- **A web dashboard** in Vite, TypeScript and Tailwind. It supports the Gamepad API, a keyboard fallback and touch controls, with analog throttle and steering and a deadzone.
- **ESP32 firmware** with a WSS client, TLS certificate validation against pinned root CAs, and reconnection with backoff.
- **A shared protocol package**, including one `differentialMix()` function used by both the browser and the firmware, so the PWM shown on screen is exactly what the motors get.
- **A hardware-free demo** (`pnpm dev:demo`) that runs the real control and video protocols against a robot simulator and a simulated camera.

## Decisions

- **Latest state wins.** There is no command queue, so stale input is dropped instead of replayed.
- **Safety by default:** a 500 ms link watchdog stops the robot when commands stop arriving, and an emergency stop disarms it and zeroes every axis.
- **Telemetry back to the operator:** RSSI, acknowledged sequence numbers and echoed throttle and steering.

## Status

Open source under the Apache 2.0 license. The deployed dashboard requires an operator key.
