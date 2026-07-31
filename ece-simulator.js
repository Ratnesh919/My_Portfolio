/**
 * ECE Logic Gate Sandbox Simulator
 * Provides interactive logic circuit building, simulation, and preset circuits.
 */

class LogicNode {
    constructor(id, type, x, y) {
        this.id = id;
        this.type = type; // 'switch' | 'and' | 'or' | 'not' | 'xor' | 'led'
        this.x = x;
        this.y = y;
        this.width = 120;
        this.height = type === 'and' || type === 'or' || type === 'xor' ? 80 : 60;
        this.value = false;

        // Initialize inputs array
        let inputCount = 0;
        if (type === 'and' || type === 'or' || type === 'xor') inputCount = 2;
        else if (type === 'not' || type === 'led') inputCount = 1;
        
        this.inputs = Array(inputCount).fill(null); // Each entry: null or { nodeId }
    }

    getPinPositions() {
        const pins = { inputs: [], output: null };
        const midY = this.y + this.height / 2;

        if (this.inputs.length === 1) {
            pins.inputs.push({ x: this.x, y: midY, label: 'In' });
        } else if (this.inputs.length === 2) {
            pins.inputs.push({ x: this.x, y: this.y + 25, label: 'A' });
            pins.inputs.push({ x: this.x, y: this.y + this.height - 25, label: 'B' });
        }

        // Switches and gates have one output pin on the right (LEDs have none)
        if (this.type !== 'led') {
            pins.output = { x: this.x + this.width, y: midY, label: 'Out' };
        }

        return pins;
    }
}

class CircuitSimulator {
    constructor() {
        this.nodes = [];
        this.canvas = document.getElementById('sandbox-canvas');
        if (!this.canvas) return;

        this.ctx = this.canvas.getContext('2d');
        this.dragNode = null;
        this.dragOffset = { x: 0, y: 0 };
        this.activePin = null; // { node, type: 'input'|'output', index: number, x, y }
        this.mousePos = { x: 0, y: 0 };
        this.nodeCounter = 0;

        this.setupEventListeners();
        this.resizeCanvas();
        this.loadPreset('half-adder'); // Load Half Adder by default
        this.startLoop();
    }

    setupEventListeners() {
        window.addEventListener('resize', () => this.resizeCanvas());

        // Modal triggers
        const modal = document.getElementById('ece-sandbox-modal');
        const openBtn = document.getElementById('card-ece-sandbox');
        const closeBtn = document.getElementById('sandbox-close');
        const resetBtn = document.getElementById('sandbox-reset');
        const presetSelect = document.getElementById('sandbox-presets');

        if (openBtn && modal) {
            openBtn.addEventListener('click', (e) => {
                e.preventDefault();
                modal.style.display = 'flex';
                this.resizeCanvas();
            });
        }

        if (closeBtn && modal) {
            closeBtn.addEventListener('click', () => {
                modal.style.display = 'none';
            });
            // Close if clicking outside the container
            modal.addEventListener('click', (e) => {
                if (e.target === modal) modal.style.display = 'none';
            });
        }

        if (resetBtn) {
            resetBtn.addEventListener('click', () => this.reset());
        }

        if (presetSelect) {
            presetSelect.addEventListener('change', (e) => {
                this.loadPreset(e.target.value);
            });
        }

        // Sidebar node creation
        document.querySelectorAll('.add-node-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const type = e.target.getAttribute('data-type');
                this.addNode(type, 100 + Math.random() * 80, 150 + Math.random() * 80);
            });
        });

        // Canvas interactions
        this.canvas.addEventListener('mousedown', (e) => this.handleMouseDown(e));
        this.canvas.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        this.canvas.addEventListener('mouseup', (e) => this.handleMouseUp(e));
        
        // Touch support for mobile
        this.canvas.addEventListener('touchstart', (e) => {
            const touch = e.touches[0];
            const mouseEvent = new MouseEvent('mousedown', {
                clientX: touch.clientX,
                clientY: touch.clientY
            });
            this.canvas.dispatchEvent(mouseEvent);
        }, { passive: true });

        this.canvas.addEventListener('touchmove', (e) => {
            const touch = e.touches[0];
            const mouseEvent = new MouseEvent('mousemove', {
                clientX: touch.clientX,
                clientY: touch.clientY
            });
            this.canvas.dispatchEvent(mouseEvent);
        }, { passive: true });

        this.canvas.addEventListener('touchend', () => {
            const mouseEvent = new MouseEvent('mouseup', {});
            this.canvas.dispatchEvent(mouseEvent);
        }, { passive: true });
    }

    resizeCanvas() {
        if (!this.canvas) return;
        const container = this.canvas.parentElement;
        this.canvas.width = container.clientWidth;
        this.canvas.height = container.clientHeight;
        this.draw();
    }

    addNode(type, x, y) {
        this.nodeCounter++;
        const id = `${type}_${this.nodeCounter}`;
        const node = new LogicNode(id, type, x, y);
        this.nodes.push(node);
        this.draw();
        return node;
    }

    deleteNode(nodeId) {
        // Disconnect all wires to this node
        this.nodes.forEach(n => {
            for (let i = 0; i < n.inputs.length; i++) {
                if (n.inputs[i] && n.inputs[i].nodeId === nodeId) {
                    n.inputs[i] = null;
                }
            }
        });
        this.nodes = this.nodes.filter(n => n.id !== nodeId);
        this.draw();
    }

    reset() {
        this.nodes = [];
        this.nodeCounter = 0;
        const presetSelect = document.getElementById('sandbox-presets');
        if (presetSelect) presetSelect.value = 'empty';
        this.draw();
    }

    loadPreset(presetName) {
        this.reset();
        
        if (presetName === 'and') {
            const swA = this.addNode('switch', 150, 150);
            const swB = this.addNode('switch', 150, 250);
            const andG = this.addNode('and', 380, 190);
            const led = this.addNode('led', 600, 200);

            andG.inputs[0] = { nodeId: swA.id };
            andG.inputs[1] = { nodeId: swB.id };
            led.inputs[0] = { nodeId: andG.id };

        } else if (presetName === 'xor') {
            const swA = this.addNode('switch', 100, 150);
            const swB = this.addNode('switch', 100, 350);
            
            const notA = this.addNode('not', 260, 100);
            const notB = this.addNode('not', 260, 400);

            const and1 = this.addNode('and', 440, 160);
            const and2 = this.addNode('and', 440, 320);

            const orG = this.addNode('or', 620, 240);
            const led = this.addNode('led', 800, 250);

            // Wiring
            notA.inputs[0] = { nodeId: swA.id };
            notB.inputs[0] = { nodeId: swB.id };

            and1.inputs[0] = { nodeId: notA.id };
            and1.inputs[1] = { nodeId: swB.id };

            and2.inputs[0] = { nodeId: swA.id };
            and2.inputs[1] = { nodeId: notB.id };

            orG.inputs[0] = { nodeId: and1.id };
            orG.inputs[1] = { nodeId: and2.id };

            led.inputs[0] = { nodeId: orG.id };

        } else if (presetName === 'half-adder') {
            const swA = this.addNode('switch', 120, 160);
            const swB = this.addNode('switch', 120, 280);

            const xorG = this.addNode('xor', 340, 150);
            const andG = this.addNode('and', 340, 270);

            const ledSum = this.addNode('led', 560, 160);
            const ledCarry = this.addNode('led', 560, 280);

            // Wires
            xorG.inputs[0] = { nodeId: swA.id };
            xorG.inputs[1] = { nodeId: swB.id };

            andG.inputs[0] = { nodeId: swA.id };
            andG.inputs[1] = { nodeId: swB.id };

            ledSum.inputs[0] = { nodeId: xorG.id };
            ledCarry.inputs[0] = { nodeId: andG.id };
        }
        this.draw();
    }

    getMouseCoords(e) {
        const rect = this.canvas.getBoundingClientRect();
        return {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };
    }

    handleMouseDown(e) {
        const coords = this.getMouseCoords(e);
        const hitRadius = 10;

        // Check pins first
        for (let node of this.nodes) {
            const pins = node.getPinPositions();

            // Output pin click
            if (pins.output) {
                const dist = Math.hypot(coords.x - pins.output.x, coords.y - pins.output.y);
                if (dist < hitRadius) {
                    this.activePin = { node, type: 'output', x: pins.output.x, y: pins.output.y };
                    this.mousePos = coords;
                    return;
                }
            }

            // Input pin click
            for (let i = 0; i < pins.inputs.length; i++) {
                const pin = pins.inputs[i];
                const dist = Math.hypot(coords.x - pin.x, coords.y - pin.y);
                if (dist < hitRadius) {
                    // If pin has connection, disconnect it and drag wire from here
                    if (node.inputs[i]) {
                        const srcId = node.inputs[i].nodeId;
                        node.inputs[i] = null;
                        const srcNode = this.nodes.find(n => n.id === srcId);
                        if (srcNode) {
                            const srcPins = srcNode.getPinPositions();
                            this.activePin = { node: srcNode, type: 'output', x: srcPins.output.x, y: srcPins.output.y };
                        }
                    } else {
                        this.activePin = { node, type: 'input', index: i, x: pin.x, y: pin.y };
                    }
                    this.mousePos = coords;
                    return;
                }
            }
        }

        // Check delete button and node drag/toggles
        for (let i = this.nodes.length - 1; i >= 0; i--) {
            const node = this.nodes[i];
            
            // Delete button check
            if (coords.x >= node.x + node.width - 24 && coords.x <= node.x + node.width - 4 &&
                coords.y >= node.y + 4 && coords.y <= node.y + 24) {
                this.deleteNode(node.id);
                return;
            }

            // Inside node body check
            if (coords.x >= node.x && coords.x <= node.x + node.width &&
                coords.y >= node.y && coords.y <= node.y + node.height) {
                
                // Toggle switch if clicked
                if (node.type === 'switch') {
                    node.value = !node.value;
                    this.draw();
                }

                // Focus/Bring to front
                this.nodes.push(this.nodes.splice(i, 1)[0]);
                this.dragNode = node;
                this.dragOffset = {
                    x: coords.x - node.x,
                    y: coords.y - node.y
                };
                return;
            }
        }
    }

    handleMouseMove(e) {
        const coords = this.getMouseCoords(e);
        this.mousePos = coords;

        if (this.dragNode) {
            this.dragNode.x = Math.max(10, Math.min(this.canvas.width - this.dragNode.width - 10, coords.x - this.dragOffset.x));
            this.dragNode.y = Math.max(10, Math.min(this.canvas.height - this.dragNode.height - 10, coords.y - this.dragOffset.y));
            this.draw();
        } else if (this.activePin) {
            this.draw();
        }
    }

    handleMouseUp(e) {
        if (this.activePin) {
            const coords = this.getMouseCoords(e);
            const hitRadius = 15;

            // Look for matching pin target
            for (let node of this.nodes) {
                if (node === this.activePin.node) continue; // no self wiring
                
                const pins = node.getPinPositions();

                if (this.activePin.type === 'output') {
                    // Try to connect output to an input pin
                    for (let i = 0; i < pins.inputs.length; i++) {
                        const pin = pins.inputs[i];
                        const dist = Math.hypot(coords.x - pin.x, coords.y - pin.y);
                        if (dist < hitRadius) {
                            node.inputs[i] = { nodeId: this.activePin.node.id };
                            break;
                        }
                    }
                } else if (this.activePin.type === 'input') {
                    // Try to connect input to output pin
                    if (pins.output) {
                        const dist = Math.hypot(coords.x - pins.output.x, coords.y - pins.output.y);
                        if (dist < hitRadius) {
                            this.activePin.node.inputs[this.activePin.index] = { nodeId: node.id };
                        }
                    }
                }
            }
        }

        this.dragNode = null;
        this.activePin = null;
        this.draw();
    }

    simulate() {
        // Propagate signals (10 passes to stabilize feedback loops)
        for (let pass = 0; pass < 10; pass++) {
            this.nodes.forEach(node => {
                if (node.type === 'switch') return;

                const inputValues = node.inputs.map(conn => {
                    if (!conn) return false;
                    const src = this.nodes.find(n => n.id === conn.nodeId);
                    return src ? src.value : false;
                });

                if (node.type === 'and') {
                    node.value = inputValues[0] && inputValues[1];
                } else if (node.type === 'or') {
                    node.value = inputValues[0] || inputValues[1];
                } else if (node.type === 'not') {
                    node.value = !inputValues[0];
                } else if (node.type === 'xor') {
                    node.value = inputValues[0] !== inputValues[1];
                } else if (node.type === 'led') {
                    node.value = inputValues[0];
                }
            });
        }
    }

    draw() {
        if (!this.canvas) return;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw dot grid
        this.ctx.fillStyle = 'rgba(255,255,255,0.04)';
        const gridSize = 25;
        for (let x = 0; x < this.canvas.width; x += gridSize) {
            for (let y = 0; y < this.canvas.height; y += gridSize) {
                this.ctx.fillRect(x, y, 1.5, 1.5);
            }
        }

        this.simulate();

        // Draw wires
        this.nodes.forEach(node => {
            const pins = node.getPinPositions();
            node.inputs.forEach((conn, index) => {
                if (!conn) return;
                const srcNode = this.nodes.find(n => n.id === conn.nodeId);
                if (!srcNode) return;

                const srcPins = srcNode.getPinPositions();
                const startX = srcPins.output.x;
                const startY = srcPins.output.y;
                const endX = pins.inputs[index].x;
                const endY = pins.inputs[index].y;

                // Draw wire
                this.ctx.beginPath();
                this.ctx.moveTo(startX, startY);

                // Curve wire path
                const cp1x = startX + 50;
                const cp2x = endX - 50;
                this.ctx.bezierCurveTo(cp1x, startY, cp2x, endY, endX, endY);

                // Wire highlights based on state (electrical current effect)
                if (srcNode.value) {
                    this.ctx.strokeStyle = '#ffb300';
                    this.ctx.lineWidth = 3.5;
                    this.ctx.shadowColor = '#ffb300';
                    this.ctx.shadowBlur = 8;
                } else {
                    this.ctx.strokeStyle = 'rgba(255,255,255,0.15)';
                    this.ctx.lineWidth = 2;
                    this.ctx.shadowBlur = 0;
                }
                this.ctx.stroke();
            });
        });

        // Draw current drag wire
        if (this.activePin) {
            this.ctx.beginPath();
            this.ctx.moveTo(this.activePin.x, this.activePin.y);
            
            const cp1x = this.activePin.type === 'output' ? this.activePin.x + 50 : this.activePin.x - 50;
            const cp2x = this.activePin.type === 'output' ? this.mousePos.x - 50 : this.mousePos.x + 50;
            this.ctx.bezierCurveTo(cp1x, this.activePin.y, cp2x, this.mousePos.y, this.mousePos.x, this.mousePos.y);

            this.ctx.strokeStyle = '#ffb300';
            this.ctx.lineWidth = 2.5;
            this.ctx.setLineDash([5, 5]);
            this.ctx.shadowBlur = 0;
            this.ctx.stroke();
            this.ctx.setLineDash([]); // Reset line dash
        }

        // Draw nodes
        this.nodes.forEach(node => {
            // Node body background (Glassmorphic)
            this.ctx.fillStyle = 'rgba(24, 24, 35, 0.9)';
            this.ctx.strokeStyle = node.value ? 'rgba(255, 179, 0, 0.5)' : 'rgba(255,255,255,0.1)';
            this.ctx.lineWidth = 2;
            
            this.ctx.beginPath();
            this.ctx.roundRect(node.x, node.y, node.width, node.height, 16);
            this.ctx.fill();
            this.ctx.stroke();

            // Glow around active output node
            if (node.value && node.type !== 'led') {
                this.ctx.shadowColor = 'rgba(255, 179, 0, 0.2)';
                this.ctx.shadowBlur = 15;
                this.ctx.stroke();
                this.ctx.shadowBlur = 0; // reset
            }

            // Draw header text
            this.ctx.fillStyle = '#fff';
            this.ctx.font = '700 0.8rem "Outfit", sans-serif';
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';
            
            let label = node.type.toUpperCase();
            if (node.type === 'switch') label = 'INPUT SWITCH';
            else if (node.type === 'led') label = 'OUTPUT LED';
            this.ctx.fillText(label, node.x + node.width / 2, node.y + 18);

            // Draw Node Specifics
            if (node.type === 'switch') {
                // Switch slide UI background
                this.ctx.fillStyle = node.value ? '#ffb300' : 'rgba(255,255,255,0.1)';
                this.ctx.beginPath();
                this.ctx.roundRect(node.x + 35, node.y + 32, 50, 16, 8);
                this.ctx.fill();

                // Switch slider dot
                this.ctx.fillStyle = '#fff';
                this.ctx.beginPath();
                const dotX = node.value ? node.x + 73 : node.x + 47;
                this.ctx.arc(dotX, node.y + 40, 10, 0, Math.PI * 2);
                this.ctx.fill();
            } else if (node.type === 'led') {
                // LED Bulb UI
                this.ctx.beginPath();
                this.ctx.arc(node.x + node.width / 2, node.y + 42, 12, 0, Math.PI * 2);
                this.ctx.fillStyle = node.value ? '#ffb300' : 'rgba(255,255,255,0.08)';
                this.ctx.strokeStyle = node.value ? '#ffb300' : 'rgba(255,255,255,0.2)';
                this.ctx.lineWidth = 2;
                
                if (node.value) {
                    this.ctx.shadowColor = '#ffb300';
                    this.ctx.shadowBlur = 18;
                }
                this.ctx.fill();
                this.ctx.stroke();
                this.ctx.shadowBlur = 0; // reset
            } else {
                // Draw gate logic symbols inside
                this.ctx.fillStyle = 'rgba(255,255,255,0.3)';
                this.ctx.font = '700 1.2rem "Outfit", sans-serif';
                let sym = '&';
                if (node.type === 'or') sym = '≥1';
                else if (node.type === 'not') sym = '1';
                else if (node.type === 'xor') sym = '=1';
                this.ctx.fillText(sym, node.x + node.width / 2, node.y + 48);
            }

            // Draw Pins
            const pins = node.getPinPositions();
            
            // Input pins
            pins.inputs.forEach(pin => {
                this.ctx.beginPath();
                this.ctx.arc(pin.x, pin.y, 6, 0, Math.PI * 2);
                this.ctx.fillStyle = 'rgba(24, 24, 35, 1)';
                this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
                this.ctx.lineWidth = 2;
                this.ctx.fill();
                this.ctx.stroke();

                // Draw tiny pin label
                this.ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
                this.ctx.font = '500 0.6rem "Outfit", sans-serif';
                this.ctx.textAlign = 'left';
                this.ctx.fillText(pin.label, pin.x + 10, pin.y);
            });

            // Output pin
            if (pins.output) {
                this.ctx.beginPath();
                this.ctx.arc(pins.output.x, pins.output.y, 6, 0, Math.PI * 2);
                this.ctx.fillStyle = node.value ? '#ffb300' : 'rgba(24, 24, 35, 1)';
                this.ctx.strokeStyle = node.value ? '#ffb300' : 'rgba(255, 255, 255, 0.4)';
                this.ctx.lineWidth = 2;
                this.ctx.fill();
                this.ctx.stroke();

                // Output label
                this.ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
                this.ctx.font = '500 0.6rem "Outfit", sans-serif';
                this.ctx.textAlign = 'right';
                this.ctx.fillText(pins.output.label, pins.output.x - 10, pins.output.y);
            }

            // Draw Delete Button (X) at top right
            this.ctx.fillStyle = 'rgba(255,255,255,0.2)';
            this.ctx.font = '500 0.75rem "Outfit", sans-serif';
            this.ctx.textAlign = 'right';
            this.ctx.fillText('×', node.x + node.width - 8, node.y + 12);
        });
    }

    startLoop() {
        const loop = () => {
            this.draw();
            requestAnimationFrame(loop);
        };
        requestAnimationFrame(loop);
    }
}

// Instantiate on load
if (document.readyState === 'loading') {
    window.addEventListener('DOMContentLoaded', () => {
        window.circuitSim = new CircuitSimulator();
    });
} else {
    window.circuitSim = new CircuitSimulator();
}
