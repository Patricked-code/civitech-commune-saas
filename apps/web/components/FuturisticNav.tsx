'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Building2, ChevronDown, User, ShieldCheck } from 'lucide-react';

export function FuturisticNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'ACCUEIL', href: '/' },
    { label: 'PORTAIL', href: '/commune' },
    {
      label: 'SERVICES',
      href: '#',
      submenu: [
        { label: 'ÉTAT CIVIL', href: '/commune/demarches' },
        { label: 'DOCUMENTS', href: '/commune/documents' },
        { label: 'NOTIFICATIONS', href: '/commune/notifications' },
      ],
    },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled ? 'py-4' : 'py-8'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`relative backdrop-blur-2xl transition-all duration-500 rounded-[2rem] border border-white/10 ${
          scrolled ? 'bg-black/60 shadow-2xl px-6 py-3' : 'bg-white/5 px-8 py-4'
        }`}>
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-cyan-500 rounded-xl blur-lg opacity-0 group-hover:opacity-50 transition duration-500"></div>
                <div className="relative bg-white w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:rotate-12">
                  <Building2 className="w-6 h-6 text-black" />
                </div>
              </div>
              <span className="font-black italic text-xl tracking-tighter text-white">
                CIVITECH
              </span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-2">
              {navItems.map((item) => (
                <div key={item.label} className="relative group">
                  <button
                    className="px-5 py-2 rounded-full text-[10px] font-black tracking-[0.2em] text-slate-400 hover:text-white hover:bg-white/5 transition-all flex items-center gap-2"
                  >
                    {item.label}
                    {item.submenu && <ChevronDown className="w-3 h-3 opacity-50 group-hover:rotate-180 transition-transform" />}
                  </button>

                  {/* Dropdown */}
                  {item.submenu && (
                    <div className="absolute left-0 top-full pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                      <div className="w-56 backdrop-blur-3xl bg-black/80 border border-white/10 rounded-[1.5rem] shadow-2xl p-3 space-y-1">
                        {item.submenu.map((subitem) => (
                          <Link
                            key={subitem.label}
                            href={subitem.href}
                            className="block px-4 py-3 text-[10px] font-bold tracking-widest text-slate-400 hover:text-cyan-400 hover:bg-white/5 rounded-xl transition-all"
                          >
                            {subitem.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* CTA & Actions */}
            <div className="hidden md:flex items-center gap-4">
              <Link href="/auth/login" className="flex items-center gap-2 px-6 py-3 bg-white text-black text-[10px] font-black tracking-widest rounded-full hover:bg-cyan-400 transition-colors">
                <User className="w-4 h-4" />
                CONNEXION
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-white hover:bg-white/10 rounded-xl transition-colors"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isOpen && (
            <div className="md:hidden mt-4 pb-4 animate-slide-up">
              <div className="space-y-2 pt-4 border-t border-white/5">
                {navItems.map((item) => (
                  <div key={item.label}>
                    <button
                      onClick={() => setActiveDropdown(activeDropdown === item.label ? null : item.label)}
                      className="w-full text-left px-4 py-3 rounded-xl text-[10px] font-black tracking-widest text-slate-400 hover:text-white hover:bg-white/5 transition-all flex items-center justify-between"
                    >
                      {item.label}
                      {item.submenu && (
                        <ChevronDown
                          className={`w-4 h-4 transition duration-300 ${
                            activeDropdown === item.label ? 'rotate-180' : ''
                          }`}
                        />
                      )}
                    </button>
                    {item.submenu && activeDropdown === item.label && (
                      <div className="mt-1 ml-4 space-y-1">
                        {item.submenu.map((subitem) => (
                          <Link
                            key={subitem.label}
                            href={subitem.href}
                            className="block px-4 py-3 text-[10px] font-bold tracking-widest text-slate-500 hover:text-cyan-400 transition-all"
                          >
                            {subitem.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                <Link href="/auth/login" className="flex items-center justify-center gap-2 mt-4 px-6 py-4 bg-white text-black text-[10px] font-black tracking-widest rounded-xl">
                  CONNEXION
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
