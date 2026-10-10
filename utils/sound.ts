// Web Audio API Synthesizer for futuristic UI audio (zero external asset dependencies)

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;

  try {
    if (!audioCtx) {
      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        audioCtx = new AudioContextClass();
      }
    }
    return audioCtx;
  } catch {
    return null;
  }
}

// Function to safely execute audio with guaranteed resume
function playSound(render: (ctx: AudioContext) => void) {
  const ctx = getAudioContext();
  if (!ctx) return;

  if (ctx.state === "suspended") {
    ctx.resume().then(() => {
      try {
        render(ctx);
      } catch (e) {
        console.warn("Audio render error:", e);
      }
    }).catch(() => {});
  } else {
    try {
      render(ctx);
    } catch (e) {
      console.warn("Audio render error:", e);
    }
  }
}

// Auto-unlock audio on any user gesture
if (typeof window !== "undefined") {
  const unlock = () => {
    const ctx = getAudioContext();
    if (ctx && ctx.state === "suspended") {
      ctx.resume().catch(() => {});
    }
  };
  window.addEventListener("pointerdown", unlock, { passive: true });
  window.addEventListener("click", unlock, { passive: true });
  window.addEventListener("keydown", unlock, { passive: true });
  window.addEventListener("touchstart", unlock, { passive: true });
}

export const soundManager = {
  isMuted(): boolean {
    if (typeof window === "undefined") return false;
    const stored = localStorage.getItem("sound_muted");
    if (stored === null) return false; // Default: unmuted
    return stored === "true";
  },

  setMuted(muted: boolean) {
    if (typeof window === "undefined") return;
    localStorage.setItem("sound_muted", muted ? "true" : "false");
  },

  toggleMuted(): boolean {
    const nextState = !this.isMuted();
    this.setMuted(nextState);
    if (!nextState) {
      this.playReceive();
    }
    return nextState;
  },

  // Crisp high-tech tactile blip (buttons, chips, theme switcher, links)
  playBlip() {
    if (this.isMuted()) return;
    playSound((ctx) => {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(880, now); // A5
      osc.frequency.exponentialRampToValueAtTime(1320, now + 0.12); // E6

      gain.gain.setValueAtTime(0.28, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.14);
    });
  },

  // Futuristic ascending energy sweep (theme switch, dossier drawer toggle)
  playSwoosh() {
    if (this.isMuted()) return;
    playSound((ctx) => {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(440, now); // A4
      osc.frequency.exponentialRampToValueAtTime(1320, now + 0.22); // E6

      gain.gain.setValueAtTime(0.32, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.22);
    });
  },

  // Digital transmission pop when sending a message
  playSend() {
    if (this.isMuted()) return;
    playSound((ctx) => {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(700, now);
      osc.frequency.exponentialRampToValueAtTime(260, now + 0.16);

      gain.gain.setValueAtTime(0.32, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.16);
    });
  },

  // Premium dual-tone chime when AI responds or audio toggle is enabled
  playReceive() {
    if (this.isMuted()) return;
    playSound((ctx) => {
      const now = ctx.currentTime;

      // Tone 1: E5 (659.25 Hz)
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = "sine";
      osc1.frequency.setValueAtTime(659.25, now);
      gain1.gain.setValueAtTime(0.28, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.22);

      // Tone 2: C6 (1046.5 Hz) - bright harmonic finish
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = "sine";
      osc2.frequency.setValueAtTime(1046.5, now + 0.08);
      gain2.gain.setValueAtTime(0.32, now + 0.08);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.30);
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.start(now + 0.08);
      osc2.stop(now + 0.30);
    });
  },
};
