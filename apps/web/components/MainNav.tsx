"use client";

import Link from 'next/link';
import { siteConfig } from '../lib/site';
import { useSessionContext } from './SessionProvider';
import { removeToken } from '../lib/session';
import { LogOut, User as UserIcon, ChevronRight } from 'lucide-react';

type NavItem = {
  href: string;
  label: string;
};

function logout() {
  removeToken();
  window.location.href = '/auth/login';
}

function NavGroup({ title, items, muted = false }: { title: string; items: NavItem[]; muted?: boolean }) {
  return (
    <div className="grid gap-2">
      <div className="text-[10px] uppercase tracking-wider text-slate-500 font-extrabold">{title}</div>
      <div className="flex gap-2 flex-wrap items-center">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`
              text-xs px-3 py-1.5 rounded-full font-bold transition-all duration-200 border
              ${muted 
                ? 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100' 
                : 'bg-brand-50 text-brand-700 border-brand-100 hover:bg-brand-100 shadow-sm'}
            `}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

export function MainNav() {
  const { user } = useSessionContext();

  return (
    <nav className="bg-white/95 border-b border-slate-200 sticky top-0 z-30 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 grid gap-6">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <Link href="/" className="group">
            <div className="font-black text-slate-900 text-xl tracking-tight group-hover:text-brand-600 transition-colors">
              {siteConfig.municipality}
            </div>
            <div className="text-slate-500 text-xs font-medium">
              Portail public · Espace citoyen · Cockpit communal
            </div>
          </Link>
          
          <div className="flex gap-3 items-center">
            {user ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 bg-brand-50 text-brand-700 border border-brand-100 px-3 py-2 rounded-xl text-sm font-bold">
                  <UserIcon size={16} />
                  <span className="hidden sm:inline">{user.email}</span>
                </div>
                <button 
                  onClick={logout} 
                  className="flex items-center gap-2 bg-white border border-slate-200 px-3 py-2 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 hover:text-red-600 hover:border-red-100 transition-all"
                >
                  <LogOut size={16} />
                  <span className="hidden sm:inline">Déconnexion</span>
                </button>
              </div>
            ) : (
              <Link 
                href="/auth/login" 
                className="bg-brand-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-brand-700 shadow-premium transition-all flex items-center gap-2"
              >
                Connexion / Inscription
                <ChevronRight size={16} />
              </Link>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 pt-2 border-t border-slate-100">
          <NavGroup title="Portail public" items={siteConfig.publicSections} />
          <NavGroup title="Démarches" items={siteConfig.keyServices} muted />
          <NavGroup title="Espace citoyen" items={siteConfig.citizenSections} muted />
          <NavGroup title="Confiance" items={siteConfig.trustSections} muted />
          <NavGroup title="Backoffice" items={siteConfig.backofficeSections} muted />
        </div>
      </div>
    </nav>
  );
}
