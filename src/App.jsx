import React, { useState, useEffect } from 'react';
import { BottomNav } from './components/shared';
import { TWEAK_DEFAULTS } from './constants/data';
import { C } from './constants/colors';

import OnboardingWelcome from './screens/onboarding/OnboardingWelcome';
import OnboardingDiagnostic from './screens/onboarding/OnboardingDiagnostic';
import OnboardingSchedule from './screens/onboarding/OnboardingSchedule';
import OnboardingBodyMap from './screens/onboarding/OnboardingBodyMap';
import OnboardingSummary from './screens/onboarding/OnboardingSummary';
import OnboardingPlan from './screens/onboarding/OnboardingPlan';

import CheckInWelcome from './screens/checkin/CheckInWelcome';
import CheckInEnergy from './screens/checkin/CheckInEnergy';
import CheckInPlans from './screens/checkin/CheckInPlans';
import CheckInBodyMap from './screens/checkin/CheckInBodyMap';
import CheckInSessions from './screens/checkin/CheckInSessions';
import CheckInTime from './screens/checkin/CheckInTime';
import CheckInDone from './screens/checkin/CheckInDone';

import SessionPreview from './screens/session/SessionPreview';
import LiveSession from './screens/session/LiveSession';
import SessionComplete from './screens/session/SessionComplete';

import GoalType from './screens/goals/GoalType';
import GoalInput from './screens/goals/GoalInput';
import GoalAnalysis from './screens/goals/GoalAnalysis';
import GoalPlan from './screens/goals/GoalPlan';

import HomeScreen from './screens/HomeScreen';
import BrowseRoutinesScreen from './screens/BrowseRoutinesScreen';
import ProgressScreen from './screens/ProgressScreen';
import GoalsLanding from './screens/GoalsLanding';
import ScanScreen from './screens/ScanScreen';

const BEZEL = 12;
const PHONE_W = 414;
const PHONE_H = 868;
const OUTER_RADIUS = 54;
const INNER_RADIUS = 44;

function App() {
  const saved = (() => { try { return JSON.parse(localStorage.getItem('mobility_screen')) || {}; } catch { return {}; } })();
  const [screen, setScreen] = useState(saved.screen || 'onboarding-welcome');
  const [tab, setTab] = useState(saved.tab || 'home');
  const [tweaks, setTweaks] = useState(TWEAK_DEFAULTS);
  const [showTweaksPanel, setShowTweaksPanel] = useState(false);
  const [isReturningUser, setIsReturningUser] = useState(
    () => localStorage.getItem('checkin_returning') === 'true'
  );

  const markReturning = () => {
    setIsReturningUser(true);
    localStorage.setItem('checkin_returning', 'true');
  };

  const [navClass, setNavClass] = useState('screen-enter');
  const [sessionDuration, setSessionDuration] = useState(5);
  const [phoneScale, setPhoneScale] = useState(1);
  useEffect(() => {
    const compute = () => {
      const margin = 20;
      setPhoneScale(Math.min(1,
        (window.innerWidth  - margin * 2) / PHONE_W,
        (window.innerHeight - margin * 2) / PHONE_H,
      ));
    };
    compute();
    window.addEventListener('resize', compute);
    return () => window.removeEventListener('resize', compute);
  }, []);

  useEffect(() => {
    const { hue: h, saturation: s, lightness: l } = tweaks;
    C.teal    = `hsl(${h}, ${s}%, ${l}%)`;
    C.tealMid = `hsl(${h}, ${Math.min(s+10,100)}%, ${Math.min(l+12,80)}%)`;
  }, [tweaks]);

  useEffect(() => {
    localStorage.setItem('mobility_screen', JSON.stringify({ screen, tab }));
  }, [screen, tab]);

  useEffect(() => {
    const handler = (e) => {
      if (e.data?.type === '__activate_edit_mode') setShowTweaksPanel(true);
      if (e.data?.type === '__deactivate_edit_mode') setShowTweaksPanel(false);
    };
    window.addEventListener('message', handler);
    window.parent.postMessage({ type: '__edit_mode_available' }, '*');
    return () => window.removeEventListener('message', handler);
  }, []);

  const navigate = (s) => { setNavClass('screen-enter'); setScreen(s); };
  const navigateFlow = (s, dir = 'forward') => { setNavClass(dir === 'forward' ? 'screen-slide-right' : 'screen-slide-left'); setScreen(s); };
  const handleTabChange = (t) => {
    setTab(t);
    if (t === 'home') navigate('main-home');
    else if (t === 'routines') navigate('browse-routines');
    else if (t === 'goals') navigate('goals-landing');
    else if (t === 'scan') navigate('scan-environment');
    else if (t === 'progress') navigate('progress');
  };

  const mainScreens = ['main-home', 'browse-routines', 'progress', 'goals-landing', 'scan-environment'];
  const showNav = mainScreens.includes(screen);

  const renderScreen = () => {
    switch(screen) {
      case 'onboarding-welcome':    return <OnboardingWelcome onNext={() => navigateFlow('onboarding-diagnostic')} />;
      case 'onboarding-diagnostic': return <OnboardingDiagnostic onNext={() => navigateFlow('onboarding-schedule')} onBack={() => navigateFlow('onboarding-welcome', 'backward')} />;
      case 'onboarding-schedule':   return <OnboardingSchedule onNext={() => navigateFlow('onboarding-body-map')} onBack={() => navigateFlow('onboarding-diagnostic', 'backward')} />;
      case 'onboarding-body-map':   return <OnboardingBodyMap onNext={() => navigateFlow('onboarding-summary')} onBack={() => navigateFlow('onboarding-schedule', 'backward')} />;
      case 'onboarding-summary':    return <OnboardingSummary onNext={() => navigateFlow('onboarding-plan')} onDone={() => navigateFlow('onboarding-plan')} />;
      case 'onboarding-plan':       return <OnboardingPlan onSave={() => { setTab('home'); navigate('main-home'); }} onBack={() => navigateFlow('onboarding-summary', 'backward')} />;
      case 'main-home':            return <HomeScreen onNavigate={navigate} />;
      case 'browse-routines':      return <BrowseRoutinesScreen onNavigate={navigate} />;
      case 'progress':             return <ProgressScreen onNavigate={navigate} />;
      /* Check-in — full flow */
      case 'checkin-1':            return <CheckInWelcome isReturningUser={isReturningUser} onNext={() => navigateFlow('checkin-2')} onReturnStart={() => navigateFlow('checkin-return-body')} onExit={() => navigate('main-home')} />;
      case 'checkin-2':            return <CheckInEnergy onNext={() => navigateFlow('checkin-3')} onBack={() => navigateFlow('checkin-1', 'backward')} onExit={() => navigate('main-home')} />;
      case 'checkin-3':            return <CheckInPlans onNext={() => navigateFlow('checkin-4')} onBack={() => navigateFlow('checkin-2', 'backward')} onExit={() => navigate('main-home')} />;
      case 'checkin-4':            return <CheckInBodyMap onNext={() => navigateFlow('checkin-5')} onBack={() => navigateFlow('checkin-3', 'backward')} onExit={() => navigate('main-home')} />;
      case 'checkin-5':            return <CheckInSessions onNext={() => navigateFlow('checkin-6')} onBack={() => navigateFlow('checkin-4', 'backward')} onExit={() => navigate('main-home')} />;
      case 'checkin-6':            return <CheckInTime onNext={() => navigateFlow('checkin-done')} onBack={() => navigateFlow('checkin-5', 'backward')} onExit={() => navigate('main-home')} />;
      /* Check-in — compressed (returning user) */
      case 'checkin-return-body':  return <CheckInBodyMap isCompressed onNext={() => navigateFlow('checkin-return-time')} onBack={() => navigateFlow('checkin-1', 'backward')} onExit={() => navigate('main-home')} />;
      case 'checkin-return-time':  return <CheckInTime isCompressed onNext={() => navigateFlow('checkin-done')} onBack={() => navigateFlow('checkin-return-body', 'backward')} onExit={() => navigate('main-home')} />;
      case 'checkin-done':         return <CheckInDone onDone={() => { markReturning(); navigate('session-preview'); }} onExit={() => navigate('main-home')} />;
      case 'session-preview':      return <SessionPreview onStart={(dur) => { setSessionDuration(dur); navigate('session-live'); }} onBack={() => navigate('main-home')} />;
      case 'session-live':         return <LiveSession onEnd={() => navigate('session-complete')} />;
      case 'session-complete':     return <SessionComplete duration={sessionDuration} onDone={() => { setTab('home'); navigate('main-home'); }} onMore={(extra) => { setSessionDuration(d => d + extra); navigate('session-live'); }} />;
      case 'goals-landing':        return <GoalsLanding onNavigate={navigate} />;
      case 'goals-type':           return <GoalType onNext={() => navigate('goals-input')} onBack={() => navigate('goals-landing')} />;
      case 'goals-input':          return <GoalInput onNext={() => navigate('goals-analysis')} onBack={() => navigate('goals-type')} />;
      case 'goals-analysis':       return <GoalAnalysis onNext={() => navigate('goals-plan')} />;
      case 'goals-plan':           return <GoalPlan onSave={() => { setTab('home'); navigate('main-home'); }} onBack={() => navigate('goals-analysis')} />;
      case 'scan-environment':     return <ScanScreen onNavigate={navigate} />;
      default:                     return <HomeScreen onNavigate={navigate} />;
    }
  };

  const activeTab = screen === 'main-home' ? 'home' : screen === 'browse-routines' ? 'routines' : screen === 'progress' ? 'progress' : (screen === 'goals-landing' || screen.startsWith('goals')) ? 'goals' : screen === 'scan-environment' ? 'scan' : tab;

  return (
    <div style={{
      width: '100vw', height: '100vh',
      backgroundColor: '#E8EDF2',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      overflow: 'hidden',
    }}>
      {/* ── iPhone 15 Pro frame ── */}
      <div style={{
        position: 'relative',
        width: PHONE_W, height: PHONE_H,
        flexShrink: 0,
        transform: `scale(${phoneScale})`,
        transformOrigin: 'center center',
        background: 'linear-gradient(160deg, #B8B0A6 0%, #8C8278 20%, #5C5048 45%, #6E6460 70%, #B0A89E 100%)',
        borderRadius: OUTER_RADIUS,
        boxShadow: [
          '0 0 0 0.5px rgba(255,255,255,0.22)',
          '0 70px 160px rgba(0,0,0,0.55)',
          '0 30px 80px rgba(0,0,0,0.35)',
          '0 10px 30px rgba(0,0,0,0.20)',
          'inset 0 1px 0 rgba(255,255,255,0.28)',
          'inset 0 -1px 0 rgba(0,0,0,0.30)',
        ].join(', '),
      }}>

        {/* Left: silent switch */}
        <div style={{ position: 'absolute', left: -3.5, top: 102, width: 3.5, height: 32, background: 'linear-gradient(90deg, #3A322C, #5C5048)', borderRadius: '3px 1px 1px 3px' }} />
        {/* Left: volume down */}
        <div style={{ position: 'absolute', left: -3.5, top: 162, width: 3.5, height: 62, background: 'linear-gradient(90deg, #3A322C, #5C5048)', borderRadius: '3px 1px 1px 3px' }} />
        {/* Left: volume up */}
        <div style={{ position: 'absolute', left: -3.5, top: 240, width: 3.5, height: 62, background: 'linear-gradient(90deg, #3A322C, #5C5048)', borderRadius: '3px 1px 1px 3px' }} />
        {/* Right: power */}
        <div style={{ position: 'absolute', right: -3.5, top: 194, width: 3.5, height: 88, background: 'linear-gradient(270deg, #3A322C, #5C5048)', borderRadius: '1px 3px 3px 1px' }} />

        {/* Screen */}
        <div style={{
          position: 'absolute',
          top: BEZEL, left: BEZEL, right: BEZEL, bottom: BEZEL,
          borderRadius: INNER_RADIUS,
          overflow: 'hidden',
          backgroundColor: '#000',
        }}>
          {/* Dynamic Island */}
          <div style={{
            position: 'absolute',
            top: 12, left: '50%', transform: 'translateX(-50%)',
            width: 126, height: 36,
            backgroundColor: '#000',
            borderRadius: 18,
            zIndex: 500,
            pointerEvents: 'none',
          }} />

          {/* App content */}
          <div style={{
            width: '100%', height: '100%',
            backgroundColor: '#FAFAF8',
            display: 'flex', flexDirection: 'column',
            position: 'relative',
            overflow: 'hidden',
          }}>
            {/* Status bar spacer — session screens manage their own top padding */}
            <div style={{ height: (screen === 'session-live' || screen === 'session-preview') ? 0 : 52, flexShrink: 0 }} />

            {/* Screen content */}
            <div key={screen} className={navClass} style={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden', minHeight: 0 }}>
              {renderScreen()}
            </div>

            {/* Bottom nav */}
            {showNav && <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />}

            {/* Home indicator */}
            {screen !== 'session-live' && (
              <div style={{ height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <div style={{ width: 120, height: 5, borderRadius: 3, backgroundColor: 'rgba(20,30,40,0.20)' }} />
              </div>
            )}

            {/* Tweaks panel */}
            {showTweaksPanel && (
              <div style={{
                position: 'absolute', bottom: showNav ? 92 : 16, right: 12, left: 12,
                backgroundColor: 'rgba(255,255,255,0.95)',
                backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)',
                borderRadius: 16, padding: 20,
                boxShadow: '0 8px 32px rgba(0,0,0,0.18)', zIndex: 9999,
                border: '1px solid rgba(0,0,0,0.10)', maxHeight: 420, overflowY: 'auto',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
                  <span style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: 15, color: 'rgba(20,160,130,1)' }}>Tweaks</span>
                  <button onClick={() => { setShowTweaksPanel(false); window.parent.postMessage({type:'__edit_mode_dismissed'},'*'); }}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 18, color: 'rgba(20,30,40,0.5)', lineHeight: 1 }}>×</button>
                </div>
                <div style={{ marginBottom: 18 }}>
                  <div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: 12, color: 'rgba(20,30,40,0.5)', letterSpacing: 0.5, textTransform: 'uppercase', marginBottom: 12 }}>Accent color</div>
                  <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
                    {['teal','tealMid'].map(k => (
                      <div key={k} style={{ flex: 1, height: 28, borderRadius: 8, backgroundColor: C[k], border: '1px solid rgba(0,0,0,0.10)' }} title={k} />
                    ))}
                  </div>
                  {[
                    { key: 'hue', label: 'Hue', min: 0, max: 360, gradient: 'linear-gradient(to right,hsl(0,60%,55%),hsl(60,60%,55%),hsl(120,60%,55%),hsl(180,60%,55%),hsl(240,60%,55%),hsl(300,60%,55%),hsl(360,60%,55%))' },
                    { key: 'saturation', label: 'Saturation', min: 0, max: 100, gradient: `linear-gradient(to right, hsl(${tweaks.hue},0%,${tweaks.lightness}%), hsl(${tweaks.hue},100%,${tweaks.lightness}%))` },
                    { key: 'lightness', label: 'Lightness', min: 30, max: 80, gradient: `linear-gradient(to right, hsl(${tweaks.hue},${tweaks.saturation}%,30%), hsl(${tweaks.hue},${tweaks.saturation}%,80%))` },
                  ].map(({ key, label, min, max, gradient }) => (
                    <div key={key} style={{ marginBottom: 12 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                        <span style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 600, fontSize: 12, color: 'rgba(20,30,40,0.7)' }}>{label}</span>
                        <span style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: 12, color: 'rgba(20,160,130,1)' }}>{tweaks[key]}{key === 'hue' ? '°' : '%'}</span>
                      </div>
                      <div style={{ position: 'relative', height: 20, display: 'flex', alignItems: 'center' }}>
                        <div style={{ position: 'absolute', left: 0, right: 0, height: 8, borderRadius: 4, background: gradient, boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.2)' }} />
                        <input type="range" min={min} max={max} value={tweaks[key]}
                          onChange={e => {
                            const t = { ...tweaks, [key]: +e.target.value };
                            setTweaks(t);
                            window.parent.postMessage({ type: '__edit_mode_set_keys', edits: t }, '*');
                          }}
                          style={{ position: 'relative', width: '100%', appearance: 'none', WebkitAppearance: 'none', background: 'transparent', cursor: 'pointer', height: 20, margin: 0 }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
