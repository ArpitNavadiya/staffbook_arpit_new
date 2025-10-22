'use client';

import { usePathname, useRouter } from 'next/navigation';
import { menuItems } from '../../data/subMenu';

export default function MobileSubMenu() {
  const router = useRouter();
  const pathname = usePathname();
  console.log(pathname,"menuItems");
  return (
    <section className="w-full px-2  items-center justify-center md:hidden">
      <div className="w-full max-w-[100%] ">
        {/* Mobile Menu Bar */}
        <div className="p-0">
          <div className="flex overflow-x-auto no-scrollbar gap-2 py-4  items-center justify-start">
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = item.href === pathname;
              
              return (
                <div 
                  key={index} 
                  onClick={() => router.push(item.href)}
                  className={`flex shadow-md flex-col items-center justify-center py-2 px-3 min-w-[90px] rounded-lg cursor-pointer transition-all duration-200 h-[80px] ${
                    isActive 
                      ? 'bg-purple-200 text-white' 
                      : 'hover:bg-gray-100 bg-white text-[#a259e6]'
                  }`}
                  style={{ flex: '0 0 auto' }}
                >
                  {Icon && (
                    <Icon 
                      size={18} 
                      className={`mb-1 text-[#a259e6]`} 
                    />
                  )}
                  <span className={`text-xs font-medium text-center leading-tight ${
                    isActive ? 'text-[#a259e6]' : 'text-gray-600'
                  }`}>
                    {item.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
} 