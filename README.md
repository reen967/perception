# Perceptual Robot Logic Engine

This tool converts **Robot Hardware Specifications** into **Bio-Perceptual Limits**.

### Why this exists:
Robots operate in meters and radians. Humans operate in **intent and empathy**. This engine uses bridge formulas to ensure a robot's maximum speed is capped by human comfort, and its minimum speed is high enough to appear "alive."

### Included Formulas:
1. **Tip Velocity ($V_{tip}$):** Converts angular motor speeds into linear human-perceived speeds.
2. **Weber Threshold ($P_{min}$):** Defines the "Biological Floor" for motion and light.
3. **Semantic Capping ($M_z$):** Adjusts safety limits based on the height of the component (Ground vs. Eye Zone).

### Usage:
Upload the `index.html`, `perceptual_logic.js`, and `style.css` to your repository to launch the calculator.
