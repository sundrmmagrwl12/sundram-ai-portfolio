import ChatInterface from "@/components/ChatInterface";
import CustomCursor from "@/components/CustomCursor";
import ParticleBackground from "@/components/ParticleBackground";

export default function Home() {
  return (
    <main className="relative h-screen w-screen overflow-hidden circuit-bg">
      {/* Animated particle canvas background */}
      <ParticleBackground />

      {/* Custom glowing cursor */}
      <CustomCursor />

      {/* Ambient glow orbs */}
      <div
        className="fixed pointer-events-none"
        style={{
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background: "radial-gradient(circle, var(--border-glow) 0%, transparent 70%)",
          top: "-200px",
          left: "-200px",
        }}
      />
      <div
        className="fixed pointer-events-none"
        style={{
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background: "radial-gradient(circle, var(--border-glow) 0%, transparent 70%)",
          bottom: "-150px",
          right: "-150px",
        }}
      />

      {/* Main Chat Interface — positioned above canvas */}
      <div className="relative z-10 h-screen w-screen">
        <ChatInterface />
      </div>
    </main>
  );
}
