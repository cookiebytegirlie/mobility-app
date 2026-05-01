import React, { useState, useEffect } from 'react';
import { BottomNav } from './components/shared';
import { TWEAK_DEFAULTS, getPhoneBg } from './constants/data';
import { C } from './constants/colors';

import OnboardingWelcome from './screens/onboarding/OnboardingWelcome';
import OnboardingBodyAwareness from './screens/onboarding/OnboardingBodyAwareness';
import OnboardingMobilityQuiz from './screens/onboarding/OnboardingMobilityQuiz';
import OnboardingSchedule from './screens/onboarding/OnboardingSchedule';
import OnboardingSummary from './screens/onboarding/OnboardingSummary';

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

function App() {
  const saved = (() => { try { return JSON.parse(localStorage.getItem('mobility_screen')) || {}; } catch { return {}; } })();
  const [screen, setScreen] = useState(saved.screen || 'onboarding-welcome');
  const [tab, setTab] = useState(saved.tab || 'home');
  const [tweaks, setTweaks] = useState(TWEAK_DEFAULTS);
  const [showTweaksPanel, setShowTweaksPanel] = useState(false);

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

  const navigate = (s) => setScreen(s);
  const handleTabChange = (t) => {
    setTab(t);
    if (t === 'home') navigate('main-home');
    else if (t === 'routines') navigate('browse-routines');
    else if (t === 'goals') navigate('goals-landing');
    else if (t === 'stretch') navigate('session-preview');
    else if (t === 'progress') navigate('progress');
  };

  const mainScreens = ['main-home', 'browse-routines', 'progress', 'goals-landing'];
  const showNav = mainScreens.includes(screen);

  const renderScreen = () => {
    switch(screen) {
      case 'onboarding-welcome':   return <OnboardingWelcome onNext={() => navigate('onboarding-body')} />;
      case 'onboarding-body':      return <OnboardingBodyAwareness onNext={() => navigate('onboarding-quiz')} onBack={() => navigate('onboarding-welcome')} />;
      case 'onboarding-quiz':      return <OnboardingMobilityQuiz onNext={() => navigate('onboarding-schedule')} onBack={() => navigate('onboarding-body')} />;
      case 'onboarding-schedule':  return <OnboardingSchedule onNext={() => navigate('onboarding-summary')} onBack={() => navigate('onboarding-quiz')} />;
      case 'onboarding-summary':   return <OnboardingSummary onDone={() => { setTab('home'); navigate('main-home'); }} />;
      case 'main-home':            return <HomeScreen onNavigate={navigate} />;
      case 'browse-routines':      return <BrowseRoutinesScreen onNavigate={navigate} />;
      case 'progress':             return <ProgressScreen onNavigate={navigate} />;
      case 'checkin-1':            return <CheckInWelcome onNext={() => navigate('checkin-2')} />;
      case 'checkin-2':            return <CheckInEnergy onNext={() => navigate('checkin-3')} onBack={() => navigate('main-home')} />;
      case 'checkin-3':            return <CheckInPlans onNext={() => navigate('checkin-4')} onBack={() => navigate('checkin-2')} />;
      case 'checkin-4':            return <CheckInBodyMap onNext={() => navigate('checkin-5')} onBack={() => navigate('checkin-3')} />;
      case 'checkin-5':            return <CheckInSessions onNext={() => navigate('checkin-6')} onBack={() => navigate('checkin-4')} />;
      case 'checkin-6':            return <CheckInTime onNext={() => navigate('checkin-done')} onBack={() => navigate('checkin-5')} />;
      case 'checkin-done':         return <CheckInDone onDone={() => navigate('session-preview')} />;
      case 'session-preview':      return <SessionPreview onStart={() => navigate('session-live')} onBack={() => navigate('main-home')} />;
      case 'session-live':         return <LiveSession onEnd={() => navigate('session-complete')} />;
      case 'session-complete':     return <SessionComplete onDone={() => { setTab('home'); navigate('main-home'); }} onMore={() => navigate('session-live')} />;
      case 'goals-landing':        return <GoalsLanding onNavigate={navigate} />;
      case 'goals-type':           return <GoalType onNext={() => navigate('goals-input')} onBack={() => navigate('goals-landing')} />;
      case 'goals-input':          return <GoalInput onNext={() => navigate('goals-analysis')} onBack={() => navigate('goals-type')} />;
      case 'goals-analysis':       return <GoalAnalysis onNext={() => navigate('goals-plan')} />;
      case 'goals-plan':           return <GoalPlan onSave={() => { setTab('home'); navigate('main-home'); }} onBack={() => navigate('goals-analysis')} />;
      case 'scan-environment':     return <ScanScreen onNavigate={navigate} />;
      default:                     return <HomeScreen onNavigate={navigate} />;
    }
  };

  const activeTab = screen === 'main-home' ? 'home' : screen === 'browse-routines' ? 'routines' : screen === 'progress' ? 'progress' : (screen === 'goals-landing' || screen.startsWith('goals')) ? 'goals' : tab;

  const phoneBg = getPhoneBg(screen);

  return (
    <div style={{
      width: 390, height: 844,
      background: `linear-gradient(160deg, rgba(220,235,245,0.65) 0%, rgba(235,242,250,0.55) 100%), url(${phoneBg}) center/cover no-repeat`,
      borderRadius: 44,
      overflow: 'hidden',
      boxShadow: '0 32px 80px rgba(0,0,0,0.22), 0 0 0 10px #c8d8e8, 0 0 0 11px #b0c4d6',
      position: 'relative',
      display: 'flex', flexDirection: 'column',
    }}>
      {/* Status bar */}
      <div style={{
        height: screen === 'session-live' ? 0 : 52,
        backgroundColor: 'transparent',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: screen === 'session-live' ? 0 : '0 28px',
        flexShrink: 0, zIndex: 200,
      }}>
        {screen !== 'session-live' && <>
          <span style={{ fontFamily: '-apple-system, system-ui', fontWeight: 600, fontSize: 15, color: 'rgba(20,30,40,0.85)' }}>9:41</span>
          <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
            <svg width="16" height="12" viewBox="0 0 16 12">
              <rect x="0" y="7" width="2.5" height="5" rx="0.5" fill="rgba(20,30,40,0.80)"/>
              <rect x="4" y="4.5" width="2.5" height="7.5" rx="0.5" fill="rgba(20,30,40,0.80)"/>
              <rect x="8" y="2" width="2.5" height="10" rx="0.5" fill="rgba(20,30,40,0.80)"/>
              <rect x="12" y="0" width="2.5" height="12" rx="0.5" fill="rgba(20,30,40,0.80)"/>
            </svg>
            <svg width="15" height="11" viewBox="0 0 15 11">
              <path d="M7.5 2.8C9.5 2.8 11.3 3.6 12.6 4.9L13.5 4C11.9 2.5 9.8 1.5 7.5 1.5C5.2 1.5 3.1 2.5 1.5 4L2.4 4.9C3.7 3.6 5.5 2.8 7.5 2.8Z" fill="rgba(20,30,40,0.80)"/>
              <path d="M7.5 5.8C8.7 5.8 9.8 6.3 10.6 7L11.5 6.1C10.4 5.1 8.9 4.5 7.5 4.5C6.1 4.5 4.6 5.1 3.5 6.1L4.4 7C5.2 6.3 6.3 5.8 7.5 5.8Z" fill="rgba(20,30,40,0.80)"/>
              <circle cx="7.5" cy="9.5" r="1.2" fill="rgba(20,30,40,0.80)"/>
            </svg>
            <svg width="25" height="12" viewBox="0 0 25 12">
              <rect x="0.5" y="0.5" width="21" height="11" rx="3" stroke="rgba(20,30,40,0.4)" fill="none"/>
              <rect x="2" y="2" width="17" height="8" rx="2" fill="rgba(20,30,40,0.80)"/>
              <path d="M23 4.5V7.5C23.8 7.2 24.5 6.3 24.5 6C24.5 5.7 23.8 4.8 23 4.5Z" fill="rgba(20,30,40,0.4)"/>
            </svg>
          </div>
        </>}
      </div>

      {/* Screen content */}
      <div key={screen} className="screen-enter" style={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden', minHeight: 0 }}>
        {renderScreen()}
      </div>

      {/* Bottom nav */}
      {showNav && <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />}

      {/* Home indicator */}
      {screen !== 'session-live' && (
        <div style={{ height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'transparent', flexShrink: 0 }}>
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
  );
}

export default App;
