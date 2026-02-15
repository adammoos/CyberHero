// Web Audio API sound generation utilities

const audioContext = typeof window !== 'undefined' ? new (window.AudioContext || (window as any).webkitAudioContext)() : null;

// Play a falling/failure sound
export function playFailSound() {
  if (!audioContext) return;
  
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  
  oscillator.type = 'sawtooth';
  oscillator.frequency.setValueAtTime(400, audioContext.currentTime);
  oscillator.frequency.exponentialRampToValueAtTime(100, audioContext.currentTime + 0.5);
  
  gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
  
  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + 0.5);
}

// Play a success sound
export function playSuccessSound() {
  if (!audioContext) return;
  
  // First note
  const osc1 = audioContext.createOscillator();
  const gain1 = audioContext.createGain();
  
  osc1.connect(gain1);
  gain1.connect(audioContext.destination);
  
  osc1.type = 'sine';
  osc1.frequency.setValueAtTime(523.25, audioContext.currentTime); // C5
  
  gain1.gain.setValueAtTime(0.2, audioContext.currentTime);
  gain1.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
  
  osc1.start(audioContext.currentTime);
  osc1.stop(audioContext.currentTime + 0.2);
  
  // Second note
  const osc2 = audioContext.createOscillator();
  const gain2 = audioContext.createGain();
  
  osc2.connect(gain2);
  gain2.connect(audioContext.destination);
  
  osc2.type = 'sine';
  osc2.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.15); // E5
  
  gain2.gain.setValueAtTime(0.2, audioContext.currentTime + 0.15);
  gain2.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.35);
  
  osc2.start(audioContext.currentTime + 0.15);
  osc2.stop(audioContext.currentTime + 0.35);
  
  // Third note
  const osc3 = audioContext.createOscillator();
  const gain3 = audioContext.createGain();
  
  osc3.connect(gain3);
  gain3.connect(audioContext.destination);
  
  osc3.type = 'sine';
  osc3.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.3); // G5
  
  gain3.gain.setValueAtTime(0.25, audioContext.currentTime + 0.3);
  gain3.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.6);
  
  osc3.start(audioContext.currentTime + 0.3);
  osc3.stop(audioContext.currentTime + 0.6);
}

// Play a voice-like "falling" effect
export function playFallingVoice() {
  if (!audioContext) return;
  
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  const filter = audioContext.createBiquadFilter();
  
  oscillator.connect(filter);
  filter.connect(gainNode);
  gainNode.connect(audioContext.destination);
  
  oscillator.type = 'sawtooth';
  filter.type = 'lowpass';
  
  // Simulate a falling scream
  oscillator.frequency.setValueAtTime(300, audioContext.currentTime);
  oscillator.frequency.exponentialRampToValueAtTime(150, audioContext.currentTime + 1.0);
  
  filter.frequency.setValueAtTime(2000, audioContext.currentTime);
  filter.frequency.exponentialRampToValueAtTime(500, audioContext.currentTime + 1.0);
  
  gainNode.gain.setValueAtTime(0.15, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1.0);
  
  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + 1.0);
}
