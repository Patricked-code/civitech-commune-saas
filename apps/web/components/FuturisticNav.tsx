'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Building2, ChevronDown } from 'lucide-react';

export function FuturisticNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const navItems = [
    { label: 'Accueil', href: '/' },
    { label: 'Portail', href: '/commune' },
    {
      label: 'Services',
      href: '#',
      submenu: [
        { label: 'État Civil', href: '/commune/demarches' },
        { label: 'Documents', href: '/commune/documents' },
        { label: 'Signalements', href: '/commune/signalement' },
      ],
    },
    { label: 'Contact', href: '#' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/10 border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-violet-500 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
              <div className="relative bg-white px-3 py-2 rounded-lg">
                <Building2 className="w-6 h-6 text-cyan-600" />
              </div>
            </div>
            <span className="font-bold text-lg bg-gradient-to-r from-cyan-600 to-violet-600 bg-clip-text text-transparent">
              CiviTech
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <div key={item.label} className="relative group">
                <button
                  className="px-4 py-2 rounded-lg text-gray-700 font-medium hover:text-cyan-600 transition duration-300 flex items-center gap-1 group/btn"
                >
                  {item.label}
                  {item.submenu && <ChevronDown className="w-4 h-4 group-hover/btn:rotate-180 transition" />}
                </button>

                {/* Dropdown */}
                {item.submenu && (
                  <div className="absolute left-0 mt-0 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-300 translate-y-2 group-hover:translate-y-0">
                    <div className="backdrop-blur-xl bg-white/80 border border-white/30 rounded-xl shadow-glass overflow-hidden">
                      {item.submenu.map((subitem) => (
                        <Link
                          key={subitem.label}
                          href={subitem.href}
                          className="block px-4 py-3 text-gray-700 hover:bg-cyan-50 hover:text-cyan-600 transition duration-200 border-b border-white/10 last:border-b-0"
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

          {/* CTA Button */}
          <div className="hidden md:flex items-center gap-4">
            <Link href="/auth/login" className="relative group px-6 py-2 font-semibold overflow-hidden rounded-lg">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-violet-600 opacity-0 group-hover:opacity-100 transition duration-300"></div>
              <span className="relative text-cyan-600 group-hover:text-white transition duration-300">
                Connexion
              </span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-white/10 transition duration-300"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 animate-slide-down">
            <div className="space-y-2">
              {navItems.map((item) => (
                <div key={item.label}>
                  <button
                    onClick={() => setActiveDropdown(activeDropdown === item.label ? null : item.label)}
                    className="w-full text-left px-4 py-2 rounded-lg hover:bg-white/10 transition duration-300 flex items-center justify-between"
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
                    <div className="pl-4 space-y-2">
                      {item.submenu.map((subitem) => (
                        <Link
                          key={subitem.label}
                          href={subitem.href}
                          className="block px-4 py-2 text-sm text-gray-600 hover:text-cyan-600 transition duration-300"
                        >
                          {subitem.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
