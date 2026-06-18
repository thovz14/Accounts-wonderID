import PocketBase from 'https://cdn.jsdelivr.net/npm/pocketbase@0.21.1/+esm';
export const pb = new PocketBase('http://192.168.88.73:8090');

export function showToast(message, type = 'info') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    Object.assign(container.style, {
      position: 'fixed',
      top: '24px',
      right: '24px',
      zIndex: '99999',
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
      maxWidth: '380px',
      width: 'calc(100% - 48px)',
      pointerEvents: 'none'
    });
    document.body.appendChild(container);
  }

  // Detect current theme
  const isLight = document.documentElement.dataset.theme === 'light';

  const toast = document.createElement('div');

  Object.assign(toast.style, {
    padding: '14px 20px',
    borderRadius: '14px',
    color: isLight ? '#0f172a' : '#f8fafc',
    fontSize: '14px',
    fontWeight: '500',
    fontFamily: "'Outfit', 'Inter', sans-serif",
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    boxShadow: isLight
      ? '0 8px 24px rgba(0, 0, 0, 0.12)'
      : '0 12px 30px rgba(2, 6, 23, 0.6)',
    backdropFilter: 'blur(16px)',
    transform: 'translateX(120%)',
    transition: 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.4s ease, margin 0.3s ease',
    opacity: '0',
    pointerEvents: 'auto',
    cursor: 'pointer',
    userSelect: 'none'
  });

  let icon = '⚡';
  let bgColor, borderColor;

  if (type === 'success') {
    icon = '✨';
    bgColor = isLight ? 'rgba(16, 185, 129, 0.12)' : 'rgba(16, 185, 129, 0.15)';
    borderColor = '#10b981';
    toast.style.boxShadow = isLight
      ? '0 8px 24px rgba(16, 185, 129, 0.2)'
      : '0 12px 30px rgba(16, 185, 129, 0.15)';
  } else if (type === 'error') {
    icon = '💥';
    bgColor = isLight ? 'rgba(239, 68, 68, 0.1)' : 'rgba(239, 68, 68, 0.15)';
    borderColor = '#ef4444';
    toast.style.boxShadow = isLight
      ? '0 8px 24px rgba(239, 68, 68, 0.18)'
      : '0 12px 30px rgba(239, 68, 68, 0.15)';
  } else if (type === 'warning') {
    icon = '⚠️';
    bgColor = isLight ? 'rgba(245, 158, 11, 0.1)' : 'rgba(245, 158, 11, 0.15)';
    borderColor = '#f59e0b';
    toast.style.boxShadow = isLight
      ? '0 8px 24px rgba(245, 158, 11, 0.18)'
      : '0 12px 30px rgba(245, 158, 11, 0.15)';
  } else {
    icon = '⚡';
    bgColor = isLight ? 'rgba(139, 92, 246, 0.1)' : 'rgba(139, 92, 246, 0.15)';
    borderColor = '#8b5cf6';
    toast.style.boxShadow = isLight
      ? '0 8px 24px rgba(139, 92, 246, 0.2)'
      : '0 12px 30px rgba(139, 92, 246, 0.15)';
  }

  // Light mode: solid white base so text is always readable
  if (isLight) {
    bgColor = bgColor.replace(/rgba\(([^)]+),\s*[\d.]+\)/, 'rgba($1, 0.92)');
    toast.style.background = `linear-gradient(135deg, #ffffff, #f8fafc)`;
    toast.style.backgroundImage = 'none';
    toast.style.background = `rgba(255, 255, 255, 0.95)`;
  }

  toast.style.background = isLight ? 'rgba(255, 255, 255, 0.97)' : bgColor;
  toast.style.border = `1px solid ${borderColor}`;

  toast.innerHTML = `
    <span style="font-size: 20px; display: inline-flex; align-items: center; justify-content: center;">${icon}</span>
    <div style="flex: 1; line-height: 1.4;">${message}</div>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.transform = 'translateX(0)';
    toast.style.opacity = '1';
  }, 10);

  const dismiss = () => {
    toast.style.transform = 'translateX(120%)';
    toast.style.opacity = '0';
    setTimeout(() => {
      toast.remove();
    }, 450);
  };

  const autoDismiss = setTimeout(dismiss, 4500);

  toast.addEventListener('click', () => {
    clearTimeout(autoDismiss);
    dismiss();
  });
}

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
      .then((registration) => {
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
      })
      .catch((error) => {
        console.log('ServiceWorker registration failed: ', error);
      });
  });
}
