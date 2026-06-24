# flappybird-ink-solidjs
# 🐦 Flappy Bird — Terminal Edition (SolidJS &amp; Ink)

A lightweight, highly efficient, and flicker-free Flappy Bird clone built for the terminal using **SolidJS** and **Ink**. 

This project demonstrates how to leverage reactive state management in a Command Line Interface (CLI) environment while maintaining smooth, high-performance rendering.

## 🚀 Key Features

*   **High-Efficiency Rendering:** Optimized performance by rendering the entire game map as a single text buffer matrix instead of mounting multiple components, reducing CPU overhead to near zero.
*   **Flicker-Free Grid Sync:** Fixed the common terminal alignment issue caused by wide-character emojis (like 🐦) by enforcing a strict 2-character grid (`██` and double spaces) for perfect alignment.
*   **True Reactivity:** Powered by SolidJS signals (`createSignal`, `createEffect`) adapted for terminal viewports via `solid-ink`.
*   **Fluid Physics:** Fine-tuned gravity physics and responsive keyboard input listeners.

---

## 🕹️ Controls

| Key | Action |
| --- | --- |
| `Space` or `Enter` | Flap / Jump upwards |
| `R` or `r` | Restart the game (Game Over screen) |
| `ESC` | Safe exit from the application |

---

## 🛠️ Installation & Running

Make sure you have [Bun](https://bun.sh) installed on your system.

## ⚙️ Run 
```bash
bun start # to run
```
