/**
 * PERCEPTUAL LOGIC ENGINE
 * Bridge Formulas for Robot-to-Human Empathy
 */

const SOCIAL_WALK_SPEED = 1.2; // m/s
const SOCIAL_GESTURE_SPEED = 0.5; // m/s

function addComponent() {
    const list = document.getElementById('component-list');
    const id = Date.now();
    const card = `
        <div class="component-card" id="card-${id}">
            <input type="text" placeholder="Comp Name" class="name">
            <select class="type">
                <option value="revolute">Revolute (Rotation)</option>
                <option value="prismatic">Prismatic (Slider)</option>
                <option value="luminous">Luminous (Light)</option>
            </select>
            <input type="number" step="0.1" placeholder="X-Max (Vel)" class="xmax">
            <input type="number" step="0.1" placeholder="L (Link m)" class="length">
            <input type="number" step="0.1" placeholder="Z (Height m)" class="zheight">
        </div>`;
    list.insertAdjacentHTML('beforeend', card);
}

function calculatePerception() {
    const cards = document.querySelectorAll('.component-card');
    const tbody = document.querySelector('#results-table tbody');
    tbody.innerHTML = '';

    cards.forEach(card => {
        const name = card.querySelector('.name').value || "Unnamed";
        const type = card.querySelector('.type').value;
        const xmax = parseFloat(card.querySelector('.xmax').value) || 0;
        const L = parseFloat(card.querySelector('.length').value) || 1;
        const Z = parseFloat(card.querySelector('.zheight').value) || 0;

        // 1. Get Height Multiplier (Mz)
        let Mz = 1.0;
        if (Z < 0.4) Mz = 1.2;       // Ground Zone
        else if (Z > 1.6) Mz = 0.4;  // Eye Zone
        else if (Z > 1.2) Mz = 0.7;  // Chest Zone

        let modality, formula, pmin, pmax, pcomfort;

        // 2. Apply Bridge Formulas
        if (type === 'revolute') {
            modality = "Angular";
            formula = "V_tip = ω * L";
            pmax = xmax * L; 
            pmin = pmax * 0.02; // Weber Motion
            pcomfort = Math.min(pmax, SOCIAL_GESTURE_SPEED * Mz);
        } else if (type === 'prismatic') {
            modality = "Translational";
            formula = "Prismatic Scaling";
            pmax = xmax;
            pmin = pmax * 0.02; 
            pcomfort = Math.min(pmax, SOCIAL_WALK_SPEED * Mz);
        } else {
            modality = "Luminous";
            formula = "PWM Weber Floor";
            pmax = xmax;
            pmin = pmax * 0.01; // Weber Light
            pcomfort = pmax * 0.7 * Mz;
        }

        tbody.insertAdjacentHTML('beforeend', `
            <tr>
                <td><strong>${name}</strong></td>
                <td>${modality}</td>
                <td><code>${formula}</code></td>
                <td>${pmin.toFixed(3)}</td>
                <td>${pcomfort.toFixed(3)}</td>
                <td>${pmax.toFixed(3)}</td>
            </tr>
        `);
    });
}
