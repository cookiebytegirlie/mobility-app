import React from 'react';

export function BottomSheet({
  children,
  title,
  subtitle,
  onClose,
  headerRight = null,
  maxHeight = '80%',
  style = {},
}) {
  return (
    <div style={{
      borderRadius: '22px 22px 0 0',
      background: 'rgba(250,250,248,0.97)',
      backdropFilter: 'blur(28px)',
      WebkitBackdropFilter: 'blur(28px)',
      boxShadow: '0 -6px 32px rgba(0,0,0,0.14)',
      maxHeight,
      display: 'flex',
      flexDirection: 'column',
      animation: 'slideUp 0.4s cubic-bezier(0.22,1,0.36,1) both',
      ...style,
    }}>
      {/* Drag handle */}
      <div style={{ display: 'flex', justifyContent: 'center', padding: '10px 0 4px' }}>
        <div style={{ width: 36, height: 4, borderRadius: 2, backgroundColor: 'rgba(0,0,0,0.18)' }} />
      </div>

      {/* Header */}
      {(title || subtitle || onClose || headerRight) && (
        <div style={{ padding: '4px 20px 14px', borderBottom: '1px solid rgba(0,0,0,0.08)', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              {title && (
                <div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 800, fontSize: 17, color: '#1A2028' }}>
                  {title}
                </div>
              )}
              {subtitle && (
                <div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 500, fontSize: 12, color: '#6B7280', marginTop: 2 }}>
                  {subtitle}
                </div>
              )}
            </div>
            {headerRight}
            {onClose && (
              <button onClick={onClose} style={{
                padding: '7px 14px', borderRadius: 20, marginLeft: 10,
                border: '1px solid rgba(0,0,0,0.08)', backgroundColor: '#FFFFFF',
                cursor: 'pointer', fontFamily: 'Plus Jakarta Sans', fontWeight: 600,
                fontSize: 12, color: '#1A2028',
                boxShadow: '0 1px 4px rgba(0,0,0,0.05)', flexShrink: 0,
              }}>
                Close
              </button>
            )}
          </div>
        </div>
      )}

      {children}
    </div>
  );
}

export default BottomSheet;
