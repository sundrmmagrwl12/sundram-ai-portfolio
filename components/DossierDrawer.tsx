"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, Download, GitFork as GithubIcon, Link2 as LinkedinIcon, Code2, Mail, Phone, MapPin, ExternalLink, Award, Briefcase, GraduationCap, Star } from "lucide-react";
import { PROFILE } from "@/data/profile";
import { soundManager } from "@/utils/sound";

const BADGE_COLORS = [
  "skill-badge",
  "skill-badge skill-badge-cyan",
  "skill-badge skill-badge-purple",
];

interface DossierDrawerProps {
  open: boolean;
  onClose: () => void;
}

export default function DossierDrawer({ open, onClose }: DossierDrawerProps) {
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[99998]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            className="fixed top-0 right-0 h-full w-full max-w-[500px] z-[99999] glass overflow-y-auto sidebar-scroll"
            style={{
              background: "rgba(8, 12, 20, 0.98)",
              borderLeft: "1px solid var(--border-glow)",
              boxShadow: "-20px 0 60px rgba(0,0,0,0.8), -1px 0 0 var(--border-glow)",
            }}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 250 }}
          >
            {/* Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between p-5 border-b border-[var(--border-glow)]"
              style={{ background: "rgba(8,12,20,0.95)", backdropFilter: "blur(16px)" }}>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[var(--accent-green)] pulse-status" />
                <span className="text-sm font-medium text-[var(--accent-green)] tracking-wider uppercase">
                  Recruiter Dossier
                </span>
              </div>
              <div className="flex items-center gap-2">
                <kbd className="hidden sm:inline text-[9px] px-1.5 py-0.5 rounded bg-[rgba(255,255,255,0.06)] border border-[var(--border-glow)] text-[#94a3b8]">ESC</kbd>
                <button
                  onClick={() => {
                    soundManager.playBlip();
                    onClose();
                  }}
                  className="p-2 rounded-lg hover:bg-[rgba(255,255,255,0.06)] transition-colors text-[#475569] hover:text-[var(--accent-green)] cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-8">
              {/* Profile hero */}
              <div className="flex items-center gap-4">
                <div className="relative flex-shrink-0">
                  <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-[var(--accent-green)]"
                    style={{ boxShadow: "0 0 20px var(--border-glow)" }}>
                    <Image src={PROFILE.contact.photo} alt={PROFILE.name} width={80} height={80} className="object-cover" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[var(--accent-green)] flex items-center justify-center"
                    style={{ boxShadow: "0 0 8px var(--accent-green)" }}>
                    <div className="w-2 h-2 rounded-full bg-[#080C14]" />
                  </div>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">{PROFILE.name}</h2>
                  <p className="text-sm text-[var(--accent-green)] font-medium">{PROFILE.tagline}</p>
                  <div className="flex items-center gap-1.5 mt-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent-green)] pulse-status" />
                    <span className="text-xs text-[#94a3b8]">{PROFILE.status.label}</span>
                  </div>
                </div>
              </div>

              {/* Quick stats */}
              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                {[
                  { label: "CGPA", value: "8.21", sub: "1st Div Honors" },
                  { label: "DSA Solved", value: "800+", sub: "GFG #3 · LeetCode" },
                  { label: "Availability", value: "Immediate", sub: "Open to Work" },
                ].map((s) => (
                  <div key={s.label} className="glass rounded-xl p-2.5 sm:p-3 text-center gradient-border flex flex-col justify-center min-w-0">
                    <div className="text-base sm:text-lg font-bold text-[var(--accent-green)] truncate">{s.value}</div>
                    <div className="text-[11px] sm:text-xs font-semibold text-white mt-0.5 truncate">{s.label}</div>
                    <div className="text-[9px] sm:text-[10px] text-[#475569] mt-0.5 truncate">{s.sub}</div>
                  </div>
                ))}
              </div>

              {/* Contact links */}
              <div>
                <h3 className="text-xs font-semibold text-[#475569] uppercase tracking-widest mb-3">Contact & Links</h3>
                <div className="space-y-2">
                  {[
                    { icon: Mail, label: PROFILE.contact.email, href: `mailto:${PROFILE.contact.email}` },
                    { icon: Phone, label: PROFILE.contact.phone, href: `tel:${PROFILE.contact.phone}` },
                    { icon: MapPin, label: PROFILE.contact.location, href: "#" },
                    { icon: GithubIcon, label: "GitHub Profile", href: PROFILE.contact.github },
                    { icon: LinkedinIcon, label: "LinkedIn Profile", href: PROFILE.contact.linkedin },
                    { icon: Code2, label: "LeetCode (385 Solved)", href: PROFILE.contact.leetcode },
                    { icon: Award, label: "GeeksforGeeks (Rank #3, 456 Solved)", href: PROFILE.contact.gfg },
                  ].map(({ icon: Icon, label, href }) => (
                    <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer"
                      className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-[rgba(255,255,255,0.04)] transition-colors group">
                      <Icon size={15} className="text-[var(--accent-green)] flex-shrink-0" />
                      <span className="text-sm text-[#94a3b8] group-hover:text-white transition-colors truncate">{label}</span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Target roles */}
              <div>
                <h3 className="text-xs font-semibold text-[#475569] uppercase tracking-widest mb-3">Target Roles</h3>
                <div className="flex flex-wrap gap-2">
                  {PROFILE.status.targetRoles.map((r) => (
                    <span key={r} className="skill-badge text-xs">{r}</span>
                  ))}
                </div>
              </div>

              {/* Skills matrix */}
              <div>
                <h3 className="text-xs font-semibold text-[#475569] uppercase tracking-widest mb-3">Technical Stack</h3>
                <div className="space-y-4">
                  {Object.entries(PROFILE.skills).map(([cat, items], ci) => (
                    <div key={cat}>
                      <p className="text-xs text-[var(--accent-green)] mb-2 font-medium">{cat}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {items.map((skill) => (
                          <span key={skill} className={`${BADGE_COLORS[ci % BADGE_COLORS.length]} text-[11px]`}>
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Experience */}
              <div>
                <h3 className="text-xs font-semibold text-[#475569] uppercase tracking-widest mb-3 flex items-center gap-2">
                  <Briefcase size={13} /> Experience
                </h3>
                {PROFILE.experience.map((e) => (
                  <div key={e.company} className="glass rounded-xl p-4 gradient-border">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold text-white">{e.role}</p>
                        <p className="text-sm text-[var(--accent-green)]">{e.company}</p>
                      </div>
                      <span className="text-xs text-[#475569] text-right">{e.duration}</span>
                    </div>
                    <ul className="mt-3 space-y-1.5">
                      {e.highlights.map((h) => (
                        <li key={h} className="text-xs text-[#94a3b8] flex gap-2">
                          <span className="text-[var(--accent-green)] flex-shrink-0 mt-0.5">›</span>
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Education */}
              <div>
                <h3 className="text-xs font-semibold text-[#475569] uppercase tracking-widest mb-3 flex items-center gap-2">
                  <GraduationCap size={13} /> Education
                </h3>
                <div className="glass rounded-xl p-4 gradient-border">
                  <p className="font-semibold text-white">{PROFILE.education.degree}</p>
                  <p className="text-sm text-[var(--accent-green)] mt-0.5">{PROFILE.education.institution}</p>
                  <div className="flex gap-4 mt-2">
                    <span className="text-xs text-[#94a3b8]">{PROFILE.education.duration}</span>
                    <span className="text-xs text-[var(--accent-green)] font-semibold">CGPA: {PROFILE.education.cgpa}</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {PROFILE.education.highlights.map((h) => (
                      <span key={h} className="skill-badge skill-badge-cyan text-[10px]">{h}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Certifications & Hands-on Tracks */}
              <div>
                <h3 className="text-xs font-semibold text-[#475569] uppercase tracking-widest mb-3 flex items-center gap-2">
                  <Award size={13} /> Certifications & Hands-on Tracks
                </h3>
                <div className="space-y-3">
                  {PROFILE.certifications.map((c) => (
                    <div key={c.title} className="glass rounded-xl p-4 gradient-border">
                      <div className="flex justify-between items-start gap-2">
                        <div>
                          <p className="font-semibold text-white text-sm">{c.title}</p>
                          <p className="text-xs text-[var(--accent-green)] mt-0.5 font-medium">
                            {c.issuer} {c.subtitle && `· ${c.subtitle}`}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <span className="text-[11px] text-[#475569]">{c.date}</span>
                          {c.link && (
                            <a
                              href={c.link}
                              target="_blank"
                              rel="noreferrer"
                              className="p-1.5 rounded-lg bg-[rgba(255,255,255,0.06)] hover:bg-[var(--border-glow)] transition-colors text-[var(--accent-green)]"
                              title="View Verified Certificate"
                            >
                              <ExternalLink size={12} />
                            </a>
                          )}
                        </div>
                      </div>

                      {c.highlights && (
                        <ul className="mt-2.5 space-y-1">
                          {c.highlights.map((h) => (
                            <li key={h} className="text-xs text-[#94a3b8] flex gap-2">
                              <span className="text-[var(--accent-green)] flex-shrink-0 mt-0.5">›</span>
                              {h}
                            </li>
                          ))}
                        </ul>
                      )}

                      {"proofs" in c && Array.isArray((c as any).proofs) && (
                        <div className="mt-3 pt-3 border-t border-[var(--border-glow)]">
                          <div className="flex items-center justify-between mb-2">
                            <p className="text-[10px] uppercase tracking-wider text-[var(--accent-green)] font-semibold flex items-center gap-1.5">
                              <span>📄 Verified Implementation Proofs:</span>
                            </p>
                            {(c as any).completeProof && (
                              <a
                                href={(c as any).completeProof}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => soundManager.playBlip()}
                                className="text-[10px] font-mono px-2 py-0.5 rounded-md flex items-center gap-1 transition-all hover:brightness-125"
                                style={{
                                  background: "var(--border-glow)",
                                  color: "var(--accent-green)",
                                  border: "1px solid var(--border-glow)",
                                }}
                                title="Open merged All-in-One PDF (Days 1–5)"
                              >
                                <span>All-in-One PDF ↗</span>
                              </a>
                            )}
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                            {(c as any).proofs.map((proof: { day: string; title: string; file: string }) => (
                              <a
                                key={proof.day}
                                href={proof.file}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => soundManager.playBlip()}
                                className="flex items-center justify-between px-2.5 py-1.5 rounded-lg text-[11px] font-medium transition-all hover:brightness-125 group cursor-pointer"
                                style={{
                                  background: "rgba(255,255,255,0.03)",
                                  border: "1px solid var(--border-glow)",
                                  color: "#e2e8f0",
                                }}
                                title={`Open ${proof.day} Proof PDF in new tab`}
                              >
                                <span className="flex items-center gap-1.5 truncate">
                                  <span className="font-mono text-[var(--accent-green)] text-[10px]">{proof.day}:</span>
                                  <span className="text-[#cbd5e1] group-hover:text-white truncate">{proof.title}</span>
                                </span>
                                <ExternalLink size={11} className="text-[var(--accent-green)] flex-shrink-0 ml-1 opacity-70 group-hover:opacity-100" />
                              </a>
                            ))}
                          </div>
                        </div>
                      )}

                      {c.tags && (
                        <div className="flex flex-wrap gap-1 mt-2.5">
                          {c.tags.map((t) => (
                            <span key={t} className="skill-badge text-[10px]">{t}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Projects */}
              <div>
                <h3 className="text-xs font-semibold text-[#475569] uppercase tracking-widest mb-3 flex items-center gap-2">
                  <Star size={13} /> Featured Projects
                </h3>
                <div className="space-y-3">
                  {PROFILE.projects.filter((p) => p.featured).map((p) => (
                    <div key={p.id} className="glass rounded-xl p-4 gradient-border">
                      <div className="flex justify-between items-start gap-2">
                        <div>
                          <p className="font-semibold text-white">{p.title}</p>
                          <p className="text-xs text-[#94a3b8] mt-0.5">{p.subtitle}</p>
                        </div>
                        <div className="flex gap-1.5 flex-shrink-0">
                          {p.live && (
                            <a href={p.live} target="_blank" rel="noreferrer"
                              className="p-1.5 rounded-lg bg-[rgba(255,255,255,0.06)] hover:bg-[var(--border-glow)] transition-colors">
                              <ExternalLink size={12} className="text-[var(--accent-green)]" />
                            </a>
                          )}
                          <a href={p.github} target="_blank" rel="noreferrer"
                            className="p-1.5 rounded-lg bg-[rgba(255,255,255,0.06)] hover:bg-[var(--border-glow)] transition-colors">
                            <GithubIcon size={12} className="text-[var(--accent-green)]" />
                          </a>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {p.tags.slice(0, 5).map((t) => (
                          <span key={t} className="skill-badge text-[10px]">{t}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Achievements */}
              <div>
                <h3 className="text-xs font-semibold text-[#475569] uppercase tracking-widest mb-3 flex items-center gap-2">
                  <Award size={13} /> Achievements
                </h3>
                <div className="space-y-2">
                  {PROFILE.achievements.map((a) => (
                    <div key={a} className="flex gap-2 items-start">
                      <span className="text-[var(--accent-green)] text-xs mt-0.5 flex-shrink-0">✦</span>
                      <p className="text-xs text-[#94a3b8]">{a}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Resume actions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
                <a
                  href={PROFILE.contact.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => soundManager.playBlip()}
                  className="flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl font-semibold text-sm transition-all hover:brightness-125"
                  style={{
                    background: "linear-gradient(135deg, var(--border-glow) 0%, rgba(255,255,255,0.03) 100%)",
                    border: "1px solid var(--border-glow)",
                    color: "var(--accent-green)",
                    boxShadow: "0 0 16px var(--border-glow)",
                  }}
                >
                  <ExternalLink size={16} />
                  <span>View Resume</span>
                </a>
                <a
                  href={PROFILE.contact.resume}
                  download="Sundram_Singhal_Resume.pdf"
                  onClick={() => soundManager.playBlip()}
                  className="flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl font-semibold text-sm transition-all hover:brightness-125 hover:border-[var(--border-glow)]"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    color: "#f1f5f9",
                  }}
                >
                  <Download size={16} />
                  <span>Download PDF</span>
                </a>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
