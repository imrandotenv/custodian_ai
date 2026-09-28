'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserRole } from '@/types';

interface RoleContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  isCollector: boolean;
  isCustodian: boolean;
  isArtisan: boolean;
  isAdmin: boolean;
  roleInfo: {
    title: string;
    roleName: string;
    description: string;
    badgeColor: string;
  };
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
  return match ? decodeURIComponent(match[3]) : null;
}

function setCookie(name: string, value: string, days = 365) {
  if (typeof document === 'undefined') return;
  const maxAge = days * 24 * 60 * 60;
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${maxAge}; SameSite=Lax`;
}

export function RoleProvider({ children }: { children: React.ReactNode }) {
  const [role, setRoleState] = useState<UserRole>(() => {
    if (typeof document !== 'undefined') {
      const cookieRole = getCookie('user_role');
      if (cookieRole === 'tourist' || cookieRole === 'custodian' || cookieRole === 'admin') {
        return cookieRole;
      }
      if (cookieRole === 'local') return 'custodian';
    }
    return 'tourist';
  });

  useEffect(() => {
    try {
      // 1. First check the user_role cookie
      const cookieRole = getCookie('user_role');
      if (cookieRole) {
        if (cookieRole === 'tourist' || cookieRole === 'custodian' || cookieRole === 'admin') {
          setRoleState(cookieRole);
          return;
        } else if (cookieRole === 'local') {
          // Normalize legacy local role to custodian
          setRoleState('custodian');
          setCookie('user_role', 'custodian');
          return;
        }
      }

      // 2. Fallback to localStorage
      const savedStorage = localStorage.getItem('mitti_role');
      if (savedStorage) {
        if (savedStorage === 'tourist' || savedStorage === 'custodian' || savedStorage === 'admin') {
          setRoleState(savedStorage as UserRole);
          setCookie('user_role', savedStorage);
          return;
        } else if (savedStorage === 'local') {
          setRoleState('custodian');
          setCookie('user_role', 'custodian');
          localStorage.setItem('mitti_role', 'custodian');
          return;
        }
      }

      // 3. Default to tourist
      setCookie('user_role', 'tourist');
    } catch {
      // ignore storage/cookie errors
    }
  }, []);

  const setRole = (newRole: UserRole | 'local') => {
    const normalizedRole: UserRole = newRole === 'local' ? 'custodian' : newRole;
    setRoleState(normalizedRole);
    try {
      setCookie('user_role', normalizedRole);
      localStorage.setItem('mitti_role', normalizedRole);
    } catch {
      // ignore
    }
  };

  const roleInfoMap: Record<UserRole, { title: string; roleName: string; description: string; badgeColor: string }> = {
    tourist: {
      title: 'Customer / Art Collector',
      roleName: 'Tourist',
      description: 'Browsing GI-certified crafts, oral lores, and direct acquisitions',
      badgeColor: 'bg-[#FAF8F5] text-[#193225] border-[#E5E0D6]',
    },
    custodian: {
      title: 'Master Artisan Custodian',
      roleName: 'Custodian',
      description: 'Managing atelier inventory, 90% direct payout ledger, and customary AI consent',
      badgeColor: 'bg-[#EBF3ED] text-[#193225] border-[#D5E4D8]',
    },
    admin: {
      title: 'Platform Superintendent',
      roleName: 'Admin',
      description: 'Verifying GI registry compliance, SHA-256 audit logs, and AI scraper defense',
      badgeColor: 'bg-[#193225] text-white border-[#193225]',
    },
  };

  return (
    <RoleContext.Provider
      value={{
        role,
        setRole,
        isCollector: role === 'tourist',
        isCustodian: role === 'custodian',
        isArtisan: role === 'custodian',
        isAdmin: role === 'admin',
        roleInfo: roleInfoMap[role] || roleInfoMap.tourist,
      }}
    >
      {children}
    </RoleContext.Provider>
  );
}

export function useRole() {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error('useRole must be used within a RoleProvider');
  }
  return context;
}
